import { configureStore } from "@reduxjs/toolkit"
import  Token  from "./SliceRedux/user"


export default configureStore({
    reducer : {
        Token : Token
    }
})