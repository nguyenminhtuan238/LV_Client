import { getStudent, updateStudent } from '@/store/Student';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect,useState } from 'react';
import {  useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
export default function Informatinon(){
    const [ten, setten] = useState("");
    const [Email, setEmail] =  useState("");
    const [Diachi, setDiachi] = useState("");
    const [SDT, setSDT] = useState("");
    const [Hinh, setHinh] = useState(null);
    const { enqueueSnackbar} = useSnackbar();
    const  user  = useSelector(state => state.user)
    const Student=useSelector(state=>state.Student);
    const router = useRouter()

    const dispatch=useDispatch();
    useEffect(() => {
      if(!localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
        router.push("/")
      }
    }, [dispatch,user.user]);
    useEffect(() => {
     async function GetIFM(){
       try {
         const res=await dispatch(getStudent())
        const student= unwrapResult(res)
        setten(student[0].Ten)
        setEmail(student[0].Email)
        setSDT(student[0].SDT)
        setDiachi(student[0].Diachi)
      
       } catch (error) {
         console.log(error)
       }
     }
     GetIFM()
     
    }, []);
    const  handleInformation=async (e)=>{
      e.preventDefault()
      try {
          const data=Hinh!==null?{
            Ten:ten,
            Email,
            Diachi,
            SDT,
            Hinh:Hinh[0],
          }:{
            Ten:ten,
            Email,
            Diachi,
            SDT,
          }
          console.log(process.env.NEXT_PUBLIC_IMAGEUSERd+Student.Student[0]?.Hinh)
          const res=await dispatch(updateStudent(data))
          unwrapResult(res)
          enqueueSnackbar('Sửa thành công', {
            variant: 'success',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <>{Student.isloading?
        <form className="w-full max-w-lg m-auto p-auto mt-5 mb-5 border border-red-400 p-12" onSubmit={(e)=>handleInformation(e)}>
  <div className="flex flex-wrap -mx-3 mb-6">
    
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
       Họ và Tên
      </label>
      <input 
         onChange={(e)=>setten(e.target.value)} 
         value={ten}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Tuấn"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Email
      </label>
      <input 
             onChange={(e)=>setEmail(e.target.value)} 
             value={Email}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="Email" placeholder="Nhập Vào Email"/>
      
    </div>
  </div>
  
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Địa chỉ
      </label>
      <input 
             onChange={(e)=>setDiachi(e.target.value)} 
             value={Diachi}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Nhập Vào  Địa chỉ"/>
  
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Số Điện Thoại
      </label>
      <input
             onChange={(e)=>setSDT(e.target.value)}  
             value={SDT}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" min="10" placeholder="Nhập Vào Số Điện Thoại"/>
     
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Minh họa
                  </label>
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="file"
                    required=""
                    onChange={(e) => setHinh(e.target.files)}
                    placeholder="Street"
                    aria-label="Email"
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Nền
                  </label>
               
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                 
                 <img src={process.env.NEXT_PUBLIC_IMAGEUSERd+Student.Student[0]?.Hinh} className="w-[250px] h-[250px]"/>
                </div>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3">
  Thay Đổi
</button>
</form>
        :
<div role="status" className="flex justify-center items-center">
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
}
        </>
    )
}