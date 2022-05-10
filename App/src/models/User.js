class User {
  constructor(
    id,
    username,
    email,
    firstName,
    lastName,
    dpi,
    age,
    isLoggedIn = false,
    admin
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.dpi = dpi
    this.age = age
    this.isLoggedIn = isLoggedIn
    this.admin = admin
  }

  login({ id, usuario, correo, nombre, apellido, dpi, edad, admin }) {
    const newUser = new User(
      id,
      usuario,
      correo,
      nombre,
      apellido,
      dpi,
      edad,
      true,
      Boolean(admin)
    )
    localStorage.setItem('movies-user', JSON.stringify(newUser))
    return newUser
  }

  logout() {
    localStorage.removeItem('movies-user')
    return new User()
  }

  update({ usuario, correo, nombre, apellido, dpi, edad }) {
    usuario = usuario || this.username
    correo = correo || this.email
    nombre = nombre || this.firstName
    apellido = apellido || this.lastName
    dpi = dpi || this.dpi
    edad = edad || this.age

    localStorage.setItem(
      'movies-user',
      JSON.stringify({
        id: this.id,
        username: usuario,
        email: correo,
        firstName: nombre,
        lastName: apellido,
        dpi,
        age: edad,
        isLoggedIn: true,
        admin: this.admin
      })
    )

    return new User(
      this.id,
      usuario,
      correo,
      nombre,
      apellido,
      dpi,
      edad,
      true,
      this.admin
    )
  }

  recover({ id, username, email, firstName, lastName, dpi, age, admin }) {
    return new User(
      id,
      username,
      email,
      firstName,
      lastName,
      dpi,
      age,
      true,
      admin
    )
  }
}

export default User
