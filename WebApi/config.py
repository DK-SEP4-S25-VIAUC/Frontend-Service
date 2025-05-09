import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        # Default to docker-compose Postgres service
        "DATABASE_URL", "postgresql://postgres:postgres@postgres:5432/appdb")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")
