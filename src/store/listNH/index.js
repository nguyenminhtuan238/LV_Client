import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
import ListQAPI from '@/services/ListQ.services';
import ListNHAPI from '@/services/listNH.services';
export const AddListNH= createAsyncThunk('ListNH/ADD', async (payload) => {
    try {
        
      const Get= await ListNHAPI.Add(payload);
     
      return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const Get= await ListNHAPI.Add(payload);
     
          return Get;
         } catch (error) {
           console.log(error)
           if(error?.response?.status===421){
            throw error.response.data
          }
         }
      } else {
        console.log(error);
        if(error?.response?.status===421){
          throw error.response.data
        }
      }
      //throw error
    }
  });
 
  
  export const deletelistNH  = createAsyncThunk('listNH/delete', async (id) => {
    try {
       const Get= await ListNHAPI.Delete(id);
       
      return Get
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const Get= await ListNHAPI.Delete(id);
       
          return Get
         } catch (error) {
           console.log(error)
         }
      } else {
        console.log(error);
      }
      //throw error
    }
  });
  
  export const getidlistNH = createAsyncThunk('listNH/GetidlistNH', async (id) => {
    try {
        const res=await ListNHAPI.GetById(id)

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await RefreshTeachertoken()
          
             const res=await ListNHAPI.GetById(id)

    
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
  
const ListNH = createSlice({
  name: 'ListNH',
  initialState: {
    ListNH: {},
    ListNHid:[],
    ListQidpage:[],
    isloadingid:false,
    isloadingpage:false,
    isloading:false,
    error:null,
  },
  reducers: {
 
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getidlistNH.pending,(state,action)=>{
        state.isloadingid=false
        state.error=null
      }),
      builerUser.addCase(getidlistNH.fulfilled,(state,action)=>{
        state.ListNH=action.payload?action.payload:[]
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(getidlistNH.rejected,(state,action)=>{
        state.ListNH=[],
        state.isloading=false,
        state.error=action.error
      }),
    
     
    
      builerUser.addCase(AddListNH.fulfilled,(state,action)=>{
        state.ListQid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(AddListNH.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(deletelistNH.fulfilled,(state,action)=>{
        state.ListQid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(deletelistNH.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
    
  }
});
export default ListNH.reducer
