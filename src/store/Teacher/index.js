import AuthAPI from '@/services/auth.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken } from '../user';
  export const updateTeacher = createAsyncThunk('Teacher/update', async (payload) => {
    try {
       await AuthAPI.updateTeacher(payload);
      const Get=await AuthAPI.getTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await AuthAPI.updateTeacher(payload);
      const Get=await AuthAPI.getTeacher()
          return Get.get;
         } catch (error) {
           console.log(error)
         }
      } else {
        console.log(error);
      }
      //throw error
    }
  });
  export const getidTeacher = createAsyncThunk('Teacher/Get', async () => {
    try {
      const res=await AuthAPI.getTeacher()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await AuthAPI.getTeacher()
         return res.get;
        } catch (error) {
          console.log(error)
         
        }
     } else {
       console.log(error);
     }
     //throw error
      //throw error
    }
  });
  export const getALLTeacher = createAsyncThunk('Teacher/GetALL', async () => {
    try {
      const res=await AuthAPI.GetALLTE()
      return res.get;
    } catch (error) {
      
       console.log(error);
     
     //throw error
      //throw error
    }
  });
const Teacher = createSlice({
  name: 'Teacher',
  initialState: {
    Teacher: {},
    isloading:false,
    error:null,
  },
  reducers: {
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getidTeacher.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getidTeacher.fulfilled,(state,action)=>{
        state.Teacher=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getidTeacher.rejected,(state,action)=>{
        state.Teacher={},
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getALLTeacher.fulfilled,(state,action)=>{
        state.Teacher=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getALLTeacher.rejected,(state,action)=>{
        state.Teacher={},
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(updateTeacher.fulfilled,(state,action)=>{
        state.Teacher=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateTeacher.rejected,(state,action)=>{
        state.Teacher={},
        state.isloading=false,
        state.error=action.error
      })
    
    
  }
});
export default Teacher.reducer
