# permite referencias a clases futuras en tipos
from __future__ import annotations
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, JSON,DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(250), nullable=False)

    # Relaciones
    profile: Mapped[Optional[Profile]] = relationship('Profile', back_populates='user', uselist=False, cascade='all, delete-orphan',single_parent=True)
    # reseñas que le hacen a este usuario
    reviews_received: Mapped[List[Review]] = relationship('Review',back_populates='user',foreign_keys='Review.user_id',cascade='all, delete-orphan')
    # reseñas que este usuario escribe
    reviews_authored: Mapped[List[Review]] = relationship('Review',back_populates='author',foreign_keys='Review.author_id',cascade='all, delete-orphan')
    # Likes que hace este usuario
    matches_given: Mapped[List[Match]] = relationship('Match',foreign_keys='Match.liker_id',back_populates='liker',cascade='all, delete-orphan')
    # Likes que este usuario recibe
    matches_received: Mapped[List[Match]] = relationship('Match',foreign_keys='Match.liked_id',back_populates='liked',cascade='all, delete-orphan')

    rejects_given: Mapped[List[Reject]] = relationship('Reject', foreign_keys='Reject.rejector_id', back_populates='rejector', cascade='all, delete-orphan')
    rejects_received: Mapped[List[Reject]] = relationship('Reject', foreign_keys='Reject.rejected_id', back_populates='rejected', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile": self.profile.serialize() if self.profile else None
            # do not serialize the password, its a security breach
        }


class Profile(db.Model):
    __tablename__ = 'profiles'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)
    gender: Mapped[str] = mapped_column(String(15), nullable=True)
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    name: Mapped[str] = mapped_column(String(20), unique=False, nullable=True)
    discord: Mapped[str] = mapped_column(String(40), unique=True, nullable=True)
    preferences: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    zodiac: Mapped[str] = mapped_column(String(20), unique=False, nullable=True)
    location: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    nick_name: Mapped[str] = mapped_column(String(21), unique=True, nullable=True)
    bio: Mapped[str] = mapped_column(String(500), unique=True, nullable=True)
    language: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    steam_id: Mapped[str] = mapped_column(String(200), unique=True, nullable=True)

    # Relaciones
    user: Mapped[User] = relationship('User', back_populates='profile')
    games: Mapped[List[Game]] = relationship('Game', back_populates='profile', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "gender": self.gender,
            'preferences': self.preferences,
            'zodiac':self.zodiac,
            'location':self.location,
            "nick_name":self.nick_name,
            "bio":self.bio,
            "languaje":self.language
        }


class Review(db.Model):
    __tablename__ = 'reviews'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id:   Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    stars:     Mapped[int] = mapped_column(Integer, nullable=False)
    comment:   Mapped[str] = mapped_column(String(100), nullable=True)

# Relaciones
    # el reseñado
    user:   Mapped[User] = relationship('User', back_populates='reviews_received', foreign_keys=[user_id])
    # el que reseña
    author: Mapped[User] = relationship('User', back_populates='reviews_authored', foreign_keys=[author_id])

    def serialize(self):
        return {
            "id": self.id,
            'user_id': self.user_id,
            'author_id': self.author_id
        }


class Game(db.Model):
    __tablename__ = 'games'
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey('profiles.id', ondelete='CASCADE'), nullable=False)
    game: Mapped[dict] = mapped_column(JSON, nullable=False)

    # Relaciones
    profile: Mapped[Profile] = relationship('Profile', back_populates='games')

    def serialize(self):
        return {
            "id": self.id,
            "profile_id": self.profile_id,
            "game": self.game   # ya sale como dict/JSON
        }

class Match(db.Model):
    __tablename__ = 'matches'
    id: Mapped[int] = mapped_column(primary_key=True)
    liker_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'),nullable=False)  # quien da el like
    liked_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'),nullable=False)  # quien recibe el like
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True),server_default=func.now(),nullable=False)

    # Relaciones
    liker: Mapped[User] = relationship('User',foreign_keys=[liker_id],back_populates='matches_given')
    liked: Mapped[User] = relationship('User',foreign_keys=[liked_id],back_populates='matches_received')

    def serialize(self):
        return {
            "id": self.id,
            "liker_id": self.liker_id,
            "liked_id": self.liked_id,
        }
    
class Reject(db.Model):
    __tablename__ = 'rejects'
    id: Mapped[int] = mapped_column(primary_key=True)
    rejector_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'),nullable=False)  # quien da el like
    rejected_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'),nullable=False)  # quien recibe el like
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True),server_default=func.now(),nullable=False)

    # Relaciones
    rejector: Mapped[User] = relationship('User',foreign_keys=[rejector_id],back_populates='rejects_given')
    rejected: Mapped[User] = relationship('User',foreign_keys=[rejected_id],back_populates='rejects_received')

    def serialize(self):
        return {
            "id": self.id,
            "rejector_id": self.rejector_id,
            "rejected_id": self.rejected_id,
        }