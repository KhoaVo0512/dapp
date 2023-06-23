import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../config/api/auth.api';

const localstorage ={
    user_info:'user',
    token:'token',
    refresh_token: "refresh_token",
    expiredAt:'expires',
}


export const register:any = createAsyncThunk('/auth/register', async (formdatasubmit,{rejectWithValue}) => {  
    try {
        const response = await authAPI.register(formdatasubmit);    
        return response; 
    }
    catch (error) {
        return rejectWithValue(error);
    }
})
export const sendmail:any = createAsyncThunk('/auth/get-verify-email-code', async (formdatasubmit,{rejectWithValue}) => {  
    try {      
        const response = await authAPI.sendotp(formdatasubmit);   
        return response; 
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

// Verify Code Forgot
export const sendmailForgot:any = createAsyncThunk('/auth/get-verify-forgot-password', async (formdatasubmit,{rejectWithValue}) => {  
    try {      
        const response = await authAPI.sendotpForgot(formdatasubmit);   
        return response; 
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

// Send verify code ForgotPassword 
export const verifycodeforgot:any = createAsyncThunk('/auth/forgot-password', async (formdatasubmit,{rejectWithValue}) => {  
    try {
        const response = await authAPI.forgotPassword(formdatasubmit);    
        return response; 
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const login:any = createAsyncThunk('/auth/login', async (formsubmit, thunkAPI) => {
    try {
        const response = await authAPI.login(formsubmit);
        return response
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// eslint-disable-next-line consistent-return
const handleFullFiled = (action)=>{
     // eslint-disable-next-line camelcase
     const {user_info} = action?.payload?.data;    
    localStorage.setItem('user_info', JSON.stringify(user_info));   
}
const handleRejected = (state,action)=>{    
    state.profile= action?.payload?.data   
}

const auth = createSlice({     
    name: 'auth', 
    initialState: typeof window !== "undefined"  ? { profile: JSON.parse(localStorage.getItem('user')) || { profile: '' } } : {},
    reducers: {
       unauthorizes: (state)=>{
        state.profile={}
        localStorage.removeItem(localstorage.user_info)
        localStorage.removeItem(localstorage.token)
        localStorage.removeItem(localstorage.expiredAt)
       } 
    },
    extraReducers: {
        [register.fulfilled]:handleFullFiled,
        [register.rejected]:handleRejected,
        [login.fulfilled]:handleFullFiled,
        [login.rejected]:handleRejected,     
    }
})


export const {unauthorizes}= auth.actions
const generateauthReducer  = auth.reducer;
export default generateauthReducer;
