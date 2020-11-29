import React, { createContext, useContext, useState } from 'react'

interface IState {
  firstName: string
  lastName: string
  email: string
  hasPhone: boolean
  phoneNumber: string
  files: FileList | null
}

interface IContextProps {
  state: IState
  setState: React.Dispatch<React.SetStateAction<IState>>
}

const Context = createContext({} as IContextProps)

export const StateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IState>({
    firstName: '',
    lastName: '',
    email: '',
    hasPhone: false,
    phoneNumber: '',
    files: null
  })

  const value: IContextProps = { state, setState }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useContextValue = () => useContext(Context)
