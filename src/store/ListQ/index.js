import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
import ListQAPI from '@/services/ListQ.services';
export const AddListQ= createAsyncThunk('ListQ/ADD', async (payload) => {
    try {
        
       await ListQAPI.Add(payload);
      const Get=await ListQAPI.GetById(payload.id)
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ListQAPI.Add(payload);
          const Get=await ListQAPI.GetById(payload.id)
          
          return Get.get;
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
  export const updatelistQ = createAsyncThunk('listQ/update', async (payload) => {
    try {
        await ListQAPI.Update(payload);
        const Get=await ListQAPI.GetById(payload.id)
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ListQAPI.Update(payload);
          const Get=await ListQAPI.GetById(payload.id)
          
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
  
  export const deletelistQ  = createAsyncThunk('listQ/delete', async (payload) => {
    try {
        await ListQAPI.Delete(payload);
        const Get=await ListQAPI.GetById(payload.idKT)
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ListQAPI.Delete(payload);
        const Get=await ListQAPI.GetById(payload.id)
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
  
  export const getidlistQ = createAsyncThunk('listQ/GetidlistQ', async (id) => {
    try {
        const res=await ListQAPI.GetById(id)

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await RefreshTeachertoken()
             await Refreshtoken()  
             const res=await ListQAPI.GetById(id)
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
  export const getpagelistQ = createAsyncThunk('listQ/GetpagelistQ', async (data) => {
    try {
        const res=await ListQAPI.Getpage(data)

    
      return res.get;
    } catch (error) {
      
           console.log(error);
         
     //throw error
      //throw error
    }
  });
const ListQ = createSlice({
  name: 'ListQ',
  initialState: {
    ListQ: {},
    ListQid:[],
    ListQidpage:[],
    isloadingid:false,
    isloadingpage:false,
    isloading:false,
    error:null,
  },
  reducers: {
 
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getidlistQ.pending,(state,action)=>{
        state.isloadingid=false
        state.error=null
      }),
      builerUser.addCase(getidlistQ.fulfilled,(state,action)=>{
        state.ListQid=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidlistQ.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getpagelistQ.fulfilled,(state,action)=>{
        state.ListQidpage=action.payload?action.payload:[]
        state.isloadingpage=true
        state.error=null
      }),
      builerUser.addCase(getpagelistQ.rejected,(state,action)=>{
        state.ListQidpage=[],
        state.isloadingpage=false,
        state.error=action.error
      })
      builerUser.addCase(updatelistQ.fulfilled,(state,action)=>{
        state.ListQid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(updatelistQ.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
     
    
      builerUser.addCase(AddListQ.fulfilled,(state,action)=>{
        state.ListQid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(AddListQ.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(deletelistQ.fulfilled,(state,action)=>{
        state.ListQid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(deletelistQ.rejected,(state,action)=>{
        state.ListQid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
    
  }
});
export default ListQ.reducer
