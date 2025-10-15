import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import grantsRoutes from './routes/grants'
import applicationsRoutes from './routes/applications'
import adminRoutes from './routes/admin'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Polkadot Grants API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/grants', grantsRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/admin', adminRoutes)

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📚 API available at http://localhost:${PORT}/api`)
})
