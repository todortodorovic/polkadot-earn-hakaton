# Polkadot Earn Platform

A centralized hub for all opportunities in the Polkadot ecosystem - grants, bounties, jobs, and news.

## The Problem

The Polkadot ecosystem faces critical challenges in contributor onboarding:

- **Fragmented Information**: Opportunities scattered across forums, GitHub, dApps, and social networks
- **High Entry Barriers**: Most grants set at $50k+ feel intimidating and "out of reach" for newcomers
- **Limited Diversity**: Current programs focus almost exclusively on developers, excluding marketers, researchers, and designers
- **Complex Processes**: Multiple forms, GitHub PRs, and platform-specific submissions create unnecessary friction

## The Solution

Polkadot Earn Platform aggregates all ecosystem opportunities into a single, accessible platform inspired by Solana's successful Superteam Earn model.

### Core Features

**🎯 Grants**
- Mini-grants ($2k-$10k) for rapid idea validation and experimentation
- University grants supporting student research and theses
- Aggregated listings from Web3 Foundation, Parity, and parachain-specific programs

**💰 Bounties** *(Coming Soon)*
- Technical tasks: tutorials, bug fixes, problem-solving
- Marketing initiatives: articles, social media, videos, community events

**💼 Jobs** *(Coming Soon)*
- Curated listings: full-time, part-time, project-based
- Internship programs

**📰 News & Events** *(Coming Soon)*
- Hackathons, grant calls, meetups, ecosystem updates

## Why This Matters

By lowering entry barriers and centralizing opportunities, Polkadot Earn:

✅ **Widens the talent funnel** - more people enter through accessible mini-grants
✅ **Enables rapid validation** - low-risk experimentation with smaller grants
✅ **Attracts diverse contributors** - researchers, students, marketers, not just developers
✅ **Increases visibility** - marketing bounties and university research amplify Polkadot's narrative

## Reference: Solana Superteam Success

Superteam Balkan distributed just ~$240k and achieved:
- 73 approved grants (avg. $2,300)
- 30 university grants (avg. $1,700)
- **100+ new teams onboarded** as contributors
- Multiple successful projects launched

## Tech Stack

**Backend**
- Express.js + TypeScript
- Prisma ORM + SQLite
- JWT authentication
- RESTful API

**Frontend**
- Next.js 15 + React 19
- Tailwind CSS
- TypeScript
- shadcn/ui components

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

**1. Backend Setup**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```
Backend runs on `http://localhost:4000`

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### Default Credentials

**Admin Access**
- Email: `admin@example.com`
- Password: `admin123`

**Test User**
- Email: `user@example.com`
- Password: `user123`

## Current Status

✅ **MVP Complete:**
- Grant listing and detail pages
- User authentication and registration
- Application submission system
- Admin dashboard for application review
- Approve/reject workflow

🚧 **In Progress:**
- Bounties section
- Jobs board
- News & events feed

## Vision

Polkadot Earn Platform aims to become the primary entry point for anyone looking to contribute to the Polkadot ecosystem - whether you're a developer, researcher, marketer, or student. By making opportunities accessible and processes simple, we accelerate ecosystem growth and diversify the contributor base.

---

**Built with ❤️ for the Polkadot Ecosystem**
