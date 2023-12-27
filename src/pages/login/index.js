import { LoginUser } from '@/store/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {  useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
  const { enqueueSnackbar} = useSnackbar();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter()
  const  user  = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
      router.push("/")
    }
  }, [dispatch,user.user]);
  const handle=async (e)=>{
    e.preventDefault()
  
    const data={
      username,
      password
    }
    try {
      const lg=await dispatch(LoginUser(data))
      const res=unwrapResult(lg)
      
      enqueueSnackbar('Đăng Nhập thành công', {
        variant: 'success',
        autoHideDuration: 1200,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
     
      router.push("/information")
      return res
    } catch (error) {
      console.log(error)
     
    }
  }
  return (<>
   <section className="h-screen">
  <div className="h-full">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-8/12 xl:w-8/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
      </div>

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-4/12 xl:w-4/12">
        <form  onSubmit={(e)=>handle(e)} method="post">
          <div
            className="flex  items-center justify-center ">
            <p className="mb-1 mr-4 text-lg font-medium">Đăng Nhập</p>

           
          </div>

          

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              id="exampleFormControlInput2"
              value={username}
              onChange={(e)=>setusername(e.target.value)}
              autoComplete="true"

              placeholder="Tên Tài Khoản" />
            <label
              htmlFor="exampleFormControlInput2"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >Tên Tài Khoản
            </label>
            {user.error&&
                 <p  className="block text-sm font-medium text-red-500 mt-5 text-center">
                {user.error.message}
              </p>}
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              id="exampleFormControlInput22"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              autoComplete="true"
              placeholder="Mặt Khẩu" />
            <label
              htmlFor="exampleFormControlInput22"
               className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >Mặt Khẩu
            </label>
            {user.error&&
                 <p  className="block text-sm font-medium text-red-500 mt-5 text-center">
                {user.error.message}
              </p>}
          </div>

        

          <div className="text-center lg:text-left">
            <button
              
              type="submit"
                disabled={false}
              className="inline-block rounded bg-primary w-full px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Dăng Nhập
            </button>

           
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
 
  
    </>
  );
};

export default Login;
