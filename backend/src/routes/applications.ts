import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authMiddleware, AuthRequest } from '../lib/auth'

const router = Router()

// All routes require authentication
router.use(authMiddleware)

// Create application
router.post('/', async (req: AuthRequest, res) => {
  try {
    const {
      grantId,
      projectTitle,
      projectDescription,
      teamInfo,
      milestones,
      requestedAmount,
      walletAddress,
    } = req.body

    if (!grantId || !projectTitle || !projectDescription || !requestedAmount || !walletAddress) {
      return res.status(400).json({ error: 'All required fields must be filled' })
    }

    const grant = await prisma.grant.findUnique({ where: { id: grantId } })

    if (!grant) {
      return res.status(404).json({ error: 'Grant not found' })
    }

    if (!grant.isActive) {
      return res.status(400).json({ error: 'Grant is no longer active' })
    }

    if (new Date(grant.deadline) < new Date()) {
      return res.status(400).json({ error: 'Application deadline has passed' })
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: req.user!.userId,
        grantId: grantId,
      },
    })

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this grant' })
    }

    const application = await prisma.application.create({
      data: {
        userId: req.user!.userId,
        grantId,
        projectTitle,
        projectDescription,
        teamInfo: teamInfo || null,
        milestones: JSON.stringify(milestones || []),
        requestedAmount: parseFloat(requestedAmount),
        walletAddress,
        status: 'pending',
      },
      include: {
        grant: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    res.status(201).json({ application })
  } catch (error) {
    console.error('Create application error:', error)
    res.status(500).json({ error: 'Failed to create application' })
  }
})

// Get user's applications
router.get('/', async (req: AuthRequest, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user!.userId },
      include: { grant: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ applications })
  } catch (error) {
    console.error('Get applications error:', error)
    res.status(500).json({ error: 'Failed to load applications' })
  }
})

// Get application by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
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

    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }

    if (application.userId !== req.user!.userId && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have access to this application' })
    }

    res.json({ application })
  } catch (error) {
    console.error('Get application error:', error)
    res.status(500).json({ error: 'Failed to load application' })
  }
})

export default router
