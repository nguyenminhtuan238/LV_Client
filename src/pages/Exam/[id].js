import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import {  getidExam } from "@/store/Exam";
import { getbytest, updateTest } from "@/store/test";
import {  getQuestionsubject } from "@/store/Question";
import { getidlistQ, getpagelistQ } from "@/store/ListQ";
import { getALLidAnswer } from "@/store/answer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AddAnswerST,DeleteAnswerST,getidBTAnswer,getResult,updateAnswerST } from "@/store/ListANST";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
export default function Home() {
  const ListQ = useSelector((state) => state.ListQ);
  const answer = useSelector((state) => state.answer);
  const user = useSelector((state) => state.user);
  const test = useSelector((state) => state.test);
  const  answerST = useSelector((state) => state.ListANST);
  const Exam = useSelector((state) => state.Exam);
  const router = useRouter()
  const dispatch=useDispatch();
  const count=useRef(null)
  const [Check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [Page, setPage] = useState(0);
  const [Compelete, setCompelete] = useState(false);
const [s, sets] = useState(0);
const [m, setm] = useState(0);
const [h, seth] = useState(0);
const [Noidung, setNoidung] = useState("");
const [Dis, setDis] = useState(1);
const [openK, setopenK] = useState(1);
const [Disupdate, setDisupdate] = useState(false);
  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
      router.push("/")
    }
  }, [dispatch,user.user]);
  const handleComplete= async ()=>{
    try {
      const res=await dispatch(getResult({id:router.query.id,ID_HS:test.Testid[0].ID_HS}))
      const result=unwrapResult(res)
      const Diem=(result.reduce((a,b)=>a+b.DiemTong,0)/ListQ.ListQid.reduce((a,b)=>a+b.Diem,0))*10
      const data={
        Diem:Diem.toFixed(2),
        Start_Exam:test.Testid[0].Start_Exam,
        End_Exam:new Date(Date.now()),
        id:router.query.id
      }
      await dispatch(updateTest(data))
      router.push(`/point/${Exam.Examid[0].ID_KT}`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    async function Gettest() {
      if(router.isReady){
      try {
        const res = await dispatch(getbytest(router.query.id));
       const result= unwrapResult(res);
       await dispatch(getpagelistQ({id:result[0].ID_KT,page:1}))
       await dispatch(getidlistQ(result[0].ID_KT))
       const E= await dispatch(getidExam((result[0].ID_KT)))
       const resultE=unwrapResult(E)
       await dispatch(getQuestionsubject(resultE[0].ID_M))
       await dispatch(getALLidAnswer(resultE[0].ID_M))
       const end= new Date( result[0].End_Exam).getTime()
       const now= new Date().getTime()
        count.current=setInterval(async () => {
          const end= new Date( result[0].End_Exam).getTime()
          const now= new Date().getTime()
          if(end-now>0){
             seth(Math.floor(((end-now)/ (1000 * 60*60))))
              setm(Math.floor(((end-now) % (1000 * 60*60)/ (1000 * 60))))
              sets(Math.floor(((end-now) % (1000*60) / (1000)))) 
          }else{
            setCompelete(!Compelete)
          } 
        }, 1000);
         if( end-now<=0){
             handleComplete()
            return  clearInterval(count.current)
          }
      } catch (error) {
        console.log(error);
      }
    }
    }
    Gettest();
  }, [router.isReady,Compelete]);
  useEffect(() => {
    async function GetlistDA() {
      if(router.isReady){
      try {
        const res = await dispatch(getbytest(router.query.id));
       const result= unwrapResult(res);
       await dispatch(getidBTAnswer({ID_HS:result[0].ID_HS,ID_BT:result[0].ID_BT}))
      } catch (error) {
        console.log(error);
      }
    }
    }
    GetlistDA();
  }, [router.isReady,Check]);
  const Handleselect=async (idDA,IDCH)=>{
    if(answerST.AnsweridST.length===0){
      try {
        const data={
          ID_HS:test.Testid[0].ID_HS,
          ID_BT:router.query.id,
          ID_DA:idDA,
          ID_CH:IDCH,
          NoiDung:null

        }
       const res= await dispatch(AddAnswerST(data))
        unwrapResult(res)
        setCheck(!Check)
    } catch (error) {
      console.log(error)
    }
    }else{
      if(answerST.AnsweridST.filter(item=>item.ID_CH===IDCH).length===0){
        try {
          const data={
            ID_HS:test.Testid[0].ID_HS,
            ID_BT:router.query.id,
            ID_DA:idDA,
            ID_CH:IDCH,
            NoiDung:null
          }
         const res= await dispatch(AddAnswerST(data))
          unwrapResult(res)
          setCheck(!Check)
      } catch (error) {
        console.log(error)
      }
      }else{
         try {
          const data={
            id:answerST.AnsweridST.filter(item=>item.ID_CH===IDCH)[0].ID_DAHS,
            ID_DA:idDA,
            NoiDung:null

          }
        
         const res= await dispatch(updateAnswerST(data))
          unwrapResult(res)
          setCheck(!Check)
      } catch (error) {
        console.log(error)
      }
      }
    }
  }
 const handlepage=async (page)=>{
  try {
    const l=(Math.floor(page/5))*page
    setPage(l)
  const res= await dispatch(getpagelistQ({id:Exam.Examid[0].ID_KT,page:Math.floor(page/5)+1}))
    unwrapResult(res)
  } catch (error) {
    console.log(error)
  }
    
 }
 const handleClickOpen = async (id) => {
  
  
    setOpen(true);
    
 
};

const handleClose = () => {
  setOpen(false);
};
const HandleK =async (ID)=>{
  
    setDis(ID)
    answer.Answer.filter((a) => a.ID_CH === ID).map(async (item)=>{
      try {
        if(Noidung.includes(item.Noidung)){
          const data={
            ID_HS:test.Testid[0].ID_HS,
            ID_BT:router.query.id,
            ID_DA:item.ID_DA,
            ID_CH:ID,
            NoiDung:Noidung
          }
         const res= await dispatch(AddAnswerST(data))
          unwrapResult(res)
          setCheck(!Check)
    

        }
      } catch (error) {
        console.log(error)
      }
    })
    
 
}
const Handleupdate =async (ID)=>{
  
 setDisupdate(true)
 answer.Answer.filter((a) => a.ID_CH === ID).map(async (item)=>{
  try {
    if(Noidung.includes(item.Noidung)){
      if(answerST.AnsweridST.filter(it=>it.ID_CH===ID && it.ID_DA===item.ID_DA).length>0){
        const data={
          id:answerST.AnsweridST.filter(it=>it.ID_CH===ID && it.ID_DA===item.ID_DA)[0].ID_DAHS,
          ID_DA:item.ID_DA,
          NoiDung:Noidung

        }
      
       const res= await dispatch(updateAnswerST(data))
        unwrapResult(res)
        setCheck(!Check)
      }else{
      const data={
        ID_HS:test.Testid[0].ID_HS,
        ID_BT:router.query.id,
        ID_DA:item.ID_DA,
        ID_CH:ID,
        NoiDung:Noidung
      }
     const res= await dispatch(AddAnswerST(data))
      unwrapResult(res)
      setCheck(!Check)

    }
  }else{
    if(answerST.AnsweridST.filter(it=>it.ID_CH===ID && it.ID_DA===item.ID_DA)[0]?.ID_DAHS){
    const res= await dispatch(DeleteAnswerST(answerST.AnsweridST.filter(it=>it.ID_CH===ID && it.ID_DA===item.ID_DA)[0]?.ID_DAHS))
    unwrapResult(res)
    setCheck(!Check)
    }
  }
  } catch (error) {
    console.log(error)
  }
})

}
const HandleTL=(ID)=>{
  setopenK(ID)
  if(answerST.AnsweridST.filter(item=>item.ID_CH===ID).length>0){
    setDis(ID)
    setNoidung(answerST.AnsweridST.filter(item=>item.ID_CH===ID)[0].NoiDung)
  }else{
    setNoidung("")
  }
}
  return (

    <>
      <div className="flex flex-col w-full lg:flex-row mb-3 mt-5">
      <div className="grid flex-grow h-full card w-2/3  rounded-box ">
      {ListQ.isloadingpage&&
      <div>
        {ListQ.ListQidpage.map((item,index)=>{
          return(
            <div key={item.ID_DSCH}>
            
            <p className="font-medium">  
    <p className="kbd mr-2"> câu {index+Page+1} </p>
  {item.Noidung}</p>
           {item.Hinh&& <img src={process.env.NEXT_PUBLIC_IMAGEEXAM+item.Hinh} className="w-full h-[350px] mt-1 object-cover"/>}
            {item.HinhThuc==="Tự Luận"? 
                <div  className="py-1">
                <Button onClick={()=>HandleTL(item.ID_CH)}>Trả Lời</Button>
                {openK===item.ID_CH&&
                <div>
                {
                  Dis==item.ID_CH? Disupdate?<textarea
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded  break-words"
                    type="text"
                    required
                    value={Noidung}
                    onChange={(e) =>setNoidung(e.target.value) }
                    placeholder="Nhập Câu Trả Lời"
                    rows="6"
                  ></textarea>:<textarea
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded  break-words"
                    type="text"
                    required
                    value={Noidung}
                    onChange={(e) =>setNoidung(e.target.value) }
                    placeholder="Nhập Câu Trả Lời"
                    rows="6"
                    disabled
                  ></textarea>:<textarea
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded  break-words"
                    type="text"
                    required
                    value={Noidung}
                    onChange={(e) =>setNoidung(e.target.value) }
                    placeholder="Nhập Câu Trả Lời"
                    rows="6"
                  ></textarea>
                }
                
       {   Dis!=item.ID_CH? <Button onClick={()=>HandleK(item.ID_CH)}>Khóa Đáp Án</Button>:<Button disabled>Khóa Đáp Án</Button>}
       { answerST.isloadingid&&  answerST.AnsweridST.filter(itm=>itm?.ID_CH===item?.ID_CH).length>0? <Button onClick={()=>Handleupdate(item.ID_CH)}>Sửa Đáp Án</Button>:""}
                
              </div>}</div>:
            answer.isloading? answer.Answer.filter((a) => a.ID_CH === item.ID_CH).map((it)=>{
              return(
                <div  key={it.ID_DA}>
              
                {item.HinhThuc==="Tự Luận"? "":
                <div  className="py-1">
                <FormControl  name={`${item.ID_CH}`}>
      
      <RadioGroup
        aria-labelledby={`${item.ID_CH}`}
        name="radio-buttons-group"
        defaultValue={answerST.isloadingid&&it.ID_DA === answerST.AnsweridST.filter(itm=>itm?.ID_CH===item?.ID_CH)[0]?.ID_DA} 
      >
        <FormControlLabel  value={`${it.ID_DA}`}      name={`${item.ID_CH}`}
         label={it.Noidung} control={<Radio  checked={answerST.isloadingid&&it.ID_DA === answerST.AnsweridST.filter(itm=>itm?.ID_CH===item?.ID_CH)[0]?.ID_DA}         onClick={() => Handleselect(it.ID_DA,item.ID_CH)}
/>}/>
      
      </RadioGroup>
    </FormControl>
                {/* <input
                  type="radio"
                  id="de"
                  name="dokho"
                  value={`${it.ID_DA}`}
                  name={`${item.ID_CH}`}
                  readOnly
                  checked={answerST.isloadingid&&it.ID_DA === answerST.AnsweridST.filter(itm=>itm?.ID_CH===item?.ID_CH)[0]?.ID_DA}
                  onClick={() => Handleselect(it.ID_DA,item.ID_CH)}
                />

                <label htmlFor="de">{it.Noidung}</label> */}
                
              </div>
                }
                </div>
            
              )
            }):""}
            
            </div>
          )
        })
        
        }
        
      
      </div>
    }
      </div>
      <div className="divider lg:divider-horizontal"></div> 
  <div className="grid flex-grow h-full  card  rounded-box place-items-center">
    
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link href="/">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thi: {Exam.isloadingid&&Exam.Examid[0].Ten_KT}</h5>
    </Link>
    <hr ></hr>
    <div className="my-5">
    {ListQ.isloadingid&&
    <div>
    {ListQ.ListQid.map((item,index)=>{
      return(
        <div className="join " key={item.ID_DSCH}>
    <button 
      onClick={()=>handlepage(index)} 
      className={ListQ.ListQidpage&& ListQ.ListQidpage.filter(it=>it.ID_CH===item.ID_CH).length>0
            ?answerST.isloadingid&& answerST.AnsweridST.filter(it=>it.ID_CH===item.ID_CH).length>0?"join-item btn m-1  btn-active bg-blue-400 ":"join-item btn m-1  btn-active "
            :answerST.isloadingid&& answerST.AnsweridST.filter(it=>it.ID_CH===item.ID_CH).length>0?"join-item btn m-1   bg-blue-400 ":"join-item btn m-1  "
            } 
      >
          {index+1}
      </button>
  
</div>
      )
    })

    }
    </div>
    }
    </div>
    <div className="my-5">
    <div>
    <p>Thời Gian Thi: {h+":"+m+":"+s}</p>
    </div>
    <div className="my-5">
    <Button onClick={handleClickOpen}>Hoàn Thành</Button>
        {test.isloadingid?<p>{test.Testid[0].Diem}</p>:""}
    </div>
    </div>
    
</div>

  </div>
      </div>
  
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Hoàn Thành Bài Thi</DialogTitle>
        <DialogContent>
        {ListQ.isloadingid&&
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>câu Hỏi</th>
        <th>Trạng Thái</th>
        
      </tr>
    </thead>
    <tbody>
    {ListQ.ListQid.map((item,index)=>{
      return(
      <tr key={item.ID_DSCH}>
        <th>{index+1}</th>
        <td>{answerST.isloadingid&& answerST.AnsweridST.filter(it=>it.ID_CH===item.ID_CH).length>0?"Đã Trả Lời":"Chưa Trả Lời"}</td>
      
      </tr>
      )
    })
    }
    
    </tbody>
  </table>
</div>
        }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleComplete}>Hoàn thành</Button>
          <Button onClick={handleClose}>tHoát</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
