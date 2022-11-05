import { createSlice } from "@reduxjs/toolkit"

export const Token = createSlice({
    name : "Token",
    initialState : {},
    reducers:{
        update : (state,action) => {
            return state = action.payload
        }
    }
})

export const { update } = Token.actions

export default Token.reducer