## Features
* [Node](https://github.com/nodejs/node)-based frontend
  * [Typescript](https://github.com/microsoft/TypeScript)
  * [ReactJS](https://github.com/facebook/react)
  * [NextJS](https://github.com/vercel/next.js)
  * [NextAuth](https://github.com/nextauthjs/next-auth) (soon)
  * [Material-UI](https://github.com/mui/material-ui)
* [Python](https://www.python.org/)-based backend
  * [Flask](https://github.com/pallets/flask)
  * [Flask-CORS](https://github.com/corydolphin/flask-cors)
  * [Flask-SQLAlchemy](https://github.com/pallets-eco/flask-sqlalchemy)
  * [Flask-JWT-Extended](https://github.com/vimalloc/flask-jwt-extended)
  * [Tox](https://github.com/tox-dev/tox) (Python 3.9, 3.10, and 3.11)
    * [Pytest](https://github.com/pytest-dev/pytest)
    * [Pytest-Coverage](https://github.com/pytest-dev/pytest-cov)
    * [Mypy](https://github.com/python/mypy)
    * [Flake8](https://github.com/PyCQA/flake8)
  * Separate requirements.txt (production) and requirements_dev.txt (development/testing) dependencies

## Usage
Start the frontend by launching `node` in a terminal

```
npm run dev
```

Start the backend by launching `flask` in a terminal

```
flask --debug run
```

### VSCode
Debug the application with the following `launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "cwd": "${workspaceFolder}/frontend",
      "command": "npm run dev",
      "name": "node",
      "request": "launch",
      "type": "node-terminal"
    },
    {
      "cwd": "${workspaceFolder}/backend",
      "name": "flask",
      "type": "python",
      "request": "launch",
      "module": "flask",
      "args": ["--debug", "run"],
      "jinja": true,
      "justMyCode": false,
      "consoleTitle": "flask"
    }
  ]
}
````

### Ports (development)

The frontend listens on port 80 because of the `--port 80` argument on the dev script in `package.json`

```json
{
  "scripts": {
    "dev": "next dev --port 80"
  }
}
```

The backend listens on port 1112 because of the `FLASK_RUN_PORT` environment variable in `.flaskenv`

```ini
FLASK_RUN_PORT=1122
```

## License

This project is licensed under the **MIT license**. Feel free to edit and distribute this template as you like.

See [LICENSE](LICENSE) for more information.
