import axios from 'axios'
import { API_URL } from 'constants/API'
import useAlert from 'hooks/useAlert'

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: () => true
})

function useRequest(baseUrl = '') {
  const { handleOpenAlert } = useAlert()

  return async (
    method,
    url,
    data,
    successMessage = true,
    errorMessage = true
  ) => {
    try {
      let targetUrl = `${baseUrl}${url}`
      if (!targetUrl.endsWith('/')) targetUrl += '/'

      const response = await customAxios.request({
        method,
        url: targetUrl,
        data
      })

      if (!response.data.success) throw new Error(response.data.message)

      if (successMessage) handleOpenAlert(response.data.message, 'success')

      return response.data.resource
    } catch (error) {
      if (errorMessage) handleOpenAlert(error.message, 'error')
      throw error
    }
  }
}

export default useRequest
