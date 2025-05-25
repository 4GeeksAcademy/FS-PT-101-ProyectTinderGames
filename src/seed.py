from app import app, db
from datetime import datetime, timezone
from api.models import User, Profile, Review, Game, Match

with app.app_context():
    db.drop_all()
    db.create_all()

    #Creación de users
    user1 = User(id=1, name="Juan Perez", email="juan.perez@example.com", password="password123", age=28, discord="juan#1234")
    user2 = User(id=2, name="Ana Gomez", email="ana.gomez@example.com", password="mypassword", age=34, discord="ana_g#5678")
    user3 = User(id=3, name="Carlos Ruiz", email="carlos.ruiz@example.com", password="securepass", age=22, discord="carlos#9999")
    user4 = User(id=4, name="Maria Lopez", email="maria.lopez@example.com", password="pass456", age=30, discord="maria#4567")
    user5 = User(id=5, name="Luis Fernandez", email="luis.fernandez@example.com", password="pass789", age=26, discord="luisf#2345")
    user6 = User(id=6, name="Laura Diaz", email="laura.diaz@example.com", password="mypassword2", age=29, discord="laura#9876")
    user7 = User(id=7, name="Jorge Martinez", email="jorge.martinez@example.com", password="secretpass", age=33, discord="jorge#1122")
    db.session.add_all([user1, user2, user3, user4, user5, user6, user7])
    db.session.commit()

    #Creación de los profiles de cada user
    profile1 = Profile(user_id=1, gender="Male", preferences="Action, Adventure", zodiac="Leo", location="Madrid", nick_name="juancito", bio="Gamer and developer", language="Spanish")
    profile2 = Profile(user_id=2, gender="Female", preferences="RPG, Strategy", zodiac="Cancer", location="Barcelona", nick_name="anag", bio="Loves strategy games", language="Spanish")
    profile3 = Profile(user_id=3, gender="Male", preferences="FPS, Sports", zodiac="Aries", location="Valencia", nick_name="carlosR", bio="Competitive gamer", language="Spanish")
    profile4 = Profile(user_id=4, gender="Female", preferences="Puzzle, Indie", zodiac="Virgo", location="Sevilla", nick_name="mariL", bio="Casual player", language="Spanish")
    profile5 = Profile(user_id=5, gender="Male", preferences="RPG, Open World", zodiac="Taurus", location="Bilbao", nick_name="luisF", bio="Explores every map", language="Spanish")
    profile6 = Profile(user_id=6, gender="Female", preferences="MMORPG, Strategy", zodiac="Pisces", location="Granada", nick_name="lauD", bio="Guild leader", language="Spanish")
    profile7 = Profile(user_id=7, gender="Male", preferences="FPS, Racing", zodiac="Sagittarius", location="Zaragoza", nick_name="jorgeM", bio="Competitive and fast", language="Spanish")
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
    game1 = Game(profile_id=1, game={"title": "Call of Duty", "hours_played": 120})
    game2 = Game(profile_id=2, game={"title": "Civilization VI", "hours_played": 200})
    game3 = Game(profile_id=3, game={"title": "FIFA 21", "hours_played": 150})
    game4 = Game(profile_id=4, game={"title": "Stardew Valley", "hours_played": 80})
    game5 = Game(profile_id=5, game={"title": "The Witcher 3", "hours_played": 300})
    game6 = Game(profile_id=6, game={"title": "World of Warcraft", "hours_played": 500})
    game7 = Game(profile_id=7, game={"title": "Forza Horizon 5", "hours_played": 220})
    db.session.add_all([game1, game2, game3, game4, game5, game6, game7])
    db.session.commit()

    #Crear matches 
    match1 = Match(liker_id=1, liked_id=2, created_at=datetime(2023, 1, 15, 10, 0, 0, tzinfo=timezone.utc))
    match2 = Match(liker_id=2, liked_id=3, created_at=datetime(2023, 1, 16, 11, 30, 0, tzinfo=timezone.utc))
    match3 = Match(liker_id=3, liked_id=1, created_at=datetime(2023, 1, 17, 9, 45, 0, tzinfo=timezone.utc))
    match4 = Match(liker_id=4, liked_id=5, created_at=datetime(2023, 1, 18, 14, 0, 0, tzinfo=timezone.utc))
    match5 = Match(liker_id=5, liked_id=6, created_at=datetime(2023, 1, 19, 13, 15, 0, tzinfo=timezone.utc))
    match6 = Match(liker_id=6, liked_id=7, created_at=datetime(2023, 1, 20, 16, 45, 0, tzinfo=timezone.utc))
    match7 = Match(liker_id=7, liked_id=4, created_at=datetime(2023, 1, 21, 8, 30, 0, tzinfo=timezone.utc))
    db.session.add_all([match1, match2, match3, match4, match5, match6, match7])
    db.session.commit()

    
    print("✅ Data seeded successfully")
