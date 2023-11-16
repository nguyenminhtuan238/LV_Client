import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect,useRef,useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import LayoutTeacher from '@/Components/teacher/layout/layout';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetSubject } from "@/store/Subjectr";
import { getQuestionsubject, SearchQuestionsubject } from '@/store/Question';
import { getidExam, updateSTExam } from '@/store/Exam';
import { AddListQ, deletelistQ, getidlistQ } from '@/store/ListQ';
import Swal from "sweetalert2";

export default function ExamID(){
    const id=useRouter()
    const [open, setOpen] = useState(false);
    const  user  = useSelector(state => state.user)
    const subject = useSelector((state) => state.list);
    const Question = useSelector((state) => state.Question);
    const Exam = useSelector((state) => state.Exam);
    const ListQ = useSelector((state) => state.ListQ);
    const [CH, setCH] = useState();
    const [DoKho, setDoKho] = useState("");
    const [Search, setSearch] = useState("");
    const [lcheck, setlcheck] = useState(false);
    const dispatch=useDispatch();
    const { enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        if(!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          id.push("/teacher")
        }
      }, [user.Teacher]);
      useEffect(() => {
       
          async function Getsubject() {
            try {
              const res = await dispatch(GetSubject());
               unwrapResult(res);
            } catch (error) {
              console.log(error);
            }
          }
          
          Getsubject();
        
       }, [id.isReady]);
       useEffect(() => {
        async function Getexam() {
          if(id.isReady && subject.isloading){
         
          try {
            const res = await dispatch(getidExam(id.query.id));
            const result=  unwrapResult(res);
            
            const Q = await dispatch(getQuestionsubject(result[0].ID_M));
            unwrapResult(Q);
           setDoKho(Q.payload[0].DoKho)
           setCH(Q.payload[0].Noidung)
          } catch (error) {
            console.log(error);
          }
        
      }
        }
        async function GetidlistQ() {
          if(id.isReady && subject.isloading){
         
          try {
            const res = await dispatch(getidlistQ(id.query.id));
            const result=  unwrapResult(res);
          } catch (error) {
            console.log(error);
          }
        
      }
        }
        Getexam();
        GetidlistQ()
       }, [id.isReady,lcheck]);
     useEffect(() => {
          function getDoKho(){
         
             if(Question.isloading){
             setDoKho(Question?.Question.filter((item) => item.Noidung === CH)[0]?.DoKho?Question.Question?.filter((item) => item.Noidung === CH)[0].DoKho:DoKho)
             }
            
            }
          
          getDoKho()
     }, [id.isReady,CH]);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleSearch=async ()=>{
   
     
      try {
        const data={
          Search,
          ID_M:Exam.Examid[0].ID_M
        }
        console.log(data)
        const res = await dispatch(SearchQuestionsubject(data));
          unwrapResult(res);
          setOpen(false)
        setSearch("")
      } catch (error) {
        console.log(error);
      }
    
    
    }
   
    const handleAddCH=async (ID_CH)=>{
        
        try {
       
          const data={
            id:id.query.id,
            ID_CH,
            ID_KT:id.query.id,
          }

          const res = await dispatch(AddListQ(data));
          unwrapResult(res);
          if(res.payload){
          enqueueSnackbar('Thêm thành công', {
            variant: 'success',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          const status={
            id:id.query.id,
            Status:"khởi tạo",
            TongCH:Exam.Examid[0].TongCH?Exam.Examid[0].TongCH+1:1,
          }      
          const St = await dispatch(updateSTExam(status));
          unwrapResult(St);
          }
        } catch (error) {
            enqueueSnackbar(`${error.message}`, {
              variant: 'error',
              autoHideDuration: 1200,
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            setlcheck(!lcheck)
          }
        
    }
    const handleDelete= async (ID_D)=>{
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
            const data={
              idKT:id.query.id,
              id:ID_D,
            }
           const res= await dispatch(deletelistQ(data))
            await unwrapResult(res)
            const status={
              id:id.query.id,
              Status:Exam.Examid[0].TongCH===1?"Đang khởi tạo":"khởi tạo",
              TongCH:Exam.Examid[0].TongCH?Exam.Examid[0].TongCH-1:1,
            }      
            const St = await dispatch(updateSTExam(status));
            unwrapResult(St);
            Swal.fire(
              'Xóa!',
              'Xóa Thành Công',
              'success'
            )
  
          } catch (error) {
            console.log(error)
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
    return(
        <>
        {Exam.isloadingid&&
         <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Quản lý Bài Thi</h1>
     
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleClickOpen}>Tìm Kiếm </button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setlcheck(!lcheck)}>Tất Cả</button>
    </p>

    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Chọn Câu Hỏi</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Thêm</th>
                  
                </tr>
            </thead>
            {Question.isloading&&
            <tbody className="text-gray-700">
            
              {Question.Question?.map((item) => {
              return(
                
              <tr key={item.ID_CH}>
               
                <td  className="py-3 px-4">
                {item.Noidung}
                </td>

             <td className="text-center py-3 px-4 ">{item.DoKho}</td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleAddCH(item.ID_CH)}><i class="fa-solid fa-plus"></i></td>
                
              </tr>
              )
            })
             
            
              }
            </tbody>
            }
        </table>
    </div>
    
</div>
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i>Bài Thi Đã Tạo  
    </p>
    <div className="flex ">
    <p className="text-x pb-3 mr-5 flex items-center">
     Câu Dễ :{Question.isloading?Question?.Question.filter((i) => i.DoKho==="Dễ").filter((i)=>ListQ.ListQid.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    <p className="text-x pb-3 flex mr-5 items-center">
    Câu Bình Thường: {Question.isloading?Question?.Question.filter((i) => i.DoKho==="Bình thường").filter((i)=>ListQ.ListQid.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    <p className="text-x pb-3 flex mr-5 items-center">
    Câu Khó:{Question.isloading?Question?.Question.filter((i) => i.DoKho==="Khó").filter((i)=>ListQ.ListQid.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    </div>
   {Question.isloading&&
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Nội Dung</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                </tr>
            </thead>
           { ListQ.isloadingid&&
            <tbody className="text-gray-700">
            {
              ListQ.ListQid.map((item)=>{
              return(
                
              <tr key={item.ID_DSCH}>
                <td className="text-left  py-3 px-4 ">{Question.Question.length!==0?Question?.Question.filter((i) => i.ID_CH === item.ID_CH)[0].Noidung:""}</td>
                <td className="text-left  py-3 px-4 ">{Question.Question.length!==0?Question?.Question.filter((i) => i.ID_CH === item.ID_CH)[0].DoKho:""}</td>
                <td className="text-left  py-3 px-4 hover:text-blue-500 cursor-pointer"  onClick={()=>handleDelete(item.ID_DSCH)}><i className="fa-solid fa-trash"></i></td>
              </tr>
              )
            })
             
            }
            <tr>
              <td colSpan="2" className="uppercase font-semibold text-sm">Tổng Cộng</td>
              <td  className="text-left  py-3 px-4">{ ListQ.ListQid.length} Câu</td>
            </tr>
            </tbody>
           }
        </table>
    </div>
   }
</div>
 <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tìm Kiếm Câu hỏi</DialogTitle>
        <DialogContent>
          
<TextField
            autoFocus
            margin="dense"
            id="CH"
            label="tìm Kiếm"
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
      </main>
     }
        </>
    )
}
ExamID.getLayout=function PageLayout(page){
    return(
        <>
            <LayoutTeacher>
                {page}
            </LayoutTeacher>
        </>
    )
}