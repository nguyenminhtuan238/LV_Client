import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import Swal from "sweetalert2";
import { deleteClass, GetbyIDClass, GetclassTeacher, handlecheck, updateClass } from "@/store/Class";
import { deletelistclass } from "@/store/listClass";
import Link from "next/link";
function Teacher() {
  const ClassT = useSelector((state) => state.Class);
  const [Error, setError] = useState(null);
  const [Ten_Lop, setTen_Lop] = useState("");
  const [password, setpassword] = useState();
const [openpass, setopenpass] = useState(false);
  const [open, setopen] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)) {
      router.push("/teacher");
    }
  }, [user.Teacher]);
  
  useEffect(() => {
    async function Getclass() {
      try {
        const res = await dispatch(GetclassTeacher());
        unwrapResult(res);
      } catch (error) {
        console.log(error);
      }
    }
    Getclass();
  }, [ClassT.check]);
 
 const DeleteClass=async (id)=>{
    Swal.fire({
        title: 'Bạn có chăc chắc xóa?',
        text: "Sẽ Không thể khôi phục",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng Ý',
        denyButtonText: `Không Đồng Ý`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(deletelistclass(id))
           const res= await dispatch(deleteClass(id))
            await unwrapResult(res)
            Swal.fire(
              'Xóa!',
              'Xóa Thành Công',
              'success'
            )
  
          } catch (error) {
            if(error){
              Swal.fire(
                'Lỗi!',
                'Xóa Thất Bại',
                'error'
              )
            }
          
          }
        
        }
      }) 
 }
 const EditClass=async (id)=>{
    try {
        const res=await dispatch(GetbyIDClass(id))
        const result= unwrapResult(res)
        setTen_Lop(result[0].Ten_Lop)
        setpassword(result[0].password)
        setopen(true)
        if(result[0].password===null){
            setopenpass(false)
        }else{
            setopenpass(true)
        }
    } catch (error) {
        console.log(error)
    }
 }
 const handleEditClass=async (e)=>{
    e.preventDefault()
    try {
        const data={
         Ten_Lop,
         password,
         id:ClassT.Classid[0].ID_L
        }
        const res=await dispatch(updateClass(data))
       await unwrapResult(res)
       Swal.fire(
        'Sửa!',
        'Sửa Thành Công',
        'success'
      )
      } catch (error) {
        console.log(error)
        Swal.fire(
            'Sửa Thất Bại!',
            `${error.message}`,
            'error'
          )
        dispatch(handlecheck())

      }
 }
 
  return (
    <>
      <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Quản lý Lớp</h1>
      {open&&
      <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                        <p className="text-xl pb-6 flex items-center">
                            <i className="fas fa-list mr-3"></i> Sửa Lớp
                        </p>
                        <div className="leading-loose">
                        <div className= "float-right">
                        <button className="btn btn-ghost" onClick={()=>setopen(false)}><i className="fa-solid fa-x"></i></button>

                        </div>
                        
                            <form className="p-10 bg-white rounded shadow-xl" method="post" onSubmit={(e)=>handleEditClass(e)}>
                               
                                <div className="inline-block mt-2 w-full pr-1">
                                    <label className=" block text-sm text-gray-600" for="cus_email">Tên Lớp</label>
                                    <input value={Ten_Lop} onChange={(e)=>setTen_Lop(e.target.value)} className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Nhập Tên Lớp......." aria-label="Email"/>
                                </div> 
                                {ClassT.Classid[0].password===null&&
                                <div className="-mx-3 md:flex mb-6 mt-5">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <div onClick={()=>setopenpass(!openpass)} className="btn" htmlFor="grid-first-name">
        Thiết Lập Mật Khẩu
      </div>
    
    </div>
  </div>  
                                }
                                {openpass&&
                                <div className="">
                                    <label className="block text-sm text-gray-600" for="cus_name">Mật Khẩu</label>
                                    <input value={password} onChange={(e)=>setpassword(e.target.value)} className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="***********" aria-label="Name"/>
                                </div>
                                }
                                <div className="mt-6">
                                    <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded w-full" type="submit">Sửa</button>
                                    
                                </div>
                            </form>
                        </div>
                        
                    </div>
      }
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Tất cả các lớp được tạo
    </p>
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Tên Lớp</th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Mật Khẩu</th>
                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Thêm Học Sinh</th>
                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Sửa</th>
                    <th className="text-centerpy-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                </tr>
            </thead>
            {
                ClassT.isloading&&
            <tbody className="text-gray-700">
        
                {ClassT.Class.map(item=>{
                    return(
                        <tr key={item.ID_L}>
                    <td className="w-1/3 text-left py-3 px-4">{item.Ten_Lop}</td>
                    <td className="w-1/3 text-left py-3 px-4">{item.password?item.password:"Không có mật Khẩu"}</td>
                    <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" ><Link href={`/teacher/Class/${item.ID_L}`} className="hover:text-blue-500 cursor-pointer"><i className="fa-solid fa-plus"></i></Link></td>
                    <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>EditClass(item.ID_L)}><i className="fa-solid fa-pen-to-square"></i></td>
                    <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>DeleteClass(item.ID_L)}><i className="fa-solid fa-trash"></i></td>
                </tr>
                    )
                })
            }
            </tbody>
        }
        </table>
    </div>
    
</div>
      </main>
    </>
  );
}

export default Teacher;
Teacher.getLayout = function PageLayout(page) {
  return (
    <>
      <LayoutTeacher>{page}</LayoutTeacher>
    </>
  );
};
