from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from flask_jwt_extended import JWTManager  # ✅ Added

from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()
mail = Mail()
jwt = JWTManager()  # ✅ Added

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)  # ✅ Added
    CORS(app)

    from .routes import todo_bp
    from .auth import auth_bp

    app.register_blueprint(todo_bp)
    app.register_blueprint(auth_bp)

    return app
