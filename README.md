# Anti Blog App

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License" />
</div>

<br />

**Anti Blog App** is a modern, full-stack blogging platform engineered for a seamless writing and reading experience. Built with performance and scalability in mind, it leverages a robust **MERN stack** (MongoDB, Express, React, Node.js) and integrates advanced rich-text editing capabilities.

This project demonstrates proficiency in building secure, responsive, and interactive web applications with a focus on clean architecture and user-centric design.

---

## 🚀 Key Features

*   **📝 Rich Text Editor**: Integrated **TipTap** editor for a Notion-like writing experience, supporting images, links, and advanced formatting.
*   **🔐 Secure Authentication**: Robust JWT-based authentication system with secure password hashing (bcryptjs) and protected routes.
*   **⚡ High Performance**: Powered by **Vite** for lightning-fast frontend tooling and optimized builds.
*   **🎨 Modern UI/UX**: Responsive design using **Tailwind CSS v4** and **Framer Motion** for smooth animations and transitions.
*   **☁️ Cloud Integration**: Seamless image uploads and media management via **Cloudinary**.
*   **🛡️ Security First**: Implemented input sanitization (sanitize-html) to prevent XSS attacks and secure HTTP headers.
*   **📂 File Management**: Efficient file handling with **Multer**.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS v4, PostCSS
*   **State Management & API**: Context API, Axios
*   **Routing**: React Router DOM v7
*   **Rich Text Editor**: TipTap (Starter Kit, Image, Link, Placeholder, etc.)
*   **Animation**: Framer Motion
*   **Utilities**: Date-fns, React Icons, React Dropzone

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js 5
*   **Database**: MongoDB (Mongoose 9)
*   **Authentication**: JSON Web Token (JWT), BcryptJS
*   **Media Storage**: Cloudinary
*   **Security**: HTML Sanitization, CORS
*   **Utils**: Dotenv, Slugify, Multer

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn
*   MongoDB Instance (Local or Atlas)
*   Cloudinary Account

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd anti-blog-app
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` root with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=securepassword
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

    Start the backend server:
    ```bash
    npm start
    # or for development
    npm run server
    ```

3.  **Frontend Setup**
    Navigate to the frontend directory:
    ```bash
    cd ../frontend
    npm install
    ```

    Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the Application**
    Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

---

## 📂 Project Structure

```bash
anti-blog-app/
├── backend/                # Express.js Server
│   ├── catchers/           # Error handling logic
│   ├── models/             # Mongoose Models (Schema)
│   ├── routes/             # API Endpoints
│   ├── middleware/         # Auth & Upload Middleware
│   ├── config.js           # Configuration setup
│   └── server.js           # Entry point
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Page Views
│   │   ├── services/       # API Calls (Axios)
│   │   ├── context/        # Global State
│   │   └── api/            # API Configuration
│   └── public/             # Static Assets
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
