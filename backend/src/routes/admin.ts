import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authMiddleware, adminMiddleware, AuthRequest } from '../lib/auth'

const router = Router()

// All routes require admin authentication
router.use(authMiddleware)
router.use(adminMiddleware)

// Get all applications
router.get('/applications', async (req: AuthRequest, res) => {
  try {
    const { status, grantId } = req.query

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (grantId) {
      where.grantId = grantId
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        grant: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            walletAddress: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.application.groupBy({
      by: ['status'],
      _count: { status: true },
    })

    res.json({
      applications,
      stats: {
        total: applications.length,
        byStatus: stats.reduce((acc, curr) => {
          acc[curr.status] = curr._count.status
          return acc
        }, {} as Record<string, number>),
      },
    })
  } catch (error) {
    console.error('Get applications error:', error)
    res.status(500).json({ error: 'Failed to load applications' })
  }
})

// Approve application
router.post('/applications/:id/approve', async (req: AuthRequest, res) => {
  try {
    const { adminNotes } = req.body

    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
    })

    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ error: `Application is already ${application.status}` })
    }

    const updatedApplication = await prisma.application.update({
      where: { id: req.params.id },
      data: {
        status: 'approved',
        adminNotes: adminNotes || null,
      },
      include: {
        grant: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })

    res.json({
      message: 'Application approved successfully',
      application: updatedApplication,
    })
  } catch (error) {
    console.error('Approve application error:', error)
    res.status(500).json({ error: 'Failed to approve application' })
  }
})

// Reject application
router.post('/applications/:id/reject', async (req: AuthRequest, res) => {
  try {
    const { adminNotes } = req.body

    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
    })

    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ error: `Application is already ${application.status}` })
    }

    const updatedApplication = await prisma.application.update({
      where: { id: req.params.id },
      data: {
        status: 'rejected',
        adminNotes: adminNotes || null,
      },
      include: {
        grant: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    })

    res.json({
      message: 'Application rejected',
      application: updatedApplication,
    })
  } catch (error) {
    console.error('Reject application error:', error)
    res.status(500).json({ error: 'Failed to reject application' })
  }
})

export default router
