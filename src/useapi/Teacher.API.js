import TeacherAPI from "@/services/teacher.services";
import { RefreshADMINtoken } from "@/store/user"
export const AddTeacher =  async (payload) => {
    try {
      const res = await TeacherAPI.Add(payload);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshADMINtoken()  
          const res = await TeacherAPI.Add(payload);
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
