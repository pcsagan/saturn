from flask import Blueprint, current_app, request
from flask_jwt_extended import jwt_required, current_user

main = Blueprint('main', __name__)


@main.after_app_request
def after_app_request(response):
    """Outputs debug information about every request and response.

    Args:
        response (Response): The response to the client.

    Returns:
        Response: The response to the client.
    """
    current_app.logger.debug(f'{request.remote_addr} {request.method} '
                             f'{request.scheme} {request.full_path} '
                             f'{response.status}')
    if 'Content-Type' in request.headers:
        if 'application/json' in request.headers['Content-Type']:
            current_app.logger.debug('Request JSON:')
            current_app.logger.debug(request.json)
    if 'Content-Type' in response.headers:
        if 'application/json' in response.headers['Content-Type']:
            current_app.logger.debug('Response JSON:')
            current_app.logger.debug(response.json)
    return response


@main.app_errorhandler(Exception)
def app_errorhandler(e):
    """Fallback exception handler for routes.

    Args:
        e (Exception): The exception that was thrown in the route.

    Returns:
        dict: Generic error message.
        int:  500
    """
    current_app.logger.error(f'{request.remote_addr} {request.method} '
                             f'{request.scheme} {request.full_path} '
                             '5xx INTERNAL SERVER ERROR')
    current_app.logger.exception(e)
    return {'error': 'internal server error'}, 500


@main.route('/public', methods=['POST'])
def public():
    return {"answer": 42}


@main.route('/private', methods=['POST'])
@jwt_required()
def private():
    return {"id": current_user.id_}
