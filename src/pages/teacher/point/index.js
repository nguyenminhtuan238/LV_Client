import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetALLHS,SearchHS } from '@/store/Student';
import readXlsxFile from 'read-excel-file'
import { RefreshTeachertoken } from "@/store/user";
import { Accesstoken } from "@/useapi/auth.api";
import { AddPoint, DeletePoint, getALLPoint, updatePoint } from "@/store/point";
import { GetSubject } from "@/store/Subjectr";
function Teacher() {
  const [openfile, setOpenfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [IDHS, setIDHS] = useState(null);
  const router = useRouter();
  const [Search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const Student = useSelector((state) => state.Student);
  const point = useSelector((state) => state.point);
  const subject = useSelector((state) => state.list);
  const [lcheck, setlcheck] = useState(false);
  const [DiemThi, setDiemThi] = useState(1);
  const [EditD, setEditD] = useState(false);
  const [File, setFile] = useState();
  const [IDTe, setIDTe] = useState(1);
  const [IDD, setIDD] = useState(1);
  const dispatch = useDispatch();
  const [Point, setPoint] = useState();
  const [Mon, setMon] = useState(1);
  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)) {
      router.push("/teacher");
    }
  }, [user.Teacher]);
  
  
  useEffect(() => {
    async function GetALlHS(){
        try {
            const res = await dispatch(GetALLHS());
            const idT=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN))
            const ress = await dispatch(GetSubject());
            const resultS= unwrapResult(ress);
            setMon(resultS[0].ID_M)
             const points= await dispatch(getALLPoint())
            const result=unwrapResult(points)
            setPoint(result)
            unwrapResult(res);
            setIDTe(idT.a.id)
        } catch (error) {
          if(error?.er==2){
            await RefreshTeachertoken()
            GetALlHS()
          }
            console.log(error);

        }
    }
    GetALlHS()

}, [lcheck]);

 const handleClickOpenfile = () => {
  setOpenfile(true);
};

const handleClosefile = () => {
  setOpenfile(false);
};
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setSearch("")
};

const handleSearch=async ()=>{
   
  try {
    const data={
      Search,
    }
    const res = await dispatch(SearchHS(data));
    const Result= unwrapResult(res);
    const l=[]
    point.Point?.map(item=>{
      if(Result?.filter(it=>item.ID_HS===it.ID_users).length>0){
        l.push( item)
      }
    }
    )
    setPoint(IDHS==""?l.filter(item=>item.ID_M==Mon):l.filter(item=>item.ID_M==Mon && item.ID_HS==IDHS))
      setOpen(false)
    setSearch("")
    setIDHS("")
    setMon(subject.subject[0]?.Ten_Mon)
  } catch (error) {
    console.log(error);
  }


}

const handlefile=async()=>{
  
  readXlsxFile(File[0]).then(async (rows) => {
    for(var i = 1; i <rows.length; i++) {
     
      try {
        const d=subject.subject?.filter(ite=>ite.Ten_Mon==rows[i][2])[0]?.ID_M
        if(point.Point?.filter(item=>item.ID_M===d && item.ID_HS===rows[i][0] && item.ID_GD===IDTe).length>0){
          const data={
          
            DiemThi:rows[i][1],
            id:point.Point?.filter(item=>item.ID_M===d && item.ID_HS===rows[i][0] && item.ID_GD===IDTe)[0].ID_D
          }
           await dispatch(updatePoint(data)) 
        }else{
          const data={
            ID_M:d,
            ID_HS:rows[i][0],
            ID_GD:IDTe,
            DiemThi:rows[i][1],
          }
          console.log(data)
          const res= await dispatch( AddPoint(data))
          unwrapResult(res)
        }
    
      } catch (error) {
       console.log(error)
       Swal.fire(
        'Lỗi!',
        'Thêm Thất Bại',
        'error'
      )
      setlcheck(!lcheck)
      break;
      }
  }
setOpenfile(false)
  setlcheck(!lcheck)
    
  })
}
const handleEdit=(id)=>{
setDiemThi(Math.round(point.Point?.filter(it=>it.ID_D===id)[0].DiemThi))
setEditD(true)
setIDD(id)
}
const handleCloseD=()=>{
  setEditD(false)
  setDiemThi(1)
}
const HandleEDITD=async ()=>{
if(DiemThi<0 || DiemThi>10){
  Swal.fire(
    'Lỗi!',
    'Điểm Thi vượt qua 10 hoặc bé hơn 0 ',
    'error'
  )
  setEditD(false)

}else{
  try {
    const data={
      id:IDD,
      DiemThi
    }
    const res= await dispatch(updatePoint(data)) 
    unwrapResult(res)
    setlcheck(!lcheck)
    setEditD(false)
  } catch (error) {
    console.log(error)
  }
}
}
const handleDelete=async (id)=>{
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
       const res= await dispatch(DeletePoint(id))
        await unwrapResult(res)
        Swal.fire(
          'Xóa!',
          'Xóa Thành Công',
          'success'
        )
        setlcheck(!lcheck)
      } catch (error) {
        if(error){
          Swal.fire(
            'Lỗi!',
            'Xóa Thất Bại',
            'error'
          )
          setlcheck(!lcheck)
        }
      
      }
    
    }
  }) 
}
  return (
    <>
      <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Quản lý Điểm</h1>
      <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleClickOpen}>Tìm Kiếm </button>
    
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setlcheck(!lcheck)}>Tất Cả</button>
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
       <Button className="btn" onClick={handleClickOpenfile}> <i className="fas fa-list mx-3"></i> Thêm Điểm Bằng file</Button>
    </p>
    
    {point.isloading&&
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Mã số</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Họ và Tên</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Môn</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Điểm </th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Sửa  Điểm</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                </tr>
            </thead>
            
            <tbody className="text-gray-700">
            
            {Point?.map(item=>{
                    return(
                        <tr key={item.ID_HS}>
                    <td className="w-1/3 text-left py-3 px-4">{item.ID_HS}</td>
                    <td className="w-1/3 text-left py-3 px-4">{Student.isloading&&Student.Student?.filter(ite=>ite.ID_users===item.ID_HS)[0]?.Ten}</td>
                    <td className="text-left py-3 px-4 " >{subject.isloading&&subject.subject?.filter(ite=>ite.ID_M===item.ID_M)[0]?.Ten_Mon}</td>
                    <td className="text-left py-3 px-4 " >{item.DiemThi}</td>
                  
                    <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleEdit(item.ID_D)}><i className="fa-solid fa-pen-to-square"></i></td>
                    <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDelete(item.ID_D)}><i className="fa-solid fa-trash"></i></td>
                </tr>
                    )
                })
            }
            </tbody>
            
        </table>
    </div>
    }
    
</div>
 <Dialog open={openfile} onClose={handleClosefile}>
        <DialogTitle>Thêm Điểm</DialogTitle>
        <DialogContent>
        <div className="w-full h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="p-6 border border-gray-300 sm:rounded-md">
            <div className="mb-5 border border-gray-300 w-20">
            <span>File Mẫu</span>
            <Link href="http://localhost:5000/public/getpoint/" download>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/></svg>
            </Link> 
         
            </div>
              <form
                method="POST"
                action="https://herotofu.com/start"
                encType="multipart/form-data"
            
              >
                <label className="block mb-6">
                  <span className="text-gray-700">File Điểm</span>
                  <input
                    required
                    name="photo"
                    type="file"
                    accept=".xlsx"

                    className="
            block
            w-full
            mt-1
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "       onChange={(e)=>setFile(e.target.files)}
                  />
                </label>
               
                <div></div>
              </form>
            </div>
            </div>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handlefile}>Thêm</Button>
          <Button onClick={handleClosefile}>Thoát</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tìm Kiếm </DialogTitle>
        <DialogContent>
        {subject.isloading&&
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Môn
      </label>
  <select className="select select-bordered w-full max-w-xs" value={Mon} onChange={(e)=>setMon(e.target.value)}>
  {subject.subject?.map((item) => {
                        return <option key={item.ID_M} value={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
</select>
  </div>
  </div>
}
<div>
<TextField
            autoFocus
            margin="dense"
            id="CH"
            label="Nhập Mã Học Sinh"
            type="text"
            fullWidth
            variant="standard"
            value={IDHS}
            onChange={(e)=>setIDHS(e.target.value)}
            required
          />
</div>
<TextField
            autoFocus
            margin="dense"
            id="CH"
            label="Nhập Tên"
            type="text"
            fullWidth
            variant="standard"
            value={Search}
            onChange={(e)=>setSearch(e.target.value)}
            required
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearch} >Tìm</Button>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
     
      <Dialog open={EditD} onClose={handleCloseD}>
        <DialogTitle>Chọn Phương Án</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="CH"
            label="Nhập  Điểm"
            type="number"
            fullWidth
            variant="standard"
            value={DiemThi}
            onChange={(e)=>setDiemThi(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
       
        <Button onClick={HandleEDITD}>Sửa</Button>
          <Button onClick={handleCloseD}>Thoát</Button>
        </DialogActions>
      </Dialog>                     

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
