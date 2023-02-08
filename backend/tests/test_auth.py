def test_signin_get_empty(client):
    response = client.get('/auth/signin', json={})
    assert response.status_code == 500


def test_signin_post_empty(client):
    response = client.post('/auth/signin', json={})
    assert response.status_code == 500


def test_signin_noexist(client):
    response = client.post('/auth/signin', json={
        'email': 'noexist@gmail.com',
        'password': 'test'
    })
    assert response.status_code == 500


def test_signin_bad_password(client):
    response = client.post('/auth/signin', json={
        'email': 'pcsagan@gmail.com',
        'password': 'foobar'
    })
    assert response.status_code == 500


def test_signin_bad_oath(client):
    response = client.post('/auth/signin', json={
        'email': 'patillac@gmail.com',
        'profile': '0'
    })
    assert response.status_code == 500


def test_signin_existing(client):
    response = client.post('/auth/signin', json={
        'email': 'pcsagan@gmail.com',
        'password': 'test'
    })
    assert 'authorization' in response.json
    assert response.status_code == 200


def test_signin_oath(client):
    response = client.post('/auth/signin', json={
        'email': 'patillac@gmail.com',
        'profile': '111750220520640607432'
    })
    assert 'authorization' in response.json
    assert response.json['email'] == 'pcsagan@gmail.com'
    assert response.status_code == 200
