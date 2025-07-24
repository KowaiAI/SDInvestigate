# S&D Intel Investigator - OSINT Tool Directory

A comprehensive web application for OSINT (Open Source Intelligence) investigations, providing access to over 1,000 professional investigation tools across 33+ categories.

## Features

- **Comprehensive Tool Database**: 1,169 OSINT tools with detailed metadata
- **Advanced Search & Filtering**: Search by name, category, pricing, API availability
- **Interactive Tool Cards**: Detailed tooltips with usage information
- **Export Functionality**: Download search results for documentation
- **Contextual Help System**: Guided tours and help bubbles for new users
- **Broken Link Reporting**: Report non-functional tools
- **Favorites System**: Bookmark frequently used tools
- **Professional Interface**: Designed specifically for investigators

## Technology Stack

### Frontend

- React 18 with TypeScript
- Wouter for routing
- Tailwind CSS + shadcn/ui components
- TanStack Query for state management
- Vite for development and building

### Backend

- Node.js with Express
- TypeScript with ESM modules
- Drizzle ORM with PostgreSQL
- Session-based user management

### Database

- PostgreSQL (Neon serverless)
- Comprehensive schema for tools, categories, favorites, and onboarding

## Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Database Setup**

   - Set up a PostgreSQL database (recommend Neon for serverless)
   - Add `DATABASE_URL` to your environment variables
   - Run database migrations:

   ```bash
   npm run db:push
   ```

3. **Seed the Database**

   ```bash
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=development
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configuration
│   │   └── hooks/         # Custom React hooks
├── server/                 # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── db.ts              # Database connection
│   └── seed.ts            # Database seeding
├── shared/                 # Shared TypeScript types
│   └── schema.ts          # Database schema and types
└── migrations/            # Database migrations
```

## Key Features Explained

### Tool Management

- Browse tools by investigation category
- Advanced filtering by pricing model, platform, API availability
- Search across tool names, descriptions, and features
- Export filtered results for documentation

### User Experience

- Interactive onboarding system with guided tours
- Contextual help bubbles explaining features
- Responsive design for desktop and mobile
- Professional investigator-focused interface

### Data Integration

- OSINT Framework JSON data parser
- Support for bulk tool imports
- Automated categorization and metadata extraction
- Real-time search and filtering capabilities

## API Endpoints

- `GET /api/categories` - Get all investigation categories
- `GET /api/tools` - Get all tools with filtering
- `GET /api/favorites` - Get user's favorite tools
- `POST /api/favorites` - Add tool to favorites
- `DELETE /api/favorites/:id` - Remove from favorites
- `GET /api/onboarding` - Get user onboarding progress
- `POST /api/onboarding/:step` - Update onboarding progress

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
- `npm run seed` - Seed database with OSINT tools

## Contributing

This application is designed for professional OSINT investigators. When contributing:

1. Maintain data integrity - use authentic tool data only
2. Follow TypeScript best practices
3. Ensure responsive design across devices
4. Test all search and filtering functionality
5. Update documentation for new features

## License

Built for professional intelligence gathering and investigation workflows.
