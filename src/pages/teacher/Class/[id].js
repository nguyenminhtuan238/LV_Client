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
import Swal from "sweetalert2";
import { GetALLHS,SearchHS } from '@/store/Student';
import { AddListclass, deletelistclassID, getbyidClass } from '@/store/listClass';
import { GetbyIDClass } from '@/store/Class';

export default function ExamID(){
    const id=useRouter()
    const [open, setOpen] = useState(false);
    const [openIDHS, setOpenIDHS] = useState(false);
    const  user  = useSelector(state => state.user)
    const Student = useSelector((state) => state.Student);
    const listClass = useSelector((state) => state.listClass);
    const ClassT = useSelector((state) => state.Class);
    const [Search, setSearch] = useState("");
    const [IDHS, setIDHS] = useState("");
    const [lcheck, setlcheck] = useState(false);
    const dispatch=useDispatch();
    const { enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        if(!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          id.push("/teacher")
        }
      }, [user.Teacher]);
      useEffect(() => {
            async function GetALlHS(){
                try {
                    const res = await dispatch(GetALLHS());
                    unwrapResult(res);
                } catch (error) {
                    console.log(error);

                }
            }
            GetALlHS()
        
       }, [lcheck]);
       useEffect(() => {
        async function GetIDClass(){
          if(id.isReady){
            try {
                const res = await dispatch(getbyidClass({ID_L:id.query.id}));
                unwrapResult(res);
            } catch (error) {
                console.log(error);

            }
          }
        }
        async function GetByIDClass(){
          if(id.isReady){
            try {
                const res = await dispatch(GetbyIDClass(id.query.id));
                unwrapResult(res);
            } catch (error) {
                console.log(error);

            }
          }
        }
        GetIDClass()
        GetByIDClass()
   }, [id.isReady]);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSearch("")
    };
    const handleOpen = () => {
        setOpenIDHS(true);
      };
    
      const handleCloseHS= () => {
        setOpenIDHS(false);
        setIDHS("")
      };
    const handleSearch=async ()=>{
   
     
      try {
        const data={
          Search,
        }
        const res = await dispatch(SearchHS(data));
          unwrapResult(res);
          setOpen(false)
        setSearch("")
      } catch (error) {
        console.log(error);
      }
    
    
    }
    const handleSearchID=async ()=>{
        try {
          const data={
            ID_user:IDHS,
          }
          const res = await dispatch(SearchHS(data));
            unwrapResult(res);
            setOpenIDHS(false)
          setIDHS("")
        } catch (error) {
          console.log(error);
        }
      
      
      }
    const handleAddClass=async (ID_HS)=>{
        
        try {
          const data={
            password:ClassT.Classid[0].password,
            ID_HS,
            ID_L:id.query.id
          }
          await dispatch(AddListclass(data))
          const res = await dispatch(getbyidClass({ID_L:id.query.id}));
          unwrapResult(res);
          Swal.fire(
            'Thêm!',
            'Thêm Thành Công',
            'success'
          )
        } catch (error) {
            enqueueSnackbar(`${error.message}`, {
              variant: 'error',
              autoHideDuration: 1200,
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            setlcheck(!lcheck)
          }
        
    }
    const handleDelete= async (ID_LHS)=>{
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
            await dispatch(deletelistclassID(ID_LHS))
            const res = await dispatch(getbyidClass({ID_L:id.query.id}));
            unwrapResult(res);
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
      
         <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Thêm Học Sinh Vào Lớp</h1>
     
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleClickOpen}>Tìm Kiếm </button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleOpen}>Tìm Kiếm Mã Học Sinh</button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setlcheck(!lcheck)}>Tất Cả</button>
    </p>
    {Student.isloading&&
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Họ và Tên</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Địa Chị</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Số Điện Thọai</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Địa Chị Email</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Thêm</th>
                  
                </tr>
            </thead>
            
            <tbody className="text-gray-700">
            
            {Student.Student?.map(item=>{
                    return(
                        <tr key={item.ID_users}>
                    <td className="w-1/3 text-left py-3 px-4">{item.Ten}</td>
                    <td className="w-1/3 text-left py-3 px-4">{item.Diachi}</td>
                    <td className="text-center py-3 px-4 " >0{item.SDT}</td>
                    <td className="text-center py-3 px-4 " >{item.Email}</td>
                    {listClass.isloadingid&& listClass.ListClassid.filter((ik) => ik.ID_HS === item.ID_users).length===0
                      ?<td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleAddClass(item.ID_users)}><i className="fa-solid fa-plus"></i></td>
                      :<td className="text-center py-3 px-4 " ><i className="fa-solid fa-check text-blue-500 "></i></td>}
                </tr>
                    )
                })
            }
            </tbody>
            
        </table>
    </div>
    }
</div>
<div className="w-full mt-6">
<p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> Học Sinh Đã Thêm
    </p>
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                <th  className="text-left w-1/3   py-3 px-4 uppercase font-semibold text-sm"> Họ và Tên</th>
                    <th className="text-left w-1/3  py-3 px-4 uppercase font-semibold text-sm">Địa Chị</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Số Điện Thọai</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Địa Chị Email</th>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                </tr>
            </thead>
            {listClass.isloadingid&&
            <tbody className="text-gray-700">
            {listClass.ListClassid?.map((item) => {
              return(
                
              <tr key={item.ID_LHS}>
               
                <td  className="w-1/3 text-left py-3 px-4">
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0].Ten}
                </td>
               
                <td  className="w-1/3 text-left py-3 px-4">
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0].Diachi}
                </td>
                <td  className=" text-center py-3 px-4">
                0{Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0].SDT}
                </td>
                <td  className=" text-center py-3 px-4">
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0].Email}
                </td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDelete(item.ID_LHS)}><i className="fa-solid fa-trash"></i></td>
              </tr>
              )
            })
             
            
              }
           
            </tbody>
            }
        </table>
    </div>
   
</div>
 <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tìm Kiếm </DialogTitle>
        <DialogContent>
          
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
      <Dialog open={openIDHS} onClose={handleCloseHS}>
        <DialogTitle>Tìm Kiếm </DialogTitle>
        <DialogContent>
          
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
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchID} >Tìm</Button>
          <Button onClick={handleCloseHS}>Thoát</Button>
        </DialogActions>
      </Dialog>
      </main>
     
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