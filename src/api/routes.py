"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# GET ALL USERS
@api.route('/users', methods=['GET'])
def get_users():
    stmt = select(User)
    users = db.session.execute(stmt).scalars().all()
    return jsonify([user.serialize() for user in users]), 200

# GET SINGLE USER
@api.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'user whit id: {user_id} not found'}), 414
    return jsonify(user.serialize()), 200

# DELETE USER
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'user whit id: {user_id} not found'}), 414
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message':f'user {user_id} deleted'}), 200

