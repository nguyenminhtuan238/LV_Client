import ApiteacherServices from "./apiteacher.services"
const NHCHAPI={
    Add(data){
       return ApiteacherServices.post("api/NHCH/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/NHCH/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/NHCH/${id}`)
    },
   
    Getbyid(id){
        return ApiteacherServices.post(`api/NHCH/${id}`)
    },
    GetALL(){
        return ApiteacherServices.get(`api/NHCH/`)
    },
   
   
    
}
export default NHCHAPI