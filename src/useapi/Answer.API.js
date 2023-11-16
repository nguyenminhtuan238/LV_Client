import AnswerAPI from "@/services/answer.services";
import {  RefreshTeachertoken } from "@/store/user"
export const AddAnswer =  async (payload) => {
    try {
      const res = await AnswerAPI.Add(payload);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await AnswerAPI.Add(payload);
          return res.success;
         } catch (error) {
           console.log(error)
         
         }
      }
     else {
        console.log(error);
      }
      //throw error
    }
  };
  export const DeleteQAnswer =  async (id) => {
    try {
      const res = await AnswerAPI.DeleteQ(id);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await AnswerAPI.DeleteQ(id);
          return res.success;
         } catch (error) {
           console.log(error)
         
         }
      }
     else {
        console.log(error);
      }
      //throw error
    }
  };
