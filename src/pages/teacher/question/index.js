import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import { GetSubject } from "@/store/Subjectr";
import Swal from "sweetalert2";
import { AddQuestion } from "@/useapi/Question.API";
import {  DeleteQuestion, getQuestionALL, getQuestionid, SearchQuestionsubject, updateQuestion } from "@/store/Question";
import { AddAnswer, DeleteQAnswer } from "@/useapi/Answer.API";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "next/link";
function Teacher() {
  const subject = useSelector((state) => state.list);
  const Question = useSelector((state) => state.Question);
  const [Noidung, setNoidung] = useState("");
  const [DoKho, setDoKho] = useState("Dễ");
  const [Hinh, setHinh] = useState(null);
  const [HinhThuc, setHinhThuc] = useState("Trắc Nghiệm");
  const [openCH, setopenCH] = useState(false);
  const [check, setcheck] = useState(true);
  const [Search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [Diem, setDiem] = useState(1);
  const [EditDiem, setEditDiem] = useState(1);
  const [Mon, setMon] = useState(() => {
    return subject.isloading ? subject.subject[0].Ten_Mon : "";
  });
  const [searchMon, setsearchMon] = useState(() => {
    return subject.isloading ? subject.subject[0].Ten_Mon : "";
  });
  const [editNoidung, seteditNoidung] = useState("");
  const [editDoKho, seteditDoKho] = useState("Dễ");
  const [editHinh, seteditHinh] = useState(null);
  const [editMon, seteditMon] = useState(() => {
    return subject.isloading ? subject.subject[0].Ten_Mon : "";
  });
 
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)) {
      router.push("/teacher");
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
  }, []);
  useEffect(() => {
    async function GetQuestion() {
    
  
      try {
     
        const res = await dispatch(getQuestionALL());
        unwrapResult(res);
      } catch (error) {
        console.log(error);
      
    }
    }
    GetQuestion();
  }, [check]);
  
  const handleQuestion = async (e) => {
    e.preventDefault();
    const ID_M =
      subject.subject.filter((item) => item.Ten_Mon === Mon).length === 0
        ? subject.subject[0].ID_M
        : subject.subject.filter((item) => item.Ten_Mon === Mon)[0].ID_M;
    try {
      console.log(Hinh)
      const data =    Hinh!==null?{
        DoKho,
     Hinh:Hinh[0],
        Noidung,
        HinhThuc,
        Diem,
        ID_M: ID_M,
      }:{
        DoKho,
           Noidung,
           HinhThuc,
           Diem,
           ID_M: ID_M,
      };
      await AddQuestion(data);
 
      Swal.fire("Thêm!", "Thêm Thành Công", "success");
      setDoKho("Dễ");
      setHinh(null);
      setMon(subject.subject[0].Ten_Mon);
      setNoidung("");
      setcheck(!check)
    } catch (error) {
      console.log(error);
      if (error.er === 4) {
        Swal.fire("Lỗi!", `${error.mess}`, "error");
      }
    }
  };
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
        ID_M: subject.subject.filter((item) => item.Ten_Mon === searchMon)[0].ID_M
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
  const handleDeleteCH= async (id)=>{
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
          await DeleteQAnswer(id)
         const res= await dispatch(DeleteQuestion(id))
          await unwrapResult(res)
          Swal.fire(
            'Xóa!',
            'Xóa Thành Công',
            'success'
          )

        } catch (error) {
          if(error){
            console.log(error)
            Swal.fire(
              'Lỗi!',
              `${error.message}`,
              'error'
            )
            setcheck(!check)
          }
        
        }
      
      }
    }) 
  }
  const handleeditCH=async (id)=>{
    try {
      const res = await dispatch(getQuestionid(id));
      const result=  unwrapResult(res);
      seteditDoKho(result[0].DoKho)
      seteditNoidung(result[0].Noidung)
      seteditHinh(result[0].Hinh)
      setEditDiem(result[0].Diem)
      seteditMon( subject.subject.filter((item) => item.ID_M === result[0].ID_M)[0].Ten_Mon)
      setopenCH(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdiQuestion=async (e)=>{
      e.preventDefault()
      try {
        const data = editHinh!==null?{
          id:Question.Questionid[0].ID_CH,
          DoKho:editDoKho,
          Hinh:editHinh[0],
          Noidung:editNoidung,
          Diem:EditDiem,
          ID_M: subject.subject.filter((item) => item.Ten_Mon === editMon)[0].ID_M,
        }:{
          id:Question.Questionid[0].ID_CH,
          DoKho:editDoKho,
          Noidung:editNoidung,
          Diem:EditDiem,
          ID_M: subject.subject.filter((item) => item.Ten_Mon === editMon)[0].ID_M,  
        };
       const res= await dispatch(  updateQuestion(data));
       await unwrapResult(res)
        Swal.fire("Sửa!", "Sửa Thành Công", "success");
      
      } catch (error) {
        console.log(error);
        if (error) {
          Swal.fire("Lỗi!", `${error.message}`, "error");
          setcheck(!check)
        }
      }
  }
  return (
    <>
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Quản lý câu hỏi</h1>

        <div className="flex flex-wrap">
       
          <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i> Thêm câu hỏi
            </p>
            <div className="leading-loose">
              <form
                className="p-10 bg-white rounded shadow-xl"
                method="post"
                onSubmit={(e) => handleQuestion(e)}
              >
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Nội Dung
                  </label>
                  <textarea
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded  break-words"
                    type="text"
                    required
                    value={Noidung}
                    onChange={(e) => setNoidung(e.target.value)}
                    placeholder="Nhập Nội Dung"
                    rows="6"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Minh họa
                  </label>
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="file"
                    required=""
                    onChange={(e) => setHinh(e.target.files)}
                    placeholder="Street"
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                   Điểm
                  </label>
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="number"
                    required=""
                    value={Diem}
                    onChange={(e) => setDiem(e.target.value)}
                    placeholder="Nhập Điểm"
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="text-sm block text-gray-600"
                    htmlFor="cus_email"
                  >
                    Môn
                  </label>
                  {subject.isloading && (
                    <select
                      name="cars"
                      id="cars"
                      value={Mon}
                      onChange={(e) => setMon(e.target.value)}
                      className=" px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      {subject.subject.map((item) => {
                        return <option key={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
                    </select>
                  )}
                </div>
                <div className="inline-block mt-2 w-full pr-1">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Độ Khó
                  </label>
                </div>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="de"
                      name="dokho"
                      value="Dễ"
                      checked={DoKho === "Dễ"}
                      onChange={(e) => setDoKho(e.target.value)}
                    />
                    <label htmlFor="de">Dễ</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="bt"
                      name="dokho"
                      value="Bình thường"
                      onChange={(e) => setDoKho(e.target.value)}
                    />
                    <label htmlFor="by">Bình thường</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="kho"
                      name="dokho"
                      value="Khó"
                      onChange={(e) => setDoKho(e.target.value)}
                    />
                    <label htmlFor="kho">Khó</label>
                  </div>
                </fieldset>
                <div className="inline-block mt-2 w-full pr-1">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Thức
                  </label>
                </div>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="de"
                      name="HinhThuc"
                      value="Trắc Nghiệm"
                      checked={HinhThuc === "Trắc Nghiệm"}
                      onChange={(e) => setHinhThuc(e.target.value)}
                    />
                    <label htmlFor="de">Trắc Nghiệm</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="bt"
                      name="HinhThuc"
                      value="Tự Luận"
                      onChange={(e) => setHinhThuc(e.target.value)}
                    />
                    <label htmlFor="by">Tự Luận</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="kho"
                      name="HinhThuc"
                      value="Đúng/Sai"
                      onChange={(e) => setHinhThuc(e.target.value)}
                    />
                    <label htmlFor="kho">Đúng/Sai</label>
                  </div>
                
                </fieldset>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
          {openCH&&
          <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i> Sửa câu hỏi 
            </p>
            <div className="leading-loose">
            <p className="btn btn-ghost float-right" onClick={()=>setopenCH(false)}><i className="fa-solid fa-x"></i></p>
              <form
                className="p-10 bg-white rounded shadow-xl"
                method="post"
                onSubmit={(e) => handleEdiQuestion(e)}
              >
              
              <div className="text-xl pb-6 float-right">
           
            </div>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Nội Dung
                  </label>
                  <textarea
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded  break-words"
                    type="text"
                    required
                    value={editNoidung}
                    onChange={(e) => seteditNoidung(e.target.value)}
                    placeholder="Nhập Nội Dung"
                    rows="6"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Hình Minh họa
                  </label>
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="file"
                    required=""
                    onChange={(e) => seteditHinh(e.target.files)}
                    placeholder="Street"
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Điểm
                  </label>
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="number"
                    required
                    value={EditDiem}
                    onChange={(e) => setEditDiem(e.target.value)}
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="text-sm block text-gray-600"
                    htmlFor="cus_email"
                  >
                    Môn
                  </label>
                  {subject.isloading && (
                    <select
                      name="cars"
                      id="cars"
                      value={editMon}
                      onChange={(e) => seteditMon(e.target.value)}
                      className=" px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      {subject.subject.map((item) => {
                        return <option key={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
                    </select>
                  )}
                </div>
                <div className="inline-block mt-2 w-full pr-1">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Độ Khó
                  </label>
                </div>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="de"
                      name="dokho"
                      value="Dễ"
                      checked={editDoKho === "Dễ"}
                      onChange={(e) => seteditDoKho(e.target.value)}
                    />
                    <label htmlFor="de">Dễ</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="bt"
                      name="dokho"
                      value="Bình thường"
                      checked={editDoKho === "Bình thường"}
                      onChange={(e) => seteditDoKho(e.target.value)}
                    />
                    <label htmlFor="by">Bình thường</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="kho"
                      name="dokho"
                      value="Khó"
                      checked={editDoKho === "Khó"}
                      onChange={(e) => seteditDoKho(e.target.value)}
                    />
                    <label htmlFor="kho">Khó</label>
                  </div>
                </fieldset>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Sửa
                  </button>
                </div>
              </form>
            </div>
          </div>
          }
        </div>
        
        <div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> <button className="btn"  onClick={handleClickOpen} >Tìm Kiếm </button>
     <i className="fas fa-list mr-3"></i> <button className="btn" onClick={()=>setcheck(!check)}>Tất Cả</button>
    </p>

    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-left   py-3 px-4 uppercase font-semibold text-sm"> Chọn Câu Hỏi</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Độ Khó</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Môn</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Hình Thức</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Điểm</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Đáp Án</th>
                    <th className="text-left   py-3 px-4 uppercase font-semibold text-sm">Sửa</th>
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
             <td className="text-center py-3 px-4 ">{subject.isloading&& subject.subject.filter((i) => i.ID_M === item.ID_M)[0].Ten_Mon}</td>
             <td className="text-center py-3 px-4 ">{item.HinhThuc}</td>
             <td className="text-center py-3 px-4 ">{item.Diem}</td>
             <td className="text-center py-3 px-4 "><Link href={`/teacher/question/${item.ID_CH}`} className="hover:text-blue-500 cursor-pointer"><i className="fa-solid fa-plus"></i></Link></td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleeditCH(item.ID_CH)}><i className="fa-solid fa-pen-to-square"></i></td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDeleteCH(item.ID_CH)}><i className="fa-solid fa-trash"></i></td>
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
        <DialogTitle>Tìm Kiếm Câu hỏi</DialogTitle>
        <DialogContent>
        {subject.isloading && (
                    <select
                      name="cars"
                      id="cars"
                      value={searchMon}
                      onChange={(e) => setsearchMon(e.target.value)}
                      className=" px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      {subject.subject.map((item) => {
                        return <option key={item.ID_M}>{item.Ten_Mon}</option>;
                      })}
                    </select>
                  )}
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
