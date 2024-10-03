import { configureStore } from '@reduxjs/toolkit';
import authReducer  from "../features/auth/authSlice"
import adminAuthSlice  from "../features/auth/adminAuth/adminauth.slice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    adminAuth: adminAuthSlice
  },
});
