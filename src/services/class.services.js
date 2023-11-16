import ApiteacherServices from "./apiteacher.services"
const ClassAPI={
    Add(data){
       return ApiteacherServices.post("api/Class/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/Class/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/Class/${id}`)
    },
    GetALL(data){
        return ApiteacherServices.post("api/Class/getpage/",data)
    },
    Getbyname(id){
        return ApiteacherServices.get(`api/Class/${id}`)
    },
    GetTeacher(){
        return ApiteacherServices.post("api/Class/Teacher/Getad/")
    },
    GetbyID(id){
        return ApiteacherServices.get(`api/Class/GetByID/${id}`)
    },
    SearchClass(data){
        return ApiteacherServices.post(`api/Class/Search/Class/`,data)
    }
    
}
export default ClassAPI