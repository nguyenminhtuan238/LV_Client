import PointAPI from '@/services/point.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
export const AddPoint= createAsyncThunk('Point/Add', async (payload) => {
  try {
     await PointAPI.Add(payload);
     

  } catch (error) {
    if (error.response.status === 410) {
       try {
        await RefreshTeachertoken()  
        await PointAPI.Add(payload);
     
       } catch (error) {
          
         console.log(error)
       }
    } else {
      
      console.log(error);
    }
    //throw error
  }
});
  export const updatePoint= createAsyncThunk('Point/update', async (payload) => {
    try {
      await PointAPI.Update(payload);
    
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await PointAPI.Update(payload);
     
        
         } catch (error) {
            
           console.log(error)
         }
      } else {
        
        console.log(error);
      }
      //throw error
    }
  });
  export const DeletePoint = createAsyncThunk('Point/Delete', async (id) => {
    try {
      await PointAPI.Delete(id);
     
   
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await PointAPI.Delete(id);
     
         
         } catch (error) {
           console.log(error)
           
         }
      } else {
        
        console.log(error);
      }
      //throw error
    }
  });
  export const getbyidPoint  = createAsyncThunk('Point/GetbyidNHCH ', async (id) => {
    try {
        const res=await PointAPI.Getbyid(id)
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await RefreshTeachertoken()  
         const res=await PointAPI.Getbyid(id)
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
  
  export const getALLPoint  = createAsyncThunk('Point/GetALL', async () => {
    try {
      
        const res=await PointAPI.GetALL()
      return res.get;
    } catch (error) {
      if (error.response.status === 410) {
        try {
         await Refreshtoken()  
         const res=await PointAPI.GetALL()
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
const Point = createSlice({
  name: 'Point',
  initialState: {
    Point: [],
    Point:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
  
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getbyidPoint.pending,(state,action)=>{
        state.isloading=false
        state.error=null
      }),
      builerUser.addCase(getbyidPoint.fulfilled,(state,action)=>{
        state.Point=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getbyidPoint.rejected,(state,action)=>{
        state.Point=[],
        state.isloading=false,
        state.error=action.error
      })
     
    
      builerUser.addCase(getALLPoint.fulfilled,(state,action)=>{
        state.Point=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getALLPoint.rejected,(state,action)=>{
        state.Point=[],
        state.isloading=false,
        state.error=action.error
      })
    
    
    
    
  }
});
export default Point.reducer
