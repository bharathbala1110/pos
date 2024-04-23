import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPurchaseList } from "../../services/purchaseService";



const initialState={
    purchaseOrderList:[],
    isLoading:false,
    message: ""
}
export const getPurchaseList=createAsyncThunk('purchase/purchaseList',async(data,thunkApi)=>{
    try{
      const res=await fetchPurchaseList()
    //   console.log(res)
      return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const purchaseSlice=createSlice({
    name:'purchaseList',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getPurchaseList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPurchaseList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.purchaseOrderList=action.payload
        })
        .addCase(getPurchaseList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.purchaseOrderList=[]
        })
    }
})


export default purchaseSlice.reducer;