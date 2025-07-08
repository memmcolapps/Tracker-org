# Organization Platform - Replit Guide

## Overview

This is a full-stack web application for device monitoring and management designed for organizations. The platform provides comprehensive tracking, analytics, and management capabilities for organization-assigned devices including smartphones, tablets, and IoT devices.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage
- **Development**: Hot module replacement with Vite integration

## Key Components

### Database Schema
- **Users**: Authentication, roles (admin/user), and profile management
- **Devices**: Device information, status tracking, and assignments
- **Device Usage**: Data consumption tracking and cost analysis
- **Device Locations**: GPS tracking and location history
- **Alerts**: Configurable notifications and alert management
- **Reports**: Generated reports and analytics data

### API Structure
- **RESTful endpoints** for all CRUD operations
- **Analytics endpoints** for dashboard statistics and usage data
- **Device management** endpoints with filtering and search
- **Alert system** with real-time notifications
- **Report generation** with customizable parameters

### UI Components
- **Dashboard**: Real-time statistics, usage charts, and device status overview
- **Device Management**: Device listing, filtering, and detailed views
- **Analytics**: Usage trends, performance metrics, and data visualization
- **Location Tracking**: Interactive maps and location history
- **Alert Management**: Configuration and active alert monitoring
- **User Management**: Organization user administration
- **Reports**: Custom report generation and scheduling

## Data Flow

1. **Authentication**: User login validates against PostgreSQL users table
2. **Device Data**: Real-time device status updates stored in devices table
3. **Usage Tracking**: Periodic data usage logging in deviceUsage table
4. **Location Updates**: GPS coordinates stored in deviceLocations table
5. **Alert Processing**: Configurable thresholds trigger alerts in alerts table
6. **Analytics**: Aggregated data queries for dashboard and reports
7. **Real-time Updates**: TanStack Query handles cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date formatting and manipulation
- **HTTP Client**: Fetch API with custom request wrapper

### Development Dependencies
- **TypeScript**: Type checking and compilation
- **ESBuild**: Backend bundling for production
- **Vite**: Frontend development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with live reload
- **Database**: Drizzle migrations with push command
- **Environment**: NODE_ENV=development with debug logging

### Production Build
- **Frontend**: Vite build outputting to dist/public
- **Backend**: ESBuild bundling to dist/index.js
- **Database**: Drizzle migrations applied via DATABASE_URL
- **Startup**: Node.js execution of bundled backend code

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Session configuration**: PostgreSQL-based session storage

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup