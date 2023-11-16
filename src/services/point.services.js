import ApiteacherServices from "./apiteacher.services"
const PointAPI={
    Add(data){
       return ApiteacherServices.post("api/Point/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/Point/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/Point/${id}`)
    },
   
    Getbyid(id){
        return ApiteacherServices.get(`api/Point/${id}`)
    },
    GetALL(){
        return ApiteacherServices.get(`api/Point/`)
    },
   
   
    
}
export default PointAPI