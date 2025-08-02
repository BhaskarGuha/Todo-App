from flask import Blueprint, request, jsonify
import jwt
import requests
from flask_jwt_extended import create_access_token
from . import db
from .models import User
from config import Config

auth_bp = Blueprint('auth', __name__)

GOOGLE_CLIENT_ID = "559658752601-ppa831fjvsu21jiqag65al5ftlnutsg2.apps.googleusercontent.com"

@auth_bp.route('/login', methods=['POST'])
def login():
    token = request.json.get('credential')

    if not token:
        return jsonify({"error": "Missing token"}), 400

    try:
        # Verify ID token with Google
        google_response = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        if google_response.status_code != 200:
            return jsonify({"error": "Invalid token"}), 401

        data = google_response.json()

        # Verify issuer and audience
        if data.get("iss") not in ["https://accounts.google.com", "accounts.google.com"]:
            return jsonify({"error": "Invalid token issuer"}), 401

        if data.get("aud") != GOOGLE_CLIENT_ID:
            return jsonify({"error": "Invalid token audience"}), 401

        # Get user info from token
        email = data.get('email')
        name = data.get('name')
        picture = data.get('picture')

        if not email:
            return jsonify({"error": "Email not found in token"}), 400

        # Check or create user
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(email=email, name=name, picture=picture)
            db.session.add(user)
            db.session.commit()

        # ✅ Use Flask-JWT-Extended to generate JWT
        access_token = create_access_token(identity=email)

        return jsonify({"token": access_token})

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
