/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 mx-auto mb-5"
          alt="Exchange Icon"
        />
        <Link to="/policy">
          <p className="font-semibold">Easy Exchange Policy</p>
        </Link>
        <p className="text-gray-400">We offer hassle-free exchange policy</p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          className="w-12 mx-auto mb-5"
          alt="Exchange Icon"
        />
        <Link to="/policy">
          <p className="font-semibold">7 Days Return Policy</p>
        </Link>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <img
          src={assets.support_img}
          className="w-12 mx-auto mb-5"
          alt="Exchange Icon"
        />
        <Link to="/contact">
          <p className="font-semibold">Best customer support </p>
        </Link>
        <p className="text-gray-400">we provide 24/7 customer support </p>
      </div>
    </div>
  );
};

export default OurPolicy;
