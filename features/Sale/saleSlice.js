import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSaleList } from "../../services/saleService";



const initialState={
    saleList:[],
    isLoading:false,
    message: ""
}

export const getSaleList=createAsyncThunk('sale/saleList',async(data,thunkApi)=>{
    try{
      const res=await fetchSaleList()
    //   console.log(res)
      return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})

export const saleSlice=createSlice({
    name:'saleList',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getSaleList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSaleList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.saleList=action.payload
        })
        .addCase(getSaleList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.saleList=[]
        })
    }
})


export default saleSlice.reducer;