import ApiServices from "./api.services"
import ApiteacherServices from "./apiteacher.services"
const ExamAPI={
    Add(data){
       return ApiteacherServices.post("api/Exam/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/Exam/updateKT/${data.id}`,data)
     },
     UpdateStCH(data){
        return ApiteacherServices.put(`api/Exam/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/Exam/${id}`)
    },
    GetbyID(id){
        return ApiteacherServices.get(`api/Exam/${id}`)
    },
    GetbyTeacher(){
        return ApiteacherServices.post(`api/Exam/byTeacher/`)
    },
    Getbyclass(id){
        return ApiServices.post(`api/Exam/GetClass/${id}`)
    },
   
    
}
export default ExamAPI