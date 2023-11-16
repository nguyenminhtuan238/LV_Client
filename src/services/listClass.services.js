import ApiServices from "./api.services"
import ApiteacherServices from "./apiteacher.services"
const ListClassAPI={
    Add(data){
       return ApiServices.post("api/ListClass/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/ListClass/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/ListClass/${id}`)
    },
    Deletebyid(id){
        return ApiteacherServices.delete(`api/ListClass/ByID/${id}`)
    },
    GetStudent(){
        return ApiServices.post("api/ListClass/Student/")
    },
    GetById(data){
        return ApiServices.post(`api/ListClass/Get/HS/`,data)
    },
    GetByClass(data){
        return ApiServices.post(`api/ListClass/Getc/Class/`,data)
    },
    GetByIDHS(data){
        return ApiServices.post(`api/ListClass/Get/IDHS/`,data)
    },
    
}
export default ListClassAPI