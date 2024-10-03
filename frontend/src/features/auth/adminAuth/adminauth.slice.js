import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "../adminAuth/adminService"


const initialState={
    users:[],
    isError:false,
    isSucess:false,
    isLoading:false,
    message:""

}

export const getAllUser=createAsyncThunk("adminAuth/getallUser",async(_,thunkAPI)=>{
    try { 
      
       const response=await adminAuthService.getAllUsers()
       console.log("response",response)
       return response
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editUser=createAsyncThunk("adminAuth/AdminEditUser",async(user,thunkAPI)=>{
    try {

        const response=await adminAuthService.AdminEditUsers(user)
        console.log(response);
        
        return response
        
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})
export const deleteuser=createAsyncThunk("adminAuth/AdminUseDelete",async(user,thunkAPI)=>{
    try {
        console.log("response",user)
        const respose=await adminAuthService.AdminDelteUser(user)
        return respose
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const createAdminUser=createAsyncThunk("adminAuth/AdminCreateUser",async(user,thunkAPI)=>{
    try {
        const response=await adminAuthService.adminCreateUser(user)
        console.log("res",response) 
        return response
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminAuthSlice=createSlice({
    name:"adminAuth",
    initialState,
    reducers:{reset:(state)=>{
        state.isError=false
        state.isLoading=false
        state.isSucess=false
        state.message=""
    }},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUser.pending,(state)=>{
          state.isLoading=true
        })
        .addCase(getAllUser.fulfilled,(state,action)=>{
            state.isSucess=true
            state.isLoading=false
            state.users=action.payload
        })
        .addCase(getAllUser.rejected,(state,action)=>{
            console.log("neeryeyyeyyy")
            state.isError=true
            state.isLoading=false
            state.message=action.payload
            state.users=null
        })
        .addCase(editUser.pending,((state)=>{
            console.log(state.isLoading)
            state.isLoading=true
        }))
        .addCase(editUser.fulfilled,(state,action)=>{
            console.log("acc",action.payload)
            state.isLoading=false
            state.isSucess=true
            state.users = state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
             );
             console.log("acc",action.payload)
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
            state.message=action.payload
           
        })
        .addCase(deleteuser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteuser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.users = state.users.filter(user => user._id !== action.meta.arg)
        })
        .addCase(deleteuser.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(createAdminUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createAdminUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true 
            state.users.push(action.payload)
        })
        .addCase(createAdminUser.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
            state.isError=true
        })
        
    }
})
export default adminAuthSlice.reducer