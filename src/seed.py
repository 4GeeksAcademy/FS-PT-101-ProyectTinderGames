from app import app, db
from datetime import datetime, timezone
# from werkzeug.security import generate_password_hash
from api.models import User, Profile, Review, Game, Match, Reject, Like
import random

with app.app_context():
    # db.drop_all()
    # db.create_all()

    # # hashear la contraseña
    # # def hash(pwd): return generate_password_hash(pwd) password=hash

    #Creación de users
    user1 = User(id=1, email="juan.perez@example.com", password="password123")
    user2 = User(id=2, email="ana.gomez@example.com", password="mypassword")
    user3 = User(id=3, email="carlos.ruiz@example.com", password="securepass")
    user4 = User(id=4, email="maria.lopez@example.com", password="pass456")
    user5 = User(id=5, email="luis.fernandez@example.com", password="pass789")
    user6 = User(id=6, email="laura.diaz@example.com", password="mypassword2")
    user7 = User(id=7, email="jorge.martinez@example.com", password="secretpass")
    db.session.add_all([user1, user2, user3, user4, user5, user6, user7])
    db.session.commit()

    # --- Crear 20 perfiles ---
    genders = ["Male", "Female", "Non-Binary"]
    zodiacs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
               "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
    locations = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Granada", "Zaragoza", "Malaga", "Oviedo", "Santander"]
    preferences = ["FPS", "RPG", "Strategy", "Puzzle", "MMORPG", "Racing", "Adventure", "Sports", "Indie"]

    profiles = []
    for i in range(1, 21):
        profile = Profile(
            user_id=i,
            gender=random.choice(genders),
            age=random.randint(18, 40),
            name=f"User {i}",
            discord=f"user{i}#1234",
            preferences=", ".join(random.sample(preferences, 2)),
            zodiac=random.choice(zodiacs),
            location=random.choice(locations),
            nick_name=f"user{i}_nick",
            bio=f"This is the bio of user {i}",
            language="Spanish",
            steam_id=f"steam_user{i}"
        )
        profiles.append(profile)
    db.session.add_all(profiles)
    db.session.commit()

    # --- Crear 20 reviews ---
    reviews = []
    for i in range(1, 21):
        for j in range(2):  # 2 reviews por usuario
            author_id = random.choice([u.id for u in users if u.id != i])
            stars = random.randint(3, 5)
            reviews.append(Review(
                user_id=i,
                author_id=author_id,
                stars=stars,
                comment=f"Comment {j+1} for user {i} by user {author_id}"
            ))
    db.session.add_all(reviews)
    db.session.commit()

    # --- Crear 60 juegos distribuidos (3 por perfil) ---
    game_titles = [
        "Call of Duty", "Halo", "Celeste", "Civilization VI", "Stardew Valley",
        "Divinity: Original Sin 2", "FIFA 21", "NBA 2K24", "Rocket League",
        "Unpacking", "Gris", "The Witcher 3", "Skyrim", "Zelda: BOTW",
        "World of Warcraft", "Age of Empires IV", "Final Fantasy XIV",
        "Forza Horizon 5", "Valorant", "Gran Turismo 7"
    ]
    games = []
    for i in range(1, 21):
        for _ in range(3):
            game = Game(
                profile_id=i,
                game={
                    "title": random.choice(game_titles),
                    "hours_played": random.randint(10, 500)
                }
            )
            games.append(game)
    db.session.add_all(games)
    db.session.commit()

    # --- Crear 20 matches únicos ---
    match_set = set()
    matches = []
    while len(matches) < 20:
        u1, u2 = random.sample(range(1, 21), 2)
        pair = tuple(sorted((u1, u2)))
        if pair not in match_set:
            match_set.add(pair)
            matches.append(Match(user1_id=u1, user2_id=u2, created_at=datetime.now(tz=timezone.utc)))
    db.session.add_all(matches)
    db.session.commit()

    # --- Crear 20 rejects únicos ---
    reject_set = set()
    rejects = []
    while len(rejects) < 20:
        rejector_id, rejected_id = random.sample(range(1, 21), 2)
        pair = (rejector_id, rejected_id)
        if pair not in reject_set:
            reject_set.add(pair)
            rejects.append(Reject(rejector_id=rejector_id, rejected_id=rejected_id, created_at=datetime.now(tz=timezone.utc)))
    db.session.add_all(rejects)
    db.session.commit()

    # --- Crear 20 likes únicos ---
    like_set = set()
    likes = []
    while len(likes) < 20:
        liker_id, liked_id = random.sample(range(1, 21), 2)
        pair = (liker_id, liked_id)
        if pair not in like_set:
            like_set.add(pair)
            likes.append(Like(liker_id=liker_id, liked_id=liked_id))
    db.session.add_all(likes)
    db.session.commit()

    
    print("✅ Data seeded successfully")
