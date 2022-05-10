from pydantic import BaseModel

class user_in(BaseModel):
    usuario: str
    correo: str
    nombre: str
    apellido: str
    contrasena: str
    dpi: str
    edad: int
    admin: int
    
class login_in(BaseModel):
    usuario: str
    contrasena: str