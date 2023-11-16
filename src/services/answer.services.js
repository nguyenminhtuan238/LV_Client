import ApiteacherServices from "./apiteacher.services"
const AnswerAPI={
    Add(data){
       return ApiteacherServices.post("api/Answer/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/Answer/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/Answer/${id}`)
    },
    DeleteQ(id){
        return ApiteacherServices.delete(`api/Answer/DeleteQ/${id}`)
    },
    Getbyid(id){
        return ApiteacherServices.post(`api/Answer/${id}`)
    },
    GetALL(){
        return ApiteacherServices.get(`api/Answer/`)
    },
    Getid(id){
        return ApiteacherServices.post(`api/Answer/GETID/${id}`)
    },
   
    
}
export default AnswerAPI