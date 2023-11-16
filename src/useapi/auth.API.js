import AuthAPI from "@/services/auth.services"
import { RefreshADMINtoken } from "@/store/user"
export const HandleRegister=async (payload)=>{
    try {
        const res=await AuthAPI.Resgiter(payload)
        return res
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await RefreshADMINtoken()  
            const res=  await AuthAPI.Resgiter(payload);
             return res;
            } catch (error) {
                if(error.response.status === 403){
                    throw {mess:error.response.data.mess,er:1}
                 } if(error.response.status === 415){
                    throw {mess:error.response.data.mess,er:2}
                 }
            }
         }if(error.response.status === 403){
            throw  {mess:error.response.data.mess,er:1}
         }if(error.response.status === 415){
            throw  {mess:error.response.data.mess,er:2}
         }
         else {
             
           console.log(error);
         }    
        }
}
export const DeleteAuth=async (payload)=>{
    try {
        const res=await AuthAPI.DeleteA(payload)
        return res
    } catch (error) {
        if (error.response.status === 410) {
            try {
             await RefreshADMINtoken()  
            const res=  await AuthAPI.DeleteA(payload);
             return res;
            } catch (error) {
                throw payload
            }
         }else {
           throw payload
         }    
        }
}
export const Accesstoken=async (token)=>{
    try {
        const res=await AuthAPI.AccessToken(token)
        return res
    } catch (error) {
        if (error.response.status === 410) {
            throw  {mess:error.response.data.message,er:2}
         }if(error.response.status === 405){
            throw  {mess:error.response.data.message,er:3}
         }else {
           console.log(error);
         }    
    }
   
}
