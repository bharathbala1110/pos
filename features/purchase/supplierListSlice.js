    import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
    import axios from "axios";
    import { getSupplierList } from "../../services/purchaseService";

    const initialState={
        isLoading:false,
        supplierList:[],
        message: ""
    }

    export const getSupplier=createAsyncThunk('supplier/supplierFordropdown',async(_,thunkApi)=>{
        try{

        
        const res=await getSupplierList()
        //   console.log(res)
        return res
        }
        catch(e){
            return thunkApi.rejectWithValue(e.message)
        }
    })
    export const supplierListSlice=createSlice({
        name:'supplierList',
        initialState,
        reducers:{
        
        },
        extraReducers:(builder)=>{
            builder.addCase(getSupplier.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getSupplier.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.supplierList=action.payload
            })
            .addCase(getSupplier.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.supplierList=[]
            })
            
        }
    })

    export default supplierListSlice.reducer;