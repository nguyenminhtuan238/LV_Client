import {  Logout, textuser } from "@/store/user";
import Link from "next/link"
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudent} from '@/store/Student';
  const Header=()=>{
    const [dropdown, setdropdown] = useState(false);
    const user=useSelector((state)=>state.user)
    const [Search, setSearch] = useState("");
    const dispatch = useDispatch()
    const Router=useRouter()
    const Student=useSelector(state=>state.Student);

    useEffect(() => {
        dispatch( textuser())
        async function gettudent(){
          try {
            if(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
              await dispatch(getStudent())
            }
          } catch (error) {
            console.log(error)
          }
        }
        gettudent()
        }, []);
   const handlelogout=()=>{
       setdropdown(false)
       dispatch(Logout())
   }
   const handleSumit=(e)=>{
     e.preventDefault()
    Router.push(`/Search/${Search}`)
    setSearch("")

   }
    return(
      <>
      <div className="navbar flex flex-wrap justify-between ">
  <div className="flex-1">
  <Link href="/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hệ Thống Thi Trực Tuyến</span>
            </Link>
  </div>
  {user.user&&
  <div className="flex-none gap-2">

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {Student.isloading&&
        <div className="w-10 rounded-full">
          <img src={Student.Student[0]?.Hinh?process.env.NEXT_PUBLIC_IMAGEUSERd+ Student.Student[0]?.Hinh:"https://source.unsplash.com/uJ8LNVCBjFQ/400x400"} />
        </div>
        }
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        <Link href="/information" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Quản Lý thông tin</Link>
        
        </li>
        <li> <Link href="/newp" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Đổi Mật Khẩu</Link></li>
        <li> <button onClick={()=>handlelogout()} className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3" >Đăng Xuất</button></li>
      </ul>
    </div>
  </div>
  }
  <li>   <div className="flex items-center lg:order-2">
            {!user.user&&  
  <Link href="login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Đăng Nhập</Link>
            }
          

            </div></li>
</div>
<ul className=" bg-current  flex flex-wrap justify-between item-center ">
  
  <li>
  <div className="btn-group ">
            <div >
            <Link href="/" className="inline-flex  items-center  px-3 py-4  text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800" >
            
            <span className="self-center  font-semibold  dark:text-white ">Trang Chủ</span>
        </Link>
            </div>
            {user.user&&
        <div>
    <Link href="/course" className="inline-flex items-center px-3 py-4 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 ">
    Các Khóa Học đã Đăng Ký
    </Link>
    </div>
            }
  </div>
 </li>
        <li>
          
            </li>
            {user.user&&
  <li>  <div >
            <form  onSubmit={(e)=> handleSumit(e)} >
                <ul className="flex flex-col  font-medium lg:flex-row  lg:mt-0  ">
                   
                    <li >
                    <div className="form-control flex justify-end items-end ">
      <input type="text" placeholder="Tìm Kiếm Lớp học" className="input input-bordered  " value={Search}  onChange={(e)=>setSearch(e.target.value)}/>
    
    </div>
                    </li>
                    <li >
                    <button className="btn btn-primary  ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
                    </li>
                </ul>
                </form>
            </div></li>
            }
          
 
</ul>
     
</>
    )
}
export default memo(Header)