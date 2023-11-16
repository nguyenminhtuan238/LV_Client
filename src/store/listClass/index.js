import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RefreshTeachertoken, Refreshtoken } from '../user';
import ListClassAPI from '@/services/listClass.services';
export const AddListclass= createAsyncThunk('Listclass/ADD', async (payload) => {
    try {
        
       await ListClassAPI.Add(payload);
      const Get=await ListClassAPI.GetStudent()
      return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          await ListClassAPI.Add(payload);
          const Get=await ListClassAPI.GetStudent()
          
          return Get.get;
         } catch (error) {
           console.log(error)
           if(error?.response?.status===403){ 
            throw {message:error.response.data.message,err:3}
          }
         
         }
      } else {
        console.log(error);
        if(error?.response?.status===403){ 
          throw {message:error.response.data.message,err:3}
        }
       
      }
      //throw error
    }
  });
  
  export const deletelistclass  = createAsyncThunk('listclass/delete', async (id) => {
    try {
        await ListClassAPI.Delete(id);
        const Get=await ListClassAPI.GetStudent()
        return Get.get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          await ListClassAPI.Delete(id);
          const Get=await ListClassAPI.GetStudent()
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
  export const deletelistclassID  = createAsyncThunk('listclass/deletebyID', async (id) => {
    try {
       
        const Get= await ListClassAPI.Deletebyid(id);
        return Get;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const Get= await ListClassAPI.Deletebyid(id);
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
  export const getidlistclass = createAsyncThunk('listclass/Getidlistclass', async (payload) => {
    try {
        const res=await ListClassAPI.GetById(payload)

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await Refreshtoken()  
             const res=await ListClassAPI.GetById(payload)
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
  export const getidlistStudent= createAsyncThunk('listclass/GetlistclassStudent', async () => {
    try {
        const res=await ListClassAPI.GetStudent()

    
      return res.get;
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await Refreshtoken()  
             const res=await ListClassAPI.GetStudent()
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
  export const getbyidClass= createAsyncThunk('listclass/getbyidClass', async (data) => {
    try {
        const res=await ListClassAPI.GetByClass(data)    
      return res.get;
    } catch (error) {
        
           console.log(error);
      
    }
  });
  export const getbyidHS= createAsyncThunk('listclass/getbyidHS', async (data) => {
    try {
        const res=await ListClassAPI.GetByIDHS(data)    
      return res.get;
    } catch (error) {
        
           console.log(error);
      
    }
  });
const ListClass = createSlice({
  name: 'ListClass',
  initialState: {
    ListClass: {},
    ListClassid:[],
    isloadingid:false,
    isloading:false,
    error:null,
  },
  reducers: {
 
  },
  extraReducers:(builerUser)=>{
    
      builerUser.addCase(getidlistclass.pending,(state,action)=>{
        state.isloadingid=false
        state.error=null
      }),
      builerUser.addCase(getidlistclass.fulfilled,(state,action)=>{
        state.ListClassid=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidlistclass.rejected,(state,action)=>{
        state.ListClassid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getbyidHS.fulfilled,(state,action)=>{
        state.ListClassid=action.payload?action.payload:[]
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getbyidHS.rejected,(state,action)=>{
        state.ListClassid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
      builerUser.addCase(AddListclass.fulfilled,(state,action)=>{
        state.ListClassid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(AddListclass.rejected,(state,action)=>{
        state.ListClassid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(deletelistclass.fulfilled,(state,action)=>{
        state.ListClass=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deletelistclass.rejected,(state,action)=>{
        state.ListClass=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(deletelistclassID.fulfilled,(state,action)=>{
        state.ListClass=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(deletelistclassID.rejected,(state,action)=>{
        state.ListClass=[],
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(getidlistStudent.fulfilled,(state,action)=>{
        state.ListClassid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getidlistStudent.rejected,(state,action)=>{
        state.ListClassid=[],
        state.isloadingid=false,
        state.error=action.error
      }),
      builerUser.addCase(getbyidClass.fulfilled,(state,action)=>{
        state.ListClassid=action.payload
        state.isloadingid=true
        state.error=null
      }),
      builerUser.addCase(getbyidClass.rejected,(state,action)=>{
        state.ListClassid=[],
        state.isloadingid=false,
        state.error=action.error
      })
    
    
  }
});
export default ListClass.reducer
