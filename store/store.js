import { configureStore } from '@reduxjs/toolkit'
import purchaseSlice from '../features/purchase/purchaseSlice'
import  postPurchaseSlice  from '../features/purchase/newPurchaseOrderSlice'
import supplierListSlice from '../features/purchase/supplierListSlice'
import materialListSlice from '../features/purchase/materialListSlice'
import batchSlice from '../features/Batches/batchSlice'
import segregation from '../features/Segregation/segregation'

export const store = configureStore({
  reducer: {
    purchaseList:purchaseSlice,
    newOrder:postPurchaseSlice,
    supplierList:supplierListSlice,
    materialList: materialListSlice,
    batchList: batchSlice,
    segregation:segregation
  },
  
})