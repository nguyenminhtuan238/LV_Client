import AuthAPI from '@/services/auth.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshADMINtoken, RefreshTeachertoken } from '../user';
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
  export const getpageTeacher = createAsyncThunk('Teacher/Getpage', async (payload) => {
    try {
      const res=await AuthAPI.GetALLTE(payload)
      return res;
    } catch (error) {
      
       console.log(error);
     
     //throw error
      //throw error
    }
  });
  export const SearchGD = createAsyncThunk('Teacher/SearchGD', async (payload) => {
    try {
      const res = await AuthAPI.SearchGD(payload);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
          const res = await AuthAPI.SearchGD(payload);
          return res.get;
         } catch (error) {
           console.log(error)
         
         }
      }
     else {
        console.log(error);
      }
      //throw error
    }
  });
const Teacher = createSlice({
  name: 'Teacher',
  initialState: {
    Teacher: {},
    Teacherpage:[],
    page:1,
    isloadingpage:false,
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
      builerUser.addCase(getpageTeacher.fulfilled,(state,action)=>{
        state.Teacherpage=action.payload.get
        state.page=action.payload.page
        state.isloadingpage=true
        state.error=null
      }),
      builerUser.addCase(getpageTeacher.rejected,(state,action)=>{
        state.Teacherpage=[],
        state.page=1,
        state.isloadingpage=false,
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
      }),
      builerUser.addCase(SearchGD.fulfilled,(state,action)=>{
        state.Teacherpage=action.payload
        state.isloadingpage=true
        state.error=null
      }),
      builerUser.addCase(SearchGD.rejected,(state,action)=>{
        state.Teacherpage=[],
        state.isloadingpage=false,
        state.error=action.error
      })
    
  }
});
export default Teacher.reducer
