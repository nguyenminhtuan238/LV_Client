import Link from "next/link"

export const Sidebav=()=>{
    return(
        <aside className="h-full w-20 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
    <div className="h-10 w-60 flex items-center group relative     justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
     
     <Link className="rounded px-1 py-2 text-sm  shadow-sm" href="/admin/hs">
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
     </Link>
     <span className="absolute  top-0 left-20 scale-0  rounded z-50 mt-10 bg-gray-800  p-1 text-white group-hover:scale-100">Quản lý Học Sinh</span>
   </div>
   <div className="h-10 w-60 flex items-center group relative     justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
     
  <Link className="rounded px-1 py-2 text-sm  shadow-sm" href="/admin/gd">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
  </Link>
  <span className="absolute  top-0 left-20 scale-0  rounded z-50 mt-10 bg-gray-800  p-2 text-white group-hover:scale-100">Quản lý Giáo Viên</span>
</div>
<div className="h-10 w-60 flex items-center group relative     justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
     
     <Link className="rounded px-1 py-2 text-sm  shadow-sm" href="/admin/subject">
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  " height="1em" viewBox="0 0 448 512" fill="currentColor"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"/></svg>
     </Link>
     <span className="absolute  top-0 left-20 scale-0  rounded z-50 mt-10 bg-gray-800  p-2 text-white group-hover:scale-100">Quản lý môn </span>
   </div>

  
  </aside>
    )
}