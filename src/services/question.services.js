import ApiImageServices from "./ApiImage.services"
import ApiteacherServices from "./apiteacher.services"
const QuestionAPI={
    Add(data){
       return ApiImageServices.post("api/Question/",data)
    },
    Update(data){
        return ApiImageServices.put(`api/Question/${data.id}`,data)
     },
    Delete(id){
        return ApiteacherServices.delete(`api/Question/${id}`)
    },
    Get(){
        return ApiteacherServices.post("api/Question/Get/ALL/")
    },
    
    GetSubject(id){
        return ApiteacherServices.get(`api/Question/${id}`)
    },
    Getid(id){
        return ApiteacherServices.get(`api/Question/GetID/${id}`)
    },
    Searchsubject(data){
        return ApiteacherServices.post(`api/Question/Search/subject/`,data)
    }, 
    Search(data){
        return ApiteacherServices.post(`api/Question/Search/`,data)
    },   
}
export default QuestionAPI