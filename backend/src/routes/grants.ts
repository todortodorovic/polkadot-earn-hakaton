import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// Get all grants
router.get('/', async (req, res) => {
  try {
    const { category, active } = req.query

    const where: any = {}

    if (category) {
      where.category = category
    }

    if (active !== undefined) {
      where.isActive = active === 'true'
    } else {
      where.isActive = true
    }

    const grants = await prisma.grant.findMany({
      where,
      orderBy: { deadline: 'asc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })

    res.json({ grants })
  } catch (error) {
    console.error('Get grants error:', error)
    res.status(500).json({ error: 'Failed to load grants' })
  }
})

// Get grant by ID
router.get('/:id', async (req, res) => {
  try {
    const grant = await prisma.grant.findUnique({
      where: { id: req.params.id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!grant) {
      return res.status(404).json({ error: 'Grant not found' })
    }

    res.json({ grant })
  } catch (error) {
    console.error('Get grant error:', error)
    res.status(500).json({ error: 'Failed to load grant' })
  }
})

export default router
