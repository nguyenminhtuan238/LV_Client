import ClassAPI from "@/services/class.services";
import {  RefreshTeachertoken } from "@/store/user"
export const AddClass=  async (payload) => {
    try {
      const res = await ClassAPI.Add(payload);
      return res.success;
    } catch (error) {
      if (error.response.status === 410) {
         try {
          await RefreshTeachertoken()  
          const res = await ClassAPI.Add(payload);
          return res.success;
         } catch (error) {
            if (error.response.status === 403) {
                throw  {mess:error.response.data.message,er:4}
                }
         
         }
      } if (error.response.status === 403) {
          console.log(error)
        throw  {mess:error.response.data.message,er:4}
        }
     else {
        console.log(error);
      }
      //throw error
    }
  };
