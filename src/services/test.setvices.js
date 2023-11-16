import ApiServices from "./api.services"
import ApiteacherServices from "./apiteacher.services"
const TestAPI={
    Add(data){
       return ApiServices.post("api/test/",data)
    },
    Update(data){
        return ApiServices.put(`api/test/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/test/${id}`)
    },
    DeleteKT(id){
        return ApiteacherServices.delete(`api/test/KT/${id}`)
    },
    Gettestexam(id){
        return ApiServices.post(`api/test/${id}`)
    },
    Getbytest(id){
        return ApiServices.get(`api/test/Getbytest/${id}`)
    },
    GetById(data){
        return ApiServices.post(`api/test/Get/`,data)
    },
    
}
export default TestAPI