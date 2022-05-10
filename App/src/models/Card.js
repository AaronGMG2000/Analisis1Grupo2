class Card {
  constructor({ id, numero, final_numero, nombre, fecha_expiracion, monto }) {
    this.id = id
    this.number = numero
    this.finalNumber = final_numero
    this.name = nombre
    this.expiration = fecha_expiracion
    this.balance = monto
    this.formattedBalance = `Q.${monto.toFixed(2)}`
  }
}

export default Card
