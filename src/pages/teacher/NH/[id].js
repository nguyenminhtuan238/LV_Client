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
import { getQuestionsubject , SearchQuestionby } from '@/store/Question';
import Swal from "sweetalert2";
import {getbyidNHCH } from '@/store/Nhch';
import { AddListNH, deletelistNH, getidlistNH } from '@/store/listNH';
import {  getbyidAnswer } from "@/store/answer";

export default function ExamID(){
    const id=useRouter()
    const [open, setOpen] = useState(false);
    const  user  = useSelector(state => state.user)
    const subject = useSelector((state) => state.list);
    const Question = useSelector((state) => state.Question);
    const ListNH = useSelector((state) => state.listNH);
    const NHCH = useSelector((state) => state.Nhch);
    
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
        async function GetNH() {
          if(id.isReady && subject.isloading){
         
          try {
            const res=await dispatch(getbyidNHCH(id.query.id))
            const result= unwrapResult(res)    
            
            const Q = await dispatch(getQuestionsubject(result[0].ID_M));
            unwrapResult(Q);
           setDoKho(Q.payload[0].DoKho)
           setCH(Q.payload[0].Noidung)
          } catch (error) {
            console.log(error);
          }
        
      }
        }
        async function GetlistNH() {
          if(id.isReady ){
         
          try {
            const res = await dispatch(getidlistNH(id.query.id));
             unwrapResult(res);
          } catch (error) {
            console.log(error);
          }
        
      }
        }
        GetNH();
        GetlistNH()
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
      setSearch("")

    };
    const handleSearch=async ()=>{
   
     
      try {
        const data={
          Search,
          
        }
        const res = await dispatch(SearchQuestionby(data));
          unwrapResult(res);
          setOpen(false)
        setSearch("")
      } catch (error) {
        console.log(error);
      }
    
    
    }
   
    const handleAddNH=async (ID_CH)=>{
        if(NHCH.NHCH[0]?.SoCH>ListNH.ListNH.length){
          const An = await dispatch(getbyidAnswer(ID_CH));
          const resultAN= unwrapResult(An);
          try {
       
            const data={
             
              ID_CH,
              ID_NH:id.query.id,
            }
  
            const res = await dispatch(AddListNH(data));
            unwrapResult(res);
            if(  resultAN?.filter(item=>item.Ketqua===1).length>0){
             enqueueSnackbar('Thêm thành công', {
              variant: 'success',
              autoHideDuration: 1200,
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
          }else{
            enqueueSnackbar('Câu Hỏi Chưa Có câu trả Lời đúng', {
              variant: 'warning',
              autoHideDuration: 1200,
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
          }
            setlcheck(!lcheck)
  
          } catch (error) {
              enqueueSnackbar(`${error.message}`, {
                variant: 'error',
                autoHideDuration: 1200,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
              });
              setlcheck(!lcheck)
            }
        }else{
              
          enqueueSnackbar('Vượt quá tổng Câu Hỏi', {
            variant: 'error',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
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
           
           const res= await dispatch(deletelistNH(ID_D))
            await unwrapResult(res)
          
            Swal.fire(
              'Xóa!',
              'Xóa Thành Công',
              'success'
            )
            setlcheck(!lcheck)
          } catch (error) {
            console.log(error)
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
    return(
        <>
        {NHCH.isloading&&
         <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Thêm Câu hỏi vào ngân Hàng</h1>
     
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
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Hình Thức</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Môn</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Thêm</th>
                  
                </tr>
            </thead>
            {Question.isloading&&
            <tbody className="text-gray-700">
            
              {Question.Question.map((item) => {
              return(
                
              <tr key={item.ID_CH}>
              <td  className="py-3 px-4">
                 {item.Noidung}
                </td>
                <td  className="py-3 px-4">
                {item.HinhThuc}  
                </td>
                
                <td  className="py-3 px-4">
                {subject.isloading&&subject.subject.filter((it)=>it.ID_M===item.ID_M)[0].Ten_Mon}
                </td>

             <td className="text-center py-3 px-4 ">{item.DoKho}</td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleAddNH(item.ID_CH)}><i className="fa-solid fa-plus"></i></td>
                
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
     <i className="fas fa-list mr-3"></i>Ngân Hàng Đã Tạo  
    </p>
    <div className="flex ">
    <p className="text-x pb-3 mr-5 flex items-center">
     Câu Dễ :{Question.isloading?Question?.Question.filter((i) => i.DoKho==="Dễ").filter((i)=> ListNH.ListNH.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    <p className="text-x pb-3 flex mr-5 items-center">
    Câu Bình Thường: {Question.isloading?Question?.Question.filter((i) => i.DoKho==="Bình thường").filter((i)=> ListNH.ListNH.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    <p className="text-x pb-3 flex mr-5 items-center">
    Câu Khó:{Question.isloading?Question?.Question.filter((i) => i.DoKho==="Khó").filter((i)=> ListNH.ListNH.filter((d)=>d.ID_CH===i.ID_CH).length).length:""}
    </p>
    </div>
   {Question.isloading&&
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Nội Dung</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Hình Thức</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                </tr>
            </thead>
           { ListNH.isloading&&
            <tbody className="text-gray-700">
            {
              ListNH.ListNH.map((item)=>{
              return(
                
              <tr key={item.ID_DSNG}>
                <td className="text-left  py-3 px-4 ">{Question.Question.length!==0?Question?.Question.filter((i) => i.ID_CH === item.ID_CH)[0].Noidung:""}</td>
                <td className="text-left  py-3 px-4 ">{Question.Question.length!==0?Question?.Question.filter((i) => i.ID_CH === item.ID_CH)[0].DoKho:""}</td>
                <td className="text-left  py-3 px-4 ">{Question.Question.length!==0?Question?.Question.filter((i) => i.ID_CH === item.ID_CH)[0].HinhThuc:""}</td>
                <td className="text-left  py-3 px-4 hover:text-blue-500 cursor-pointer"  onClick={()=>handleDelete(item.ID_DSNG)}><i className="fa-solid fa-trash"></i></td>
              </tr>
              )
            })
             
            }
            <tr>
              <td colSpan="2" className="uppercase font-semibold text-sm">Tổng Cộng</td>
              <td  className="text-left  py-3 px-4">{ ListNH.ListNH.length} Câu</td>
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