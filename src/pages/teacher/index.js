import {  LoginTeacher } from "@/store/user";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

function Teacher() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const { enqueueSnackbar} = useSnackbar();
    const  user  = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          router.push("/teacher/information")
        }
      }, [dispatch,user.Teacher]);
      const handle=async (e)=>{
        e.preventDefault()
        const data={
          username,
          password
        }
        try {
          const lg=await dispatch(LoginTeacher(data))
            await unwrapResult(lg)
          
          enqueueSnackbar('Đăng Nhập thành công', {
            variant: 'success',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          router.push("/teacher/information")
    
        } catch (error) {  
                
          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      }
  return (
    <>
      <div className="">
       
        <div className="p-8 lg:w-1/2 mx-auto">
  
          <div className="bg-white rounded-t-lg p-8">
         
            <p className="text-center text-sm text-gray-400 font-light">
             Giáo Viên
            </p>
            <div>
              
             
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
            
            <p className="text-center text-sm text-gray-500 font-light">
              
              Đăng Nhập
            </p>
            <form className="mt-6" onSubmit={(e)=>handle(e)} method="post">
              
              <div className="relative">
                
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Tên Tài Khoản"
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="password"
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  placeholder="Mật Khẩu"
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-gray-500">
                
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-3"
                />
                <label htmlFor="remember">NHớ Mật Khẩu</label>
              </div>
              <div className="flex items-center justify-center mt-8">
                
                <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Đăng Nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
Teacher.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
