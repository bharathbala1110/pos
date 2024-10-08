import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchBatchList,
  fetchMaterialList,
  postBatch,
} from '../../services/batchService';

const initialState = {
  batchList: [],
  materialList: [],
  batchPostData: [],
  isLoading: false,
  message: '',
};
export const postBatchData = createAsyncThunk(
  'batch/postData',
  async (data, thunkApi) => {
    try {
      const res = await postBatch(data);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const getBatchList = createAsyncThunk(
  'batch/batchList',
  async (_, thunkApi) => {
    try {
      const res = await fetchBatchList();
      //   console.log(res)
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const getMaterialList = createAsyncThunk(
  'batch/materialList',
  async (_, thunkApi) => {
    try {
      const res = await fetchMaterialList();
      //   console.log(res)
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const batchSlice = createSlice({
  name: 'batchList',
  initialState,
  reducers: {
    resetMaterialList: state => {
      state.materialList = [];
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBatchList.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.batchList = action.payload;
      })
      .addCase(getBatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.batchList = [];
      })
      .addCase(getMaterialList.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMaterialList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.materialList = action.payload;
      })
      .addCase(getMaterialList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.materialList = [];
      })
      .addCase(postBatchData.pending, state => {
        state.isLoading = true;
      })
      .addCase(postBatchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.batchPostData = action.payload;
      })
      .addCase(postBatchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.batchPostData = [];
      });
  },
});
export const {resetMaterialList} = batchSlice.actions;
export default batchSlice.reducer;
