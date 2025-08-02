from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from . import db, mail
from .models import Todo

todo_bp = Blueprint('todo', __name__)

@todo_bp.route('/todos', methods=['POST'])
@jwt_required()
def create_todo():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description', '')
    category_id = data.get('categoryId', '')

    todo = Todo(title=title, description=description, category_id=category_id)
    db.session.add(todo)
    db.session.commit()

    # Get the current user's email from JWT
    user_email = get_jwt_identity()

    # Send confirmation email
    msg = Message(
        subject='Todo Created!',
        sender=current_app.config['MAIL_USERNAME'],
        recipients=[user_email],
        body=f'Your todo "{title}" was created successfully!\n\nDescription: {description}\nCategory ID: {category_id}'
    )
    mail.send(msg)

    return jsonify({'message': 'Todo created and email sent'})
