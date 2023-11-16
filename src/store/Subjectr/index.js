import SubjectAPI from '@/services/subject.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import { RefreshADMINtoken } from '../user';
  export const AddSubject = createAsyncThunk('Subject/Add', async (payload) => {
    try {
      await SubjectAPI.Add(payload);
      const res=await SubjectAPI.Get()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
          await SubjectAPI.Add(payload);
          const res=await SubjectAPI.Get()          
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
  export const updateSubject = createAsyncThunk('Subject/update', async (payload) => {
    try {
    
       await SubjectAPI.Update(payload);
      const Get=await SubjectAPI.Get()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
           await SubjectAPI.Update(payload);
          const Get=await SubjectAPI.Get()
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
  export const deleteSubject = createAsyncThunk('Subject/delete', async (id) => {
    try {
       await SubjectAPI.Delete(id);
      const Get=await SubjectAPI.Get()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
           await SubjectAPI.Delete(id);
          const Get=await SubjectAPI.Get()
          return Get.get;
         } catch (error) {
           console.log(error)
         }
      }if(error.response.status === 405){
        const Get=await SubjectAPI.Get()
        throw new Error("Không có token",{Get})
      } 
      else {
        console.log(error);
      }
      //throw error
    }
  });
  export const searchSubject = createAsyncThunk('Subject/Search', async (search) => {
    try {
      const res = await SubjectAPI.search(search);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshADMINtoken()  
         const res = await SubjectAPI.search(search);
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
  export const GetSubject = createAsyncThunk('Subject/Get', async () => {
    try {
      const res = await SubjectAPI.Get();
      return res.get;
    } catch (error) {
     
       console.log(error);
     
     //throw error
      //throw error
    }
  });
  export const GetIDSubject = createAsyncThunk('Subject/GetbyID', async (id) => {
    try {
      const res = await SubjectAPI.Getid(id);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshADMINtoken()  
         const res = await SubjectAPI.Getid(id);
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
const list = createSlice({
  name: 'subject',
  initialState: {
    subject: {},
    subjectid:null,
    isloading:false,
    error:null,
  },
  reducers: {
    hiddenEditSubject:(state)=>{
     state.subjectid=null
    },
   
  },
  extraReducers:(builerUser)=>{
      builerUser.addCase(AddSubject.fulfilled,(state,action)=>{
          state.subject=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(AddSubject.rejected,(state,action)=>{
        state.subject=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(updateSubject.fulfilled,(state,action)=>{
        state.subject=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateSubject.rejected,(state,action)=>{
        state.subject=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(deleteSubject.fulfilled,(state,action)=>{
        state.subject=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deleteSubject.rejected,(state,action)=>{
        console.log(action.error)
        state.subject=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(searchSubject.fulfilled,(state,action)=>{
        state.subject=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(searchSubject.rejected,(state,action)=>{
        state.subject=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(GetSubject.fulfilled,(state,action)=>{
        state.subject=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(GetSubject.rejected,(state,action)=>{
        state.subject=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(GetIDSubject.fulfilled,(state,action)=>{
        state.subjectid=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(GetIDSubject.rejected,(state,action)=>{
        state.subjectid=null,
        state.isloading=false,
        state.error=action.error
      })
     
    
    
  }
});
export const {hiddenEditSubject}=list.actions
export default list.reducer
