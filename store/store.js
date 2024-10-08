import { configureStore } from '@reduxjs/toolkit'
import purchaseSlice from '../features/purchase/purchaseSlice'
import  postPurchaseSlice  from '../features/purchase/newPurchaseOrderSlice'
import supplierListSlice from '../features/purchase/supplierListSlice'
import materialListSlice from '../features/purchase/materialListSlice'
import batchSlice from '../features/Batches/batchSlice'
import segregation from '../features/Segregation/segregation'
import baling from '../features/Bale/baleSlice'
import saleSlice from '../features/Sale/saleSlice'

export const store = configureStore({
  reducer: {
    purchaseList:purchaseSlice,
    newOrder:postPurchaseSlice,
    supplierList:supplierListSlice,
    materialList: materialListSlice,
    batchList: batchSlice,
    segregation:segregation,
    bale:baling,
    sale:saleSlice
  },
  
})