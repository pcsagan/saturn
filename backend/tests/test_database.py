from random import randint
from uuid import uuid4
from application.database import User, OAuthCredentials


def test_user_password(db):
    random_password = uuid4().hex
    user = User(email='test@test.com')
    user.set_password(random_password)
    assert user.check_password(random_password)


def test_get_id():
    classes = [User, OAuthCredentials]
    for class_type in classes:
        random_id = randint(1, 10000)
        object = class_type()
        object.id_ = random_id
        assert object.get_id() == random_id
