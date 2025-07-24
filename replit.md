# OSINT Investigator Tool Directory

## Overview

This is a full-stack web application that serves as a comprehensive directory for OSINT (Open Source Intelligence) investigation tools. The platform provides access to over 1,000 professional OSINT tools across 33+ investigation categories, enabling security professionals, researchers, and investigators to discover and utilize the right tools for their work.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL storage

### Database Design
- **Schema Location**: `shared/schema.ts` for type-safe sharing between frontend/backend
- **Tables**:
  - `categories`: Investigation categories (Social Media, Network Analysis, etc.)
  - `tools`: OSINT tools with detailed metadata
  - `favorites`: User-specific tool bookmarks
  - `user_onboarding`: Guided tour progress tracking

## Key Components

### Tool Management System
- Comprehensive tool catalog with ratings, user counts, and detailed descriptions
- Advanced filtering by category, pricing model, platform, and API availability
- Search functionality across tool names, descriptions, and features
- Export capabilities for investigation documentation

### User Experience Features
- Interactive onboarding system with guided tours
- Responsive design for desktop and mobile use
- Real-time search and filtering
- Tool favorites and bookmarking system

### Data Integration
- OSINT Framework JSON data parser for bulk tool import
- Support for external tool databases and APIs
- Automated categorization and metadata extraction

## Data Flow

1. **Data Ingestion**: OSINT tools are imported from JSON files via batch seeding scripts
2. **API Layer**: Express routes serve tool data with filtering and search capabilities
3. **Client Rendering**: React components consume API data through TanStack Query
4. **User Interactions**: Favorites, search filters, and onboarding state managed via API calls
5. **Session Persistence**: User preferences stored in PostgreSQL-backed sessions

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Platform**: Development and deployment environment

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Comprehensive icon library
- **Framer Motion**: Animation library for onboarding flows
- **Embla Carousel**: Touch-friendly carousels

### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **esbuild**: Production server bundling
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Mode
- Vite dev server with HMR for frontend
- tsx for TypeScript execution of Express server
- Database migrations via `drizzle-kit push`

### Production Build
- Frontend builds to `dist/public` via Vite
- Backend bundles to `dist/index.js` via esbuild
- Environment variables for database connection and session secrets

### Database Management
- Schema defined in TypeScript with Drizzle ORM
- Migrations stored in `./migrations` directory
- Seeding scripts for OSINT tool data population

### Key Architectural Decisions

1. **Shared Schema**: TypeScript schema definitions in `shared/` enable type safety across the full stack
2. **Serverless Database**: Neon PostgreSQL chosen for scalability and zero-maintenance requirements
3. **Component Library**: shadcn/ui provides consistent, accessible UI components
4. **Query Management**: TanStack Query handles caching, synchronization, and error states
5. **Session-based Auth**: Simple session management sufficient for favorites and onboarding tracking
6. **Monorepo Structure**: Single repository with clear separation between client, server, and shared code

The application prioritizes developer experience with strong typing, the user experience with responsive design and guided onboarding, and data integrity with comprehensive OSINT tool categorization and metadata management.