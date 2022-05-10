import os
from dotenv import load_dotenv
load_dotenv()

bd_credentials = {
    "host": os.getenv('DB_HOST'),
    "db": os.getenv('DB_NAME'),
    "user": os.getenv('DB_USER'),
    "password": os.getenv('DB_PASS')
}