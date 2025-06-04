"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import openai
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Profile, Review, Match, Reject, Game, Like
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# Carga variables de entorno desde .env
load_dotenv()

# Obtén la clave de OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_API_KEY is None:
    raise RuntimeError("La variable OPENAI_API_KEY no está definida en .env")

openai.api_key = OPENAI_API_KEY

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/chat", methods=["POST"])
def chat():
    """
    Recibe JSON: { "message": "texto del usuario" }
    Llama a OpenAI y devuelve el texto generado.
    """
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "Falta el campo 'message'"}), 400

    user_message = data["message"]

    try:
        # Versión nueva de la librería (>=1.0.0):
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "eres un asistente virtual"
                },
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=512,
            n=1,
        )

        # Extraer el texto de la primera respuesta
        reply_text = response.choices[0].message.content.strip()
        return jsonify({"reply": reply_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# REGISTER
@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            raise Exception('missing data')
        stmt = select(User).where(User.email == data['email'])
        existing_user = db.session.execute(stmt).scalar_one_or_none()
        if existing_user:
            return jsonify({'error': 'email taken'}), 418

        # hash
        hashed_password = generate_password_hash(data['password'])

        new_user = User(
            email=data['email'],
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'success': 'true', 'token': token}), 200
    except Exception as e:
        print(e)
        return jsonify({'Error': 'algo paso'}), 400

# LOGIN
@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            raise Exception('missing data')
        stmt = select(User).where(User.email == data['email'])
        user = db.session.execute(stmt).scalar_one_or_none()

        if not user:
            return jsonify({'error': 'el email no esta registrado, registrate'}), 418

        if not check_password_hash(user.password, data['password']):
            return jsonify({'error': 'email/contraseña no válido'}), 418

        token = create_access_token(identity=str(user.id))
        return jsonify({'success': 'true', 'token': token}), 200
    except Exception as e:
        print(e)
        return jsonify({'Error': 'algo paso'}), 400


# PRIVATE ENDPOINT
@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_info():
    id = get_jwt_identity()
    stmt = select(User).where(User.id == id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': 'user not finded'})
    return jsonify({'success': 'true', 'user': user.serialize()})

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
    return jsonify({'message': f'user {user_id} deleted'}), 200

# POST USER
@api.route('/users', methods=['POST'])
def post_user():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing data'}), 400
    new_user = User(
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200

# PUT USER
@api.route('/users/<int:user_id>', methods=['PUT'])
def put_user(user_id):
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'can not find user with id: {user_id}'})
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    db.session.commit()
    return jsonify(user.serialize()), 200

# GET ALL PROFILES
@api.route('/profiles', methods=['GET'])
def get_profiles():
    stmt = select(Profile)
    profiles = db.session.execute(stmt).scalars().all()
    return jsonify([profile.serialize() for profile in profiles]), 200


# GET SINGLE PROFILE BY USER ID
@api.route('/profiles/user/<int:user_id>', methods=['GET'])
def get_single_profile_by_user(user_id):
    stmt = select(Profile).where(Profile.user_id == user_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile of the user with id: {user_id} not found'}), 414
    return jsonify(profile.serialize()), 200

# GET SINGLE PROFILE BY PROFILE ID
@api.route('/profiles/<int:profile_id>', methods=['GET'])
def get_single_profile(profile_id):
    stmt = select(Profile).where(Profile.id == profile_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile with id: {profile_id} not found'}), 414
    return jsonify(profile.serialize()), 200

# DELETE PROFILE BY USER ID
@api.route('/profiles/user/<int:user_id>', methods=['DELETE'])
def delete_profile_by_user_id(user_id):
    stmt = select(Profile).where(Profile.user_id == user_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile of the user with id: {user_id} not found'}), 414
    db.session.delete(profile)
    db.session.commit()
    return jsonify({'message': f'profile of user with id: {user_id} deleted'})

# DELETE PROFILE BY PROFILE ID
@api.route('/profiles/<int:profile_id>', methods=['DELETE'])
def delete_profile(profile_id):
    stmt = select(Profile).where(Profile.id == profile_id)
    profile = db.session.execute(stmt).scalar_one_or_none()
    if profile is None:
        return jsonify({'error': f'the profile with id: {profile_id} not found'}), 414
    db.session.delete(profile)
    db.session.commit()
    return jsonify({'message': f'profile with id: {profile_id} deleted'})

# POST PROFILE
@api.route('/profiles/<int:user_id>', methods=['POST'])
def post_profile(user_id):
    data = request.get_json()
    if not data or 'language' not in data or 'bio' not in data or 'nick_name' not in data or 'location' not in data or 'zodiac' not in data or not 'gender' in data or not 'preferences' in data or not 'discord' in data or not 'age' in data or not 'name' in data or not 'steam_id' in data:
        return jsonify({'error': 'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'can not find user with id: {user_id}'}), 400
    if user.profile:
        return jsonify({'error': 'this profile already exist, please try to modify it insted of create a new one'}), 400
    new_profile = Profile(
        gender=data['gender'],
        age=data['age'],
        discord=data['discord'],
        name=data['name'],
        preferences=data['preferences'],
        zodiac=data['zodiac'],
        location=data['location'],
        nick_name=data['nick_name'],
        bio=data['bio'],
        language=data['language'],
        steam_id=data['steam_id']
    )
    user.profile = new_profile
    db.session.commit()
    return jsonify(user.profile.serialize()), 200


# PUT PROFILE
@api.route('/profiles/<int:user_id>', methods=['PUT'])
def put_profile(user_id):
    data = request.get_json()
    if not data or 'language' not in data or 'bio' not in data or 'nick_name' not in data or 'location' not in data or 'zodiac' not in data or not 'gender' in data or not 'preferences' in data or not 'discord' in data or not 'age' in data or not 'name' in data or not 'steam_id' in data:
        return jsonify({'error': 'Missing data'}), 400
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({'error': f'can not find user with id: {user_id}'}), 400
    if not user.profile:
        return jsonify({'error': 'this profile do not  exist, please try to create it insted of modify one'}), 400

    user.profile.gender = data.get('gender', user.profile.gender)
    user.profile.preferences = data.get(
        'preferences', user.profile.preferences)
    user.profile.zodiac = data.get('zodiac', user.profile.zodiac)
    user.profile.discord = data.get('discord', user.profile.discord)
    user.profile.age = data.get('age', user.profile.age)
    user.profile.name = data.get('name', user.profile.name)
    user.profile.location = data.get('location', user.profile.location)
    user.profile.nick_name = data.get('nick_name', user.profile.nick_name)
    user.profile.bio = data.get('bio', user.profile.bio)
    user.profile.language = data.get('language', user.profile.language)
    user.profile.steam_id = data.get('steam_id', user.profile.steam_id)

    db.session.commit()
    return jsonify(user.profile.serialize()), 200

# GET ALL REWVIEWS
@api.route('/reviews', methods=['GET'])
def get_All_Reviews():
    stmt = select(Review)
    reviews = db.session.execute(stmt).scalars().all()
    return jsonify([review.serialize() for review in reviews]), 200


# GET SINGLE REVIEW
@api.route('/reviews/<int:review_id>', methods=['GET'])
def get_reviews(review_id):
    stmt = select(Review).where(Review.id == review_id)
    review = db.session.execute(stmt).scalar_one_or_none()
    if review is None:
        return jsonify({'error': f'review with id: {review_id} does not exist'})
    return jsonify(review.serialize()), 200


# GET REVIEWS AUTHORED
@api.route('/reviews_authored/<int:user_id>', methods=['GET'])
def get_reviews_authored(user_id):
    # 1. Buscamos al usuario; si no existe devolvemos 404
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': f'Usuario con id={user_id} no encontrado'}), 400

    # 2. Sacamos las reseñas que ha escrito
    reviews = user.reviews_authored

    # Serializamos cada review usando el método de instancia
    serialized = [rev.serialize() | {
        "stars": rev.stars,
        "comment": rev.comment
    } for rev in reviews]

    return jsonify({"reviews_authored": serialized}), 200


# GET USER REVIEWS
@api.route('/reviews_received/<int:user_id>', methods=['GET'])
def get_user_reviews(user_id):
    # 1. Buscamos al usuario; si no existe devolvemos 404
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': f'Usuario con id={user_id} no encontrado'}), 404

    # 2. Sacamos las reseñas que ha escrito
    reviews = user.reviews_received

    # Serializamos cada review usando el método de instancia
    serialized = [rev.serialize() | {
        "stars": rev.stars,
        "comment": rev.comment
    } for rev in reviews]

    return jsonify({"reviews_received": serialized}), 200


# DELETE REVIEW
@api.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({'error': 'that review does not exist'}), 400

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'review deleted'}), 200


# POST REVIEW
@api.route('/reviews/<int:author_id>/<int:receiver_id>', methods=['POST'])
def post_review(author_id, receiver_id):
    if author_id == receiver_id:
        return jsonify({'error': 'No puedes comentar sobre ti mismo'}), 400

    user_author = User.query.get(author_id)
    user_receiver = User.query.get(receiver_id)
    if user_author is None or user_receiver is None:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = request.get_json() or {}
    if 'stars' not in data or 'comment' not in data:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    stars = int(data['stars'])
    if not 1 <= stars <= 5:
        return jsonify({'error': '“stars” debe estar entre 1 y 5'}), 400

    comment = data['comment'].strip()
    if not comment:
        return jsonify({'error': 'El comentario no puede estar vacío'}), 400

    # 5) Crear y persistir la reseña
    new_review = Review(
        user_id=receiver_id,
        author_id=author_id,
        stars=stars,
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.serialize()), 201


# PUT REVIEW
@api.route('/reviews/<int:review_id>', methods=['PUT'])
def put_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({'error': 'that review does not exist'}), 400
    data = request.get_json()

    if 'stars' not in data or 'comment' not in data:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    review.stars = data.get('stars', review.stars)
    review.comment = data.get('comment', review.comment)
    db.session.commit()
    return jsonify({'message': 'review updated'}), 200


# GET ALL MATCHES
@api.route('/matches', methods=['GET'])
def get_all_matches():
    stmt = select(Match)
    matches = db.session.execute(stmt).scalars().all()
    return jsonify([match.serialize() for match in matches]), 200


# GET MATCH BY MATCH ID
@api.route('/matches/<int:match_id>', methods=['GET'])
def get_single_match(match_id):
    stmt = select(Match).where(Match.id == match_id)
    match = db.session.execute(stmt).scalar_one_or_none()
    if not match:
        return jsonify({'error': f'Match with id {match_id} not found'}), 404
    return jsonify(match.serialize()), 200


# GET ALL MATCHES OF A USER.
@api.route('/matches/user/<int:user_id>', methods=['GET'])
def get_matches_for_user(user_id):
    # 1) Buscar todos los Match donde user1_id == user_id o user2_id == user_id
    stmt = select(Match).where(Match.user1_id == user_id or Match.user2_id == user_id)
    matches = db.session.execute(stmt).scalars().all()

    # 2) Para cada match, extraer el ID “del otro usuario”
    other_user_ids = []
    for m in matches:
        if m.user1_id == user_id:
            other_user_ids.append(m.user2_id)
        else:
            other_user_ids.append(m.user1_id)

    # 3) Eliminar duplicados (opcional) y devolver JSON
    unique_ids = list(set(other_user_ids))
    return jsonify({ "match_ids": unique_ids }), 200



# POST A MATCH
@api.route('/matches/<int:user1_id>/<int:user2_id>', methods=['POST'])
def post_match(user1_id, user2_id):
    if user1_id == user2_id:
        return jsonify({'error': 'Cannot match yourself'}), 400
    user1 = User.query.get(user1_id)
    user2 = User.query.get(user2_id)
    if not user1 or not user2:
        return jsonify({'error': 'User not found'}), 404
    # prevent duplicates regardless of order
    existing = (db.session.query(Match)
                .filter(((Match.user1_id == user1_id) & (Match.user2_id == user2_id)) |
                ((Match.user1_id == user2_id) & (Match.user2_id == user1_id))).first())
    if existing:
        return jsonify({'error': 'Match already exists'}), 409
    new_match = Match(user1_id=user1_id, user2_id=user2_id)
    db.session.add(new_match)
    db.session.commit()
    return jsonify(new_match.serialize()), 201


# DELETE A MATCH
@api.route('/matches/<int:match_id>', methods=['DELETE'])
def delete_match(match_id):
    stmt = select(Match).where(Match.id == match_id)
    match = db.session.execute(stmt).scalar_one_or_none()
    if not match:
        return jsonify({'error': f'Match with id {match_id} not found'}), 404
    db.session.delete(match)
    db.session.commit()
    return jsonify({'message': f'Match {match_id} deleted'}), 200


# GET ALL REJECT
@api.route('/rejects', methods=['GET'])
def get_all_rejects():
    stmt = select(Reject)
    rejects = db.session.execute(stmt).scalars().all()
    return jsonify([reject.serialize() for reject in rejects]), 200



# GET REJECT BY ID
@api.route('/rejects/<reject_id>', methods=['GET'])
def get_single_reject(reject_id):
    stmt = select(Reject).where(Reject.id == reject_id)
    match = db.session.execute(stmt).scalar_one_or_none()
    if match is None:
        return jsonify({'error': f'match with id: {reject_id} not found'}), 400

    return jsonify(match.serialize())

# GET REJECTS SENT
@api.route('/rejects_sent/<user_id>', methods=['GET'])
def get_rejects_sent(user_id):
    # 1. Buscamos al usuario; si no existe devolvemos 404
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': f'Usuario con id={user_id} no encontrado'}), 400

    # 2. Sacamos las reseñas que ha escrito
    rejects = user.rejects_given

    # Serializamos cada review usando el método de instancia
    serialized = [reject.serialize() for reject in rejects]

    return jsonify({"rejects_authored": serialized}), 200

# GET REJECTS RECEIVED
@api.route('/rejects_received/<user_id>', methods=['GET'])
def get_rejects_received(user_id):
    # 1. Buscamos al usuario; si no existe devolvemos 404
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': f'Usuario con id={user_id} no encontrado'}), 400

    # 2. Sacamos las reseñas que ha escrito
    rejects = user.rejects_received

    # Serializamos cada review usando el método de instancia
    serialized = [reject.serialize() for reject in rejects]

    return jsonify({"rejects_recieved": serialized}), 200

# DELETE REJECT
@api.route('/rejects/<reject_id>', methods=['DELETE'])
def delete_reject(reject_id):
    stmt = select(Reject).where(Reject.id == reject_id)
    reject = db.session.execute(stmt).scalar_one_or_none()
    if reject is None:
        return jsonify({'error': f'reject with id: {reject_id} not found'})

    db.session.delete(reject)
    db.session.commit()
    return jsonify({'message': f'reject with id: {reject_id} deleted'})


# POST REJECT
@api.route('/rejects/<int:rejector_id>/<int:rejected_id>', methods=['POST'])
def post_reject(rejector_id, rejected_id):
    rejector = db.session.get(User, rejector_id)
    if rejector is None:
        return jsonify({'error': f'User (rejector) with id={rejector_id} not found'}), 404

    rejected = db.session.get(User, rejected_id)
    if rejected is None:
        return jsonify({'error': f'User (rejected) with id={rejected_id} not found'}), 404

    if rejector_id == rejected_id:
        return jsonify({'error': 'Cannot match with yourself'}), 400

    existing = (db.session.query(Reject).filter_by(
        rejector_id=rejector_id, rejected_id=rejected_id).first())
    if existing:
        return jsonify({'error': 'Reject already exists'}), 409

    # 4. Crear y persistir el nuevo reject
    new_reject = Reject(rejector_id=rejector_id, rejected_id=rejected_id)
    db.session.add(new_reject)
    db.session.commit()

    # 5. Responder con 201 Created y los datos del match
    return jsonify(new_reject.serialize()), 201


# GET ALL GAMES
@api.route('/games', methods=['GET'])
def get_all_games():
    stmt = select(Game)
    games = db.session.execute(stmt).scalars().all()
    return jsonify([game.serialize() for game in games]), 200

# GET SINGLE GAMES
@api.route('/games/<int:game_id>', methods=['GET'])
def get_single_game(game_id):
    stmt = select(Game).where(Game.id == game_id)
    games = db.session.execute(stmt).scalar_one_or_none()
    if games is None:
        return jsonify({'error': 'this game does not exist'})
    return jsonify(games.serialize()), 200


# GET GAMES BY PROFILE ID
@api.route('/games_by_profile/<int:profile_id>', methods=['GET'])
def get_games_by_profile_id(profile_id):
    # 1. Ejecutar la consulta
    stmt = select(Game).where(Game.profile_id == profile_id)
    games = db.session.execute(stmt).scalars().all()

    # 2. Si no hay resultados, podemos devolver 404 o una lista vacía.
    if not games:
        return jsonify({'error': 'No se han encontrado juegos para este perfil'}), 404

    # 3. Serializar y devolver la lista
    serialized = [game.serialize() for game in games]
    return jsonify(serialized), 200


# POST GAMES
@api.route('/games/<profile_id>', methods=['POST'])
def post_game(profile_id):
    # 1) Asegurarnos de que el Content-Type sea application/json
    if not request.is_json:
        return jsonify({'error': 'Se requiere Content-Type: application/json'}), 400

    data = request.get_json()

    # 2) Validar que venga la clave "game"
    if 'game' not in data:
        return jsonify({'error': 'Falta el campo "game" en el JSON'}), 400

    # 3) Validar que game sea un objeto JSON (dict)
    if not isinstance(data['game'], dict):
        return jsonify({'error': 'El campo "game" debe ser un objeto JSON'}), 400

    # 4) Crear y persistir la nueva partida
    new_game = Game(
        profile_id=profile_id,
        # Asumiendo que el tipo de columna es JSON/Text en tu modelo
        game=data['game']
    )
    db.session.add(new_game)
    db.session.commit()

    return jsonify({'message': f'Game añadido al perfil {profile_id}', 'game_id': new_game.id,  # si tu modelo los tiene
                    'game':       new_game.game
                    }), 201


# DELETE GAME
@api.route('/games/<game_id>', methods=['DELETE'])
def delete_game(game_id):
    stmt = select(Game).where(Game.id == game_id)
    game = db.session.execute(stmt).scalar_one_or_none()
    if game is None:
        return jsonify({'error': f'game with id: {game_id} not found'}), 400

    db.session.delete(game)
    db.session.commit()
    return jsonify({'message': f'game with id: {game_id} deleted'}), 200


# GET ALL LIKES
@api.route('/likes', methods=['GET'])
def get_all_likes():
    stmt = select(Like)
    likes = db.session.execute(stmt).scalars().all()
    return jsonify([like.serialize() for like in likes]), 200


# GET BY LIKE ID
@api.route('/likes/<int:like_id>', methods=['GET'])
def get_single_like(like_id):
    stmt = select(Like).where(Like.id == like_id)
    like = db.session.execute(stmt).scalar_one_or_none()
    if not like:
        return jsonify({'error': f'Like with id {like_id} not found'}), 404
    return jsonify(like.serialize()), 200

# POST LIKE (ESTÁ LA LÓGICA PARA QUE SE CREE EL MATCH SI ES NECESARIO)
@api.route('/likes/<int:liker_id>/<int:liked_id>', methods=['POST'])
def post_like(liker_id, liked_id):
    # No se permite que un usuario se de like a sí mismo
    if liker_id == liked_id:
        return jsonify({'error': 'Cannot like yourself'}), 400

    # Obtener usuarios de la base de datos
    liker = User.query.get(liker_id)
    liked = User.query.get(liked_id)
    if not liker or not liked:
        return jsonify({'error': 'User not found'}), 404

    # Evitar likes duplicados
    existing_like = (db.session.query(Like)
                     .filter_by(liker_id=liker_id, liked_id=liked_id)
                     .first())
    if existing_like:
        return jsonify({'error': 'Like already exists'}), 409

    # Verificar like inverso para crear match
    reverse_like = (db.session.query(Like)
                    .filter_by(liker_id=liked_id, liked_id=liker_id)
                    .first())

    # Crear el nuevo like
    new_like = Like(liker_id=liker_id, liked_id=liked_id)
    db.session.add(new_like)

    # Si existe el like inverso y no existe aún el match, crear match
    if reverse_like:
        existing_match = (db.session.query(Match)
                          .filter(
                              ((Match.user1_id == liker_id) & (Match.user2_id == liked_id)) |
                              ((Match.user1_id == liked_id) &
                               (Match.user2_id == liker_id))
        )
            .first())
        if not existing_match:
            new_match = Match(user1_id=liker_id, user2_id=liked_id)
            db.session.add(new_match)

    # Confirmar cambios en la base
    db.session.commit()
    return jsonify(new_like.serialize()), 201


# DELETE LIKE (ESTÁ LA LÓGICA PARA QUE SE BORRE EL MATCH SI ES NECESARIO)
@api.route('/likes/<int:like_id>', methods=['DELETE'])
def delete_like(like_id):
    # Buscar el like
    like = db.session.query(Like).get(like_id)
    if not like:
        return jsonify({'error': f'Like with id {like_id} not found'}), 404

    # Comprobar si este like formó parte de un match
    match = (db.session.query(Match)
             .filter(
                 ((Match.user1_id == like.liker_id) & (Match.user2_id == like.liked_id)) |
                 ((Match.user1_id == like.liked_id) &
                  (Match.user2_id == like.liker_id))
    )
        .first())

    # Si hay match, borrarlo
    if match:
        db.session.delete(match)

    # Borrar el like
    db.session.delete(like)
    db.session.commit()

    return jsonify({'message': f'Like {like_id} deleted, match removed' if match else f'Like {like_id} deleted'}), 200
