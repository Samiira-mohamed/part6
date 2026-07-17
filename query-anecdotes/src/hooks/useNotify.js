import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotify = () => {
  const { setNotification } = useContext(NotificationContext)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return notify
}