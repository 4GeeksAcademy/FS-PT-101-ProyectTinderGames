from app import app, db
from datetime import datetime, timezone
# from werkzeug.security import generate_password_hash
from api.models import User, Profile, Review, Game, Match, Reject, Like
import random

with app.app_context():
    db.drop_all()
    db.create_all()

    # # hashear la contraseña
    # # def hash(pwd): return generate_password_hash(pwd) password=hash

    # #Creación de users
    # user1 = User(id=1, email="juan.perez@example.com", password="password123")
    # user2 = User(id=2, email="ana.gomez@example.com", password="mypassword")
    # user3 = User(id=3, email="carlos.ruiz@example.com", password="securepass")
    # user4 = User(id=4, email="maria.lopez@example.com", password="pass456")
    # user5 = User(id=5, email="luis.fernandez@example.com", password="pass789")
    # user6 = User(id=6, email="laura.diaz@example.com", password="mypassword2")
    # user7 = User(id=7, email="jorge.martinez@example.com", password="secretpass")
    # db.session.add_all([user1, user2, user3, user4, user5, user6, user7])
    # db.session.commit()

    # #Creación de los profiles de cada user
    # profile1 = Profile(user_id=1, gender="Male", age=28, name="Juan Perez", discord="juan#1234", preferences="Action, Adventure", zodiac="Leo", location="Madrid", nick_name="juancito", bio="Gamer and developer", language="Spanish", steam_id="steam_juan123")
    # profile2 = Profile(user_id=2, gender="Female", age=34, name="Ana Gomez", discord="ana_g#5678", preferences="RPG, Strategy", zodiac="Cancer", location="Barcelona", nick_name="anag", bio="Loves strategy games", language="Spanish", steam_id="steam_ana567")
    # profile3 = Profile(user_id=3, gender="Male", age=22, name="Carlos Ruiz", discord="carlos#9999", preferences="FPS, Sports", zodiac="Aries", location="Valencia", nick_name="carlosR", bio="Competitive gamer", language="Spanish", steam_id="steam_carlos999")
    # profile4 = Profile(user_id=4, gender="Female", age=30, name="Maria Lopez", discord="maria#4567", preferences="Puzzle, Indie", zodiac="Virgo", location="Sevilla", nick_name="mariL", bio="Casual player", language="Spanish", steam_id="steam_maria456")
    # profile5 = Profile(user_id=5, gender="Male", age=26, name="Luis Fernandez", discord="luisf#2345", preferences="RPG, Open World", zodiac="Taurus", location="Bilbao", nick_name="luisF", bio="Explores every map", language="Spanish", steam_id="steam_luis234")
    # profile6 = Profile(user_id=6, gender="Female", age=29, name="Laura Diaz", discord="laura#9876", preferences="MMORPG, Strategy", zodiac="Pisces", location="Granada", nick_name="lauD", bio="Guild leader", language="Spanish", steam_id="steam_laura987")
    # profile7 = Profile(user_id=7, gender="Male", age=33, name="Jorge Martinez", discord="jorge#1122", preferences="FPS, Racing", zodiac="Sagittarius", location="Zaragoza", nick_name="jorgeM", bio="Competitive and fast", language="Spanish", steam_id="steam_jorge112")
    # db.session.add_all([profile1, profile2, profile3, profile4, profile5, profile6, profile7])
    # db.session.commit()

    # #Crear reviews
    # reviews = [
    # # Reviews para user_id=1
    #     Review(user_id=1, author_id=2, stars=5, comment="Great player!"),
    #     Review(user_id=1, author_id=3, stars=4, comment="Very strategic."),
    #     Review(user_id=1, author_id=4, stars=3, comment="Good, but can improve."),
    #     Review(user_id=1, author_id=5, stars=4, comment="Fun to play with."),
    #     Review(user_id=1, author_id=6, stars=5, comment="Excellent teamwork."),
    #     Review(user_id=1, author_id=7, stars=3, comment="Needs more practice."),
    #     Review(user_id=1, author_id=2, stars=4, comment="Really fast and skilled."),

    #     # Reviews para user_id=2
    #     Review(user_id=2, author_id=1, stars=4, comment="Good communication."),
    #     Review(user_id=2, author_id=3, stars=5, comment="Amazing skills."),
    #     Review(user_id=2, author_id=4, stars=4, comment="Very helpful."),
    #     Review(user_id=2, author_id=5, stars=3, comment="Can improve timing."),
    #     Review(user_id=2, author_id=6, stars=4, comment="Nice player."),
    #     Review(user_id=2, author_id=7, stars=5, comment="Strong strategist."),
    #     Review(user_id=2, author_id=1, stars=4, comment="Great teamwork."),

    #     # Reviews para user_id=3
    #     Review(user_id=3, author_id=1, stars=3, comment="Average."),
    #     Review(user_id=3, author_id=2, stars=4, comment="Good playstyle."),
    #     Review(user_id=3, author_id=4, stars=5, comment="Excellent!"),
    #     Review(user_id=3, author_id=5, stars=4, comment="Reliable."),
    #     Review(user_id=3, author_id=6, stars=3, comment="Could be better."),
    #     Review(user_id=3, author_id=7, stars=4, comment="Consistent."),
    #     Review(user_id=3, author_id=2, stars=5, comment="Top player."),

    #     # Reviews para user_id=4
    #     Review(user_id=4, author_id=1, stars=4, comment="Nice teammate."),
    #     Review(user_id=4, author_id=2, stars=3, comment="Learning fast."),
    #     Review(user_id=4, author_id=3, stars=5, comment="Excellent moves."),
    #     Review(user_id=4, author_id=5, stars=4, comment="Friendly player."),
    #     Review(user_id=4, author_id=6, stars=4, comment="Very cooperative."),
    #     Review(user_id=4, author_id=7, stars=3, comment="Could improve strategy."),
    #     Review(user_id=4, author_id=1, stars=5, comment="Reliable player."),

    #     # Reviews para user_id=5
    #     Review(user_id=5, author_id=1, stars=5, comment="Excellent teamwork."),
    #     Review(user_id=5, author_id=2, stars=4, comment="Good skills."),
    #     Review(user_id=5, author_id=3, stars=4, comment="Great at tactics."),
    #     Review(user_id=5, author_id=4, stars=5, comment="Fun to play with."),
    #     Review(user_id=5, author_id=6, stars=3, comment="Needs to communicate more."),
    #     Review(user_id=5, author_id=7, stars=4, comment="Strong player."),
    #     Review(user_id=5, author_id=2, stars=5, comment="Very strategic."),

    #     # Reviews para user_id=6
    #     Review(user_id=6, author_id=1, stars=3, comment="Can improve."),
    #     Review(user_id=6, author_id=2, stars=4, comment="Good teamwork."),
    #     Review(user_id=6, author_id=3, stars=5, comment="Great leader."),
    #     Review(user_id=6, author_id=4, stars=5, comment="Helpful player."),
    #     Review(user_id=6, author_id=5, stars=4, comment="Very skilled."),
    #     Review(user_id=6, author_id=7, stars=3, comment="Needs more practice."),
    #     Review(user_id=6, author_id=1, stars=4, comment="Consistent player."),

    #     # Reviews para user_id=7
    #     Review(user_id=7, author_id=1, stars=4, comment="Fast and skilled."),
    #     Review(user_id=7, author_id=2, stars=5, comment="Great strategist."),
    #     Review(user_id=7, author_id=3, stars=4, comment="Reliable player."),
    #     Review(user_id=7, author_id=4, stars=3, comment="Needs to focus more."),
    #     Review(user_id=7, author_id=5, stars=4, comment="Very cooperative."),
    #     Review(user_id=7, author_id=6, stars=5, comment="Excellent skills."),
    #     Review(user_id=7, author_id=1, stars=4, comment="Good teamwork."),
    # ]

    # db.session.add_all(reviews)
    # db.session.commit()

    # #Crear games para los perfiles de usuarios
    # games = [
    #     # Perfil 1
    #     Game(profile_id=1, game={"title": "Call of Duty", "hours_played": 120}),
    #     Game(profile_id=1, game={"title": "Halo Infinite", "hours_played": 90}),
    #     Game(profile_id=1, game={"title": "Celeste", "hours_played": 45}),

    #     # Perfil 2
    #     Game(profile_id=2, game={"title": "Civilization VI", "hours_played": 200}),
    #     Game(profile_id=2, game={"title": "Stardew Valley", "hours_played": 130}),
    #     Game(profile_id=2, game={"title": "Divinity: Original Sin 2", "hours_played": 160}),

    #     # Perfil 3
    #     Game(profile_id=3, game={"title": "FIFA 21", "hours_played": 150}),
    #     Game(profile_id=3, game={"title": "NBA 2K24", "hours_played": 95}),
    #     Game(profile_id=3, game={"title": "Rocket League", "hours_played": 110}),

    #     # Perfil 4
    #     Game(profile_id=4, game={"title": "Stardew Valley", "hours_played": 80}),
    #     Game(profile_id=4, game={"title": "Unpacking", "hours_played": 40}),
    #     Game(profile_id=4, game={"title": "Gris", "hours_played": 30}),

    #     # Perfil 5
    #     Game(profile_id=5, game={"title": "The Witcher 3", "hours_played": 300}),
    #     Game(profile_id=5, game={"title": "Skyrim", "hours_played": 250}),
    #     Game(profile_id=5, game={"title": "Zelda: BOTW", "hours_played": 180}),

    #     # Perfil 6
    #     Game(profile_id=6, game={"title": "World of Warcraft", "hours_played": 500}),
    #     Game(profile_id=6, game={"title": "Age of Empires IV", "hours_played": 120}),
    #     Game(profile_id=6, game={"title": "Final Fantasy XIV", "hours_played": 400}),

    #     # Perfil 7
    #     Game(profile_id=7, game={"title": "Forza Horizon 5", "hours_played": 220}),
    #     Game(profile_id=7, game={"title": "Valorant", "hours_played": 180}),
    #     Game(profile_id=7, game={"title": "Gran Turismo 7", "hours_played": 150}),
    # ]

    # db.session.add_all(games)
    # db.session.commit()


    # #Crear matches 
    # match1 = Match(user1_id=1, user2_id=2, created_at=datetime(2023, 1, 15, 10, 0, 0, tzinfo=timezone.utc))
    # match2 = Match(user1_id=2, user2_id=3, created_at=datetime(2023, 1, 16, 11, 30, 0, tzinfo=timezone.utc))
    # match3 = Match(user1_id=3, user2_id=1, created_at=datetime(2023, 1, 17, 9, 45, 0, tzinfo=timezone.utc))
    # match4 = Match(user1_id=4, user2_id=5, created_at=datetime(2023, 1, 18, 14, 0, 0, tzinfo=timezone.utc))
    # match5 = Match(user1_id=5, user2_id=6, created_at=datetime(2023, 1, 19, 13, 15, 0, tzinfo=timezone.utc))
    # match6 = Match(user1_id=6, user2_id=7, created_at=datetime(2023, 1, 20, 16, 45, 0, tzinfo=timezone.utc))
    # match7 = Match(user1_id=7, user2_id=4, created_at=datetime(2023, 1, 21, 8, 30, 0, tzinfo=timezone.utc))
    # db.session.add_all([match1, match2, match3, match4, match5, match6, match7])
    # db.session.commit()

    # #Crear matches rejected
    # reject1 = Reject(rejector_id=1, rejected_id=3, created_at=datetime(2023, 1, 15, 12, 0, 0, tzinfo=timezone.utc))
    # reject2 = Reject(rejector_id=2, rejected_id=4, created_at=datetime(2023, 1, 16, 13, 15, 0, tzinfo=timezone.utc))
    # reject3 = Reject(rejector_id=3, rejected_id=5, created_at=datetime(2023, 1, 17, 14, 30, 0, tzinfo=timezone.utc))
    # reject4 = Reject(rejector_id=4, rejected_id=6, created_at=datetime(2023, 1, 18, 15, 45, 0, tzinfo=timezone.utc))
    # reject5 = Reject(rejector_id=5, rejected_id=7, created_at=datetime(2023, 1, 19, 16, 0, 0, tzinfo=timezone.utc))
    # reject6 = Reject(rejector_id=6, rejected_id=1, created_at=datetime(2023, 1, 20, 17, 30, 0, tzinfo=timezone.utc))
    # reject7 = Reject(rejector_id=7, rejected_id=2, created_at=datetime(2023, 1, 21, 18, 45, 0, tzinfo=timezone.utc))
    # db.session.add_all([reject1, reject2, reject3, reject4, reject5, reject6, reject7])
    # db.session.commit()


    # #Crear likes
    # likes = [
    #     Like(liker_id=1, liked_id=2),
    #     Like(liker_id=1, liked_id=3),
    #     Like(liker_id=2, liked_id=1),
    #     Like(liker_id=2, liked_id=4),
    #     Like(liker_id=3, liked_id=5),
    #     Like(liker_id=3, liked_id=2),
    #     Like(liker_id=4, liked_id=1),
    #     Like(liker_id=4, liked_id=6),
    #     Like(liker_id=5, liked_id=4),
    #     Like(liker_id=5, liked_id=7),
    #     Like(liker_id=6, liked_id=3),
    #     Like(liker_id=6, liked_id=1),
    #     Like(liker_id=7, liked_id=2),
    #     Like(liker_id=7, liked_id=6),
    # ]

    # db.session.add_all(likes)
    # db.session.commit()


    # --- Crear 20 usuarios ---
    users = []
    for i in range(1, 21):
        email = f"user{i}@example.com"
        password = f"password{i}"  # ← sin hash
        users.append(User(id=i, email=email, password=password))
    db.session.add_all(users)
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
