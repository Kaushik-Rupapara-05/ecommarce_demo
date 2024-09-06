import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../configs/axios";
import { categoryListUpdate, categorysPeoductData, SingleProductData } from "../slices/productSlice";

export const singleProduct = createAsyncThunk("singleProduct", async ({ ID }, { dispatch }) => {
    try {
        const singleProductdata = await apiService.get(`/products/${ID}`)
        const finalResult = await singleProductdata.data
        dispatch(SingleProductData(finalResult))
        console.log(finalResult)
    } catch (error) {

    }
})

export const listOfcategory = createAsyncThunk("listOfcategory", async ({ loader }, { dispatch }) => {
    try {
        const listofProductdata = await apiService.get('/products/category-list')
        const finalResult = await listofProductdata.data
        dispatch(categoryListUpdate(finalResult))
        if (finalResult) {
            loader(false)
        }
    } catch (error) {
        loader(false)
    }
})

export const CategorysProducts = createAsyncThunk("CategorysProducts", async ({ category, loader }, { dispatch }) => {
    try {
        const productData = await apiService.get(`products/category/${category}`)
        const finaldata = await productData.data
        dispatch(categorysPeoductData(finaldata))
        if (finaldata) {
            loader(false)
        }
    } catch (error) {
        loader(false)

    }
})

export const sortedData = createAsyncThunk("sortedData", async ({ query, category }, { dispatch }) => {
    try {
        const productData = await apiService.get(`/products/category/${category}`, { params: { ...query } })
        const finaldata = await productData.data
        dispatch(categorysPeoductData(finaldata))
    } catch (error) {

    }
})