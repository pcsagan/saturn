from pathlib import Path
from flask import url_for, current_app
from .database import db, User, OAuthCredentials


def cli_init_app(app):
    """Initializes the shell variables and binds commands to functions.

    Args:
        app (Flask): The app.
    """
    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'User': User, 'url_for': url_for_flask}

    @app.cli.command('remake')
    def remake_command():
        remake()


def url_for_flask(*args, **kwargs):
    """Invokes url_for with an application context.

    Returns:
        str: The result of url_for.
    """
    with current_app.app_context(), current_app.test_request_context():
        return url_for(*args, **kwargs)


def create_user(email, password, first_name, last_name):
    try:
        user = User.query.filter_by(email=email).first()
        if user is not None:
            current_app.logger.error(f'User <{email}> is already registered!')
            return
        user = User(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        current_app.logger.debug(f'User <{email}> is now registered!')
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)


def create_oath_credentials(user_email, email, profile):
    try:
        user = User.query.filter_by(email=user_email).first()
        if user is None:
            current_app.logger.error(f'User <{user_email}> does not exist!')
            return
        oath_credentials = OAuthCredentials(user_id=user.id_, email=email, profile=profile)
        db.session.add(oath_credentials)
        db.session.commit()
        current_app.logger.debug(f'OAuthCredentials <{email}:{profile}> is now registered to <{user_email}>!')
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)


def populate_db():
    current_app.logger.debug('Populating database with test data')
    create_user('pcsagan@gmail.com', 'test', 'Pat', 'Sagan')
    create_oath_credentials('pcsagan@gmail.com', 'pcsagan@gmail.com', '103073108249665446741')
    create_oath_credentials('pcsagan@gmail.com', 'patillac@gmail.com', '111750220520640607432')


def remake(test_data=False):
    """Recreates the database. Populates with test data if flask is
    run with --debug flag set.

    Args:
        test_data (bool, optional): Populate database with test data. Defaults
                                    to False.
    """
    path = Path(current_app.config['SQLALCHEMY_DATABASE_URI'][10:])
    if path.is_file():
        db.session.remove()
        db.drop_all()
    else:
        # make the parent directories of the database file if they don't exist
        path.parent.mkdir(parents=True, exist_ok=True)
        # make the database file
        current_app.logger.debug(f'Creating {path}...')
    db.create_all()
    current_app.logger.debug('Database created!')
    if test_data or current_app.debug:
        populate_db()
