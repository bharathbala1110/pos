import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postNewPurchase } from "../../services/purchaseService";

const initialState={
    isLoading:false,
    orderData:[],
    message: ""
}
export const postPurchase=createAsyncThunk('purchase/postOrder',async(data,thunkApi)=>{
    try{

        console.log("data",data)
      const res=await postNewPurchase(data)
    //   console.log(res)
      return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const postPurchaseSlice=createSlice({
    name:'newOrder',
    initialState,
    reducers:{
        PurchaseDetail:(state,action)=>{
         state.orderData= {...state.orderData,purchaseDetail:action.payload}
         
        },
        addMaterial:(state,action)=>{
        state.orderData={...state.orderData,materials:action.payload}
        },
        addDriverSign:(state,action)=>{
        state.orderData={...state.orderData,driverSignature:action.payload}
        },
        addSupplierSign:(state,action)=>{
        state.orderData={...state.orderData,supplierSignature:action.payload}
        }
     
    },
    extraReducers:(builder)=>{
        builder.addCase(postPurchase.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(postPurchase.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.orderData=action.payload
        })
        .addCase(postPurchase.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.orderData=[]
        })
    }
})
export const {PurchaseDetail,addMaterial,addSupplierSign,addDriverSign}=postPurchaseSlice.actions;
export default postPurchaseSlice.reducer;