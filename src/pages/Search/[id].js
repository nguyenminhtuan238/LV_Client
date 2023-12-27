import { Getclass, SearchclassByHS } from "@/store/Class";
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
import TextField from '@mui/material/TextField';
import { AddListclass, getbyidHS, getidlistclass } from "@/store/listClass";
import { Accesstoken } from "@/useapi/auth.api";
import { Refreshtoken } from "@/store/user";
import { getALLTeacher } from "@/store/Teacher";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export default function Home() {
  const ClassT = useSelector((state) => state.Class);
  const user = useSelector((state) => state.user);
  const Teacher = useSelector((state) => state.Teacher);
  const router = useRouter()
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false);
  const [class1, setclass1] = useState([]);
  const [password, setpassword] = useState('');
  const [listClassID, setlistClassID] = useState([]);
  
  useEffect(() => {
  
     async function GetALLTe(){
       try {
        const res = await dispatch(getALLTeacher());
        unwrapResult(res);
       } catch (error) {
         console.log(error)
       }
     }
     GetALLTe()
  }, []);
  const handleClickOpen =async  (id) => {
    try {
      const ID_HS=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN))
      const data={
        ID_HS:ID_HS.a.id,
        ID_L:id
      }

      const res = await dispatch(getidlistclass(data));
      const result= unwrapResult(res);
      if(result.length===0){
          setclass1(ClassT.Class.filter((item)=>item.ID_L===id))
    setOpen(true);
      }else{
        router.push(`/${id}`)
      }
    } catch (error) {
      if(error?.er===2){
        await Refreshtoken()
        handleClickOpen()
     }
    }
  
  };

  const handleClose = () => {
     
    setOpen(false);
  };
  useEffect(() => {
   
    async function GetclassALLID() {
      try {
     
        const res = await dispatch(SearchclassByHS({Search:router.query.id}));
        unwrapResult(res);
      
      } catch (error) {
        console.log(error);
        if(error?.er===2){
          await Refreshtoken()
          handleClickOpen()
       }
      }
    }
    GetclassALLID();
  }, [router.isReady,router]);
  const handleAddclass=async ()=>{
    try {
      const ID_HS=await Accesstoken(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN))
      const data={
        password,
        ID_HS:ID_HS.a.id,
        ID_L:class1[0].ID_L
      }
      const res = await dispatch(AddListclass(data));
      unwrapResult(res);          
      setpassword('')
      setOpen(false)
      router.push(`/${class1[0].ID_L}`)
    } catch (error) {
      console.log(error);
      if(error?.er===2){
         await Refreshtoken()
         handleAddclass()
      }
      Swal.fire(
        'Sửa Thất Bại!',
        `${error.message}`,
        'error'
      )
      setpassword('')
      setOpen(false)

    }
  }
  return (
    <>
     {user.user?
        <div className="flex flex-col w-full lg:flex-row mb-3 mt-5">
  <div className="grid flex-grow h-full card w-2/3  rounded-box ">
      <div className="divide-y-8 divide-blue-500  before:divide-white before:content-[''] before:block  p-3">
      <div className=" font-bold text-4xl mb-3">Tìm Kiếm {router.query.id}</div>
      <div  className=" font-bold text-4xl"></div>
      </div>
  {ClassT.isloadingid&&
      <div className="mt-10">
        
        {ClassT.Classid?.map((item)=>{
          return(
            <div key={item.ID_L} className="py-3  border-b border-b-gray-300 mb-2">
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6" component="div">
            Tên Lớp:       <span  className="text-black  cursor-pointer text-2xl font-medium hover:text-blue-700 " onClick={()=>handleClickOpen(item.ID_L)}>{item.Ten_Lop}</span>
            </Typography>
          </Grid>
         
        </Grid>
        <Typography color="text.secondary" variant="body2">
        {Teacher.isloading&&"Giáo Viên: "+ Teacher.Teacher.filter((it)=>it.ID_users===item.ID_GD)[0]?.Ten}
        </Typography>
      </Box>      
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}  onClick={()=>handleClickOpen(item.ID_L)}>
        <Button  variant="outlined" className=" font-medium hover:bg-blue-500 hover:text-black ">Truy Cập Vào Lớp học</Button>
      </Box>
    </Box>
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
        <DialogTitle>{"Đăng ký Lớp Học"}</DialogTitle>
        <DialogContent>
        <div>
        {class1[0]?.password&& <TextField id="filled-basic" label="Mật Khẩu" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} variant="filled" />}
        </div>
        </DialogContent>
        <DialogActions>
         {user.user? <Button onClick={handleAddclass}>Đăng ký </Button>:<Button onClick={handleAddclass}><Link href="login">Đăng Nhập</Link></Button>}
          <Button onClick={handleClose}>tHoát</Button>
        </DialogActions>
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

:<div className="flex justify-center items-center"><Button ><Link href="login">Đăng Nhập</Link></Button></div>}
    </>
  )
}
