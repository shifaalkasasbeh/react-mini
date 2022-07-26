import {configureStore} from '@reduxjs/toolkit'
import item from './itemSlice';
import user from './userSlice'


export const store = configureStore({
    reducer:{
        item,user,
    }
})