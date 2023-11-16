import { LayoutAdmin } from "@/Components/admin/layout/layout";
import { AddSubject, deleteSubject, GetIDSubject, GetSubject,  hiddenEditSubject, updateSubject } from "@/store/Subjectr";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

export default function subject() {
  const [Ten_Mon, setTen_Mon] = useState("");
  const [EditSubject, setEditSubject] = useState("");
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.list);
  const  user  = useSelector(state => state.user)
  const router = useRouter()

  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
      router.push("/admin/")
    }
  }, [user.admin]);
  useEffect(() => {
   const getSubject=async ()=>{
     try {
       await dispatch(GetSubject())
     } catch (error) {
       console.log(error)
     }
    }
    getSubject()
  }, []);
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const data = {
        Ten_Mon,
      };
      const res = await dispatch(AddSubject(data));
      await unwrapResult(res);
      Swal.fire(
        'Thêm!',
        'Thêm Thành Công',
        'success'
      )
      setTen_Mon("")
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete=async(id)=>{
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
         const res= await dispatch(deleteSubject(id))
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
    })  }
    const HandleGetIDSubject= async(id)=>{
      try {
        const res=await dispatch(GetIDSubject(id))
       const getid= await unwrapResult(res)
       setEditSubject(getid[0].Ten_Mon)
      } catch (error) {
        console.log(error)
      }
    }
    const handleupdateSubject= async (e)=>{
      e.preventDefault()
      try {
        const data={
         Ten_Mon: EditSubject,
         id:subject.subjectid[0].ID_M
        }
        const res=await dispatch(updateSubject(data))
       await unwrapResult(res)
       Swal.fire(
        'Sửa!',
        'Sửa Thành Công',
        'success'
      )
      dispatch(hiddenEditSubject())
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <main className="max-w-full h-full flex relative overflow-y-hidden">
        <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
          <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <form className="py-5 h-60 bg-gray-300 px-3" onSubmit={(e) => handleAddSubject(e)}>
            
            <div className=" border-b-2 m-3">

<span className="text-lg font-bold text-gray-600">Thêm Môn</span>

</div>
              <div className="mb-2">
                <label className="text-sm" htmlFor="email">Tên Môn:</label>
                <input
                  type="Text"
                  id="email"
                  name="email"
                  onChange={(e) => setTen_Mon(e.target.value)}
                  value={Ten_Mon}
                  className="w-full px-4 h-12 py-2 border  mt-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 w-full mt-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Thêm
              </button>
            </form>
          </div>
          <div className="w-60 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <table className=" border-collapse border border-slate-400 w-4/5">
              <thead className="border border-slate-300 ">
                <tr>
                
                  <th className="border border-slate-300 ">Môn</th>
                  <th className="border border-slate-300">Xóa</th>
                  <th className="border border-slate-300">Sửa</th>
                  <th className="border border-slate-300"></th>
                </tr>
              </thead>
              <tbody>
              {subject.isloading?  subject.subject.map((item)=>{
                    return(
                      <tr key={item.ID_M}>
                  <td className="border border-slate-300">
                  <div  className="flex item-center justify-center">
                  {item.Ten_Mon}
                  </div>
                  </td>
               
                 
                  <td className="border border-slate-300">
                    <div className="flex item-center justify-center cursor-pointer " onClick={()=>handleDelete(item.ID_M)}>
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-300">
                    <div className="flex item-center justify-center cursor-pointer" onClick={()=>HandleGetIDSubject(item.ID_M)}>
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center border border-slate-300">
                    <div className="flex item-center justify-center">
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
                    )
                  }):<tr>
                    <td colSpan="6">
                    <div role="status" className="flex justify-center items-center">
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
                    </td>
                  </tr>}
               
               
              </tbody>
            </table>
          </div>
          {
            subject.subjectid?  <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <form className="" onSubmit={(e) => handleupdateSubject(e)}>
              <div className="mb-2">
                <label htmlFor="email">Tên Môn:</label>
                <input
                  type="Text"
                  id="email"
                  name="email"
                  onChange={(e) => setEditSubject(e.target.value)}
                  value={EditSubject}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sửa
              </button>
            </form>
          </div>:""
          }
        
        </div>
      </main>
    </>
  );
}
subject.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
