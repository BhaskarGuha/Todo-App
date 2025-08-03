import os

class Config:
    # General
    SECRET_KEY = os.getenv("SECRET_KEY", "404f51ecf5cb816dcbe83b894f83a6a294671ab568d6410d35a6612d6a34df18")
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_DATABASE_URI = DATABASE_URL or 'sqlite:///todo.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Mail
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-jwt-key-change-this-in-production")

    # CORS (for JWT to be sent via cookies or headers)
    CORS_SUPPORTS_CREDENTIALS = True
