from os import environ, getcwd

class BaseConfig(object):
    LOG_LEVEL = "DEBUG"
    SECRET_KEY = "SECRET"
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{getcwd()}/db/app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    DEBUG_TB_ENABLED = False
    # use lowercase extensions
    ALLOWED_UPLOAD_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    IMAGE_EXTENSIONS = {'png'}


class DebugConfig(BaseConfig):
    SEND_FILE_MAX_AGE_DEFAULT = 0  # disable caching of static files


class ProductionConfig(BaseConfig):
    LOG_LEVEL = "WARNING"
    SECRET_KEY = "TEST"


class TestingConfig(BaseConfig):
    LOG_LEVEL = "NOTSET"
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{getcwd()}/db/test.db'
