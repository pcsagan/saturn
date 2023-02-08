from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from .database import User, OAuthCredentials

auth = Blueprint('auth', __name__)


@auth.route('/signin', methods=['POST'])
def signin():
    """Attempts to sign in using the credentials in the JSON data.

    The JSON data must contain an e-mail, and may also contain either a password or
    a profile. If a password is specified, then perform a normal sign in. If a profile
    is specified, then perform a lookup to see if this email/profile combination are
    registered credentials with a user account. If so, then sign in as that user.

    A JWT access token is created and returned upon successful sign in attempts.

    Returns:
        dict: JSON of JWT access token.
        int:  200 if the sign in attempt as successful.
              500 if something went wrong.
    """
    if 'password' in request.json:
        user = User.query.filter_by(email=request.json['email']).first()
        if not user.check_password(request.json['password']):
            raise Exception('Bad Credentials')
    elif 'profile' in request.json:
        oath_credentials = OAuthCredentials.query.filter_by(email=request.json['email'], profile=request.json['profile']).first()
        if oath_credentials is None:
            raise Exception('Bad OAuth Credentials')
        user = oath_credentials.user
    else:
        raise Exception('Bad Credentials Payload')

    access_token = create_access_token(identity=user)
    return jsonify(
        authorization=access_token,
        email=user.email,
        name=f'{user.first_name} {user.last_name}',
        image=None), 200
