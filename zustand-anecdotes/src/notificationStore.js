import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create(set => ({
  notification: '',
  actions: {
    setNotification: (message) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      set(() => ({ notification: message }))
      timeoutId = setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000)
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)