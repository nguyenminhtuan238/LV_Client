import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {  useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetclassTeacher } from "@/store/Class";
import { GetSubject } from "@/store/Subjectr";
import dayjs from 'dayjs';
import Swal from "sweetalert2";
import { Accesstoken } from "@/useapi/auth.api";
import { RefreshTeachertoken } from "@/store/user";
import { AddExam, deleteExam, getExamTeacher, updateExam, updateSTExam } from "@/store/Exam";
import { APIdeleteQExam, APIgetIdExam } from '@/useapi/Exam.API';
import { CSVLink } from "react-csv";
import { getTestExam } from '@/store/test';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {  getALLidNHCH } from '@/store/Nhch';
import {  getidlistNH } from '@/store/listNH';
import { getQuestionsubject } from '@/store/Question';
import { useSnackbar } from "notistack";
import { AddListQ,getidlistQ } from '@/store/ListQ';

function Teacher() {
  const router = useRouter()
  const  user  = useSelector(state => state.user)
  const ClassT = useSelector((state) => state.Class);
  const subject = useSelector((state) => state.list);
  const Exam = useSelector((state) => state.Exam);
  const NHCH = useSelector((state) => state.Nhch);
  const Question = useSelector((state) => state.Question);
  const ListNH = useSelector((state) => state.listNH);
  const ListQ = useSelector((state) => state.ListQ);
  const { enqueueSnackbar} = useSnackbar();

  const dispatch=useDispatch();
    const [Ten_KT, setTen_KT] = useState("");
    const [End, setEnd] = useState(dayjs(new Date (Date.now())));
    const [solan, setsolan] = useState(1);
    const [sophut, setSoPhut] = useState(1);
    const [Start, setStart] = useState(dayjs(new Date (Date.now())));
    const [open, setOpen] = useState(false);
    const [openNH, setOpenNH] = useState(false);
    const [openLC, setOpenLC] = useState(false);
    
    const [Class, setClass] = useState("")
    const [Mon, setMon] = useState("");
    const [IDX, setIDX] = useState(1);
    const [IDExam, setIDExam] = useState(0);
   const [openupdate, setopenupdate] = useState(false);
   const [openID, setopenID] = useState(false);
   const dataall=useRef([])
   const dataMAx=useRef([])
   const [NH, setNH] = useState([]);
   const [IDTe, setIDTe] = useState(1);
   const [ExamID, setExamID] = useState([]);
   const [expanded, setExpanded] = useState(false);
  const [checkL, setcheckL] = useState(false);
  
    useEffect(() => {
        if(!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          router.push("/teacher")
        }
      }, [user.Teacher]);
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
      }, []);
    
      useEffect(() => {
        async function GetExam(){
          try {
            const res = await dispatch(getExamTeacher());
           const result= unwrapResult(res);
            if(result.length!=0){
              for(let i=0;i<result.length;i++){
                const convertend=new Date( result[i]?.End_TIme).getTime()
                const convertnow=new Date(Date.now()).getTime()
                const convertStart=new Date( result[i]?.Start_Time).getTime()
                if(result[i]?.Status!=="Đang khởi tạo"){
                  const status={
                    id:result[i].ID_KT,
                    Status:convertnow-convertStart<0?"khởi tạo":convertnow-convertend>=0?"Hoàn Thành":"Đang diễn ra",
                  
                  }  
                   const St = await dispatch(updateSTExam(status));
                   unwrapResult(St);
                }
              }
            }
          } catch (error) {
            console.log(error);

          }
        }
        GetExam()
      }, [checkL]);
      useEffect(() => {
        async function Getclass() {
            try {
              const res = await dispatch(GetclassTeacher());
             const result= unwrapResult(res);
             setClass(result[0].Ten_Lop)
             
          
            } catch (error) {
              console.log(error);
            }
          }
          async function Getsubject() {
            try {
              const res = await dispatch(GetSubject());
              const result=  unwrapResult(res);
              setMon(result[0].Ten_Mon)
            } catch (error) {
              console.log(error);
            }
          }
          Getsubject();
          Getclass();
        
       }, [ClassT.check]);
       const handleChange = (panel) => async (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);        
        try {
          const res = await dispatch(getidlistNH(panel));
           unwrapResult(res);
           const Q = await dispatch(getQuestionsubject(ExamID[0].ID_M));
           unwrapResult(Q);
        } catch (error) {
          console.log(error);
        }
       
      };
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleClickOpenNH = () => {
        setOpenNH(true);
        setOpenLC(false);
      };
      const handleCloseNH = () => {
        setOpenNH(false);
      };
      const handleClickOpenLC = async (id) => {
        setOpenLC(true);
        setExamID(Exam.isloading&&Exam.Exam.filter(it=>it.ID_KT===id))
        setIDX(id)
        try {
          const reslQ = await dispatch(getidlistQ(id));
          unwrapResult(reslQ);
        } catch (error) {
          console.log(error)
        }
      };
      const handleCloseLC = () => {
        setOpenLC(false);
        
      };
      const handleAddExam=async ()=>{
          // console.log(Mon,Start.$d
          //   ,End,Ten_KT,Class)
            try {
               
                const event =new Date( Start.$d.getTime()+25200000);
                const covenrtEnd=new Date(End.$d.getTime()+25200000)
                const ID_M = subject.subject.filter((item) => item.Ten_Mon === Mon)[0].ID_M
                 const ID_L= ClassT.Class.filter((item) => item.Ten_Lop === Class)[0].ID_L
                const data={
                  ID_M,
                  ID_L,
                  ID_GD:IDTe,
                  Start:event,
                  End:covenrtEnd,
                  sophut,
                  solan,
                  Ten_KT,
                }
                const add=await dispatch(AddExam(data))
                unwrapResult(add)
                setTen_KT("")
                setEnd(dayjs(Date.now()))
                setStart(dayjs(Date.now()))
                setsolan(1)
                setSoPhut(1)
                setOpen(false)
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
              await APIdeleteQExam(id)
             const res= await dispatch(deleteExam(id))
              await unwrapResult(res)
              Swal.fire(
                'Xóa!',
                'Xóa Thành Công',
                'success'
              )
    
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
      const handleEdit=async (id,idM,IdL)=>{
        setopenupdate(true)
        
        try {
          

          const result= await APIgetIdExam(id)         
          
         
          setTen_KT(result[0].Ten_KT)
          setMon(subject.isloading?subject.subject?.filter(i=>i.ID_M===idM)[0].Ten_Mon:"")
          setClass(ClassT.isloading?ClassT.Class?.filter(i=>i.ID_L===IdL)[0].Ten_Lop:"")
          setStart(dayjs(result[0].Start_Time))
          setEnd(dayjs(result[0].End_TIme))
          setSoPhut(result[0].SoPhut)
          setsolan(result[0].solan)
          setIDExam(id)
        } catch (error) {
          console.log(error)
      }
      }
    const  handleEditClose=()=>{
      
        setTen_KT("")
        setEnd(dayjs(Date.now()))
        setMon(subject.isloading?subject.subject[0].Ten_Mon:"")
        setClass(ClassT.isloading?ClassT.Class[0].Ten_Mon:"")
        setStart(dayjs(Date.now()))
        setsolan(1)
        setSoPhut(1)
        setopenupdate(false)
      }
      const EditExam=async ()=>{
        
        try {  
                const event =new Date( Start.$d.getTime()+25200000);
                
                const covenrtEnd=new Date(End.$d.getTime()+25200000)
                const ID_M = subject.subject.filter((item) => item.Ten_Mon === Mon)[0].ID_M
                 const ID_L= ClassT.Class.filter((item) => item.Ten_Lop === Class)[0].ID_L
                const data={
                  ID_M,
                  ID_L,
                  id:IDExam,
                  Start:event,
                  End:covenrtEnd,
                  Ten_KT,
                  sophut,
                  solan,
                }
                console.log(data)

          const res=await dispatch(updateExam(data))
         await unwrapResult(res)
         setTen_KT("")
         setEnd(dayjs(Date.now()))
         setMon(subject.isloading?subject.subject[0].Ten_Mon:"")
         setClass(ClassT.isloading?ClassT.Class[0].Ten_Mon:"")
         setStart(dayjs(Date.now()))
         setSoPhut(1)
         setsolan(1)
         setopenupdate(false)
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
    const handleGetBT= async (id)=>{
        try {
          setopenID(!openID)
          const res=await dispatch(getTestExam(id))
          const result= unwrapResult(res)
          dataall.current=result.get
          dataMAx.current=result.getMax
          console.log(result)
        } catch (error) {
          console.log(res)
        }
    }
    const handleAddCH=async (ID_CH)=>{
        
      try {
     
        const data={
          id:ExamID[0].ID_KT,
          ID_CH,
          ID_KT:ExamID[0].ID_KT,
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
          id:ExamID[0].ID_KT,
          Status:"khởi tạo",
          TongCH:ExamID[0].TongCH?ExamID[0].TongCH+1:1,
        }      
        const St = await dispatch(updateSTExam(status));
        unwrapResult(St);
        const reslQ = await dispatch(getidlistQ(ExamID[0].ID_KT));
         unwrapResult(reslQ);
        }
      } catch (error) {
          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
            autoHideDuration: 1200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          setcheckL(!checkL)
        }
      
  }
    return (  
        < >
            <main className="w-full flex-grow p-6 ">
            <div>
      
      
    </div>
            <h1 className="text-3xl text-black pb-6">Quản Lý Kỳ Thi</h1>
         
 
                <div className="w-full mt-6">
                    <p className="text-xl pb-3 flex items-center">
                        <i className="fas fa-list mr-3"> </i> 
                        <button className="btn" onClick={handleClickOpen}>Tạo Kỳ thi</button>
                    </p>
                    <div className="bg-white overflow-auto">
                        <table className="min-w-full bg-white ">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className=" text-left  py-3 px-4 uppercase font-semibold text-sm">Kỳ Thi</th>
                                    <th className=" text-left  py-3 px-4 uppercase font-semibold text-sm">Lớp</th>
                                    <th className=" text-left  py-3 px-4 uppercase font-semibold text-sm">Môn</th>
                                    <th className="text-left    py-3 px-4 uppercase font-semibold text-sm">Ngày Thi</th>
                                    <th className="text-left  py-3 px-4 uppercase font-semibold text-sm">Ngày kết thúc</th>
                                    <th className="text-left  py-3 px-4 uppercase font-semibold text-sm">Thời lượng</th>
                                    <th className="text-left  py-3 px-4 uppercase font-semibold text-sm">Số lần</th>
                                    <th className="text-left  py-3 px-4  uppercase font-semibold text-sm">Tổng Câu Hỏi</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Trạng Thái</th>
                                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Thêm/Sửa Bài Thi</th>
                                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xuất Bài Thi</th>
                                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Sửa</th>
                                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Xóa</th>
                                </tr>
                            </thead>

                              {Exam.isloading&&
                            <tbody className="text-gray-700">
                                {
                                  Exam.Exam.map(item=>{
                                    return(
                                      <tr key={item.ID_KT}>
                                      <td className=" text-center ">{item.Ten_KT}</td>
                                      <td className=" text-center">{ClassT.isloading&&ClassT.Class.filter(i=>i.ID_L===item.ID_L)[0].Ten_Lop}</td>
                                <td className=" text-center">{subject.isloading&&subject.subject?.filter(i=>i.ID_M===item.ID_M)[0].Ten_Mon}</td>
                                <td className="text-center">{new Date(item.Start_Time).getDate()+"/"+(new Date(item.Start_Time).getMonth()+1)+"/"+new Date(item.Start_Time).getFullYear()}</td>
                                <td className="text-center ">{new Date(item.End_TIme).getDate()+"/"+(new Date(item.End_TIme).getMonth()+1)+"/"+new Date(item.End_TIme).getFullYear()}</td>
                                <td className="text-center ">{item.SoPhut} Phút</td>
                                <td className="text-center ">{item.solan}</td>
                                <td className="text-center ">{item.TongCH?item.TongCH:"Chưa thiết làm bài làm"}</td>
                                <td className="text-center ">{item.Status}</td>
                                <td className="text-center"><p className="hover:text-blue-500 cursor-pointer" onClick={()=>handleClickOpenLC(item.ID_KT)}><i className="fa-solid fa-plus"></i></p></td>
                                <td className="text-center py-3 px-4">
                                
                                {item.Status==="Hoàn Thành"?<div className="dropdown ">
  <label tabIndex={item.ID_KT} className="btn m-1" onClick={()=>handleGetBT(item.ID_KT)}><i className="fa-solid fa-caret-down"></i></label>
  <ul tabIndex={item.ID_KT} className={`dropdown-content z-[1] menu p-2 ${openID===true?"block ":"hidden"} shadow bg-base-100 rounded-box w-52`}>
    <li>
    <CSVLink data={dataMAx.current}   filename={"getMAX.csv"} >
    Lấy Điểm cao Nhất 
</CSVLink>
    
</li>
    <li>
    <CSVLink data={dataall.current} filename={"getALL.csv"} >
    Lấy Tất Cả
</CSVLink>
    </li>
  </ul>
</div>:"Bài Thi Chưa Kết Thúc"}
                                </td>
                                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleEdit(item.ID_KT,item.ID_M,item.ID_L)}><i className="fa-solid fa-pen-to-square"></i></td>
                                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDelete(item.ID_KT)}><i className="fa-solid fa-trash"></i></td>
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
    <Dialog open={openLC} onClose={handleCloseLC}>
        <DialogTitle>Chọn Phương Án</DialogTitle>
        <DialogContent>
        <div className="my-3">
        <Link href={`/teacher/exam/${IDX}`} className="hover:text-blue-500 cursor-pointer" ><i className="fa-solid fa-plus"></i>   Thêm Thủ công</Link>
      
        </div>
        <div className="my-3">
        <p  className="hover:text-blue-500 cursor-pointer" onClick={()=>handleClickOpenNH()}><i className="fa-solid fa-plus"></i>   Thêm Từ Ngân hàng câu hỏi</p>
        </div>
     
        </DialogContent>
        <DialogActions>
       
       
          <Button onClick={handleCloseLC}>Thoát</Button>
        </DialogActions>
      </Dialog>                     

    <Dialog open={openNH} onClose={handleCloseNH}>
  
        <DialogTitle>Ngân Hàng Câu Hỏi</DialogTitle>
        {NHCH.isloading&&
        <DialogContent>
       
        {NH?.map((item) => {
          return(
        <Accordion expanded={expanded === item.ID_NH } onChange={handleChange(item.ID_NH)} key={item.ID_NH}>
        <AccordionSummary
        
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{item.Ten_NG}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {Question.isloading&&
    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Nội Dung</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Hình Thức</th>

                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm">Thêm</th>
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
              {ListQ.isloadingid&&ListQ.ListQid.filter(it=>it.ID_CH===item.ID_CH).length>0?<td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" ><i class="fa-solid fa-check"></i></td>:<td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleAddCH( item.ID_CH)}><i className="fa-solid fa-plus"></i></td>}  
              </tr>
              )
            })
             
            }
           
            </tbody>
           }
        </table>
    </div>
   }
        </AccordionDetails>
      </Accordion>
          )
        })}
        </DialogContent>
        }
        <DialogActions>  
          
          <Button onClick={handleCloseNH}>Thoát</Button>
        </DialogActions>
    
      </Dialog>                     



      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Kỳ Thi</DialogTitle>
        <DialogContent>
        
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2  w-full">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Tên Kỳ Thi
      </label>
      <input required  value={Ten_KT} onChange={(e)=>setTen_KT(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Nhập Tên Kỳ Thi"/>
    </div>
  
  </div>
  {ClassT.isloading&&
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Lớp
      </label>
     
  <select className="select select-bordered w-full max-w-xs" value={Class} onChange={(e)=>setClass(e.target.value)}>
  {ClassT.Class?.map(item=>{
                    return(
                        <option key={item.ID_L}>{item.Ten_Lop}</option>
                 
                    )
                })
            }
</select>
  </div>
  </div>
}
{subject.isloading&&
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Môn
      </label>
  <select className="select select-bordered w-full max-w-xs" value={Mon} onChange={(e)=>setMon(e.target.value)}>
  {subject.subject?.map((item) => {
                        return <option key={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
</select>
  </div>
  </div>
}
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Thời Gian Bắt đầu
    </label>
  <DateTimePicker value={Start} onChange={(value)=>setStart(value)}/>  

</div>
  </div>
  
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Thời Gian Kết Thúc
    </label>
  <DateTimePicker value={End} onChange={(value)=>setEnd(value)}/>  

</div>
  </div>
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Thi Trong bao nhiêu phút
    </label>
    <input required  value={sophut} onChange={(e)=>setSoPhut(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Tên Kỳ Thi"/>

</div>
  </div>
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Số lần Thi
    </label>
    <input required  value={solan} onChange={(e)=>setsolan(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Tên Kỳ Thi"/>

</div>
  </div>
  </div>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleAddExam}>Tạo</Button>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
      <Dialog open={openupdate} onClose={handleEditClose}>
        <DialogTitle>Thêm Kỳ Thi</DialogTitle>
        <DialogContent>
        
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2  w-full">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
        Tên Kỳ Thi
      </label>
      <input required  value={Ten_KT} onChange={(e)=>setTen_KT(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Nhập Tên Kỳ Thi"/>
    </div>
  
  </div>
  {ClassT.isloading&&
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Lớp
      </label>
     
  <select className="select select-bordered w-full max-w-xs" value={Class} onChange={(e)=>setClass(e.target.value)}>
  {ClassT.Class?.map(item=>{
                    return(
                        <option key={item.ID_L}>{item.Ten_Lop}</option>
                 
                    )
                })
            }
</select>
  </div>
  </div>
}
{subject.isloading&&
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Môn
      </label>
  <select className="select select-bordered w-full max-w-xs" value={Mon} onChange={(e)=>setMon(e.target.value)}>
  {subject.subject?.map((item) => {
                        return <option key={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
</select>
  </div>
  </div>
}
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Thời Gian Bắt đầu
    </label>
  <DateTimePicker value={Start} onChange={(value)=>setStart(value)}/>  

</div>
  </div>
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Chọn Thời Gian Kết Thúc
    </label>
  <DateTimePicker value={End} onChange={(value)=>setEnd(value)}/>  

</div>
  </div>
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Thi Trong bao nhiêu phút
    </label>
    <input required  value={sophut} onChange={(e)=>setSoPhut(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Tên Kỳ Thi"/>

</div>
  </div>
  <div className="-mx-3 md:flex mb-6">
  <div className="md:w-full px-3 mb-6 md:mb-0">
  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
       Số Lần Thi
    </label>
    <input required  value={solan} onChange={(e)=>setsolan(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  type="number" min="1" placeholder="Nhập Tên Kỳ Thi"/>

</div>
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