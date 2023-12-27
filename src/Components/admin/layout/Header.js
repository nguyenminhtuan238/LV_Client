

export  const Header=(props)=>{
  
    return(
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
        <div className="flex flex-shrink-0 items-center space-x-4 text-white">
          
         
          
        <div  className="relative w-1/2 flex justify-end">
          <div className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"><img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"  className="w-[250px] h-[250px]"/></div>
         </div> 
          <div className="h-10 w-10  cursor-pointer  border-blue-400" onClick={props.logout}>Đăng Xuất</div>
        </div>
      </header>
    )
}