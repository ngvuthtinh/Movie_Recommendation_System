import React from "react";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { LuYoutube } from "react-icons/lu";

interface FooterProps {
  // Add props here if needed in the future
}

const Footer: React.FC = (props: FooterProps) => {
    return (
      <footer className="bg-black text-white px-6 py-10 text-sm">
        <div className="flex gap-5 mt-3 text-xl mb-3 ml-8 mr-8">
          <LuFacebook />
          <GrInstagram />
          <BsTwitterX />
          <LuYoutube />
        </div>
        <div className="flex gap-5 mt-3 mb-3 mr-8 ml-8">
          <div>
            <h4 className="font-bold">Pham Hoang Phuong</h4>
            <p className="text-sm text-white font-medium">Full-Stack Developer</p>
            <p>Tech Leader</p>
            <p>UI/UX Designer</p>
          </div>
          <div>
            <h4 className="font-bold">Nguyen Vu Thanh Tinh</h4>
            <p>Project Manager</p>
            <p>Developer</p>
            <p>Developer</p>
          </div>
          <div>
            <h4 className="font-bold">Dang Ngoc Thai Son</h4>
            <p>UI/UX Designer</p>
            <p>Developer</p>
            <p>Tech Leader</p>
          </div>
          <div>
            <h4 className="font-bold">Pham Anh Khoi</h4>
            <p>Database Architecture</p>
            <p>Developer</p>
            <p>Leader</p>
          </div>
        </div>
        
        <div className="col-span-full text-left pt-4 mt-3 mb-3 mr-8 ml-8">
          © 2025 F4, Inc.
        </div>
      </footer>
    );
  };
  
  export default Footer;