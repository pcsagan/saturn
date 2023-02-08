import pytest  # type: ignore
from application import create_app
from application.cli import remake
from application.database import db as db_

# ensure the app is created before everything else
_app = create_app(testing=True)


def pytest_configure():
    # ensure that the test database is created before any tests are executed
    with _app.app_context():
        remake(test_data=True)


@pytest.fixture(scope="session")
def app():
    return _app


@pytest.fixture(scope="module")
def db(app):
    with app.app_context():
        remake(test_data=True)
        yield db_


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
