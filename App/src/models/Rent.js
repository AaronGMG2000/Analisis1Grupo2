import { Movie } from 'models'

class Rent {
  constructor({
    id,
    dias_alquiler,
    dias_extra,
    llave_alquiler,
    multa,
    fecha_inicio,
    fecha_fin,
    pelicula
  }) {
    this.id = id
    this.rentDays = dias_alquiler
    this.extraDays = dias_extra
    this.key = llave_alquiler
    this.fine = multa
    this.startDate = new Date(fecha_inicio)
    this.endDate = new Date(fecha_fin)
    this.movie = new Movie(pelicula)
  }
}

export default Rent
