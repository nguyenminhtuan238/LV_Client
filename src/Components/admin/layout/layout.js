import { Header } from "./Header"
import { Sidebav } from "./sidenav"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutAdmin, TextAdmin,HanleLogoutAdmin } from "@/store/user"
export const LayoutAdmin=({children})=>{
    const dispatch=useDispatch()
    const admin=useSelector((state)=>state.user)
    useEffect(() => {
      if(localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
        dispatch(TextAdmin())
      }
    }, []);
    const logout=()=>{
        HanleLogoutAdmin()
        dispatch(logoutAdmin())
    }
    return(
        <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <Sidebav/>
        <div className="w-full h-full flex flex-col justify-between">
        <Header logout={logout}/>
        {children}
        </div>
        </div>
    )
}