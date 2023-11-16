import { LoginAdmin } from "@/store/user";
import { useSnackbar } from "notistack";
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Admin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { enqueueSnackbar} = useSnackbar();
  const  user  = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
      router.push("/admin/subject")
    }
  }, [dispatch,user.Admin]);
  const handle=async ()=>{
  
    const data={
      username,
      password
    }
    try {
      const lg=await dispatch(LoginAdmin(data))
       await unwrapResult(lg)
      
      enqueueSnackbar('Đăng Nhập thành công', {
        variant: 'success',
        autoHideDuration: 1200,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      router.push("/admin/subject")

    } catch (error) {      
      enqueueSnackbar(`${user.error.message}`, {
        variant: 'error',
        autoHideDuration: 1200,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  }
    return (  
        <>
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Đăng Nhập Admin</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off"
                                onChange={(e)=>setusername(e.target.value)}
                                value={username}
                                required
               id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Tên Tài Khoản</label>
						</div>
						<div className="relative">
							<input autoComplete="off" 
                  onChange={(e)=>setpassword(e.target.value)}
                                value={password}
                                required
              id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mật Khẩu</label>
						</div>
						<div className="relative">
							<button className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-300"  onClick={()=>handle()} >Đăng Nhập</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  
        </>
    );
}

export default Admin;
Admin.getLayout=function PageLayout(page){
    return(
        <>
          {page}
        </>
    )
}