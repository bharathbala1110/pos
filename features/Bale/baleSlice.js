import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchBaleDropdownList, fetchBaleList, fetchBaleMaterial } from "../../services/baleService";



const initialState={
    baleList:[],
    baleMaterial:[],
    baleDropdownList:[],
    baleData:[],
    isLoading:false,
    message: ""
}
export const getBaleList=createAsyncThunk('bale/baleList',async(data,thunkApi)=>{
    try{
      const res=await fetchBaleList()
      return res
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getbaleMaterial = createAsyncThunk(
    'bale/baleMaterial',
    async (_, thunkApi) => {
      try {
        const res = await fetchBaleMaterial();
        return res;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    },
  );
  export const getbaleDropdown = createAsyncThunk(
    'bale/baleDropdown',
    async (_, thunkApi) => {
      try {
        const res = await fetchBaleDropdownList();
        return res;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    },
  );
export const baleSlice=createSlice({
    name:'baleList',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getBaleList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBaleList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.baleList=action.payload
        })
        .addCase(getBaleList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.baleList=[]
        })
        .addCase(getbaleMaterial.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getbaleMaterial.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.baleMaterial=action.payload
        })
        .addCase(getbaleMaterial.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.baleMaterial=[]
        })
        .addCase(getbaleDropdown.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getbaleDropdown.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.baleDropdownList=action.payload
      })
      .addCase(getbaleDropdown.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.baleDropdownList=[]
      })
    }
})


export default baleSlice.reducer;