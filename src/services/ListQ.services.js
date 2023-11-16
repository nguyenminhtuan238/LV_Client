import ApiteacherServices from "./apiteacher.services"
const ListQAPI={
    Add(data){
       return ApiteacherServices.post("api/ListQ/",data)
    },
    Update(data){
        return ApiteacherServices.put(`api/ListQ/${data.id}`,data)
     },
    Delete(payload){
        return ApiteacherServices.delete(`api/ListQ/${payload.id}`)
    },
    Deletebyexam(id){
        return ApiteacherServices.delete(`api/ListQ//Exam/${id}`)
    },
    Get(){
        return ApiteacherServices.get("api/ListQ/")
    },
    Getpage(data){
        return ApiteacherServices.post(`api/ListQ/Page/Get/${data.id}`,data)
    },
    GetById(id){
        return ApiteacherServices.post(`api/ListQ/GetD/${id}`)
    },
    
}
export default ListQAPI