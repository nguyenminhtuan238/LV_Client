import ExamAPI from "@/services/Exam.services";
import ListQAPI from "@/services/ListQ.services";
import {  RefreshTeachertoken } from "@/store/user"
export const APIgetIdExam =  async (id) => {
    try {
        const res=await ExamAPI.GetbyID(id)
        return res.get;
      } catch (error) {
       
         console.log(error);
        throw error
       //throw error
        //throw error
      }
  };
  export const APIdeleteQExam =  async (id) => {
    try {
        const res=await ListQAPI.Deletebyexam(id)
        return res;
      } catch (error) {
        if (error.response.status === 410) {
          try {
           await RefreshTeachertoken()  
           const res = await ListQAPI.Deletebyexam(id);
           return res;
          } catch (error) {
            console.log(error)
         
          }
       }
        throw error
       //throw error
        //throw error
      }
  };

