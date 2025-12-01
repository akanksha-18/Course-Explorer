# Course Explorer & Renderer

A modern, responsive course management and learning platform built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Course Explorer**: Browse and navigate through multiple courses with topics and subtopics
- **Markdown Rendering**: Rich content display with support for code blocks, tables, lists, and more
- **Search & Filter**: Quickly find courses and topics by title
- **Responsive Design**: Clean, mobile-friendly interface using Tailwind CSS
- **Admin Panel**: Read-only user management interface
- **Keyboard Navigation**: ARIA-friendly labels and semantic HTML

### Nice-to-Have Features (Implemented)
- **Progress Tracking**: 
  - Mark subtopics as completed
  - Visual progress bars at course and topic levels
  - Persistent state using localStorage
  
- **Markdown Extras**:
  - Syntax highlighting for code blocks
  - Tables, blockquotes, and callouts
  - GitHub Flavored Markdown support



## 📁 Project Structure

```
course-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   ├── AdminPanel.jsx
│   │   └── AddCourseModal.jsx
│   ├── data/
│   │   ├── courses.json
│   │   └── users.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **lucide-react** - Icon library

## 📦 Installation

1. **Clone or create the project**:
```bash
mkdir course-explorer
cd course-explorer
```

2. **Create all the files** as provided in the artifacts above

3. **Install dependencies**:
```bash
npm install
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Production Build
```bash
npm run build
```
Build files will be in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## 🎯 Usage Guide

### Navigating Courses
1. Select a course from the sidebar
2. Click on a topic to expand and view subtopics
3. Click on a subtopic to view its content
4. Use breadcrumbs to navigate back

### Tracking Progress
- Click the "Mark as Complete" button on any subtopic
- Progress bars show completion percentage
- Green checkmarks indicate completed subtopics

### Creating Courses
1. Click the "+" button in the sidebar
2. Fill in course title and description
3. Add topics and subtopics
4. Click "Add Course" to save

### Managing Data
- **Export**: Download your courses and progress as JSON
- **Import**: Upload a previously exported JSON file
- **Reset**: Restore default course data

### Admin Panel
- Click "Admin" in the header
- View read-only list of users
- See user roles and join dates

## 🔑 Key Design Choices

### 1. **localStorage for Persistence**
- Courses and progress are stored client-side
- No backend required
- Data persists between sessions

### 2. **URL-based Navigation**
- Deep linking support
- Shareable URLs to specific content
- Browser back/forward button support

### 3. **Component Architecture**
- Modular components for easy maintenance
- Props-based data flow
- Reusable UI elements

### 4. **Markdown Rendering**
- `react-markdown` for safe HTML rendering
- `remark-gfm` for extended syntax
- Custom component styling with Tailwind

### 5. **Responsive Design**
- Mobile-first approach
- Sidebar collapses on small screens
- Touch-friendly interactions

## 📝 Data Format

### Course Structure
```json
{
  "id": "unique-id",
  "title": "Course Title",
  "description": "Course description",
  "topics": [
    {
      "id": "topic-id",
      "title": "Topic Title",
      "subtopics": [
        {
          "id": "subtopic-id",
          "title": "Subtopic Title",
          "content": "Markdown content here..."
        }
      ]
    }
  ]
}
```

### User Structure
```json
{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com",
  "role": "Admin",
  "joinedDate": "2023-01-15"
}
```

## 🌐 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist/` folder to any static hosting service

## 🎨 Customization

### Tailwind Configuration
Modify `tailwind.config.js` to customize colors, spacing, and more.

### Adding Courses
Edit `src/data/courses.json` or use the in-app course creator.

### Styling Components
All components use Tailwind utility classes for easy customization.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## 🐛 Known Limitations

- No real-time collaboration
- No user authentication
- localStorage has size limits (typically 5-10MB)
- Data is device-specific (not synced across devices)
