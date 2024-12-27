QR Møllebakken Art Project
A digital art gallery platform for Møllebakken school, allowing teachers to upload student artwork and parents to view their children's creations through QR codes.

Features
Teacher dashboard for uploading student artwork
Support for images, videos (max 20s), and audio recordings (max 1min)
QR code-based parent access
Offline support
Responsive design
Tech Stack
React 18
TypeScript
Vite
Tailwind CSS
Supabase (Authentication, Database, Storage)
Lucide React Icons
Getting Started
Clone the repository:
git clone https://github.com/uset82/qr-mollebakken.git
cd qr-mollebakken
Install dependencies:
npm install
Create a .env file with your Supabase configuration:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Start the development server:
npm run dev
Project Structure
src/
  ├── components/        # Reusable UI components
  │   ├── artwork/      # Artwork-specific components
  │   └── ui/           # Generic UI components
  ├── lib/              # Core functionality
  │   ├── api/          # API integration layer
  │   ├── supabase/     # Supabase client and queries
  │   └── utils/        # Utility functions
  ├── pages/            # Application pages
  └── types/            # TypeScript type definitions
Storage Quotas
Each student has the following storage limits:

Images: Maximum 3 images
Videos: Maximum 1 video (20 seconds, 50MB limit)
Audio: Maximum 1 audio recording (1 minute, 10MB limit)
Supabase Setup
Database Tables
artworks
create table artworks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  file_path text not null,
  type text not null,
  student_id text not null,
  student_name text not null
);
students
create table students (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  folder_name text not null,
  grade text not null
);
Storage Buckets
Create an artworks bucket with the following structure:
artworks/
  ├── [student-id]/
  │   ├── images/
  │   ├── videos/
  │   └── audio/
Configure storage policies to allow public read access and authenticated write access.
Authentication
Email/Password authentication for teachers
Custom QR code authentication for parents
Row Level Security (RLS) policies for data protection
Development Commands
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run typecheck

# Run linting
npm run lint
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
MIT
