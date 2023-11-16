import ApiServices from "./api.services"
import ApiteacherServices from "./apiteacher.services"
const AnswerSTAPI={
    Add(data){
       return ApiServices.post("api/AnswerST/",data)
    },
    Update(data){
        return ApiServices.put(`api/AnswerST/${data.id}`,data)
     },
    Delete(id){
        return ApiServices.delete(`api/AnswerST/${id}`)
    },
  
    Getbyid(id){
        return ApiServices.get(`api/AnswerST/${id}`)
    },
    GetidBT(data){
        return ApiServices.post(`api/AnswerST/GetHSBT/`,data)
    },
    ResultBT(data){
        return ApiServices.post(`api/AnswerST/Result/BT/${data.id}`,data)
    },
   
    
}
export default AnswerSTAPI