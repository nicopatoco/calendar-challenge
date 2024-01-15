export const useLocalStorage = (key: string) => {
  const isBrowser = typeof window !== 'undefined'

  const setItem = (value: unknown) => {
    if (isBrowser) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(`Error: `, error)
      }
    }
  }

  const getItem = () => {
    if (isBrowser) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
      } catch (error) {
        console.log(error)
        return undefined
      }
    }
  }

  const removeItem = () => {
    if (isBrowser) {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return { setItem, getItem, removeItem }
}
