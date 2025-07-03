import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <footer class="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        <div class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div class="md:max-w-96">
            <img class="h-9" src={assets.logo} alt="dummyLogoDark" />
            <p class="mt-6 text-sm">
              EraseIt is an online tool that lets you remove backgrounds from
              images with just a click. Simply upload your photo, and our smart
              AI automatically detects and erases the background, giving you a
              clean, transparent image ready to use in presentations, online
              stores, social media, or design projects.
            </p>
          </div>
          <div class="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 class="font-semibold mb-5 text-gray-800">Company</h2>
              <ul class="text-sm space-y-2">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-semibold mb-5 text-gray-800">Get in touch</h2>
              <div class="text-sm space-y-2">
                <p>+91-8124567890</p>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <p class="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © EraseIt. All Right Reserved.{" "}
          <span className="font-bold"> | </span>
          Created with ♥️ By Manish Verma
        </p>
      </footer>
    </div>
  );
};

export default Footer;
