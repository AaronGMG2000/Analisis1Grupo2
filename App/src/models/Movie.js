import { Language } from 'models'

class Movie {
  constructor({ id, nombre, imagen, precio_renta, idiomas, activa }) {
    this.id = id
    this.name = nombre
    this.picture = imagen
    this.price = precio_renta
    this.formattedPrice =  `Q.${precio_renta.toFixed(2)}`
    this.languages = idiomas.map((language) => new Language(language))
    this.active = activa
  }
}

export default Movie
