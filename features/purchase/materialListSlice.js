import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMaterialList } from "../../services/purchaseService";

const initialState={
    isLoading:false,
    materialList:[],
    message: ""
}

export const getMaterial=createAsyncThunk('purchase/materialList',async(_,thunkApi)=>{
    try{

    
    const res=await getMaterialList()
    //   console.log(res)
    return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const materialListSlice=createSlice({
    name:'materialList',
    initialState,
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder.addCase(getMaterial.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getMaterial.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.materialList=action.payload
        })
        .addCase(getMaterial.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.materialList=[]
        })
        
    }
})

export default materialListSlice.reducer;