from datetime import datetime
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
jwt = JWTManager()


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id_


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id_=identity).one_or_none()


class User(db.Model):  # type: ignore
    __tablename__ = 'user'
    id_ = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(94))
    first_name = db.Column(db.Text)
    last_name = db.Column(db.Text)
    created_on = db.Column(db.DateTime, default=datetime.now)

    def get_id(self):
        return self.id_

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


class OAuthCredentials(db.Model):  # type: ignore
    __tablename__ = 'oathcredentials'
    id_ = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id_'))
    user = db.relationship('User', backref=db.backref('oauth_credentials'), primaryjoin=(User.id_ == user_id))
    email = db.Column(db.String(120))  # this OAuth login e-mail can be different than the user's registered e-mail
    profile = db.Column(db.Text)

    def get_id(self):
        return self.id_
