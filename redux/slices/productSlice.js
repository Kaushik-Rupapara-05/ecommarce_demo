import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'listOfProduct',
    initialState: {
        singleProductData: [],
        categoryList: [],
        categorysPeoductDataList: {},
    },
    reducers: {
        SingleProductData: (state, action) => {
            state.singleProductData = action.payload
        },
        categoryListUpdate: (state, action) => {
            state.categoryList = action.payload
        },
        categorysPeoductData: (state, action) => {
            state.categorysPeoductDataList = action.payload
        }
    }
})
export const { SingleProductData, categoryListUpdate, categorysPeoductData } = productSlice.actions
export default productSlice.reducer