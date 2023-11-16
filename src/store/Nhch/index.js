import AnswerAPI from '@/services/answer.services';
import NHCHAPI from '@/services/nhch.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
export const AddNHCH= createAsyncThunk('NHCH/Add', async (payload) => {
  try {
     await NHCHAPI.Add(payload);
     
     const Get=await NHCHAPI.GetALL()
     return Get;
  } catch (error) {
    if (error.response.status === 410) {
       try {
        await RefreshTeachertoken()  
        await NHCHAPI.Add(payload);
     
        const Get=await NHCHAPI.GetALL()
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
  export const updateNHCH= createAsyncThunk('NHCH/update', async (payload) => {
    try {
      await NHCHAPI.Update(payload);
     
      const Get=await NHCHAPI.GetALL()
      return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await NHCHAPI.Update(payload);
     
          const Get=await NHCHAPI.GetALL()
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
  export const DeleteNHCH = createAsyncThunk('NHCH/Delete', async (id) => {
    try {
      await NHCHAPI.Delete(id);
     
      const Get=await NHCHAPI.GetALL()
      return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await NHCHAPI.Delete(id);
     
          const Get=await NHCHAPI.GetALL()
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
  export const getbyidNHCH  = createAsyncThunk('NHCH /GetbyidNHCH ', async (id) => {
    try {
        const res=await NHCHAPI.Getbyid(id)
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await NHCHAPI.Getbyid(id)
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
  
  export const getALLidNHCH  = createAsyncThunk('NHCH/GetALL', async () => {
    try {
      
        const res=await NHCHAPI.GetALL()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const res=await NHCHAPI.GetALL()
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
const NHCH = createSlice({
  name: 'NHCH',
  initialState: {
    NHCH: [],
    NHCHid:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
  
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getbyidNHCH.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getbyidNHCH.fulfilled,(state,action)=>{
        state.NHCH=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getbyidNHCH.rejected,(state,action)=>{
        state.NHCH=[],
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(updateNHCH.fulfilled,(state,action)=>{
        state.NHCH=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(updateNHCH.rejected,(state,action)=>{
        state.NHCH=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(DeleteNHCH.fulfilled,(state,action)=>{
        state.NHCH=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(DeleteNHCH.rejected,(state,action)=>{
        state.NHCH=[],
        state.isloading=false,
        state.error=action.error
      }),
    
      builerUser.addCase(getALLidNHCH.fulfilled,(state,action)=>{
        state.NHCH=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getALLidNHCH.rejected,(state,action)=>{
        state.NHCH=[],
        state.isloading=false,
        state.error=action.error
      })
    
    
    
    
  }
});
export default NHCH.reducer
