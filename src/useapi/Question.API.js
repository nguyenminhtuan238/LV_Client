import QuestionAPI from "@/services/question.services";
import {  RefreshTeachertoken } from "@/store/user"
export const AddQuestion =  async (payload) => {
    try {
      const res = await QuestionAPI.Add(payload);
      console.log(res)
      return res;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await QuestionAPI.Add(payload);
          return res;
         } catch (error) {
           console.log(error)
           if (error.response.status === 403) {
            throw  {mess:error.response.data.message,er:4}
            }
         }
      }
      if (error.response.status === 403) {
        throw  {mess:error.response.data.message,er:4}
     }
     else {
        console.log(error);
      }
      //throw error
    }
  };
