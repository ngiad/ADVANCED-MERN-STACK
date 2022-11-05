import React from 'react'
import {Provider} from "react-redux"
import StoreState from "../StoreState"

const ReduxProvider = ({children}) => {

  return (
    <Provider store={StoreState}>{children}</Provider>
  )
}

export default ReduxProvider