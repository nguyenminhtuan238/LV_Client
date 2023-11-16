import ClassAPI from '@/services/class.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {  RefreshTeachertoken, Refreshtoken } from '../user';
  export const updateClass = createAsyncThunk('Class/update', async (payload) => {
    try {
    
       await ClassAPI.Update(payload);
      const Get=await ClassAPI.GetTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
           await ClassAPI.Update(payload);
          const Get=await ClassAPI.GetTeacher()
          return Get.get;
         } catch (error) {
           console.log(error)
           if(error.response.status === 403){
            throw error.response.data
          } 
         }
      }
      if(error.response.status === 403){
        throw error.response.data
      } 
      else {
        console.log(error);
      }
      //throw error
    }
  });
  export const deleteClass= createAsyncThunk('Class/delete', async (id) => {
    try {
       await ClassAPI.Delete(id);
      const Get=await ClassAPI.GetTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
           await ClassAPI.Delete(id);
          const Get=await ClassAPI.GetTeacher()
          return Get.get;
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
  export const searchnameClass= createAsyncThunk('Class/Searchname', async (search) => {
    try {
      const res = await ClassAPI.Getbyname(search);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()
         const res = await ClassAPI.Getbyname(search);
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
  export const GetbyIDClass= createAsyncThunk('Class/GetID', async (id) => {
    try {
      const res = await ClassAPI.GetbyID(id);
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()
         const res = await ClassAPI.GetbyID(id);
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
  export const Getclass= createAsyncThunk('Class/getALL', async (payload) => {
    try {
      const res = await ClassAPI.GetALL(payload);
      return res;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const res = await  ClassAPI.GetALL(payload);
         return res;
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
  export const GetclassTeacher = createAsyncThunk('Class/GetIDTeacher', async () => {
    try {
      const res = await ClassAPI.GetTeacher();
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res = await ClassAPI.GetTeacher();
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
  export const SearchclassByHS = createAsyncThunk('Class/SearchClass', async (data) => {
    try {
      const res = await ClassAPI.SearchClass(data);
      return res.get;
    } catch (error) {
     
       console.log(error);
     
     //throw error
      //throw error
    }
  });
const Class = createSlice({
  name: 'Class',
  initialState: {
    Class: [],
    pagesize:1,
    Classid:[],
    isloadingid:false,
    isloading:false,
    error:null,
    check:false,
  },
  reducers: {
    handlecheck:(state)=>{
      state.check=!state.check
    }
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(updateClass.fulfilled,(state,action)=>{
        state.Class=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateClass.rejected,(state,action)=>{
        state.Class=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(deleteClass.fulfilled,(state,action)=>{
        state.Class=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deleteClass.rejected,(state,action)=>{
        state.Class=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(GetclassTeacher.fulfilled,(state,action)=>{
        state.Class=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(GetclassTeacher.rejected,(state,action)=>{
        state.Class=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(Getclass.fulfilled,(state,action)=>{
        state.Class=action.payload.get
        state.pagesize=action.payload.page
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(Getclass.rejected,(state,action)=>{
        state.Class=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(SearchclassByHS.fulfilled,(state,action)=>{
        state.Classid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(SearchclassByHS.rejected,(state,action)=>{
        state.Classid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(searchnameClass.fulfilled,(state,action)=>{
        state.Classid=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(searchnameClass.rejected,(state,action)=>{
        state.Classid=null,
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(GetbyIDClass.fulfilled,(state,action)=>{
        state.Classid=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(GetbyIDClass.rejected,(state,action)=>{
        state.Classid=null,
        state.isloading=false,
        state.error=action.error
      })
     
    
    
  }
});
export const {handlecheck}=Class.actions
export default Class.reducer
