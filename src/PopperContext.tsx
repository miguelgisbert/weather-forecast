import { createContext, useState, useContext, ReactNode } from 'react'
import { FormToShow } from './types'

interface PopperContextProps {
    formToShow: string
    setFormToShow: (form: FormToShow) => void
}


interface UserProviderProps {
    children: ReactNode
  }
  
const PopperContext = createContext<PopperContextProps | undefined>(undefined)
  
export const PopperProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [formToShow, setFormToShow] = useState<FormToShow>('none')
  
    return (
      <PopperContext.Provider value={{ formToShow, setFormToShow }}>
        {children}
      </PopperContext.Provider>
    )
}
  
export const usePopper = () => {
    const context = useContext(PopperContext)
    if (context === undefined) {
      throw new Error('usePopper must be used within a PopperProvider')
    }
    return context
}