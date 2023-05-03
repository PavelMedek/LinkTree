import Link from "next/link";
import React from "react";

const SocialTree = ({ social }) => {
  const { facebook, twitter, instagram, youtube, linkedin, github } = social;
  return (
    <>
      <div className="social flex flex-row justify-center my-4">
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.facebook.com/${facebook}`}
        >
          <img className="w-6" src="/svg/facebook.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.instagram.com/${instagram}`}
        >
          <img className="w-6" src="/svg/instagram.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.youtube.com/${youtube}`}
        >
          <img className="w-6" src="/svg/youtube.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.twitter.com/${twitter}`}
        >
          <img className="w-6" src="/svg/twitter.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.linkedin.com/${linkedin}`}
        >
          <img className="w-6" src="/svg/linkedin.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-90 shadow border border-gray-700 mx-1 select-none"
          target="_blank"
          href={`https://www.youtube.com/${youtube}`}
        >
          <img className="w-6" src="/svg/youtube.svg" alt="" />
        </Link>
      </div>
    </>
  );
};

export default SocialTree;
