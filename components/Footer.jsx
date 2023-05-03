import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 "
    >
      <Link className="flex flex-row items-center" href="/" target="_blank">
        <img
          className="hover:-rotate-45 transition-all duration-400"
          src="/images/favicon.ico"
          alt=""
        />
        <h5 className="text-indigo-400 pl-3 font-bold hover:text-indigo-300">
          Try LinkTree
        </h5>
      </Link>
    </footer>
  );
};

export default Footer;
