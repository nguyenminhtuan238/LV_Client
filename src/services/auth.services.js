import ApiadminServices from "./apiadmin.services"
import ApiImageuser from "./ApiImageuser.services"
import ApiteacherServices from "./apiteacher.services"
const { default: ApiServices } = require("./api.services")
const AuthAPI={
    Login(data){
       return ApiServices.post("api/auth/Login",data)
    },
    DeleteA(data){
        return ApiadminServices.delete(`api/auth/${data}`)
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
        return ApiteacherServices.put("api/auth/",data)
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
        return ApiteacherServices.post("api/auth/Search/HS",data)
    },
    GetALL(){
        return ApiteacherServices.post("api/auth/GetALL/")
    },
    GetALLTE(){
        return ApiteacherServices.post("api/auth/GetALL/GD")
    },
    
    
}
export default AuthAPI