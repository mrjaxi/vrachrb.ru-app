import { createSlice } from "@reduxjs/toolkit";
import Storage from "../../storage/Storage";

const EstimateSlice = createSlice({
    name: "EstimateSlice",
    initialState: {
        body: "", 
        informative: 1,
        courtesy: 1
    },
    reducers: {
        addBodyText(state, action){
            state.body = action.payload
        },
        addInformative(state, action){
            state.informative = action.payload == 0 ? 1 : action.payload
        },
        addCourtesy(state, action){
            state.courtesy = action.payload == 0 ? 1 : action.payload
        }
    }
})

export default EstimateSlice.reducer
export const { addBodyText, addCourtesy, addInformative } = EstimateSlice.actions