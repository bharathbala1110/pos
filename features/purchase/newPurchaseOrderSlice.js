import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {postFile, postNewPurchase} from '../../services/purchaseService';

const initialState = {
  isLoading: false,
  orderData: [],
  postFile:[],
  message: '',
};

export const postPurchase = createAsyncThunk(
  'purchase/postOrder',
  async (data, thunkApi) => {
    try {
      if(data.photoUri){
        var filePath=data.photoUri
      }
      console.log("filePath",filePath)
      const formData = new FormData();
      formData.append("data",JSON.stringify(data))
      console.log('json data', data);
          formData.append('photo', {
          uri: `file://${filePath}`,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
         const response = await axios.post('http://192.168.1.4:2000/api/purchase', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      // const res = await postNewPurchase(data);
      //   console.log(res)
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const getPostFile = createAsyncThunk(
  'purchase/postFile',
  async (data, thunkApi) => {
    try {
      console.log("getPostFile")
      // console.log('data', data);
      const res = await postFile(data);
      console.log(res)
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const postPurchaseSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    PurchaseDetail: (state, action) => {
      state.orderData = {...state.orderData, purchaseDetail: action.payload};
    },
    addMaterial: (state, action) => {
      state.orderData = {...state.orderData, materials: action.payload};
    },
    addDriverSign: (state, action) => {
      state.orderData = {...state.orderData, driverSignature: action.payload};
    },
    addSupplierSign: (state, action) => {
      state.orderData = {...state.orderData, supplierSignature: action.payload};
    },
    addPhotoUri: (state, action) => {
      state.orderData = {...state.orderData, photoUri: action.payload};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postPurchase.pending, state => {
        state.isLoading = true;
      })
      .addCase(postPurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderData = action.payload;
      })
      .addCase(postPurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.orderData = [];
      })
      .addCase(getPostFile.pending, state => {
        state.isLoading = true;
        console.log("pending")
      })
      .addCase(getPostFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postFile = action.payload;
        console.log("fullfilled")
      })
      .addCase(getPostFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.postFile = [];
        console.log("rejected")
      });
  },
});
export const {PurchaseDetail, addMaterial, addSupplierSign, addDriverSign,addPhotoUri} = postPurchaseSlice.actions;
export default postPurchaseSlice.reducer;
