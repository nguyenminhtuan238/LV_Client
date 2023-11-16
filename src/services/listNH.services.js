import ApiteacherServices from "./apiteacher.services"
const ListNHAPI={
    Add(data){
       return ApiteacherServices.post("api/ListNH/",data)
    },
   
    Delete(id){
        return ApiteacherServices.delete(`api/ListNH/${id}`)
    },

    GetById(id){
        return ApiteacherServices.post(`api/ListNH/${id}`)
    },
    
}
export default ListNHAPI