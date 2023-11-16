import { LayoutAdmin } from "@/Components/admin/layout/layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import readXlsxFile from 'read-excel-file'
import { HandleRegister } from "@/useapi/auth.api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
export default function subject() {
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Diachi, setDiahi] = useState("");
  const [SDT, setSDT] = useState("");
  const [Error, setError] = useState("");
  const [seleted, setseleted] = useState("ADDONE");
  const [File, setFile] = useState();
  const  user  = useSelector(state => state.user)
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
      router.push("/admin/")
    }
  }, [user.admin]);
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const acc = {
        username,
        password,
        role: 2,
        Email,
        Diachi,
        SDT,
        Ten: First + " " + Last,
      };
      console.log(acc)
       await HandleRegister(acc);
     
      Swal.fire("Thêm!", "Thêm Thành Công", "success");
      setFirst("");
      setDiahi("");
      setLast("");
      setEmail("");
      setPassword("");
      setError("");
      setSDT("");
      setUsername("");
    } catch (error) {
      if (error?.er === 1) {
        setError(error.mess);
      }
      if (error?.er === 2) {
        setError(error.mess);
      }
    }
  };
  const handlefile=async(e)=>{
    e.preventDefault(e)
    readXlsxFile(File[0]).then(async (rows) => {
      for(var i = 1; i <rows.length; i++) {
       
        try {
        
          const acc = {
            username:rows[i][0],
            password:rows[i][1].toString(),
            Email:rows[i][5],
            Diachi:rows[i][3],
            SDT:rows[i][2],
            Ten: rows[i][4],
            role: 2,
          };
          await HandleRegister(acc);
         
          Swal.fire("Thêm!", "Thêm Thành Công", "success");
          
        
        } catch (error) {
          if (error?.er === 1) {
            Swal.fire("Thêm Thất Bại!", `Thêm Thất bại ${error.mess+""+rows[i][0]}  `, "error");
            break;
          }
          if (error?.er === 2) {
            Swal.fire("Thêm Thất Bại!", `Thêm Thất bại ${error.mess+""+rows[i][5]}  `, "error");
          
          }
        }
    }
      
    })
  }
  
  return (
    <>
      <main className="max-w-full h-full flex relative overflow-y-hidden">
        <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
          <div className="w-40 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                checked={seleted === "ADDALL"}
                onChange={(e) => setseleted(e.target.value)}
                type="radio"
                value="ADDALL"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thêm Giáo Viên Bằng File
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={seleted === "ADDONE"}
                onChange={(e) => setseleted(e.target.value)}
                id="default-radio-2"
                type="radio"
                value="ADDONE"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thêm Từng Giáo Viên
              </label>
            </div>
          </div>
          {seleted === "ADDONE" ? (
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow ">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
                onSubmit={(e) => handleCreate(e)}
                method="post"
              >
                <div className="mb-5">
                  <span className="text-lg font-bold text-gray-600">
                    Thêm Giáo Viên
                  </span>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Họ
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                      id="grid-first-name"
                      type="text"
                      onChange={(e) => setFirst(e.target.value)}
                      value={First}
                      placeholder="Minh"
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Tên
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-last-name"
                      type="text"
                      onChange={(e) => setLast(e.target.value)}
                      value={Last}
                      placeholder="Tuan"
                    />
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tên Đăng Nhập
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                      placeholder="Nhập Thông tinh Vào"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mật Khẩu
                    </label>
                    <input
                      autoComplete="true"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={Email}
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">{Error}</p>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Địa Chỉ
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-city"
                      type="text"
                      onChange={(e) => setDiahi(e.target.value)}
                      value={Diachi}
                      placeholder=""
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Số Điện Thoại
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-zip"
                      type="number"
                      onChange={(e) => setSDT(e.target.value)}
                      value={SDT}
                      placeholder="90210"
                    />
                  </div>
                </div>
                <div className="md:w-full  px-3 mb-6 md:mb-0">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 w-full mt-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {seleted === "ADDALL" ? (
            <div className="w-40 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <div className="p-6 border border-gray-300 sm:rounded-md">
            <div className="mb-5 border border-gray-300 w-20">
            <span>File Mẫu</span>
            <Link href="http://localhost:5000/public" download>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/></svg>
            </Link> 
            </div>
              <form
                method="POST"
                action="https://herotofu.com/start"
                encType="multipart/form-data"
                onSubmit={(e)=>handlefile(e)}
              >
                <label className="block mb-6">
                  <span className="text-gray-700">File Thông Tin Giáo Viên</span>
                  <input
                    required
                    name="photo"
                    type="file"
                    accept=".xlsx"

                    className="
            block
            w-full
            mt-1
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "       onChange={(e)=>setFile(e.target.files)}
                  />
                </label>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
                  >
                    Upload
                  </button>
                </div>
                <div></div>
              </form>
            </div>
            </div>
          ) : (
            ""
          )}
          {/* <div className="w-60 h-60 rounded-lg flex-shrink-0 flex-grow ">
            <table className=" border-collapse border border-slate-400 w-4/5">
              <thead className="border border-slate-300 ">
                <tr>
                  <th className="border border-slate-300 ">Môn</th>
                  <th className="border border-slate-300">Xóa</th>
                  <th className="border border-slate-300">Sửa</th>
                  <th className="border border-slate-300"></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div> */}
        </div>
      </main>
    </>
  );
}
subject.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
