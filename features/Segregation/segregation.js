

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchBatchList } from "../../services/segregationService";

const initialState={
    isLoading:false,
    isError:false,
    segregationBatchList:[],
    message: ""
}


export const getSegregationBatchList=createAsyncThunk('segregation/segregationBatchList',async(_,thunkApi)=>{
    try{

    
    const res=await fetchBatchList()
    //   console.log(res)
    return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})


export const segregationSlice=createSlice({
    name:'segregation',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getSegregationBatchList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSegregationBatchList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.segregationBatchList=action.payload
        })
        .addCase(getSegregationBatchList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.segregationBatchList=[]
        })
    }
})


export default segregationSlice.reducer;