import StudentAPI from "@/services/student.services"
import { RefreshADMINtoken } from "@/store/user"
export const AddStudent =  async (payload) => {
    try {
      const res = await StudentAPI.Add(payload);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
          const res = await StudentAPI.Add(payload);
          return res.success;
         } catch (error) {
           console.log(error)
          
         }
      }
      if (error.response.status === 415) {
        throw  {mess:error.response.data.message,er:4}
     }
     else {
        console.log(error);
      }
      //throw error
    }
  };
