import { useAtom } from 'jotai'
import { shoppingHistoryAtom, userAtom, shoppingHistoryAdminAtom } from 'atoms'
import { useRequest } from 'hooks'
import { ShoppingHistory,ShoppingHistoryAdmin } from 'models'

function useHistory() {
  const [user] = useAtom(userAtom)
  const [shoppings, setShoppings] = useAtom(shoppingHistoryAtom)
  const [shoppingsAdmin, setShoppingsAdmin] = useAtom(shoppingHistoryAdminAtom)
  const request = useRequest('history')

  const handleGetUserShoppings = (userId = user.id) =>
    request('GET', `/${userId}`, null, false).then((response) => {
    setShoppings(response.map((shoppings) => new ShoppingHistory(shoppings)))
    })

    const handleGetAllUserShoppings = () =>
    request('GET', `/all`, null, false).then((response) => {
      setShoppingsAdmin(response.map((shoppingsAdmin) => new ShoppingHistoryAdmin(shoppingsAdmin)))
    })

  return {
    shoppings,
    shoppingsAdmin,
    handleGetUserShoppings,
    handleGetAllUserShoppings
  }  

}

export default useHistory
