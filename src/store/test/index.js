import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
import TestAPI from '@/services/test.setvices';
export const AddTest= createAsyncThunk('Test/ADD', async (payload) => {
    try {
        
     const res=  await TestAPI.Add(payload);
      return res;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          const res=  await TestAPI.Add(payload);
          return res.message;
          
         } catch (error) {
           console.log(error)
      
         
         }
      } else {
        console.log(error);
        
       
      }
      //throw error
    }
  });
  export const updateTest= createAsyncThunk('Test/update', async (payload) => {
    try {
        
     const res=  await TestAPI.Update(payload);
     const get= await TestAPI.Getbytest(payload.id) 
      return get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          const res=  await TestAPI.Update(payload);
          const get= await TestAPI.Getbytest(payload.id) 
          return get.get;
          
         } catch (error) {
           console.log(error)
      
         
         }
      } else {
        console.log(error);
        
       
      }
      //throw error
    }
  });
  export const deletetest = createAsyncThunk('test/delete', async (id) => {
    try {
       const res= await TestAPI.Delete(id);
        return res;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res= await TestAPI.Delete(id);
        return res;
         } catch (error) {
           console.log(error)
         }
      } else {
        console.log(error);
      }
      //throw error
    }
  });
  
  export const getidtest = createAsyncThunk('test/Getid', async (payload) => {
    try {
        const res=await TestAPI.GetById(payload)

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await Refreshtoken()  
             const res=await TestAPI.GetById(payload)
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
  export const getTestExam= createAsyncThunk('test/GetTestExam', async (id) => {
    try {
        const res=await TestAPI.Gettestexam(id)

    
      return res;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await Refreshtoken()  
             const res=await TestAPI.Gettestexam(id)
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
  export const getbytest= createAsyncThunk('test/Getbytest', async (id) => {
    try {
        const res=await TestAPI.Getbytest(id)

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await Refreshtoken()  
             const res=await TestAPI.Getbytest(id)
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
const Test = createSlice({
  name: 'Test',
  initialState: {
    Test: {},
    Testid:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
 
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getidtest.pending,(state,action)=>{
        state.isloadingid=false
        state.error=null
      }),
      builerUser.addCase(getidtest.fulfilled,(state,action)=>{
        state.Testid=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidtest.rejected,(state,action)=>{
        state.Testid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getbytest.fulfilled,(state,action)=>{
        state.Testid=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getbytest.rejected,(state,action)=>{
        state.Testid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(AddTest.fulfilled,(state,action)=>{
        state.Test=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(AddTest.rejected,(state,action)=>{
        state.Test=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(deletetest.fulfilled,(state,action)=>{
        state.Test=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deletetest.rejected,(state,action)=>{
        state.Test=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getTestExam.fulfilled,(state,action)=>{
        state.Test=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getTestExam.rejected,(state,action)=>{
        state.Test=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(updateTest.fulfilled,(state,action)=>{
        state.Testid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(updateTest.rejected,(state,action)=>{
        state.Testid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
    
  }
});
export default Test.reducer
