import { useSnackbar } from "notistack";
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import { getidTeacher, updateTeacher } from "@/store/Teacher";
import { Accesstoken } from "@/useapi/auth.api";
function Teacher() {
    const [Ten, setTen] = useState("");
    const [Email, setEmail] =  useState("");
    const [Diachi, setDiachi] = useState("");
    const [SDT, setSDT] = useState(0);
    const router = useRouter()
    const  user  = useSelector(state => state.user)
    const  Teacher  = useSelector(state => state.Teacher)
    const dispatch=useDispatch();
    const { enqueueSnackbar} = useSnackbar();
    const [Hinh, setHinh] = useState(null);
    useEffect(() => {
        if(!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          router.push("/teacher")
        }
      }, [user.Teacher]);
      useEffect(() => {
        async function GetIFM(){
          try {
        
            const res= await dispatch(getidTeacher())
           const Teacher= unwrapResult(res)
          setTen(Teacher[0].Ten)
           setEmail(Teacher[0].Email)
           setSDT(Teacher[0].SDT)
           setDiachi(Teacher[0].Diachi)
         
          } catch (error) {
            console.log(error)
          }
        }
        GetIFM()
        
       }, []);
       const  handleInformation=async (e)=>{
        e.preventDefault()
        try {
            const data={
              Ten,
              Email,
              Diachi,
              SDT,
              Hinh:Hinh?Hinh[0]:undefined
            }
            const res=await dispatch(updateTeacher(data))
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
    return (  
        < >
            <main className="w-full flex-grow p-6 ">
            <h1 className="w-full text-3xl text-black pb-6">Quản Lý Thông Tin</h1>
            {Teacher.isloading&&
            <div className="w-full  flex justify-center items-center">
                      
                        <div className="leading-loose w-1/2 px-1 py-1 ">
                            <form className="p-10 bg-white rounded shadow-xl" method="post" onSubmit={(e)=>handleInformation(e)}>
                                <p className="text-lg text-gray-800 font-medium pb-4">Thông Tin</p>
                                <div className="">
                                    <label className="block text-sm text-gray-600" htmlFor="cus_name">Họ và Tên</label>
                                    <input value={Ten} onChange={(e)=>setTen(e.target.value)} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required=""  aria-label="Name"/>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-600" htmlFor="cus_email">Email</label>
                                    <input  value={Email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="email" required="" aria-label="Email"/>
                                </div>
                                <div className="mt-2">
                                    <label className=" block text-sm text-gray-600" htmlFor="cus_email">Địa Chỉ</label>
                                    <input  value={Diachi} onChange={(e)=>setDiachi(e.target.value)} className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required=""  aria-label="Email"/>
                                </div>
                                <div className="mt-2">
                                    <label className=" text-sm block text-gray-600" htmlFor="cus_email">Số Điện Thoại</label>
                                    <input  value={SDT} onChange={(e)=>setSDT(e.target.value)} className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="number" required="" min={100000000} aria-label="Email"/>
                                </div>
                                <div className="mt-2">
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
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Nền
                  </label>
               
                </div>
                <div className="mt-2">
                 
                {Teacher.Teacher[0]?.Hinh!==null? <img src={process.env.NEXT_PUBLIC_IMAGEUSERd+Teacher.Teacher[0]?.Hinh} className="w-[250px] h-[250px]"/>: <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"  className="w-[250px] h-[250px]"/>}
                </div>
                                <div className="mt-6">
                                    <button className="px-4 py-1 text-white font-light tracking-wider w-full   bg-gray-900 rounded" type="submit">Sửa</button>
                                </div>
                            </form>
                        </div>

                </div>
            }
            </main>
    
        </>
    );
}

export default Teacher;
Teacher.getLayout=function PageLayout(page){
    return(
        <>
            <LayoutTeacher>
                {page}
            </LayoutTeacher>
        </>
    )
}