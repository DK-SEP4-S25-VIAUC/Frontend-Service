from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received registration data:", data)
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 409
    user = User(username=data['username'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401

@auth_bp.route('/settings', methods=['GET'])
@jwt_required()
def get_settings():
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(settings=user.settings), 200

@auth_bp.route('/settings', methods=['PATCH'])
@jwt_required()
def update_settings():
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    new_settings = request.get_json()

    if user.settings is None:
        user.settings = {}

    user.settings.update(new_settings)
    db.session.commit()

    return jsonify({"message": "Settings updated", "settings": user.settings}), 200



@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@auth_bp.route('/testendpoint', methods=['GET'])
def test_endpoint():
    return jsonify({"message": "This is a test endpoint"}), 200
