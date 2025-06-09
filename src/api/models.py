from __future__ import annotations
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, JSON, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(250), nullable=False)

    # Relaciones
    profile: Mapped[Optional[Profile]] = relationship(
        'Profile', back_populates='user', uselist=False,
        cascade='all, delete-orphan', single_parent=True
    )
    # Reseñas que le hacen a este usuario
    reviews_received: Mapped[List[Review]] = relationship(
        'Review', back_populates='user',
        foreign_keys='Review.user_id',
        cascade='all, delete-orphan'
    )
    # Reseñas que este usuario escribe
    reviews_authored: Mapped[List[Review]] = relationship(
        'Review', back_populates='author',
        foreign_keys='Review.author_id',
        cascade='all, delete-orphan'
    )
    # Likes que hace este usuario
    likes_given: Mapped[List[Like]] = relationship(
        'Like', foreign_keys='Like.liker_id', back_populates='liker',
        cascade='all, delete-orphan'
    )
    # Likes que este usuario recibe
    likes_received: Mapped[List[Like]] = relationship(
        'Like', foreign_keys='Like.liked_id', back_populates='liked',
        cascade='all, delete-orphan'
    )

    # Matches de este usuario
    matches_initiated: Mapped[List[Match]] = relationship(
        'Match', foreign_keys='Match.user1_id', back_populates='user1',
        cascade='all, delete-orphan'
    )
    matches_received: Mapped[List[Match]] = relationship(
        'Match', foreign_keys='Match.user2_id', back_populates='user2',
        cascade='all, delete-orphan'
    )

    rejects_given: Mapped[List[Reject]] = relationship(
        'Reject', foreign_keys='Reject.rejector_id',
        back_populates='rejector', cascade='all, delete-orphan'
    )
    rejects_received: Mapped[List[Reject]] = relationship(
        'Reject', foreign_keys='Reject.rejected_id',
        back_populates='rejected', cascade='all, delete-orphan'
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # No serializar password por seguridad
            "profile": self.profile.serialize() if self.profile else None
        }


class Profile(db.Model):
    __tablename__ = 'profiles'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)
    gender: Mapped[str] = mapped_column(String(15), nullable=True)
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    name: Mapped[str] = mapped_column(String(20), nullable=True)
    discord: Mapped[str] = mapped_column(
        String(40), unique=True, nullable=True)
    preferences: Mapped[str] = mapped_column(String(50), nullable=True)
    zodiac: Mapped[str] = mapped_column(String(20), nullable=True)
    location: Mapped[str] = mapped_column(String(50), nullable=True)
    nick_name: Mapped[str] = mapped_column(
        String(21), unique=True, nullable=True)
    bio: Mapped[str] = mapped_column(String(500), unique=True, nullable=True)
    language: Mapped[str] = mapped_column(String(50), nullable=True)
    steam_id: Mapped[str] = mapped_column(
        String(200), unique=True, nullable=True)

    # Relaciones
    user: Mapped[User] = relationship('User', back_populates='profile')
    games: Mapped[List[Game]] = relationship(
        'Game', back_populates='profile', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "gender": self.gender,
            'preferences': self.preferences,
            'zodiac': self.zodiac,
            'location': self.location,
            "nick_name": self.nick_name,
            "bio": self.bio,
            "language": self.language,
            "name":self.name,
            "games": [g.serialize() for g in self.games] if self.games else [],
            "age": self.age
        }


class Review(db.Model):
    __tablename__ = 'reviews'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    stars: Mapped[int] = mapped_column(Integer, nullable=False)
    comment: Mapped[str] = mapped_column(String(100), nullable=True)

    # Relaciones
    user: Mapped[User] = relationship(
        'User', back_populates='reviews_received', foreign_keys=[user_id])
    author: Mapped[User] = relationship(
        'User', back_populates='reviews_authored', foreign_keys=[author_id])

    def serialize(self):
        return {
            "id": self.id,
            'user_id': self.user_id,
            'author_id': self.author_id,
            "stars": self.stars,
            "comment": self.comment
        }


class Game(db.Model):
    __tablename__ = 'games'
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey(
        'profiles.id', ondelete='CASCADE'), nullable=False)
    game: Mapped[dict] = mapped_column(JSON, nullable=False)

    # Relaciones
    profile: Mapped[Profile] = relationship('Profile', back_populates='games')

    def serialize(self):
        return {
            "id": self.id,
            "profile_id": self.profile_id,
            "game": self.game
        }


class Like(db.Model):
    __tablename__ = 'likes'
    id: Mapped[int] = mapped_column(primary_key=True)
    liker_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    liked_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relaciones
    liker: Mapped[User] = relationship(
        'User', foreign_keys=[liker_id], back_populates='likes_given')
    liked: Mapped[User] = relationship(
        'User', foreign_keys=[liked_id], back_populates='likes_received')

    def serialize(self):
        return {
            "id": self.id,
            "liker_id": self.liker_id,
            "liked_id": self.liked_id
        }


class Match(db.Model):
    __tablename__ = 'matches'
    id: Mapped[int] = mapped_column(primary_key=True)
    user1_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    user2_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relaciones
    user1: Mapped[User] = relationship(
        'User', foreign_keys=[user1_id], back_populates='matches_initiated')
    user2: Mapped[User] = relationship(
        'User', foreign_keys=[user2_id], back_populates='matches_received')

    def serialize(self):
        return {
            "match_id": self.id,
            "user1":{
                "user_id": self.user2_id,
                "user_data":{
                    "nickname": self.user1.profile.name if self.user1.profile.name else "undefined",
                "games": [g.serialize() for g in self.user1.profile.games] if self.user1.profile.games else [],
                "gender": self.user1.profile.gender if self.user1.profile.gender else "undefined"
                }if self.user1.profile
                else "user has no data"
            },
            "user2":{
                "user_id": self.user2_id,
                "user_data":{
                    "nickname": self.user2.profile.name if self.user2.profile.name else "undefined",
                "games": [g.serialize() for g in self.user2.profile.games] if self.user2.profile.games else [],
                "gender": self.user2.profile.gender if self.user2.profile.gender else "undefined"
                }if self.user2.profile
                else "user has no data"
            }
        }


class Reject(db.Model):
    __tablename__ = 'rejects'
    id: Mapped[int] = mapped_column(primary_key=True)
    rejector_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    rejected_id: Mapped[int] = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relaciones
    rejector: Mapped[User] = relationship(
        'User', foreign_keys=[rejector_id], back_populates='rejects_given')
    rejected: Mapped[User] = relationship(
        'User', foreign_keys=[rejected_id], back_populates='rejects_received')

    def serialize(self):
        return {
            "id": self.id,
            "rejector_id": self.rejector_id,
            "rejected_id": self.rejected_id
        }
