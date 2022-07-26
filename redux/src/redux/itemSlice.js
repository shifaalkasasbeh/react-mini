import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from 'sweetalert2';



export const getItems = createAsyncThunk(
    'item/getItems',
    async ()=>{
        const api = await fetch('http://127.0.0.1:8000/api/items');
        const response = await api.json();

        return response;
    }
);

export const addItem = createAsyncThunk(
    'item/addItem',
    async (item , thunkAPI)=>{
 
        const response = await axios.post('http://127.0.0.1:8000/api/add_item',item);
        
        if(response.status ==200){
            // Swal.fire({
            //     title: "Item",
            //     text: "Has been Added Successfully",
            //     type: "success"
            // });
        }
        return response.data;
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (args)=>{
       
        const id = args.id;
        const response =await fetch(`http://127.0.0.1:8000/api/update_item/${id}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({name:args.name , description:args.description}),
        })
        
        if(response.ok){
            // Swal.fire({
            //     title: "Item",
            //     text: "Has been updated Successfully",
            //     type: "success"
            // });
        }
        const res = response.json();
        return res;
    }
);

export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (id)=>{
        
        const response =await fetch(`http://127.0.0.1:8000/api/delete_item/${id}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            
        })
        if(response.ok){
            // Swal.fire({
            //     title: "Item",
            //     text: "Has been deleted Successfully",
            //     type: "success"
            // });
        }
        const res = response.json();
        return res;
        
    }
)

const itemSlice = createSlice({
    name:'item',
    initialState:{items:[] , status:null},
    extraReducers:{
        //get item from api
        [getItems.fulfilled]:(state , action)=>{
            state.status = 'success fetch data';
            state.items = action.payload;

        },
        [getItems.pending]:(state  )=>{
            state.status = 'pending  fetch data';
            
        },
        [getItems.rejected]:(state )=>{
            state.status = 'rejected  fetch data';
        },

        //add item to api

        [addItem.fulfilled]:(state , action)=>{
            state.status = 'success send data';
            state.items.push(action.payload);
            

        },
        [addItem.pending]:(state  )=>{
            state.status = 'pending send data';
            
        },
        [addItem.rejected]:(state )=>{
            state.status = 'rejected send data';
        },


        //update item in api
        [updateItem.fulfilled]:(state , action)=>{
            state.status = 'success update data';
            const {id} = action.payload;
            const item = state.items.find((item)=>item.id == id);
            item.name = action.payload.name;
            item.description = action.payload.description;
            item.image = action.payload.image;
            
        },
        [updateItem.pending]:(state  )=>{
            state.status = 'pending update data';
            
        },
        [updateItem.rejected]:(state )=>{
            state.status = 'rejected update data';
        },


        //delete item in api
        [deleteItem.fulfilled]:(state , action)=>{
            state.status = 'success delete data';
            const {id} = action.payload;
             state.items = state.items.filter((item)=>item.id != id);
            
        },
        [deleteItem.pending]:(state  )=>{
            state.status = 'pending delete data';
            
        },
        [deleteItem.rejected]:(state )=>{
            state.status = 'rejected delete data';
        },

        
}
})

export default itemSlice.reducer;