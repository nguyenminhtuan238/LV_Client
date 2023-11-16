import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
import ExamAPI from '@/services/Exam.services';
import TestAPI from '@/services/test.setvices';
export const AddExam = createAsyncThunk('Exam/ADD', async (payload) => {
    try {
        
       await ExamAPI.Add(payload);
      const Get=await ExamAPI.GetbyTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ExamAPI.Add(payload);
          const Get=await ExamAPI.GetbyTeacher()
          
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
  export const updateExam = createAsyncThunk('Exam/update', async (payload) => {
    try {
      await ExamAPI.Update(payload);
      const Get=await ExamAPI.GetbyTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ExamAPI.Update(payload);
      const Get=await ExamAPI.GetbyTeacher()
          
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
  export const updateSTExam = createAsyncThunk('Exam/updateST', async (payload) => {
    try {
      await ExamAPI.UpdateStCH(payload);
      const Get=await ExamAPI.GetbyID(payload.id)
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ExamAPI.UpdateStCH(payload);
      const Get=await ExamAPI.GetbyID(payload.id)
          
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
  export const deleteExam = createAsyncThunk('Exam/delete', async (id) => {
    try {
      await TestAPI.DeleteKT(id)
      await ExamAPI.Delete(id);
      const Get=await ExamAPI.GetbyTeacher()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await TestAPI.DeleteKT(id)
          await ExamAPI.Delete(id);

          const Get=await ExamAPI.GetbyTeacher()
          
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
  export const getExamTeacher = createAsyncThunk('Exam/GetbyTeacher', async () => {
    try {
      const res=await ExamAPI.GetbyTeacher()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await ExamAPI.GetbyTeacher()
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
  export const getidExam = createAsyncThunk('Exam/GetidExam', async (id) => {
    try {
      const res=await ExamAPI.GetbyID(id)
    
      return res.get;
    } catch (error) {
     
       console.log(error);
      throw error
     //throw error
      //throw error
    }
  });
  export const getidClass= createAsyncThunk('Exam/GetidClass', async (id) => {
    try {
      const res=await ExamAPI.Getbyclass(id)
    
      return res.get;
    } catch (error) {
      if (error?.response?.status === 410) {
        try {
         await Refreshtoken()  
         const res=await ExamAPI.Getbyclass(id)
         return res.get;
        } catch (error) {
          console.log(error)
         
        }
      }
       console.log(error);
      throw error
     //throw error
      //throw error
    }
  });
const Exam = createSlice({
  name: 'Exam',
  initialState: {
    Exam: {},
    Examid:[],
    check:false,
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
 
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getExamTeacher.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getExamTeacher.fulfilled,(state,action)=>{
        state.Exam=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getExamTeacher.rejected,(state,action)=>{
        state.Exam=[],
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(updateExam.fulfilled,(state,action)=>{
        state.Exam=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateExam.rejected,(state,action)=>{
        state.Exam={},
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(updateSTExam.fulfilled,(state,action)=>{
        state.Examid=action.payload
        state.check=!state.check
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(updateSTExam.rejected,(state,action)=>{
        state.Examid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getidExam.fulfilled,(state,action)=>{
        state.Examid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidExam.rejected,(state,action)=>{
        state.Examid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getidClass.fulfilled,(state,action)=>{
        state.Examid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidClass.rejected,(state,action)=>{
        state.Examid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(AddExam.fulfilled,(state,action)=>{
        state.Exam=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(AddExam.rejected,(state,action)=>{
        state.Exam=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(deleteExam.fulfilled,(state,action)=>{
        state.Exam=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deleteExam.rejected,(state,action)=>{
        state.Exam=[],
        state.isloading=false,
        state.error=action.error
      })
    
    
  }
});
export default Exam.reducer
