from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes.auth import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all tables in the database

    print("Registered Routes:", app.url_map)

    app.run(host='0.0.0.0', port=5000, debug=True)
