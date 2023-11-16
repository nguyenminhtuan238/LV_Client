import QuestionAPI from '@/services/question.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken } from '../user';
  export const updateQuestion = createAsyncThunk('Question/update', async (payload) => {
    try {
       await QuestionAPI.Update(payload);
      const Get=await QuestionAPI.Get()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await QuestionAPI.Update(payload);
          const Get=await QuestionAPI.Get()
          
          return Get.get;
         } catch (error) {
          if (error.response.status === 403) {
            throw  error.response.data.message
          }
           console.log(error)
         }
      } else {
        if (error.response.status === 403) {
          throw  error.response.data.message
          }
        console.log(error);
      }
      //throw error
    }
  });
  export const DeleteQuestion = createAsyncThunk('Question/Delete', async (id) => {
    try {
       await QuestionAPI.Delete(id);
      const Get=await QuestionAPI.Get()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await QuestionAPI.Delete(id);
          const Get=await QuestionAPI.Get()
          
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
  export const getQuestionALL = createAsyncThunk('Question/Get', async () => {
    try {
      const res=await QuestionAPI.Get()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await QuestionAPI.Get()
         return res.get;
        } catch (error) {
          console.log(error)
         
        }s
     } else {
       console.log(error);
     }
     //throw error
      //throw error
    }
  });
  export const getQuestionid = createAsyncThunk('Question/Getid', async (id) => {
    try {
      const res=await QuestionAPI.Getid(id)
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await QuestionAPI.Getid(id)
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
  export const getQuestionsubject = createAsyncThunk('Question/Getsubject', async (id) => {
    try {
      const res=await QuestionAPI.GetSubject(id)
      return res.get;
    } catch (error) {
     
       console.log(error);
      throw error
     //throw error
      //throw error
    }
  });
  export const SearchQuestionsubject = createAsyncThunk('Question/Searchsubjectr', async (payload) => {
    try {
      const res=await QuestionAPI.Searchsubject(payload)
      return res.get;
    } catch (error) {
     
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await QuestionAPI.Searchsubject(payload)
         return res.get;
        } catch (error) {
          console.log(error)
         
        }
     } else {
       console.log(error);
     }
    }
  });
  export const SearchQuestionby = createAsyncThunk('Question/Search', async (payload) => {
    try {
      const res=await QuestionAPI.Search(payload)
      return res.get;
    } catch (error) {
     
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await QuestionAPI.Search(payload)
         return res.get;
        } catch (error) {
          console.log(error)
         
        }
     } else {
       console.log(error);
     }
    }
  });
const Question = createSlice({
  name: 'Question',
  initialState: {
    Question: {},
    Questionid:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
    setQloading:(state)=>{
      state.isloading=false
    }
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getQuestionALL.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getQuestionALL.fulfilled,(state,action)=>{
        state.Question=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getQuestionALL.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(updateQuestion.fulfilled,(state,action)=>{
        state.Question=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateQuestion.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getQuestionsubject.fulfilled,(state,action)=>{
        state.Question=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getQuestionsubject.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(SearchQuestionsubject.fulfilled,(state,action)=>{
        state.Question=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(SearchQuestionsubject.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(SearchQuestionby.fulfilled,(state,action)=>{
        state.Question=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(SearchQuestionby.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(DeleteQuestion.fulfilled,(state,action)=>{
        state.Question=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(DeleteQuestion.rejected,(state,action)=>{
        state.Question=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getQuestionid.fulfilled,(state,action)=>{
        state.Questionid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getQuestionid.rejected,(state,action)=>{
        state.Questionid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
    
    
  }
});
export  const {setQloading}=Question.actions
export default Question.reducer
