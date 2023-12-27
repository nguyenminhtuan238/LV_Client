import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutTeacher from "@/Components/teacher/layout/layout";
import Swal from "sweetalert2";
import {  getQuestionid } from "@/store/Question";
import { AddAnswer } from "@/useapi/Answer.API";

import { DeleteAnswer, getbyidAnswer, getidAnswer, updateAnswer } from "@/store/answer";
function Teacher() {
  const answer = useSelector((state) => state.answer);
  const Question = useSelector((state) => state.Question);
  const [check, setcheck] = useState(true);
  const [openDA, setOpenDA] = useState(false);

  const [CTL, setCTL] = useState("");
  const [Ketqua, setKetqua] = useState("đúng");
  const [EditCTL, setEditCTL] = useState("");
  const [editKetqua, seteditKetqua] = useState("đúng");
  const [Diem, setDiem] = useState(1);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [Editdiem, setEditdiem] = useState(1);
  const [Ketquawrong, setKetquawrong] = useState("đúng");
  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)) {
      router.push("/teacher");
    }
  }, [user.Teacher]);
 
  useEffect(() => {
    async function GetidAnswer() {
    
  
      try {
        const resQ = await dispatch(getQuestionid(router.query.id));
        const resultQ= unwrapResult(resQ);
        const res = await dispatch(getbyidAnswer(router.query.id));
       const result= unwrapResult(res);
       if(resultQ[0].HinhThuc=="Tự Luận" && result.filter((item)=>item.Noidung==="").length===0 ){
        const data =  {
          Noidung:"",
          Ketqua:0,
          Diem:0,
          ID_CH: router.query.id,
        }
          await AddAnswer(data);
          setcheck(!check)
        }
      } catch (error) {
        console.log(error);
      
    }
    }
    GetidAnswer();
  }, [router.isReady,check]);
  const handleanswer = async (e) => {
    e.preventDefault();
    if(  Question.Questionid[0].HinhThuc==="Tự Luận"){
      if(answer.Answer.reduce((a,b)=>a+b.Diem,0)+parseFloat( Diem)>1.1){
       Swal.fire("Thất Bài!", "Điểm Đã vượt qua 100%", "error")
               
      }else{
          try {
            const data =  {
              Noidung: CTL,
              Ketqua:Ketqua==="đúng"?1:0,
              Diem,
              ID_CH: router.query.id,
            }
            await AddAnswer(data);
            Swal.fire("Thêm!", "Thêm Thành Công", "success");
            setKetqua("đúng");
            setCTL("");
            setcheck(!check)
          } catch (error) {
            console.log(error);
            if (error.er === 4) {
              Swal.fire("Lỗi!", `${error.mess}`, "error");
            }
          }
      }
    }else{
      if(answer.Answer?.filter((item)=>item.Ketqua===1).length>=1 && Ketqua=="đúng"){
       Swal.fire("Thất Bài!", "Đã có câu Trả lời đúng", "error")
      }else{
          try {
            const data ={ Noidung: CTL,
              Ketqua:Ketqua==="đúng"?1:0,
              Diem:Ketqua==="đúng"?1:0,
              ID_CH: router.query.id};
            await AddAnswer(data);
            Swal.fire("Thêm!", "Thêm Thành Công", "success");
            setKetqua("đúng");
            setCTL("");
            setcheck(!check)
          } catch (error) {
            console.log(error);
            if (error.er === 4) {
              Swal.fire("Lỗi!", `${error.mess}`, "error");
            }
          }
      }
    }

  };
 
  const handleanswerwrong = async (e) => {
    e.preventDefault();
    const DiemT=Ketquawrong==="đúng"?1:0
    if(answer.Answer?.filter((item)=>item.Noidung==="Sai").length>=1 ){
      Swal.fire("Thất Bài!", "Đã có  Sai", "error")

     }else{
       if(answer.Answer.reduce((a,b)=>a+b.Diem,0)+parseFloat( DiemT)>1.1){
        Swal.fire("Thất Bài!", "Đã có câu Trả lời Đúng", "error")

       }else{
        try {
          const data =  {
            Noidung: "Sai",
            Ketqua:Ketquawrong==="đúng"?1:0,
            Diem:Ketquawrong==="đúng"?1:0,
            ID_CH: router.query.id,
          }
          await AddAnswer(data);
          Swal.fire("Thêm!", "Thêm Thành Công", "success");
          setKetquawrong("đúng");
          setcheck(!check)
        } catch (error) {
          console.log(error);
          if (error.er === 4) {
            Swal.fire("Lỗi!", `${error.mess}`, "error");
          }
        }
       }

}
  };
  const handleanswerCorrect= async (e) => {
    e.preventDefault();
    const DiemT=Ketqua==="đúng"?1:0
if(answer.Answer?.filter((item)=>item.Noidung==="Đúng").length>=1 ){
 Swal.fire("Thất Bài!", "Đã có  đúng", "error")
}else{
  if(answer.Answer.reduce((a,b)=>a+b.Diem,0)+parseFloat( DiemT)>1.1){
    Swal.fire("Thất Bài!", "Đã có câu Trả lời Đúng", "error")

   }else{
    try {
      const data = {
        Noidung: "Đúng",
        Ketqua:Ketqua==="đúng"?1:0,
        Diem:Ketqua==="đúng"?1:0,
        ID_CH: router.query.id,
      };
      await AddAnswer(data);
      Swal.fire("Thêm!", "Thêm Thành Công", "success");
      setKetqua("đúng");
      setcheck(!check)
    } catch (error) {
      console.log(error);
      if (error.er === 4) {
        Swal.fire("Lỗi!", `${error.mess}`, "error");
      }
    }
  }
}
  };
  const handleDeleteDA= async (id)=>{
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
            id,
            idCH:router.query.id
          }
         const res= await dispatch(DeleteAnswer(data))
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
  const handleeditDA=async (id)=>{
    try {
      const res = await dispatch(getidAnswer(id));
      const result=  unwrapResult(res);
      setEditCTL(result[0].Noidung)
      seteditKetqua(result[0].Ketqua===1?"đúng":"sai")
      setOpenDA(true)
      setEditdiem(result[0].Diem)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleEditanswer=async (e)=>{
      e.preventDefault()
      if(  Question.Questionid[0].HinhThuc==="Tự Luận"){
        if(answer.Answer.reduce((a,b)=>a+b.Diem,0)+parseFloat( Editdiem)>1.1){
         Swal.fire("Thất Bài!", "Điểm Đã vượt qua 100%", "error")
                 
        }else{
            try {
              const data = {
                idCH:router.query.id,
                id:answer.Answerid[0].ID_DA,
                ID_CH:router.query.id,
                Diem:Editdiem,
                Ketqua:editKetqua==="đúng"?1:0,
                Noidung:EditCTL,
              };
              const res= await dispatch(updateAnswer(data));
       await unwrapResult(res)
        Swal.fire("Sửa!", "Sửa Thành Công", "success");
        setOpenDA(false)
            } catch (error) {
              console.log(error);
              if (error.er === 4) {
                Swal.fire("Lỗi!", `${error.mess}`, "error");
              }
            }
        }
      }else{
      if(answer.Answer?.filter((item)=>item.Ketqua===1).length>=1 && editKetqua=="đúng"){
        Swal.fire("Thất Bài!", "Đã có câu Trả lời Đúng", "error")
      }else{
      try {
        const data = {
          idCH:router.query.id,
          id:answer.Answerid[0].ID_DA,
          ID_CH:router.query.id,
          Diem:editKetqua==="đúng"?1:0,
          Ketqua:editKetqua==="đúng"?1:0,
          Noidung:EditCTL,
        };
       const res= await dispatch(updateAnswer(data));
       await unwrapResult(res)
        Swal.fire("Sửa!", "Sửa Thành Công", "success");
      setOpenDA(false)
      } catch (error) {
        console.log(error);
        if (error) {
          Swal.fire("Lỗi!", `${error.message}`, "error");
          setcheck(!check)
        }
      }
    }
  }
  }
  return (
    <>
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Quản lý Trả Lời</h1>
        {Question.isloadingid&&
        <div className="flex flex-wrap">
        { Question.Questionid[0]?.HinhThuc!=="Đúng/Sai"?
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i>{Question.Questionid[0]?.Noidung}
            </p>
            <div className="leading-loose">
              <form
                className="p-10 bg-white rounded shadow-xl"
                onSubmit={(e) => handleanswer(e)}
              >
             
             
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="message"
                  >
                    câu trả lời
                  </label>
                  <textarea
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="câu Trả lời..........."
                    aria-label="Email"
                    value={CTL}
                    onChange={(e) => setCTL(e.target.value)}
                  ></textarea>
                </div>
                {Question.Questionid[0]?.HinhThuc==="Tự Luận"&&
                <div className="mt-2">
                  <label
                    className="text-sm block text-gray-600"
                    htmlFor="cus_email"
                  >
                   Điểm
                  </label>
                      <select
                      name="cars"
                      id="cars"
                      value={Diem}
                      onChange={(e) => setDiem(e.target.value)}
                      className=" px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      
                       <option value={1}>100%</option>
                       <option  value={0.75}>75%</option>;
                       <option  value={0.5}>50%</option>;
                       <option value={0.25}>25%</option>;
                       <option value={0}>0%</option>;
                    </select>
             
                </div>
            }
           
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Kết Quả
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="dokho"
                        value="đúng"
                        checked={Ketqua === "đúng"}
                        onChange={(e) => setKetqua(e.target.value)}
                      />
                      <label htmlFor="de">Đúng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="dokho"
                        value="Sai"
                        onClick={(e) => setKetqua(e.target.value)}
                      />
                      <label htmlFor="by">Sai</label>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Trả lời 
                  </button>
                </div>
              </form>
            </div>
          </div>
        :
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i>{Question.isloadingid&& Question.Questionid[0]?.Noidung}
            </p>
            <div className="leading-loose">
              <form
                className="p-10 bg-white rounded shadow-xl"
                onSubmit={(e) => handleanswerCorrect(e)}
              >
             
             
             <div className="mt-2">
             <p  className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                   
             
                   required
                   placeholder="câu Trả lời..........."
                  value="Đúng"
               >
                   Đúng
             </p>
             
                </div>
            
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Kết Quả
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="dokho"
                        value="đúng"
                        readOnly
                        checked={Ketqua === "đúng"}
                        onChange={(e) => setKetqua(e.target.value)}
                      />
                      <label htmlFor="de">Đúng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="dokho"
                        value="Sai"
                        onClick={(e) => setKetqua(e.target.value)}
                      />
                      <label htmlFor="by">Sai</label>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Ghi Lại
                  </button>
                </div>
              </form>
              <form
                className="p-10 bg-white rounded shadow-xl"
                onSubmit={(e) => handleanswerwrong(e)}
              >
             
             
                <div className="mt-2">
                 
                  <p  className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                   
             
                    required
                 
                   value="Sai"
                >
                    Sai
              </p>
                </div>
            
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Kết Quả
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="dokhok"
                        value="đúng"
                        checked={Ketquawrong === "đúng"}
                        onChange={(e) => setKetquawrong(e.target.value)}
                      />
                      <label htmlFor="de">Đúng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="dokhok"
                        value="Sai"
                        onClick={(e) => setKetquawrong(e.target.value)}
                      />
                      <label htmlFor="by">Sai</label>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                     Ghi Lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
          {openDA&&
            <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <p className="text-xl pb-6 flex items-center">
              <i className="fas fa-list mr-3"></i>Sửa Đáp Án
            </p>
            <div className="leading-loose">
            <p className="btn btn-ghost float-right" onClick={()=>setOpenDA(false)}><i className="fa-solid fa-x"></i></p>
              <form
                className="p-10 bg-white rounded shadow-xl"
                onSubmit={(e) => handleEditanswer(e)}
              >
             
                {Question.Questionid[0]?.HinhThuc!=="Đúng/Sai"?
                <div className="mt-2">
                  <label
                    className=" block text-sm text-gray-600"
                    htmlFor="message"
                  >
                    câu trả lời
                  </label>
                  <textarea
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="câu Trả lời..........."
                    aria-label="Email"
                    value={EditCTL}
                    onChange={(e) => setEditCTL(e.target.value)}
                  ></textarea>
                </div>:
                <div className="mt-2">
                  
                <p  className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                   
             
                   required
                   placeholder="câu Trả lời..........."
                  value="Sai"
               >
                   {EditCTL}
             </p>
                </div>
                }
                {Question.Questionid[0].HinhThuc==="Tự Luận"&&
                <div className="mt-2">
                  <label
                    className="text-sm block text-gray-600"
                    htmlFor="cus_email"
                  >
                   Điểm
                  </label>
                      <select
                      name="cars"
                      id="cars"
                      value={Editdiem}
                      onChange={(e) => setEditdiem(e.target.value)}
                      className=" px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      
                       <option value={1}>100%</option>
                       <option  value={0.75}>75%</option>;
                       <option  value={0.5}>50%</option>;
                       <option value={0.25}>25%</option>;
                       <option value={0}>0%</option>;
                    </select>
             
                </div>
                }
                
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Kết Quả
                  </label>
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="de"
                        name="dokho"
                        value="đúng"
                        readOnly
                        checked={editKetqua === "đúng"}
                        onChange={(e) => seteditKetqua(e.target.value)}
                      />
                      <label htmlFor="de">Đúng</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bt"
                        name="dokho"
                        value="sai"
                        readOnly
                        checked={editKetqua === "sai"}
                        onClick={(e) => seteditKetqua(e.target.value)}
                      />
                      <label htmlFor="by">Sai</label>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-6">
                  <button
                    className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    Trả lời 
                  </button>
                </div>
              </form>
            </div>
          </div>
          }
        
        </div>
        }
        
        <div className="w-full mt-6">
    <p className="text-xl pb-3 flex items-center">
     <i className="fas fa-list mr-3"></i> Đáp Án
     
    </p>

    <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th  className="text-center   py-3 px-4 uppercase font-semibold text-sm"> Đáp Án</th>
                    <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">Kết Quả</th>
                    {Question?.Questionid[0]?.HinhThuc==="Tự Luận"&& <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">Điểm</th>}
                    <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">Sửa</th>
                    <th  className="text-center  py-3 px-4 uppercase font-semibold text-sm">Thêm</th>
                  
                </tr>
            </thead>
            {answer.isloading&&
            <tbody className="text-gray-700">
            
              {answer.Answer?.map((item) => {
              return(
                
              <tr key={item.ID_DA}>
               
                <td  className="text-center py-3 px-4">
                {item.Noidung}
                </td>
                <td  className="text-center py-3 px-4">
                {item.Ketqua===1?"Đúng":"Sai"}
                </td>
               
                {Question?.Questionid[0]?.HinhThuc==="Tự Luận"&&
                <td  className="text-center py-3 px-4">
                {item.Diem*100}%
                </td>
                }
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleeditDA(item.ID_DA)}><i className="fa-solid fa-pen-to-square"></i></td>
                <td className="text-center py-3 px-4 hover:text-blue-500 cursor-pointer" onClick={()=>handleDeleteDA(item.ID_DA)}><i className="fa-solid fa-trash"></i></td>
              </tr>
              )
            })
             
            
              }
            
            </tbody>
              
            }
        </table>
    </div>
    
</div>

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
