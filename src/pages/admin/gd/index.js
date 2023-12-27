import { LayoutAdmin } from "@/Components/admin/layout/layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import readXlsxFile from 'read-excel-file'
import { DeleteAuth, HandleRegister } from "@/useapi/auth.api";
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { getALLTeacher, getpageTeacher, SearchGD } from "@/store/Teacher";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function subject() {
  const dispatch=useDispatch();
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Diachi, setDiahi] = useState("");
  const [SDT, setSDT] = useState("");
  const [Error, setError] = useState("");
  const [seleted, setseleted] = useState("ADDONE");
  const [File, setFile] = useState();
  const  user  = useSelector(state => state.user)
  const Teacher = useSelector((state) => state.Teacher);
  const router = useRouter()
  const [Search, setSearch] = useState("");
  const [IDHS, setIDHS] = useState("");
  const [open, setOpen] = useState(false);
  const [openIDGD, setOpenIDGD] = useState(false);
  const [lcheck, setlcheck] = useState(false);
  const [openfile, setOpenfile] = useState(false);
  const [DelFile, setdeleteFile] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
      router.push("/admin/")
    }
  }, [user.admin]);
  useEffect(() => {
    async function GetALlHS(){
        try {
            const res = await dispatch(getALLTeacher());
            unwrapResult(res);
        } catch (error) {
            console.log(error);

        }
    }
    GetALlHS()

}, [lcheck]);
useEffect(() => {
  async function GetALlHS(){
      try {
          const res = await dispatch(getpageTeacher({page}));
          unwrapResult(res);
      } catch (error) {
          console.log(error);

      }
  }
  GetALlHS()

}, [page,lcheck]);
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const acc = {
        username,
        password,
        role: 2,
        Email,
        Diachi,
        SDT,
        Ten: First + " " + Last,
      };
      console.log(acc)
       await HandleRegister(acc);
     
      Swal.fire("Thêm!", "Thêm Thành Công", "success");
      setFirst("");
      setDiahi("");
      setLast("");
      setEmail("");
      setPassword("");
      setError("");
      setSDT("");
      setUsername("");
      setPage(1)
      setlcheck(!lcheck)
    } catch (error) {
      if (error?.er === 1) {
        setError(error.mess);
      }
      if (error?.er === 2) {
        setError(error.mess);
      }
      setPage(1)
      setlcheck(!lcheck)
    }
  };
  const handlefile=async(e)=>{
    e.preventDefault(e)
    readXlsxFile(File[0]).then(async (rows) => {
      for(var i = 1; i <rows.length; i++) {
       
        try {
        
          const acc = {
            username:rows[i][0],
            password:rows[i][1].toString(),
            Email:rows[i][5],
            Diachi:rows[i][3],
            SDT:rows[i][2],
            Ten: rows[i][4],
            role: 2,
          };
          await HandleRegister(acc);
         
          if(rows[rows.length-1][0]===rows[i][0]){
            await dispatch(getpageTeacher({page:1}))
          }
          
        
        } catch (error) {
          if (error?.er === 1) {
            Swal.fire("Thêm Thất Bại!", `Thêm Thất bại ${error.mess+""+rows[i][0]}  `, "error");
            break;
          }
          if (error?.er === 2) {
            Swal.fire("Thêm Thất Bại!", `Thêm Thất bại ${error.mess+""+rows[i][5]}  `, "error");
          
          }
          setlcheck(!lcheck)
          setPage(1)
        }
    }
      
    })
    setlcheck(!lcheck)
    setPage(1)
  }
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleDelete= async (ID_GD)=>{
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
          await DeleteAuth(ID_GD)
         
          Swal.fire(
            'Xóa!',
            'Xóa Thành Công',
            'success'
          )
          setlcheck(!lcheck)
          setPage(1)
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("")
  };
  const handleOpen = () => {
    setOpenIDGD(true);
    };
  
    const handleCloseHS= () => {
      setOpenIDGD(false);
      setIDHS("")
    };
    const handleSearch=async ()=>{
   
     
      try {
        const data={
          Search,
        }
        const res = await dispatch(SearchGD(data));
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
          const res = await dispatch(SearchGD(data));
            unwrapResult(res);
            setOpenIDGD(false)
          setIDHS("")
        } catch (error) {
          console.log(error);
        }
      
      
      }
      const handleClickOpenfile = () => {
        setOpenfile(true);
      };
      
      const handleClosefile = () => {
        setOpenfile(false);
      };
      const handledeteleUser=async()=>{
    
        readXlsxFile(DelFile[0]).then(async (rows) => {
          for(var i = 1; i <rows.length; i++) {
        console.log(rows[i][0])
            try {
              if(Teacher.Teacher?.filter(item=>item.ID_users===rows[i][0]).length>0){
                await DeleteAuth(rows[i][0])
              }
           
          
            } catch (error) {
             console.log(error)
             Swal.fire(
              'Lỗi!',
              'Xóa Thất Bại',
              'error'
            )
            setlcheck(!lcheck)
            setPage(1)            
            break;
            }
        }
     
      setOpenfile(false)
        setlcheck(!lcheck)
        setPage(1)
          
        })
      }
  return (
    <>
      <main className="max-w-full h-full flex relative overflow-y-hidden">
        <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
          <div className="w-40 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                checked={seleted === "ADDALL"}
                onChange={(e) => setseleted(e.target.value)}
                type="radio"
                value="ADDALL"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thêm Giáo Viên Bằng File
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={seleted === "ADDONE"}
                onChange={(e) => setseleted(e.target.value)}
                id="default-radio-2"
                type="radio"
                value="ADDONE"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thêm Từng Giáo Viên
              </label>
            </div>
          </div>
          {seleted === "ADDONE" ? (
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow ">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
                onSubmit={(e) => handleCreate(e)}
                method="post"
              >
                <div className="mb-5">
                  <span className="text-lg font-bold text-gray-600">
                    Thêm Giáo Viên
                  </span>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Họ
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                      id="grid-first-name"
                      type="text"
                      onChange={(e) => setFirst(e.target.value)}
                      value={First}
                      placeholder="Minh"
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Tên
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-last-name"
                      type="text"
                      onChange={(e) => setLast(e.target.value)}
                      value={Last}
                      placeholder="Tuan"
                    />
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tên Đăng Nhập
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                      placeholder="Nhập Thông tinh Vào"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mật Khẩu
                    </label>
                    <input
                      autoComplete="true"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={Email}
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Địa Chỉ
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-city"
                      type="text"
                      onChange={(e) => setDiahi(e.target.value)}
                      value={Diachi}
                      placeholder=""
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Số Điện Thoại
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-zip"
                      type="number"
                      onChange={(e) => setSDT(e.target.value)}
                      value={SDT}
                      placeholder="90210"
                    />
                  </div>
                </div>
                <div className="md:w-full  px-3 mb-6 md:mb-0">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 w-full mt-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {seleted === "ADDALL" ? (
            <div className="w-40 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="p-6 border border-gray-300 sm:rounded-md">
            <div className="mb-5 border border-gray-300 w-20">
            <span>File Mẫu</span>
            <Link href="http://localhost:5000/public" download>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/></svg>
            </Link> 
            </div>
              <form
                method="POST"
                action="https://herotofu.com/start"
                encType="multipart/form-data"
                onSubmit={(e)=>handlefile(e)}
              >
                <label className="block mb-6">
                  <span className="text-gray-700">File Thông Tin Giáo Viên</span>
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
                <div className="mb-6">
                  <button
                    type="submit"
                    className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
                  >
                    Upload
                  </button>
                </div>
                <div></div>
              </form>
            </div>
            </div>
          ) : (
            ""
          )}
          {Teacher.isloadingpage&&
          
          <div className="w-80 h-60 rounded-lg flex-shrink-0 flex-grow ">
          <p className="text-xl pb-3 flex items-center">
       <Button className="btn" onClick={handleClickOpenfile}> <i className="fas fa-list mx-3"></i> Xóa Giáo Viên Bằng file</Button>
    </p>
          <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleClickOpen}>Tìm Kiếm </button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={handleOpen}>Tìm Kiếm Mã Giáo Viên</button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setlcheck(!lcheck)}>Tất Cả</button>
            <table className=" border-collapse border border-slate-400 w-4/5 ">
              <thead className="border border-slate-300 ">
                <tr>
                  <th className="border border-slate-300 ">Mã Giáo Viên</th>
                  <th className="border border-slate-300 ">Tên Giáo Viên</th>
                  <th className="border border-slate-300">Xóa</th>
                </tr>
              </thead>
              <tbody>
                   
            {Teacher.Teacherpage?.map(item=>{
                    return(
                        <tr key={item.ID_users}>
                    <td className="w-1/5 text-left py-3 px-4 border border-slate-300">{item.ID_users}</td>
                    <td className="w-2/3 text-left py-3 px-4 border border-slate-300">{item.Ten}</td>
                    <td className="border border-slate-300">
                    <div className="flex item-center justify-center cursor-pointer " onClick={()=>handleDelete(item.ID_users)}>
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
                </tr>
                    )
                })
            }
              </tbody>
            </table>
            <div className="flex justify-center ">
        <Stack spacing={2} >
      <Pagination count={Teacher.page} showFirstButton showLastButton  page={page} onChange={handleChange}/>
     
    </Stack>
        </div>
          </div>
          }
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
      <Dialog open={openIDGD} onClose={handleCloseHS}>
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
      <Dialog open={openfile} onClose={handleClosefile}>
        <DialogTitle>Xóa Học Sinh </DialogTitle>
        <DialogContent>
        <div className="w-full h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="p-6 border border-gray-300 sm:rounded-md">
            <div className="mb-5 border border-gray-300 w-20">
            <span>File Mẫu</span>
            <Link href="http://localhost:5000/public/fileDelTe/" download>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/></svg>
            </Link> 
         
            </div>
              <form
                method="POST"
                action="https://herotofu.com/start"
                encType="multipart/form-data"
            
              >
                <label className="block mb-6">
                  <span className="text-gray-700">File Xóa Giáo Viên</span>
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
          "       onChange={(e)=>setdeleteFile(e.target.files)}
                  />
                </label>
               
                <div></div>
              </form>
            </div>
            </div>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handledeteleUser}>Xóa</Button>
          <Button onClick={handleClosefile}>Thoát</Button>
        </DialogActions>
      </Dialog>
      </main>
    </>
  );
}
subject.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
