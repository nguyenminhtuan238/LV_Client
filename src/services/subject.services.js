import ApiadminServices from "./apiadmin.services"
const SubjectAPI={
    Add(data){
       return ApiadminServices.post("api/Subject/",data)
    },
    Update(data){
        return ApiadminServices.put(`api/Subject/${data.id}`,data)
     },
    Delete(id){
        return ApiadminServices.delete(`api/Subject/${id}`,)
    },
    Search(search){
        return ApiadminServices.get(`api/Subject/${search}`)
    },
    Get(){
        return ApiadminServices.get(`api/Subject/`)
    },
    Getid(id){
        return ApiadminServices.get(`api/Subject/byid/${id}`)
    }
  
    
}
export default SubjectAPI