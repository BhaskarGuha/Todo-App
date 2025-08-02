# Todo Tracker - Full Stack Application

A modern, full-stack todo application built with React frontend and Flask backend, featuring email notifications when todos are created.

## Features

- ✅ **User Authentication** - Google OAuth integration
- ✅ **Todo Management** - Create, read, update, delete todos
- ✅ **Category Organization** - Organize todos by categories
- ✅ **Email Notifications** - Receive emails when todos are created
- ✅ **Modern UI** - Beautiful, responsive design
- ✅ **Real-time Updates** - Instant UI updates with backend sync

## Tech Stack

### Frontend
- **React 18** with Vite
- **Zustand** for state management
- **CSS Modules** for styling
- **React Router** for navigation

### Backend
- **Flask** Python web framework
- **SQLAlchemy** ORM
- **Flask-Mail** for email functionality
- **JWT** for authentication
- **PostgreSQL** (production) / SQLite (development)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhaskarGuha/Todo-App.git
   cd Todo-App
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the Backend folder:
   ```
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_gmail_app_password
   JWT_SECRET_KEY=your_secret_key
   ```

5. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   python run.py
   
   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Deployment

This application is configured for deployment on Render with the following services:
- **Backend**: Python web service
- **Frontend**: Static site
- **Database**: PostgreSQL (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
