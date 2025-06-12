from app import app, db
from datetime import datetime, timezone
from api.models import User, Profile, Review, Game, Match, Reject, Like
from werkzeug.security import generate_password_hash
import random

with app.app_context():
    try:
        # db.drop_all()
        # db.create_all()

        # Crear usuarios
        
        users = [
            User(email="juan.perez@example.com", password=generate_password_hash("password123")), 
            User(email="ana.gomez@example.com", password=generate_password_hash("password345")),
            User(email="carlos.ruiz@example.com", password=generate_password_hash("password678")),
            User(email="maria.lopez@example.com", password=generate_password_hash("password987")),
            User(email="luis.fernandez@example.com", password=generate_password_hash("password654")),
            User(email="laura.diaz@example.com", password=generate_password_hash("password321")),
            User(email="jorge.martinez@example.com", password=generate_password_hash("password000")),
        ]
        db.session.add_all(users)
        db.session.commit()

        # Crear perfiles
        profiles = [
            Profile(user_id=1, gender="Male", age=28, name="Juan Perez", discord="juan#1234", preferences="Action, Adventure", zodiac="Leo", location="Madrid", nick_name="juancito", bio="Gamer and developer", language="Spanish", steam_id="steam_juan123", photo="profile-pic-1.png"),
            Profile(user_id=2, gender="Female", age=34, name="Ana Gomez", discord="ana_g#5678", preferences="RPG, Strategy", zodiac="Cancer", location="Barcelona", nick_name="anag", bio="Loves strategy games", language="Spanish", steam_id="steam_ana567", photo="profile-pic-2.png"),
            Profile(user_id=3, gender="Male", age=22, name="Carlos Ruiz", discord="carlos#9999", preferences="FPS, Sports", zodiac="Aries", location="Valencia", nick_name="carlosR", bio="Competitive gamer", language="Spanish", steam_id="steam_carlos999", photo="profile-pic-5.png"),
            Profile(user_id=4, gender="Female", age=30, name="Maria Lopez", discord="maria#4567", preferences="Puzzle, Indie", zodiac="Virgo", location="Sevilla", nick_name="mariL", bio="Casual player", language="Spanish", steam_id="steam_maria456", photo="profile-pic-5.png"),
            Profile(user_id=5, gender="Male", age=26, name="Luis Fernandez", discord="luisf#2345", preferences="RPG, Open World", zodiac="Taurus", location="Bilbao", nick_name="luisF", bio="Explores every map", language="Spanish", steam_id="steam_luis234", photo="profile-pic-5.png"),
            Profile(user_id=6, gender="Female", age=29, name="Laura Diaz", discord="laura#9876", preferences="MMORPG, Strategy", zodiac="Pisces", location="Granada", nick_name="lauD", bio="Guild leader", language="Spanish", steam_id="steam_laura987", photo="profile-pic-7.png"),
            Profile(user_id=7, gender="Male", age=33, name="Jorge Martinez", discord="jorge#1122", preferences="FPS, Racing", zodiac="Sagittarius", location="Zaragoza", nick_name="jorgeM", bio="Competitive and fast", language="Spanish", steam_id="steam_jorge112", photo="profile-pic-8.png"),
        ]
        db.session.add_all(profiles)
        db.session.commit()

        user_ids = [u.id for u in users]
        profile_ids = [p.id for p in profiles]

        # Crear reviews (2 por usuario)
        reviews = []
        for user_id in user_ids:
            for _ in range(2):
                author_id = random.choice([uid for uid in user_ids if uid != user_id])
                reviews.append(Review(
                    user_id=user_id,
                    author_id=author_id,
                    stars=random.randint(3, 5),
                    comment=f"Review for user {user_id} by user {author_id}"
                ))
        db.session.add_all(reviews)
        db.session.commit()

        # Juegos (3 por perfil)
        game_titles = [
            "Call of Duty", "Halo", "Celeste", "Civilization VI", "Stardew Valley",
            "Divinity: Original Sin 2", "FIFA 21", "NBA 2K24", "Rocket League",
            "Unpacking", "Gris", "The Witcher 3", "Skyrim", "Zelda: BOTW",
            "World of Warcraft", "Age of Empires IV", "Final Fantasy XIV",
            "Forza Horizon 5", "Valorant", "Gran Turismo 7"
        ]
        games = []
        for profile_id in profile_ids:
            for _ in range(3):
                games.append(Game(
                    profile_id=profile_id,
                    game={
                        "title": random.choice(game_titles),
                        "hours_played": random.randint(10, 500)
                    }
                ))
        db.session.add_all(games)
        db.session.commit()

        # Matches
        match_set = set()
        matches = []
        while len(matches) < 20:
            u1, u2 = random.sample(user_ids, 2)
            pair = tuple(sorted((u1, u2)))
            if pair not in match_set:
                match_set.add(pair)
                matches.append(Match(user1_id=u1, user2_id=u2, created_at=datetime.now(tz=timezone.utc)))
        db.session.add_all(matches)
        db.session.commit()

        # Rejects
        reject_set = set()
        rejects = []
        while len(rejects) < 20:
            r1, r2 = random.sample(user_ids, 2)
            pair = (r1, r2)
            if pair not in reject_set:
                reject_set.add(pair)
                rejects.append(Reject(rejector_id=r1, rejected_id=r2, created_at=datetime.now(tz=timezone.utc)))
        db.session.add_all(rejects)
        db.session.commit()

        # Likes
        like_set = set()
        likes = []
        while len(likes) < 20:
            l1, l2 = random.sample(user_ids, 2)
            pair = (l1, l2)
            if pair not in like_set:
                like_set.add(pair)
                likes.append(Like(liker_id=l1, liked_id=l2))
        db.session.add_all(likes)
        db.session.commit()

        print("✅ Data seeded successfully")

    except Exception as e:
        print(f"❌ Seeder failed: {e}")
