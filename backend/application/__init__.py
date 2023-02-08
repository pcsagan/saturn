import logging
from flask import Flask
from flask_cors import CORS
from .config import DebugConfig, ProductionConfig, TestingConfig


def create_app(testing=False):
    """Creates the Flask app instance and initializes it.

    Args:
        testing (bool, optional): Testing flag. Defaults to False.

    Returns:
        Flask: The app.
    """
    app = Flask(__name__)

    if testing:
        app.config.from_object(TestingConfig)
    elif app.debug:
        app.config.from_object(DebugConfig)
    else:
        app.config.from_object(ProductionConfig)

    level = app.config['LOG_LEVEL']
    app.logger.setLevel(logging.getLevelName(level))

    from .main import main
    from .auth import auth
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')

    from .database import db, jwt
    db.init_app(app)
    jwt.init_app(app)

    from .cli import cli_init_app
    cli_init_app(app)

    CORS(app, supports_credentials=True)

    return app
