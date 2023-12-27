import ApiadminServices from "./apiadmin.services"
import ApiImageServices from "./ApiImage.services"
import ApiImageuser from "./ApiImageuser.services"
import ApiteacherServices from "./apiteacher.services"
const { default: ApiServices } = require("./api.services")
const AuthAPI={
    Login(data){
       return ApiServices.post("api/auth/Login",data)
    },
    DeleteA(id){
        return ApiadminServices.delete(`api/auth/${id}`)
    },
    LoginAdmin(data){
        return ApiServices.post("api/auth/Login/Admin",data)
    },
    LoginTeacher(data){
        return ApiServices.post("api/auth/Login/Teacher",data)
    },
    update(data){
        return ApiImageuser.put("api/auth/",data)
    },
    get(){
        return ApiServices.post("api/auth/GET/users/LKK/",)
    },
    updateTeacher(data){
        return ApiImageServices.put("api/auth/",data)
    },
    getTeacher(){
        return ApiteacherServices.post("api/auth/GET/users/LKK/")
    },
    Resgiter(data){
        return ApiadminServices.post("api/auth/Resgiter",data)
     },
    Reset(data){
        return ApiServices.post("api/auth/Reset",data)
    },
    Refreshtoken(){
        const Refreshtoken=localStorage.getItem(process.env.NEXT_PUBLIC_REFRESHTOKEN)
        return ApiServices.post("api/auth/Refreshtoken",{
            Refreshtoken
        })
    },
    RefreshADMINtoken(){
        const Refreshtoken=localStorage.getItem(process.env.NEXT_PUBLIC_ADMINREFRESHTOKEN)
        return ApiadminServices.post("api/auth/Refreshtoken",{
            Refreshtoken
        })
    },
    RefreshTeachertoken(){
        const Refreshtoken=localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERREFRESHTOKEN)
        return ApiteacherServices.post("api/auth/Refreshtoken",{
            Refreshtoken
        })
    },
    AccessToken(token){
        return ApiServices.post("api/auth/",{token})
    },
    SearchST(data){
        if(localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN) && !localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
            return ApiadminServices.post("api/auth/Search/HS",data)
        }else{
            return ApiteacherServices.post("api/auth/Search/HS",data)

        }
     
    },
    SearchGD(data){
      
            return ApiadminServices.post("api/auth/Search/GD",data)
        
     
    },
    GetALL(data){
        if(localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN) && !localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
            return ApiadminServices.post("api/auth/GetALL/",data)
        }else{
            return ApiteacherServices.post("api/auth/GetALL/",data)

        }
    },
    GetALLTE(data){
        return ApiteacherServices.post("api/auth/GetALL/GD",data)
    },
    
    
}
export default AuthAPI