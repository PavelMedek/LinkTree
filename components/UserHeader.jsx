import UserContext from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const UserHeader = () => {
  // const { name, role, avatar, handle, links } = data;

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("LinkTreeToken");
    router.push("/login");
  };

  const { setUserData, userData } = useContext(UserContext);
  const { role, avatar, handle } = userData;

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken"))
      return (window.location.href = "/login");

    fetch("https://linktree-server.onrender.com/data/dashboard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error("Error happen");
        // setData(data.userData);
        setUserData(data.userData);
        localStorage.setItem("userHandle", data.userData.handle);
        // toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row p-5">
          <Link href="/edit/links">
            <button className=" inline-flex w-full md:w-auto px-6 py-3 text-purple-500 font-bold hover:text-purple-700 hover:bg-purple-10 rounded-md mb-3 border-2 border-purple-500">
              <img src="/svg/url.svg" className="w-6 mr-3 " />
              Edit Links
            </button>
          </Link>
          <Link href="/edit/profile">
            <button className=" inline-flex w-full md:w-auto px-6 py-3 text-red-500 font-bold hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4 ">
              <img src="/svg/user.svg" className="w-6 mr-3 " />
              Edit profile
            </button>
          </Link>
        </div>
        <Link href={`https://link-tree-kappa.vercel.app/${handle}`}>
          <div className="flex flex-row">
            <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
              <div className="text-sm md:text-md flex flex-col flex-wrap">
                <span className="font-bold">{handle}</span>
                <span>{role} Pack</span>
              </div>
              <div className="user-img">
                <img src={avatar} className="w-10 ml-5 rounded-full" alt="" />
              </div>
            </div>
            <img
              src="/svg/notifi.svg"
              className="w-6 mr-5 cursor-pointer"
              alt=""
            />
            <img
              src="/svg/logout.svg"
              onClick={handleLogout}
              className="w-6 mr-5 cursor-pointer"
              alt=""
            />
          </div>
        </Link>
      </header>
    </>
  );
};

export default UserHeader;
