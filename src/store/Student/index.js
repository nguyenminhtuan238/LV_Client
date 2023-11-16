import AuthAPI from '@/services/auth.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
  export const updateStudent = createAsyncThunk('Student/update', async (payload) => {
    try {
       await AuthAPI.update(payload);
      const Get=await AuthAPI.get()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          await AuthAPI.update(payload);
          const Get=await AuthAPI.get()
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
  export const getStudent = createAsyncThunk('Student/Get', async () => {
    try {
      const res=await AuthAPI.get()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const res=await AuthAPI.get()
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
  export const GetALLHS = createAsyncThunk('Student/GetALL', async () => {
    try {
      const res = await AuthAPI.GetALL();
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await AuthAPI.GetALL();
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
  export const SearchHS = createAsyncThunk('Student/SearchHSL', async (payload) => {
    try {
      const res = await AuthAPI.SearchST(payload);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await AuthAPI.SearchST(payload);
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
const Student = createSlice({
  name: 'Student',
  initialState: {
    Student: {},
    isloading:false,
    error:null,
  },
  reducers: {
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getStudent.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getStudent.fulfilled,(state,action)=>{
        state.Student=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getStudent.rejected,(state,action)=>{
        state.Student={},
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(updateStudent.fulfilled,(state,action)=>{
        state.Student=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateStudent.rejected,(state,action)=>{
        state.Student={},
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(GetALLHS.fulfilled,(state,action)=>{
        state.Student=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(GetALLHS.rejected,(state,action)=>{
        state.Student={},
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(SearchHS.fulfilled,(state,action)=>{
        state.Student=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(SearchHS.rejected,(state,action)=>{
        state.Student={},
        state.isloading=false,
        state.error=action.error
      })
    
    
  }
});
export default Student.reducer
