import Image from "next/image";
import React from "react";
import coffee from "@/app/assets/about.svg";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

function Temoignage() {
  return (
    <section id="temoignages" className="bg-yq_white1 py-0 lg:py-20">

      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-yq_choc uppercase font-montserrat text-[10px] md:text-[13px] lg:text-[16px]">
          témoignages
        </h1>
        <p className="text-[12px] md:text-[15px] lg:text-[22px] text-yq_black text-center">
          Ce que nos clients disent sur nous
        </p>
      </div>

      <div className="flex justify-center py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row w-[85%] lg:w-[75%] gap-6 lg:gap-14 h-[820px] lg:h-[500px] items-stretch">

          <div className="relative w-[100%] lg:w-[35%] h-full">
            <Image
              src={coffee}
              alt="coffee pic"
              fill
              className="object-cover"
            />
          </div>

          <div className="w-[90%]lg:w-[60%] h-full bg-yq_beige px-5 md:px-7 lg:px-12 py-2 md:py-7 lg:py-10 flex flex-col justify-around lg:justify-between text-left">

            <div className="flex gap-1 justify-center">
              <FaStar className="text-[#FFAE4D] text-[17px] md:text-[15px] lg:text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[17px] md:text-[15px] lg:text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[17px] md:text-[15px] lg:text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[17px] md:text-[15px] lg:text-[22px]" />
              <CiStar className="text-[#FFAE4D] text-[20px] md:text-[18px] lg:text-[25px]" />
            </div>

            <div className="flex flex-col gap-3 lg:gap-4 justify-center text-center px-6 lg:px-16">
              <h1 className="text-[12px] md:text-[16px] lg:text-[22px] font-montserrat font-medium text-yq_main">
                LOREM IPSUM CAFÉ
              </h1>
              <p className="font-light text-[12px] md:text-[15px] lg:text-[18px] text-yq_black leading-relaxed max-w-xl">
                “Lorem ipsum, Café lorem! 10/10. lorem recommender café.
                le meilleur café du pays.”
              </p>
            </div>

            <div className="flex justify-center items-center gap-8">
              <button className="bg-yq_main flex items-center justify-center p-2 lg:p-3">
                <ImArrowLeft2 className="text-yq_white1 text-[16px] md:text-[18px] lg:text-[22px]" />
              </button>

              <div className="flex flex-col justify-center items-center text-center">
                <h2 className="text-[12px] md:text-[15px] lg:text-[18px] font-medium text-yq_main">
                  Jane Doe
                </h2>
                <p className="text-yq_black text-[10px] md:text-[12px] lg:text-[13px] font-light">
                  02 / 10
                </p>
              </div>

              <button className="bg-yq_main flex items-center justify-center p-2 lg:p-3">
                <ImArrowRight2 className="text-yq_white1 text-[16px] md:text-[18px] lg:text-[22px]" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Temoignage;

