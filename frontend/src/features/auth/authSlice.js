import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServide"

const user=JSON.parse(localStorage.getItem("user"))

const initialState={
    user:user?user:null,
    isError:false,
    isSucess:false,
    isLoading:false,
    message:""
}
export const register=createAsyncThunk("auth/register",async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})
export const login=createAsyncThunk("auth/login",async(user,thunkAPI)=>{
    try {
       
        return await authService.login(user)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})
export const editUser=createAsyncThunk("auth/editUser",async(user,thunkAPI)=>{
    try {
        return await authService.editUser(user)
    
    } catch (error) {
      
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export  const logOut=createAsyncThunk("auth/logout",async()=>authService.logOut())

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
    reset:(state)=>{
        state.isError=false
        state.isSucess=false
        state.isLoading=false
        state.message=""
    },
    setUserRole: (state, action) => {
        if (state.user) {
          state.user.role = action.payload.role;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }  
  },
  
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isSucess=true
            state.isLoading=false
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
            state.message=action.payload
            state.user=null
        })
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isSucess=true
            state.isLoading=false
            state.user=action.payload
           
        })
        .addCase(login.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
            state.message=action.payload
            state.user=null
        })
        .addCase(editUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            const updateUser={
                ...state.user,
                ...action.payload
            }
            state.user=updateUser
            localStorage.setItem("user",JSON.stringify(updateUser))
           
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(logOut.fulfilled,(state)=>{
            state.user=null
        })
    }
})
export const  {reset}=authSlice.actions
export default authSlice.reducer