from app.utils.settings import bd_credentials as credentials
from app.models.user import user_in, login_in
import pymysql
from hashlib import md5
error_message = 'Ocurrio un error inesperado'

def new_user(user: user_in):
    encrypted_password = md5(user.contrasena.encode("utf-8")).hexdigest()
    status = True
    message = 'Creación exitosa'
    try:
        connection = pymysql.connect(**credentials)
        with connection.cursor() as cursor:
            query = "INSERT INTO usuario(usuario, correo, nombre, apellido, contrasena, dpi, edad, admin) VALUES ('{}','{}','{}','{}','{}','{}',{}, {});".format(
                user.usuario, user.correo, user.nombre, user.apellido, encrypted_password, user.dpi, user.edad, user.admin)
            cursor.execute(query)
            connection.commit()
    except Exception as e:
        print(e)
        status = False
        message = error_message
        connection.rollback()
    finally:
        connection.close()
    return {'success': status, 'message': message}

def login(credential: login_in):
    encrypted_password = md5(credential.contrasena.encode("utf-8")).hexdigest()
    status = True
    message = 'Inicio de sesión exitosa'
    resource = {}
    try:
        connection = pymysql.connect(**credentials)
        with connection.cursor() as cursor:
            query = "SELECT * FROM usuario WHERE usuario = '{a}' or correo = '{a}';".format(
                a=credential.usuario)
            cursor.execute(query)
            user = cursor.fetchone()
        if user is None:
            status = False
            message = 'El usuario no existe'
        else:
            if encrypted_password == user[5]:
                resource = {
                    'id': user[0],
                    'usuario': user[1],
                    'correo': user[2],
                    'nombre': user[3],
                    'apellido': user[4],
                    'dpi': user[6],
                    'edad': user[7],
                    'admin': user[9]
                }
            else:
                status = False
                message = 'Contraseña incorrecta'
    except Exception as e:
        print(e)
        status = False
        message = 'Ocurrió un error inesperado'
        connection.rollback()
    finally:
        connection.close()
    return {'success': status, 'message': message, 'resource': resource}

def get_user_data(id):
    status = True
    message = 'Usuario recuperado'
    resource = {}
    try:
        connection = pymysql.connect(**credentials)
        with connection.cursor() as cursor:
            query = "SELECT * FROM usuario WHERE id = {};".format(
                id)
            cursor.execute(query)
            user = cursor.fetchone()
        if user is None:
            status = False
            message = 'El usuario no existe'
        else:
            resource = {
                'id': user[0],
                'usuario': user[1],
                'correo': user[2],
                'nombre': user[3],
                'apellido': user[4],
                'dpi': user[6],
                'edad': user[7],
                'admin': user[9]
            }
    except Exception as e:
        print(e)
        status = False
        message = 'Ocurrió un error inesperado'
        connection.rollback()
    finally:
        connection.close()
    return {'success': status, 'message': message, 'resource': resource}