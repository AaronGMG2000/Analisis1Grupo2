import pymysql
from app.utils.settings import bd_credentials as credentials

try:
    connection = pymysql.connect(**credentials)
except pymysql.Error as e:
    print("Ocurrió un error al conectar a MySQL: ", e)