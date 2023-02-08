def test_public(client):
    response = client.post('/public')
    assert response.json['answer'] == 42
    assert response.status_code == 200


def test_private_reject(client):
    response = client.post('/private')
    assert response.status_code == 401


def test_private_accept(client):
    signin_response = client.post('/auth/signin', json={
        'email': 'pcsagan@gmail.com',
        'password': 'test'
    })
    authorization = signin_response.json['authorization']
    private_response = client.post('/private', headers={
        'authorization': f'Bearer {authorization}'
    })
    assert private_response.status_code == 200
