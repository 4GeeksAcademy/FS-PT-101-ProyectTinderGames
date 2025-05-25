"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Profile,Review
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

# POST USER
@api.route('/users', methods=['POST'])
def post_user():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data or 'age' not in data or 'name' not in data or 'discord' not in data:
        return jsonify({'error':'Missing data'}), 400
    new_user = User(
        email=data['email'],
        name=data['name'],
        password=data['password'],
        age=data['age'],
        discord=data['discord']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()),200

# PUT USER
@api.route('/users/<int:user_id>', methods=['PUT'])
def put_user(user_id):
    data=request.get_json()
    if not data or 'email' not in data or 'password' not in data or 'age' not in data or 'name' not in data or 'discord' not in data:
        return jsonify({'error':'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error':f'can not find user with id: {user_id}'})
    user.email= data.get('email',user.email)
    user.name=data.get('name', user.name)
    user.password=data.get('password',user.password)
    user.age=data.get('age',user.age)
    user.discord=data.get('discord',user.discord)
    db.session.commit()
    return jsonify(user.serialize()), 200

# GET ALL PROFILES
@api.route('/profiles', methods=['GET'])
def get_profiles():
    stmt = select(Profile)
    profiles = db.session.execute(stmt).scalars().all()
    return jsonify([profile.serialize() for profile in profiles]), 200


# GET SINGLE PROFILE
@api.route('/profiles/<int:user_id>', methods=['GET'])
def get_single_profile(user_id):
    stmt = select(Profile).where(Profile.user_id == user_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile of the user with id: {user_id} not found'}), 414
    return jsonify(profile.serialize()), 200

# DELETE PROFILE
@api.route('/profiles/<int:user_id>',methods=['DELETE'])
def delete_profile(user_id):
    stmt=select(Profile).where(Profile.user_id == user_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile of the user with id: {user_id} not found'}), 414
    db.session.delete(profile)
    db.session.commit()
    return jsonify({'message' : f'profile of user with id: {user_id} deleted'})

# POST PROFILE
@api.route('/profiles/<int:user_id>', methods=['POST'])
def post_profile(user_id):
    data = request.get_json()
    if not data or 'language' not in data or 'bio' not in data or 'nick_name' not in data or 'location' not in data or 'zodiac' not in data or not 'gender' in data or not 'preferences' in data:
        return jsonify({'error':'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'can not find user with id: {user_id}'}), 400
    if user.profile:
        return jsonify({'error':'this profile already exist, please try to modify it insted of create a new one'}), 400
    new_profile = Profile(
        gender=data['gender'],
        preferences=data['preferences'],
        zodiac=data['zodiac'],
        location=data['location'],
        nick_name=data['nick_name'],
        bio=data['bio'],
        language=data['language']
    )
    user.profile = new_profile
    db.session.commit()
    return jsonify(user.profile.serialize()),200


# PUT PROFILE
@api.route('/profiles/<int:user_id>', methods=['PUT'])
def put_profile(user_id):
    data = request.get_json()
    if not data or 'language' not in data or 'bio' not in data or 'nick_name' not in data or 'location' not in data or 'zodiac' not in data or not 'gender' in data or not 'preferences' in data:
        return jsonify({'error':'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'can not find user with id: {user_id}'}), 400
    if not user.profile:
        return jsonify({'error':'this profile do not  exist, please try to create it insted of modify one'}), 400
    
    user.profile.gender=data.get('gender',user.profile.gender)
    user.profile.preferences=data.get('preferences',user.profile.preferences)
    user.profile.zodiac=data.get('zodiac',user.profile.zodiac)
    user.profile.location=data.get('location',user.profile.location)
    user.profile.nick_name=data.get('nick_name',user.profile.nick_name)
    user.profile.bio=data.get('bio',user.profile.bio)
    user.profile.language=data.get('language',user.profile.language)

    db.session.commit()
    return jsonify(user.profile.serialize()),200

# GET ALL REWVIEWS
@api.route('/reviews', methods=['GET'])
def get_reviews():
    stmt = select(Review)
    reviews = db.session.execute(stmt).scalars().all()
    return jsonify([review.serialize() for review in reviews]), 200

# GET REVIEWS MADE
@api.route('/reviews_authored/<int:user_id>', methods=['GET'])
def get_reviews_authored(user_id):
    # 1. Buscamos al usuario; si no existe devolvemos 404
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if not user:
        return jsonify({'error':f'Usuario con id={user_id} no encontrado'}), 400

    # 2. Sacamos las reseñas que ha escrito
    reviews = user.reviews_authored

     # Serializamos cada review usando el método de instancia
    serialized = [rev.serialize() | {
        "stars": rev.stars,
        "comment": rev.comment
    } for rev in reviews]

    return jsonify({"reviews_authored": serialized}), 200


