import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {  useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { Accesstoken } from "@/useapi/auth.api";
import { RefreshTeachertoken } from "@/store/user";
import { CSVLink } from "react-csv";
import { GetSubject } from "@/store/Subjectr";
import { AddNHCH, DeleteNHCH, getALLidNHCH, getbyidNHCH, updateNHCH } from '@/store/Nhch';

function Teacher() {
  const router = useRouter()
  const  user  = useSelector(state => state.user)
  const NHCH = useSelector((state) => state.Nhch);
  const subject = useSelector((state) => state.list);
  const [CheDo, setCheDo] = useState(1);
  const [Mon, setMon] = useState("");
  const dispatch=useDispatch();
   
    const [open, setOpen] = useState(false);
    const [checked, setchecked] = useState(false);
    const [SoCH, setSoCH] = useState(1);
    const [Ten_NG, setTen_NG] = useState("");
    const [NH, setNH] = useState([]);
    const [IDNH, setIDNH] = useState(1);
    const [IDTe, setIDTe] = useState(1);
   const [openupdate, setopenupdate] = useState(false);
 
    useEffect(() => {
        if(!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          router.push("/teacher")
        }
      }, [user.Teacher]);
      useEffect(() => {
        async function Getsubjectt() {
          try {
            const res = await dispatch(GetSubject());
            const result=  unwrapResult(res);
            setMon(result[0].ID_M)
          } catch (error) {
            console.log(error);
          }
        }
        Getsubjectt();
      }, [open]);
      useEffect(() => {
        async function GetNGCH(){
          try {
            const res = await dispatch(getALLidNHCH());
            const result= unwrapResult(res);
            const idT=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN))
         
            setNH(result?.filter((item)=>item.CheDo==1 || item.ID_GD===idT.a.id))
            setIDTe(idT.a.id)
          } catch (error) {
            console.log(error);
            if(error?.er==2){
              await RefreshTeachertoken()
              GetNGCH()
            }
          }
        }
        GetNGCH()
      }, [checked]);
     
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setCheDo(1)
        setTen_NG("")
        setSoCH(1)
        setOpen(false);
      };
      const handleAddNHCH=async ()=>{
          // console.log(Mon,Start.$d
          //   ,End,Ten_KT,Class)
            try {
             
               
                const data={
                
                  ID_GD:IDTe,
                 SoCH,
                 CheDo,
                 Ten_NG,
                 ID_M:Mon,
                }
                console.log(data)
                const add=await dispatch(AddNHCH(data))
                unwrapResult(add)
               setCheDo("Cộng Cộng")
               setTen_NG("")
               setSoCH(1)
                setOpen(false)
                setchecked(!checked)
                Swal.fire(
                  'Thêm!',
                  'Thêm Thành Công',
                  'success'
                )
            } catch (error) {
               
                console.log(error)
                Swal.fire(
                  'Thất Bại!',
                  'Thêm Thất Bại',
                  'Error'
                )
                setOpen(false)

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
             const res= await dispatch(DeleteNHCH(id))
              await unwrapResult(res)
              Swal.fire(
                'Xóa!',
                'Xóa Thành Công',
                'success'
              )
                setchecked(!checked)
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
      const handleEdit=async (id)=>{
        setopenupdate(true)
        
        try {
          
          const res=await dispatch(getbyidNHCH(id))
          const result= unwrapResult(res)      
          setCheDo(result[0].CheDo)
          setTen_NG(result[0].Ten_NG)
          setSoCH(result[0].SoCH)
          setMon(result[0].ID_M)
          setIDNH(id)
         
        } catch (error) {
          console.log(error)
      }
      }
    const  handleEditClose=()=>{
      
      setCheDo(1)
      setTen_NG("")
      setSoCH(1)
        setopenupdate(false)
      }
      const EditExam=async ()=>{
        
        try {  
               
                const data={
                  Ten_NG,
                  SoCH,
                  CheDo,
                  ID_M:Mon,
                  id:IDNH
                }
          const res=await dispatch(updateNHCH(data))
         await unwrapResult(res)
         setCheDo(1)
         setTen_NG("")
         setSoCH(1)
         setopenupdate(false)
         setchecked(!checked)
         Swal.fire(
          'Sửa!',
          'Sửa Thành Công',
          'success'
        )
        
        } catch (error) {
        
          Swal.fire(
              'Sửa Thất Bại!',
              `${error.message}`,
              'error'
            )
        
  
        }
      } 
  const SearchGD=async ()=>{
    try {
      const res = await dispatch(getALLidNHCH());
      const result= unwrapResult(res);
      const idT=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN))
      setNH(result?.filter((item)=> item.ID_GD===idT.a.id))
    } catch (error) {
      console.log(error);
      if(error?.er==2){
        await RefreshTeachertoken()
        SearchGD()
      }
    }
  }
    return (  
        < >
            <main className="w-full flex-grow p-6 ">
            <h1 className="text-3xl text-black pb-6">Ngân Hàng câu hỏi</h1>
         
 
                <div className="w-full mt-6">
                    <p className="text-xl pb-3 flex items-center">
                        <i className="fas fa-list mr-3"> </i> 
                        <button className="btn" onClick={handleClickOpen}>Tạo Ngân Hàng </button>
                    </p>
                    <p className="text-xl pb-3 flex items-center">
                        <i className="fas fa-list mr-3"> </i> 
                        <button className="btn" onClick={()=>setchecked(!checked)}>Tất Cả</button>
                        <i className="fas fa-list mr-3"> </i> 
                        <button className="btn" onClick={()=>SearchGD()}>Giáo Viên Đã Tạo</button>
                    </p>
                    <div className="bg-white overflow-auto">
                        <table className="min-w-full bg-white ">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className=" text-center  py-3 px-4 uppercase font-semibold text-sm">Tên Ngân Hàng câu hỏi</th>
                                    <th className="text-center   py-3 px-4 uppercase font-semibold text-sm">Môn</th>
                                    <th className="text-center   py-3 px-4 uppercase font-semibold text-sm">Số Câu hỏi</th>
                                    <th className="text-center    py-3 px-4 uppercase font-semibold text-sm">Thêm câu hỏi</th>
                                    <th className="text-center   py-3 px-4 uppercase font-semibold text-sm">Sửa</th>
                                    <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                                </tr>
                            </thead>

                              {NHCH.isloading&&
                            <tbody className="text-gray-700">
                            {NH?.map((item) => {
              return(
                
              <tr key={item.ID_NH}>
               
                <td  className="py-3 px-4">
                {item.Ten_NG}
                </td>

            
             <td className="text-center py-3 px-4 ">{subject.isloading&&subject.subject?.filter((it)=>it.ID_M===item.ID_M)[0].Ten_Mon}</td>
             <td className="text-center py-3 px-4 ">{item.SoCH}</td>      
             {IDTe===item.ID_GD? <td className="text-center py-3 px-4 "><Link href={`/teacher/NH/${item.ID_NH}`} className="hover:text-blue-500 cursor-pointer"><i className="fa-solid fa-plus"></i></Link></td>:<td className="text-center py-3 px-4 " >Không Thể Thêm</td>}
             
            {IDTe===item.ID_GD? <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleEdit(item.ID_NH)}><i className="fa-solid fa-pen-to-square"></i></td>:<td className="text-center py-3 px-4 " >Không Thể Sửa</td>}
            {IDTe===item.ID_GD?<td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDelete(item.ID_NH)}><i className="fa-solid fa-trash"></i></td>:<td className="text-center py-3 px-4 " >Không Thể Xóa</td>}
              
              </tr>
              )
            })
             
            
              }
                              
                            </tbody>
                            }
                        </table>
                    </div>
                   
                </div>
            
    <div>
  



      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Ngân Hàng câu hỏi</DialogTitle>
        <DialogContent>
        
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2  w-full">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Tên 
      </label>
      <input required  value={Ten_NG} onChange={(e) => setTen_NG(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Nhập Tên Kỳ Thi"/>
    </div>
  
  </div>
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


  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Số Câu Hỏi
    </label>
    <input required    value={SoCH} onChange={(e) => setSoCH(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Số câu hỏi"/>
</div>
  </div>
  <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                   Chế Độ
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="CheDo"
                        value={1}
                        checked={CheDo == 1}
                        onChange={(e) => setCheDo(e.target.value)}
                      />
                      <label htmlFor="de">Cộng Cộng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="CheDo"
                        value={2}
                        onClick={(e) => setCheDo(e.target.value)}
                      />
                      <label htmlFor="by">Riêng Tư</label>
                    </div>
                  </fieldset>
                </div>
  </div>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleAddNHCH}>Tạo</Button>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
      <Dialog open={openupdate} onClose={handleEditClose}>
        <DialogTitle>Sửa Kỳ Thi</DialogTitle>
        <DialogContent>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2  w-full">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Tên 
      </label>
      <input required  value={Ten_NG} onChange={(e) => setTen_NG(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Nhập Tên Kỳ Thi"/>
    </div>
  
  </div>
  
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

 
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Số Câu Hỏi
    </label>
    <input required    value={SoCH} onChange={(e) => setSoCH(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Số câu hỏi"/>
</div>
  </div>
  <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                   Chế Độ
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="CheDo"
                        value={1}
                        readOnly
                        checked={CheDo == 1}
                        onChange={(e) => setCheDo(e.target.value)}
                      />
                      <label htmlFor="de">Cộng Cộng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="CheDo"
                        value={2}
                        readOnly
                        checked={CheDo == 2}
                        onClick={(e) => setCheDo(e.target.value)}
                      />
                      <label htmlFor="by">Riêng Tư</label>
                    </div>
                  </fieldset>
                </div>
  </div>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={EditExam}>Sửa</Button>
          <Button onClick={handleEditClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </div>
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