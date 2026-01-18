import Image from "next/image";
import React from "react";
import coffee from "@/app/assets/about.svg";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

function Temoignage() {
  return (
    <section id="temoignages" className="bg-yq_white1 py-20">

      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-yq_choc uppercase font-montserrat text-[16px]">
          témoignages
        </h1>
        <p className="text-[22px] text-yq_black text-center">
          Ce que nos clients disent sur nous
        </p>
      </div>

      <div className="flex justify-center py-16">
        <div className="flex w-[75%] gap-14 h-[500px] items-stretch">

          <div className="relative w-[35%] h-full">
            <Image
              src={coffee}
              alt="coffee pic"
              fill
              className="object-cover"
            />
          </div>

          <div className="w-[60%] h-full bg-yq_beige px-12 py-10 flex flex-col justify-between text-left">

            <div className="flex gap-1 justify-center">
              <FaStar className="text-[#FFAE4D] text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[22px]" />
              <FaStar className="text-[#FFAE4D] text-[22px]" />
              <CiStar className="text-[#FFAE4D] text-[26px]" />
            </div>

            <div className="flex flex-col gap-4 justify-center text-center px-16">
              <h1 className="text-[22px] font-montserrat font-medium text-yq_main">
                LOREM IPSUM CAFÉ
              </h1>
              <p className="font-light text-[18px] text-yq_black leading-relaxed max-w-xl">
                “Lorem ipsum, Café lorem! 10/10. lorem recommender café.
                le meilleur café du pays.”
              </p>
            </div>

            <div className="flex justify-center items-center gap-8">
              <button className="bg-yq_main flex items-center justify-center p-3">
                <ImArrowLeft2 className="text-yq_white1 text-[22px]" />
              </button>

              <div className="flex flex-col justify-center items-center text-center">
                <h2 className="text-[18px] font-medium text-yq_main">
                  Jane Doe
                </h2>
                <p className="text-yq_black text-[13px] font-light">
                  02 / 10
                </p>
              </div>

              <button className="bg-yq_main flex items-center justify-center p-3">
                <ImArrowRight2 className="text-yq_white1 text-[22px]" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Temoignage;

