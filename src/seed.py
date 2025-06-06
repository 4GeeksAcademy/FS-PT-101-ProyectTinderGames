from app import app, db
from datetime import datetime, timezone
# from werkzeug.security import generate_password_hash
from api.models import User, Profile, Review, Game, Match, Reject, Like

with app.app_context():
    db.drop_all()
    db.create_all()

    # hashear la contraseña
    # def hash(pwd): return generate_password_hash(pwd) password=hash

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

    #Creación de los profiles de cada user
    profile1 = Profile(user_id=1, gender="Male", age=28, name="Juan Perez", discord="juan#1234", preferences="Action, Adventure", zodiac="Leo", location="Madrid", nick_name="juancito", bio="Gamer and developer", language="Spanish", steam_id="steam_juan123")
    profile2 = Profile(user_id=2, gender="Female", age=34, name="Ana Gomez", discord="ana_g#5678", preferences="RPG, Strategy", zodiac="Cancer", location="Barcelona", nick_name="anag", bio="Loves strategy games", language="Spanish", steam_id="steam_ana567")
    profile3 = Profile(user_id=3, gender="Male", age=22, name="Carlos Ruiz", discord="carlos#9999", preferences="FPS, Sports", zodiac="Aries", location="Valencia", nick_name="carlosR", bio="Competitive gamer", language="Spanish", steam_id="steam_carlos999")
    profile4 = Profile(user_id=4, gender="Female", age=30, name="Maria Lopez", discord="maria#4567", preferences="Puzzle, Indie", zodiac="Virgo", location="Sevilla", nick_name="mariL", bio="Casual player", language="Spanish", steam_id="steam_maria456")
    profile5 = Profile(user_id=5, gender="Male", age=26, name="Luis Fernandez", discord="luisf#2345", preferences="RPG, Open World", zodiac="Taurus", location="Bilbao", nick_name="luisF", bio="Explores every map", language="Spanish", steam_id="steam_luis234")
    profile6 = Profile(user_id=6, gender="Female", age=29, name="Laura Diaz", discord="laura#9876", preferences="MMORPG, Strategy", zodiac="Pisces", location="Granada", nick_name="lauD", bio="Guild leader", language="Spanish", steam_id="steam_laura987")
    profile7 = Profile(user_id=7, gender="Male", age=33, name="Jorge Martinez", discord="jorge#1122", preferences="FPS, Racing", zodiac="Sagittarius", location="Zaragoza", nick_name="jorgeM", bio="Competitive and fast", language="Spanish", steam_id="steam_jorge112")
    db.session.add_all([profile1, profile2, profile3, profile4, profile5, profile6, profile7])
    db.session.commit()

    #Crear reviews
    review1 = Review(user_id=1, author_id=2, stars=5, comment="Great player!")
    review2 = Review(user_id=2, author_id=3, stars=4, comment="Very strategic.")
    review3 = Review(user_id=3, author_id=1, stars=3, comment="Good, but can improve.")
    review4 = Review(user_id=4, author_id=5, stars=4, comment="Fun to play with.")
    review5 = Review(user_id=5, author_id=6, stars=5, comment="Excellent teamwork.")
    review6 = Review(user_id=6, author_id=7, stars=3, comment="Needs more practice.")
    review7 = Review(user_id=7, author_id=4, stars=4, comment="Really fast and skilled.")
    db.session.add_all([review1, review2, review3, review4, review5, review6, review7])
    db.session.commit()

    #Crear games para los perfiles de usuarios
    games = [
        # Perfil 1
        Game(profile_id=1, game={"title": "Call of Duty", "hours_played": 120}),
        Game(profile_id=1, game={"title": "Halo Infinite", "hours_played": 90}),
        Game(profile_id=1, game={"title": "Celeste", "hours_played": 45}),

        # Perfil 2
        Game(profile_id=2, game={"title": "Civilization VI", "hours_played": 200}),
        Game(profile_id=2, game={"title": "Stardew Valley", "hours_played": 130}),
        Game(profile_id=2, game={"title": "Divinity: Original Sin 2", "hours_played": 160}),

        # Perfil 3
        Game(profile_id=3, game={"title": "FIFA 21", "hours_played": 150}),
        Game(profile_id=3, game={"title": "NBA 2K24", "hours_played": 95}),
        Game(profile_id=3, game={"title": "Rocket League", "hours_played": 110}),

        # Perfil 4
        Game(profile_id=4, game={"title": "Stardew Valley", "hours_played": 80}),
        Game(profile_id=4, game={"title": "Unpacking", "hours_played": 40}),
        Game(profile_id=4, game={"title": "Gris", "hours_played": 30}),

        # Perfil 5
        Game(profile_id=5, game={"title": "The Witcher 3", "hours_played": 300}),
        Game(profile_id=5, game={"title": "Skyrim", "hours_played": 250}),
        Game(profile_id=5, game={"title": "Zelda: BOTW", "hours_played": 180}),

        # Perfil 6
        Game(profile_id=6, game={"title": "World of Warcraft", "hours_played": 500}),
        Game(profile_id=6, game={"title": "Age of Empires IV", "hours_played": 120}),
        Game(profile_id=6, game={"title": "Final Fantasy XIV", "hours_played": 400}),

        # Perfil 7
        Game(profile_id=7, game={"title": "Forza Horizon 5", "hours_played": 220}),
        Game(profile_id=7, game={"title": "Valorant", "hours_played": 180}),
        Game(profile_id=7, game={"title": "Gran Turismo 7", "hours_played": 150}),
    ]

    db.session.add_all(games)
    db.session.commit()


    #Crear matches 
    match1 = Match(user1_id=1, user2_id=2, created_at=datetime(2023, 1, 15, 10, 0, 0, tzinfo=timezone.utc))
    match2 = Match(user1_id=2, user2_id=3, created_at=datetime(2023, 1, 16, 11, 30, 0, tzinfo=timezone.utc))
    match3 = Match(user1_id=3, user2_id=1, created_at=datetime(2023, 1, 17, 9, 45, 0, tzinfo=timezone.utc))
    match4 = Match(user1_id=4, user2_id=5, created_at=datetime(2023, 1, 18, 14, 0, 0, tzinfo=timezone.utc))
    match5 = Match(user1_id=5, user2_id=6, created_at=datetime(2023, 1, 19, 13, 15, 0, tzinfo=timezone.utc))
    match6 = Match(user1_id=6, user2_id=7, created_at=datetime(2023, 1, 20, 16, 45, 0, tzinfo=timezone.utc))
    match7 = Match(user1_id=7, user2_id=4, created_at=datetime(2023, 1, 21, 8, 30, 0, tzinfo=timezone.utc))
    db.session.add_all([match1, match2, match3, match4, match5, match6, match7])
    db.session.commit()

    #Crear matches rejected
    reject1 = Reject(rejector_id=1, rejected_id=3, created_at=datetime(2023, 1, 15, 12, 0, 0, tzinfo=timezone.utc))
    reject2 = Reject(rejector_id=2, rejected_id=4, created_at=datetime(2023, 1, 16, 13, 15, 0, tzinfo=timezone.utc))
    reject3 = Reject(rejector_id=3, rejected_id=5, created_at=datetime(2023, 1, 17, 14, 30, 0, tzinfo=timezone.utc))
    reject4 = Reject(rejector_id=4, rejected_id=6, created_at=datetime(2023, 1, 18, 15, 45, 0, tzinfo=timezone.utc))
    reject5 = Reject(rejector_id=5, rejected_id=7, created_at=datetime(2023, 1, 19, 16, 0, 0, tzinfo=timezone.utc))
    reject6 = Reject(rejector_id=6, rejected_id=1, created_at=datetime(2023, 1, 20, 17, 30, 0, tzinfo=timezone.utc))
    reject7 = Reject(rejector_id=7, rejected_id=2, created_at=datetime(2023, 1, 21, 18, 45, 0, tzinfo=timezone.utc))
    db.session.add_all([reject1, reject2, reject3, reject4, reject5, reject6, reject7])
    db.session.commit()


    #Crear likes
    likes = [
        Like(liker_id=1, liked_id=2),
        Like(liker_id=1, liked_id=3),
        Like(liker_id=2, liked_id=1),
        Like(liker_id=2, liked_id=4),
        Like(liker_id=3, liked_id=5),
        Like(liker_id=3, liked_id=2),
        Like(liker_id=4, liked_id=1),
        Like(liker_id=4, liked_id=6),
        Like(liker_id=5, liked_id=4),
        Like(liker_id=5, liked_id=7),
        Like(liker_id=6, liked_id=3),
        Like(liker_id=6, liked_id=1),
        Like(liker_id=7, liked_id=2),
        Like(liker_id=7, liked_id=6),
    ]

    db.session.add_all(likes)
    db.session.commit()



    
    print("✅ Data seeded successfully")
