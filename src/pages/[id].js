import { Getclass,GetbyIDClass } from "@/store/Class";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getidlistclass } from "@/store/listClass";
import { Accesstoken } from "@/useapi/auth.api";
import { Refreshtoken } from "@/store/user";
import { getidClass } from "@/store/Exam";
import { AddTest, getidtest } from "@/store/test";

export default function Home() {
  const Exam = useSelector((state) => state.Exam);
  const user = useSelector((state) => state.user);
  const test = useSelector((state) => state.test);
  const ClassT = useSelector((state) => state.Class);
  const router = useRouter()
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false);
  const [exam, setexam] = useState([]);
  const [IDHS, setID_HS] = useState(0);
  const [solan, setsolan] = useState(0);
  const [BT, setBT] = useState([]);
  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
      router.push("/")
    }
  }, [dispatch,user.user]);
  
  useEffect(() => {
      const handlecheck=async ()=>{
       if(router.isReady){
        try {
          const ID_HS=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN))
          const data={
            ID_HS:ID_HS.a.id,
            ID_L:router.query.id
          }
          setID_HS(ID_HS.a.id)
          const res = await dispatch(getidlistclass(data));
          const result= unwrapResult(res);
          if(result.length===0){
            
            router.push(`/`)
          }
        } catch (error) {
          if(error?.er===2){
            await Refreshtoken()
            handlecheck()
         }
        }
       }
      }
      handlecheck()
  }, [router.isReady]);
  const handleClickOpen = async (id) => {
    setexam(Exam.Examid.filter(item=>item.ID_KT===id))
    try {
      const data={
        ID_KT:id,
        ID_HS:IDHS,
      }
      const add=await dispatch(getidtest(data))
      const result=  unwrapResult(add)
      console.log(result)
      setsolan(result.length)
      if(result.length>0){
        setBT(result)
     
      }
      setOpen(true);
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddtest=async ()=>{
    if(solan>0){
     
      try {
        const date=new Date(Date.now()+(exam[0].SoPhut*1000*60)+25200000)
        const data={
        
          ID_KT:exam[0].ID_KT,
          ID_HS:IDHS,
          Solan:solan+1,
          End_Exam:date
        }
        const add=await dispatch(AddTest(data))
        unwrapResult(add)
        const get=await dispatch(getidtest({ID_KT:exam[0].ID_KT,ID_HS:IDHS}))
      const resultTest=  unwrapResult(get)
        setOpen(false)
        router.push(`/Exam/${resultTest[resultTest.length-1].ID_BT}`)
      } catch (error) {
        setOpen(false)
       console.log(error)
  
      }
    }else{
      try {
        const date=new Date((Date.now()+(exam[0].SoPhut*1000*60))+25200000)

        const data={
          ID_KT:exam[0].ID_KT,
          ID_HS:IDHS,
          Solan:1,
          End_Exam:date
        }
        console.log(data)
        const add=await dispatch(AddTest(data))
        unwrapResult(add)
        const get=await dispatch(getidtest({ID_KT:exam[0].ID_KT,ID_HS:IDHS}))
      const resultTest=  unwrapResult(get)
        setOpen(false)
        router.push(`/Exam/${resultTest[0].ID_BT}`)
      } catch (error) {
        setOpen(false)
  
        Swal.fire(
          'Thất Bại!',
          'Thêm Thất Bại',
          'Error'
        )
  
      }
    }
  
  }
  useEffect(() => {
    async function GetclassALL() {
     if(router.isReady){
      try {
        const res = await dispatch(GetbyIDClass(router.query.id));
        unwrapResult(res);
      } catch (error) {
        console.log(error);
      }
     }
    }
    GetclassALL();
  }, [router.isReady]);
  useEffect(() => {
    async function Getexam() {
      if(router.isReady){
      try {
        const res = await dispatch(getidClass(router.query.id));
        unwrapResult(res);
      } catch (error) {
        console.log(error);
      }
    }
    }
    Getexam();
  }, [router.isReady]);
  
  return (

    <>
      <div className="flex flex-col w-full lg:flex-row mb-3 mt-5">
      <div className="grid flex-grow h-full card w-2/3  rounded-box ">
      <div className="divide-y-8 divide-blue-500  before:divide-white before:content-[''] before:block  p-3">
      <div className=" font-bold text-4xl mb-3">Các Kỳ Thi</div>
      <div  className=" font-bold text-4xl"></div>
      </div>
      {router.isReady&&
      <div className="text-sm breadcrumbs ml-8">
  <ul>
    <li><Link href="/">Trang Chủ</Link></li> 
    {ClassT.isloading&& <li><Link href={`/${ClassT.Classid[0]?.ID_L}`}>{ClassT.Classid[0]?.Ten_Lop}</Link></li>} 
 
  </ul>
</div>
      }
    {Exam.isloadingid&&
      <div className="mt-10">
        {Exam.Examid.filter((item)=>item.Status!=="Đang khởi tạo" || item.Status==="Hoàn Thành").map((item)=>{
          return(
            <div key={item.ID_KT} className="py-3">
            
            <div className="m-3">
            <span  className="text-black  cursor-pointer text-2xl font-medium " onClick={()=>handleClickOpen(item.ID_KT)}>{item.Ten_KT}</span>

            </div>
           
          
            <div className="m-3">
            <Button onClick={()=>handleClickOpen(item.ID_KT)}>Tham Gia Kỳ Thi</Button>

            </div>
         
            </div>
          )
        })
        
        }
      
        <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tham Gia Thi"}</DialogTitle>
        <DialogContent>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Số Lần</th>
        <th>Thời Gian Thi</th>
        <th>Điểm</th>
      </tr>
    </thead>
    {BT.length!==0&&
    <tbody>
      {
        BT.map(item=>{
          return(
            <tr key={item.ID_BT}>
        <th>{item.Solan}</th>
        <td>{
          Math.floor((( new Date(item.End_Exam).getTime()- new Date(item.Start_Exam).getTime())/ (1000 * 60*60)))
          +":"+Math.floor((( new Date(item.End_Exam).getTime()- new Date(item.Start_Exam).getTime()) % (1000 * 60*60)/ (1000 * 60)))
          +":"+Math.floor((( new Date(item.End_Exam).getTime()- new Date(item.Start_Exam).getTime())% (1000*60) / (1000)))
        }
        </td>
        <td>{item.Diem>=0?item.Diem?.toFixed(2):"Chưa Hoàn Thành"}</td>
      </tr>
          )
        })
      }
     
   
    </tbody>
    }
  </table>
</div>
        <div>
          <p className="text-center mb-5 mt-4">Sô lần Được Thi</p>
          <p className="text-center">{ exam.length!==0? exam[0].solan:"" }</p>
        </div>
        <div>
          <p className="text-center  mb-5 mt-4">Sô lần Đã Thi</p>
          <p className="text-center">{ solan }</p>
        </div>
        </DialogContent>
        {exam.length!==0?new Date(Date.now()).getTime()<=new Date(exam[0].End_TIme).getTime()?
        <DialogActions>
         { BT.length===0? <Button onClick={()=>handleAddtest()}>Tham Gia </Button>:
              new Date(BT[solan-1]?.End_Exam).getTime()-new Date(Date.now()).getTime()<=0?exam[0].solan ===solan
              ?<Button disabled>Quá Giá Hạn Làm Bài </Button>
              : <Button onClick={()=>handleAddtest()}>Tham Gia </Button>:<Button ><Link href={`/Exam/${ BT[solan-1].ID_BT}`}> Tiếp Tục </Link></Button> }
        
          <Button onClick={handleClose}>tHoát</Button>
        </DialogActions>
        :<DialogActions>
        <Button disabled>Đã Hết Thời Gian Làm Bài </Button>
        <Button onClick={handleClose}>tHoát</Button> 
        </DialogActions>
        :<DialogActions><Button onClick={handleClose}>tHoát</Button> </DialogActions>
        }

      </Dialog>
      </div>
    }
    </div>
    <div className="divider lg:divider-horizontal"></div> 
  <div className="grid flex-grow h-full  card  rounded-box place-items-center">
    
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link href="/">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thanh Điều hướng</h5>
    </Link>
    <hr ></hr>
    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">Trang Chủ</p>
    <div className="mb-5">
    <Link href="/information" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Trang cá Nhân
    </Link>
    </div>
    <div className="mt-5">
    <Link href="/course" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Các Khóa Học đã Đăng Ký
    </Link>
    </div>
    
</div>

  </div>
    </div>
    </>
  )
}
