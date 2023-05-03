import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import UserHeader from "@/components/UserHeader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    "https://i.imgur.com/nojzBeh_d.webp?maxwidth=760&fidelity=grand"
  );

  const router = useRouter();

  const handleSocial = (e) => {
    setSocial({
      ...social,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBio(userData.bio);
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const saveProfile = (e) => {
    e.preventDefault();

    fetch(`https://linktree-server.onrender.com/save/profile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        name,
        bio,
        avatar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);

        toast.success("Profile saved successfully");
      });
  };

  const saveSocials = (e) => {
    e.preventDefault();

    fetch(`https://linktree-server.onrender.com/save/socials`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        socials: social,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);

        toast.success("Socials saved successfully");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) return router.push("/login");

    fetch("https://linktree-server.onrender.com/load/socials", {
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
        if (data.status === "error") return toast.error(data.error);

        setSocial(data.socials);
      });
  }, []);

  return (
    <>
      <div>
        <UserHeader />
        <main>
          <section>
            <div>
              <h4 className="font-bold text-center mb-5">Edit profile</h4>
              <div>
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Set a Name "
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/text.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter bio"
                      required
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Image link"
                      required
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                    <img
                      className="w-10 rounded-full border-2 border-white shadow-md"
                      src={avatar}
                    />
                  </span>
                  <input
                    type="submit"
                    value="save profile"
                    className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                  />
                </form>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="font-bold text-center mb-5">Edit Socials</h4>
              <div>
                <form
                  onSubmit={saveSocials}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/facebook.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Facebook ID"
                      required
                      id="facebook"
                      value={social.facebook}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/instagram.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Instagram ID"
                      required
                      id="instagram"
                      value={social.instagram}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/twitter.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Twitter ID"
                      required
                      id="twitter"
                      value={social.twitter}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/linkedin.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Linkedin ID"
                      required
                      id="linkedin"
                      value={social.linkedin}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/github.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Github ID"
                      required
                      id="github"
                      value={social.github}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/youtube.svg" alt="" />
                    <input
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Youtube ID @"
                      required
                      id="youtube"
                      value={social.youtube}
                      onChange={handleSocial}
                    />
                  </span>
                  <input
                    type="submit"
                    value="save profile"
                    className="bg-green-500 w-32 px-4 py-2 mb-20 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default profile;
