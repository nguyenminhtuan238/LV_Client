import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logoutTeacher, TextTeacher } from '@/store/user';
import { DiaLog } from './modal';
function LayoutTeacher({children}) {
    const [Open, setOpen] = useState(false);
    const router = useRouter()
    const dispatch=useDispatch()
    useEffect(() => {
        if(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
          dispatch(TextTeacher())
        }
      }, []);
      const logout=(e)=>{
          e.preventDefault()
        localStorage.removeItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)
        localStorage.removeItem(process.env.NEXT_PUBLIC_TEACHERREFRESHTOKEN)          
        dispatch(logoutTeacher())
      }
     
    return (  
        < >
    <div className="bg-gray-100 font-family-karla flex">
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
            <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Giáo Viên</a>
            <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> Thêm Lớp Học
            </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <Link href="/teacher/question" className={`flex items-center ${router.asPath==="/teacher/question"?"active-nav-link":"opacity-75 hover:opacity-100 "} text-white py-4 pl-6 nav-item`}>
                <i className="fas fa-tachometer-alt mr-3"></i>
                Quản lý câu hỏi
            </Link>
            <Link href="/teacher/exam" className={`flex items-center ${router.asPath==="/teacher/exam"?"active-nav-link":"opacity-75 hover:opacity-100 "} text-white py-4 pl-6 nav-item`}>
                <i className="fas fa-sticky-note mr-3"></i>
                Quản lý bài thi
            </Link>
            <Link href="/teacher/Class"  className={`flex items-center ${router.asPath==="/teacher/Class"?"active-nav-link":"opacity-75 hover:opacity-100 "} text-white py-4 pl-6 nav-item`}>
                <i className="fas fa-table mr-3"></i>
                Quản lý Lớp 
            </Link>
            <Link href="/teacher/NH"  className={`flex items-center ${router.asPath==="/teacher/NH"?"active-nav-link":"opacity-75 hover:opacity-100 "} text-white py-4 pl-6 nav-item`}>
                <i className="fas fa-align-left mr-3"></i>
                Ngân hàng câu hỏi    
            </Link>
            
            <Link href="/teacher/point"  className={`flex items-center ${router.asPath==="/teacher/point"?"active-nav-link":"opacity-75 hover:opacity-100 "} text-white py-4 pl-6 nav-item`}>
            <i className="fas fa-calendar mr-3"></i>
                Quản lý Điểm
            </Link>
            
        </nav>
        <a href="#" className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
            <i className="fas fa-arrow-circle-up mr-3"></i>
           Cập Nhật!
        </a>
    </aside>
    <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
            <div className="w-1/2"></div>
            <div  className="relative w-1/2 flex justify-end">
                <button onClick={()=>setOpen(!Open)} className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"/>
                </button>
                {Open && <button onClick={()=>setOpen(false)} className="h-full w-full fixed inset-0 cursor-default"></button>
                }
                {Open&&
                    <div  className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                    <Link href="/teacher/information" className="block px-4 py-2 account-link hover:text-white">Tài Khoản</Link>
                    <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                    <Link href="#" className="block px-4 py-2 account-link hover:text-white" onClick={(e)=>logout(e)}>Đăng Xuất</Link>
                </div>
                }
            </div>
        </header>
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
          {children}
        

            <footer className="w-full bg-white text-right p-4">
                <a target="_blank" href="https://davidgrzyb.com" className="underline"></a>
            </footer>
            
        </div>
            <DiaLog/>
    </div>
 
        
        </div>
        </>
    );
}

export default LayoutTeacher;
