import { useAtom } from 'jotai'
import { cardsAtom, userAtom } from 'atoms'
import { useRequest } from 'hooks'
import { Card } from 'models'
import { useEffect } from 'react'

function useCard() {
  const [user] = useAtom(userAtom)
  const [cards, setCards] = useAtom(cardsAtom)
  const request = useRequest('card')

  const handleGetCards = (userId = user.id) =>
    request('GET', `/user_card/${userId}`, null, false).then((response) => {
      setCards(response.map((card) => new Card(card)))
    })

  const handleCreateCard = ({ number, name, expiration, balance }) =>
    request('POST', '/new_card', {
      numero: String(number),
      nombre: name,
      fecha_expiracion: expiration,
      monto: balance,
      id_usuario: user.id
    })
      .then(() => {
        handleGetCards()
        return true
      })
      .catch(() => {
        return false
      })

  const handleAddFunds = ({ cardId, amount }) =>
    request('POST', '/recharge_card', {
      id_tarjeta: cardId,
      monto_recarga: amount
    })
      .then(() => {
        handleGetCards()
        return true
      })
      .catch(() => {
        return false
      })

  return {
    cards,
    handleGetCards,
    handleCreateCard,
    handleAddFunds
  }
}

export default useCard
