import { handlecheck } from "@/store/Class";
import { RefreshTeachertoken } from "@/store/user"
import { Accesstoken } from "@/useapi/auth.api"
import { AddClass } from "@/useapi/Class.API";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
export const DiaLog=()=>{
  const [Ten_Lop, setTen_Lop] = useState("");
  const [password, setpassword] = useState(null);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const handleAddclass=async ()=>{
    try {
      const teacher=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN))
      const data={
        ID_GD:teacher.a.id,
        Ten_Lop,
        password
      }
     await AddClass(data)
      Swal.fire("Thêm!", "Thêm Thành Công", "success");
      setpassword(null)
      setopen(false)
      setTen_Lop("")
      dispatch(handlecheck())

    } catch (error) {
      if(error.er===2){
       await RefreshTeachertoken()
        handleAddclass()
      }
      if(error.er===4){
        Swal.fire("Lỗi!", `${error.mess}`, "error");
        setpassword(null)
      setTen_Lop("")
      setopen(false)
        dispatch(handlecheck())

      }
    }
  }
    return(
        <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Tên Lớp
      </label>
      <input required value={Ten_Lop} onChange={(e)=>setTen_Lop(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Nhập Tên Lớp"/>
    </div>
  
  </div>
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <button onClick={()=>setopen(!open)} className="block btn uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Thiết Lập Mật Khẩu
      </button>
    
    </div>
  
  </div>
  {open&&
    <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
        Mật Khẩu lớp
      </label>
      <input required value={password} onChange={(e)=>setpassword(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="password" placeholder="******************"/>
   
    </div>
  </div>
  }
 
  
</div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn m-2" onClick={()=>handleAddclass()}>Thêm</button>
        <button className="btn">Thoát</button>
      </form>
    </div>
  </div>
</dialog>
    )
}