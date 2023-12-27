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
import { GetALLHS,GetpageHS,SearchHS } from '@/store/Student';
import { AddListclass, deletelistclassID, getbyidClass, updateListclass } from '@/store/listClass';
import { GetbyIDClass } from '@/store/Class';
import Link from 'next/link';
import readXlsxFile from 'read-excel-file'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
    const [openfile, setOpenfile] = useState(false);
    const [File, setFile] = useState();
    const { enqueueSnackbar} = useSnackbar();
    const [page, setPage] = useState(1);

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
        async function GetHS(){
            try {
                const res = await dispatch(GetpageHS({page}));
                unwrapResult(res);
            } catch (error) {
                console.log(error);

            }
        }
        GetHS()
    
   }, [page,lcheck]);
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
    const handleClickOpenfile = () => {
      setOpenfile(true);
    };
    
    const handleClosefile = () => {
      setOpenfile(false);
    };
    const handlefile=async()=>{
  
      readXlsxFile(File[0]).then(async (rows) => {
        for(var i = 1; i <rows.length; i++) {
      
          try {
            if(listClass.ListClassid?.filter(item=>item.ID_HS===rows[i][0]).length>0){
              const data={
              
                ID_HS:rows[i][0],
                id:listClass.ListClassid?.filter(item=>item.ID_HS===rows[i][0])[0].ID_LHS
              }
               await dispatch(updateListclass(data)) 
               console.log("á")
            }else{
              const data={
                password:ClassT.Classid[0].password,
                ID_HS:rows[i][0],
                ID_L:id.query.id
              }
              await dispatch(AddListclass(data))
            
            }
        
          } catch (error) {
           console.log(error)
           Swal.fire(
            'Lỗi!',
            'Xóa Thất Bại',
            'error'
          )
          setlcheck(!lcheck)
          break;
          }
      }
      const res = await dispatch(getbyidClass({ID_L:id.query.id}));
              unwrapResult(res);
    setOpenfile(false)
      setlcheck(!lcheck)
        
      })
    }
    const handleChange = (event, value) => {
      setPage(value);
    };
    return(
        <>
      
         <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Thêm Học Sinh Vào Lớp</h1>
      <p className="text-xl pb-3 flex items-center">
       <Button className="btn" onClick={handleClickOpenfile}> <i className="fas fa-list mx-3"></i> Thêm Học Sinh Bằng file</Button>
    </p>
<div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleClickOpen}>Tìm Kiếm </button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleOpen}>Tìm Kiếm Mã Học Sinh</button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setlcheck(!lcheck)}>Tất Cả</button>
    </p>
    {Student.isloadingpage&&
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
            
            {Student.Studentpage?.map(item=>{
                    return(
                        <tr key={item.ID_users}>
                    <td className="w-1/3 text-left py-3 px-4">{item.Ten}</td>
                    <td className="w-1/3 text-left py-3 px-4">{item.Diachi}</td>
                    <td className="text-center py-3 px-4 " >0{item.SDT}</td>
                    <td className="text-center py-3 px-4 " >{item.Email}</td>
                    {listClass.isloadingid&& listClass.ListClassid?.filter((ik) => ik.ID_HS === item.ID_users).length===0
                      ?<td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleAddClass(item.ID_users)}><i className="fa-solid fa-plus"></i></td>
                      :<td className="text-center py-3 px-4 " ><i className="fa-solid fa-check text-blue-500 "></i></td>}
                </tr>
                    )
                })
            }
            </tbody>
            
        </table>
        <div className="flex justify-center ">
        <Stack spacing={2} >
      <Pagination count={Student.page} showFirstButton showLastButton  page={page} onChange={handleChange}/>
     
    </Stack>
        </div>
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
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0]?.Ten}
                </td>
               
                <td  className="w-1/3 text-left py-3 px-4">
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0]?.Diachi}
                </td>
                <td  className=" text-center py-3 px-4">
                0{Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0]?.SDT}
                </td>
                <td  className=" text-center py-3 px-4">
                {Student.isloading && Student.Student?.filter((i) => i.ID_users === item.ID_HS)[0]?.Email}
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
<Dialog open={openfile} onClose={handleClosefile}>
        <DialogTitle>Thêm Học Sinh vào lớp</DialogTitle>
        <DialogContent>
        <div className="w-full h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="p-6 border border-gray-300 sm:rounded-md">
            <div className="mb-5 border border-gray-300 w-20">
            <span>File Mẫu</span>
            <Link href="http://localhost:5000/public/getClass/" download>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/></svg>
            </Link> 
         
            </div>
              <form
                method="POST"
                action="https://herotofu.com/start"
                encType="multipart/form-data"
            
              >
                <label className="block mb-6">
                  <span className="text-gray-700">File Học Sinh Cần thêm vào lớp</span>
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