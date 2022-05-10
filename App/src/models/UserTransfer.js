class UserTransfer {
  constructor({ id, usuario, correo, nombre, apellido, dpi, edad, admin}) {
    this.id = id
    this.usuario = usuario
    this.correo = correo
    this.nombre = nombre
    this.apellido = apellido
    this.dpi = dpi
    this.edad = edad
    this.admin = admin
  }
}

export default UserTransfer
