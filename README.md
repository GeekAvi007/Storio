
# 📁 Storio – Next-Gen Cloud File Management System

**Storio** is a modern, full-stack, privacy-focused cloud file storage and management platform built for individuals and teams. With intuitive design, blazing-fast performance, and robust features, Storio offers an experience similar to Google Drive — but with a developer-first, modular architecture powered by Next.js, TypeScript, and Drizzle ORM.

---

## 🚀 Features

### 🗂 File & Folder Operations
- Upload, delete, restore, and permanently remove files
- Folder-based organization and creation
- File starring for marking important content
- One-click trash emptying with confirmation modal

### 🎨 Clean, Responsive UI
- Dashboard overview with file tabs
- Beautiful design system powered by [Hero UI](https://github.com/heroui/theme) and [Magic UI] (https://magicui.design/)
- Light/Dark mode toggle
- Empty and loading states for better UX
- Resizable, intuitive navigation sidebar

### 🔒 Authentication & Access Control
- Secure login and signup using NextAuth/Auth.js
- Email and password-based auth (extensible for OAuth)
- Role-based protection with middleware routing

### ☁️ Optimized Uploads & Storage
- Integrated with **ImageKit** for fast, secure media uploads
- Backend API routes for file control: upload, trash, star, delete
- Real-time updates (coming soon)

### 💻 Developer-Friendly Architecture
- Full TypeScript support (typesafe from DB to UI)
- Modular file-based API using App Router
- TailwindCSS for rapid UI development
- Drizzle ORM for strongly typed SQL schema and migrations

---

## ⚡ X-Factor Highlights

1. **HeroUI Integration**  
   Designed with a scalable and themeable component system via `@heroui/theme`, giving Storio a modern and consistent design.

2. **ImageKit Auth API**  
   Seamless upload experience for developers and users with real-time key signing.

3. **Drizzle + PostgreSQL**  
   Type-safe migrations, schema definitions, and data querying using modern SQL-first ORM.

4. **Modular App Router Structure**  
   Next.js 14 App Router enables better file organization and edge-ready APIs.

5. **Production-Ready Folder Navigation**  
   An extensible sidebar with nested folders, ideal for enterprise use cases.

---

## 🧰 Tech Stack

| Tool/Library        | Purpose                                  |
|---------------------|------------------------------------------|
| **Next.js 14**      | React framework with App Router support  |
| **TypeScript**      | End-to-end type safety                   |
| **Tailwind CSS**    | Utility-first CSS                        |
| **Hero UI**         | Modular UI component system              |
| **Drizzle ORM**     | SQL schema and migration management      |
| **ImageKit**        | File/media upload and optimization       |
| **PostgreSQL**      | Primary database                         |
| **Vercel**          | Hosting & edge deployment                |

---



