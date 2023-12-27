import AnswerSTAPI from '@/services/answerST.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
export const AddAnswerST= createAsyncThunk('AnswerST/ADD', async (payload) => {
    try {
       
       
       const Get=await AnswerSTAPI.Add(payload);
       return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          const Get=await AnswerSTAPI.Add(payload);

          
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
  export const updateAnswerST= createAsyncThunk('AnswerST/update', async (payload) => {
    try {
        const Get=await AnswerSTAPI.Update(payload);

       return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
            await Refreshtoken()  
            const Get=await AnswerSTAPI.Update(payload);

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
  export const DeleteAnswerST = createAsyncThunk('AnswerST/Delete', async (id) => {
    try {
        const Get=await AnswerSTAPI.Delete(id);

        return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          const Get=await AnswerSTAPI.Delete(id);

        return Get;
         } catch (error) {
           console.log(error)
           
         }
      } else {
      
        console.log(error);
      }
      //throw error
    }
  });
  export const getbyidAnswerST = createAsyncThunk('AnswerST/GetbyST', async (id) => {
    try {
        const Get=await AnswerSTAPI.Getbyid(id);

        return Get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const Get=await AnswerSTAPI.Getbyid(id);

         return Get.get;
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
  export const getidBTAnswer = createAsyncThunk('AnswerST/GetidBT', async (payload) => {
    try {
        const Get=await AnswerSTAPI.GetidBT(payload);

        return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const Get=await AnswerSTAPI.GetidBT(payload);

        return Get.get;
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
  export const getResult = createAsyncThunk('AnswerST/Result', async (payload) => {
    try {
        const Get=await AnswerSTAPI.ResultBT(payload);

        return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const Get=await AnswerSTAPI.ResultBT(payload);

        return Get.get;
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
const ListANST = createSlice({
  name: 'AnswerST',
  initialState: {
    AnswerST: [],
    AnsweridST:[],
    Result:[],
    isloadingid:false,
    isloadingR:false,
    isloading:false,
    error:null,
  },
  reducers: {
  
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getbyidAnswerST.pending,(state,action)=>{
        state.isloadingid=false
        state.error=null
      }),
      builerUser.addCase(getbyidAnswerST.fulfilled,(state,action)=>{
        state.AnsweridST=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getbyidAnswerST.rejected,(state,action)=>{
        state.AnsweridST=[],
        state.isloadingid=false,
        state.error=action.error
      })
      builerUser.addCase(updateAnswerST.fulfilled,(state,action)=>{
        state.AnswerST=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateAnswerST.rejected,(state,action)=>{
        state.AnswerST=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(DeleteAnswerST.fulfilled,(state,action)=>{
        state.AnswerST=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(DeleteAnswerST.rejected,(state,action)=>{
        state.AnswerST=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getidBTAnswer.fulfilled,(state,action)=>{
        state.AnsweridST=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidBTAnswer.rejected,(state,action)=>{
        state.AnsweridST=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(AddAnswerST.fulfilled,(state,action)=>{
        state.AnswerST=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(AddAnswerST.rejected,(state,action)=>{
        state.AnswerST=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getResult.fulfilled,(state,action)=>{
        state.Result=action.payload
        state.isloadingR=true
        state.error=null
      }),
      builerUser.addCase(getResult.rejected,(state,action)=>{
        state.Result=[],
        state.isloadingR=false,
        state.error=action.error
      })
    
    
    
    
  }
});
export default ListANST.reducer
