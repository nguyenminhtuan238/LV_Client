import AnswerAPI from '@/services/answer.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
  export const updateAnswer= createAsyncThunk('Answer/update', async (payload) => {
    try {
       await AnswerAPI.Update(payload);
       
       const Get=await AnswerAPI.Getbyid(payload.idCH)
       return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await AnswerAPI.Update(payload);
          const Get=await AnswerAPI.Getbyid(payload.idCH)
          
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
  export const DeleteAnswer = createAsyncThunk('Answer/Delete', async (payload) => {
    try {
        await AnswerAPI.Delete(payload.id);
        const Get=await AnswerAPI.Getbyid(payload.idCH)
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await AnswerAPI.Delete(payload.id);
          const Get=await AnswerAPI.Getbyid(payload.idCH)
          
          return Get.get;
         } catch (error) {
           console.log(error)
           
         }
      } else {
        if(error.response.status===412){
          throw error.response.data
        }
        console.log(error);
      }
      //throw error
    }
  });
  export const getbyidAnswer = createAsyncThunk('Answer/GetbyidQuestion', async (id) => {
    try {
        const res=await AnswerAPI.Getbyid(id)
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await AnswerAPI.Getbyid(id)
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
  export const getidAnswer = createAsyncThunk('Answer/Getid', async (id) => {
    try {
        const res=await AnswerAPI.Getid(id)
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await AnswerAPI.Getid(id)
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
  export const getALLidAnswer = createAsyncThunk('Answer/GetALL', async (payload) => {
    try {
      
        const res=await AnswerAPI.GetALL()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const res=await AnswerAPI.GetALL()
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
const Answer = createSlice({
  name: 'Answer',
  initialState: {
    Answer: [],
    Answerid:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
  
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getbyidAnswer.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getbyidAnswer.fulfilled,(state,action)=>{
        state.Answer=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getbyidAnswer.rejected,(state,action)=>{
        state.Answer=[],
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(updateAnswer.fulfilled,(state,action)=>{
        state.Answer=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateAnswer.rejected,(state,action)=>{
        state.Answer=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(DeleteAnswer.fulfilled,(state,action)=>{
        state.Answer=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(DeleteAnswer.rejected,(state,action)=>{
        state.Answer=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getidAnswer.fulfilled,(state,action)=>{
        state.Answerid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidAnswer.rejected,(state,action)=>{
        state.Answerid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getALLidAnswer.fulfilled,(state,action)=>{
        state.Answer=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getALLidAnswer.rejected,(state,action)=>{
        state.Answer=[],
        state.isloading=false,
        state.error=action.error
      })
    
    
    
    
  }
});
export default Answer.reducer
