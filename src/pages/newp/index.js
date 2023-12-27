import {  Resetpass } from '@/store/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {  useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const newPassword = () => {
  const { enqueueSnackbar} = useSnackbar();
  const [newpassword, setnewpassword] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter()
  const  user  = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
      router.push("/")
    }
  }, [dispatch,user.user]);
  const handle=async (e)=>{
    e.preventDefault()
    const data={
      newpassword,
      password
    }
    try {
      const newp=await dispatch(Resetpass(data))
      const res=unwrapResult(newp)
      setpassword("")
      setnewpassword("")
      enqueueSnackbar('Đổi Mật Khẩu thành công', {
        variant: 'success',
        autoHideDuration: 1200,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    
      return res
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1200,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đổi Mật Khẩu
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e)=>handle(e)} method="post">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Mật Khẩu Cũ
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="password"
                  autoComplete="email"
                  required
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                               {user.error&&
                 <p  className="block text-sm font-medium text-red-500 mt-5 text-center">
                {user.error.message}
              </p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật Khẩu mới
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={newpassword}

                  onChange={(e)=>setnewpassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {user.error&&
                 <p  className="block text-sm font-medium text-red-500 mt-5 text-center">
                {user.error.message}
              </p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={false}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default newPassword;
