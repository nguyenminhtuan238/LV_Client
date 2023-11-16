import AuthAPI from '@/services/auth.services';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
export const LoginUser = createAsyncThunk('user/login', async (payload) => {
    try {
      const res = await AuthAPI.Login(payload);
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN, res.settoken);
      localStorage.setItem(process.env.NEXT_PUBLIC_REFRESHTOKEN, res.Refreshtoken);
      return res.success;
    } catch (error) {
      if (error.response.status === 403) {
        // console.log(JSON.stringify(error.response.data.message))
        throw error.response.data.mess;
      }
      if (error.response.status === 402) {
        throw error.response.data.messa;
      } else {
        console.log(error);
      }
      //throw error
    }
  });
  export const LoginAdmin = createAsyncThunk('user/Admin', async (payload) => {
    try {
      const res = await AuthAPI.LoginAdmin(payload);
      localStorage.setItem(process.env.NEXT_PUBLIC_ADMINTOKEN, res.settoken);
      localStorage.setItem(process.env.NEXT_PUBLIC_ADMINREFRESHTOKEN, res.Refreshtoken);
      return res.success;
    } catch (error) {
      if (error.response.status === 403) {
        // console.log(JSON.stringify(error.response.data.message))
        throw error.response.data.mess;
      }
      if (error.response.status === 402) {
        throw error.response.data.mess;
      } if (error.response.status === 406) {
        throw error.response.data.message;
      } 
      else {
        console.log(error);
      }
      //throw error
    }
  });
  export const LoginTeacher = createAsyncThunk('user/Teacher', async (payload) => {
    try {
      const res = await AuthAPI.LoginTeacher(payload);
      localStorage.setItem(process.env.NEXT_PUBLIC_TEACHERTOKEN, res.settoken);
      localStorage.setItem(process.env.NEXT_PUBLIC_TEACHERREFRESHTOKEN, res.Refreshtoken);
      return res.success;
    } catch (error) {
      if (error.response.status === 403) {
        throw error.response.data.mess;
      }
      if (error.response.status === 402) {
        throw error.response.data.mess;
      } if (error.response.status === 406) {
        throw error.response.data.message;
      } 
      else {
        console.log(error);
      }
      //throw error
    }
  });
  export  async function Refreshtoken(){
      try {
        const res=await AuthAPI.Refreshtoken()
        localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN,res.settoken)
      } catch (error) {
        console.log(error)
      }
  }
  export  async function RefreshADMINtoken(){
    try {
      const res=await AuthAPI.RefreshADMINtoken()
      localStorage.setItem(process.env.NEXT_PUBLIC_ADMINTOKEN,res.settoken)
    } catch (error) {
      console.log(error)
    }
}
export  async function RefreshTeachertoken(){
  try {
    const res=await AuthAPI.RefreshTeachertoken()
    localStorage.setItem(process.env.NEXT_PUBLIC_TEACHERTOKEN,res.settoken)
  } catch (error) {
    console.log(error)
  }
}
  export const Resetpass = createAsyncThunk('user/Reset', async (payload) => {
    try {
      const res = await AuthAPI.Reset(payload);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await Refreshtoken()  
          const res = await AuthAPI.Reset(payload);
          return res.success;
         } catch (error) {
           console.log(error)
           if (error.response.status === 402) {
            throw error.response.data.message;
          } 
         }
      }
      if (error.response.status === 402) {
        throw error.response.data.message;
      } else {
        console.log(error);
      }
      //throw error
    }
  });
  
  export const HanleLogoutAdmin=()=>{
    localStorage.removeItem(process.env.NEXT_PUBLIC_ADMINTOKEN)
    localStorage.removeItem(process.env.NEXT_PUBLIC_ADMINREFRESHTOKEN)
  }
const slice = createSlice({
  name: 'user',
  initialState: {
    user: false,
    isloading:false,
    admin:false,
    Teacher:false,
    error:null,
  },
  reducers: {
    textuser:(state)=>{
      if(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
        state.user=true
      }
    },
    Logout:(state)=>{
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN)
      localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESHTOKEN)
      state.user=false
      state.error=null
    },
    TextAdmin:(state)=>{
      state.admin=true
    },
    TextTeacher:(state)=>{
      state.Teacher=true
    },
    logoutAdmin:(state)=>{
      state.admin=false
    },
    logoutTeacher:(state)=>{
      state.Teacher=false
    }
  },
  extraReducers:(builerUser)=>{
      builerUser.addCase(LoginUser.fulfilled,(state,action)=>{
        state.isloading=true
        state.user=action.payload,
        state.error=null
      }),
      builerUser.addCase(LoginUser.rejected,(state,action)=>{
        state.user=false,
        state.isloading=false,
        state.error=action.error
      })
      builerUser.addCase(Resetpass.fulfilled,(state,action)=>{
        state.isloading=action.payload
        state.error=null
      }),
      builerUser.addCase(Resetpass.rejected,(state,action)=>{
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(LoginAdmin.fulfilled,(state,action)=>{
        state.admin=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(LoginAdmin.rejected,(state,action)=>{
        state.isloading=false,
        state.error=action.error
      }),
      builerUser.addCase(LoginTeacher.fulfilled,(state,action)=>{
        state.Teacher=action.payload
        state.isloading=true
        state.error=null
      }),
      builerUser.addCase(LoginTeacher.rejected,(state,action)=>{
        state.isloading=false,
        state.error=action.error
      })
  }
});
export const {textuser,Logout,logoutAdmin,TextAdmin,logoutTeacher,TextTeacher}=slice.actions
export default slice.reducer

// Actions
// export const login = ({ username, password }) => async dispatch => {
//   try {
//     // const res = await api.post('/api/auth/login/', { username, password })
//     dispatch(loginSuccess({username}));
//   } catch (e) {
//     return console.error(e.message);
//   }
// }
// export const logout = () => async dispatch => {
//   try {
//     // const res = await api.post('/api/auth/logout/')
//     return dispatch(logoutSuccess())
//   } catch (e) {
//     return console.error(e.message);
//   }
// }