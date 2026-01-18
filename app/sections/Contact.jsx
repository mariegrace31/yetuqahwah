import Image from "next/image";
import React from "react";
import contact from "@/app/assets/contact.svg";

function Contact() {
  return (
    <section id="contact" className="bg-yq_choc py-24 flex justify-center"
    >
      <div className="w-[85%] flex justify-center items-center relative">

        <div className="w-[40%] bg-yq_white1 p-12 z-10 shadow-xl relative">
  
          <div className="mb-10 text-center">
            <h1 className="text-[20px] font-montserrat font-medium text-yq_choc uppercase mb-3">
              rester en contact
            </h1>
            <p className="text-yq_black text-[16px] font-light leading-relaxed max-w-md">
              Restons connectés pour partager notre passion du café,
              nos nouveautés et les meilleurs conseils pour sublimer
              chaque tasse.
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Nom"
              className="border border-yq_lightchoc text-yq_main bg-yq_white1 px-4 py-3 outline-none placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="border bg-yq_white1 text-yq_main border-yq_lightchoc px-4 py-3 outline-none placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="border bg-yq_white1 text-yq_main border-yq_lightchoc px-4 py-3 outline-none resize-none placeholder:text-[16px] placeholder:text-yq_lightchoc"
            />
            <button
              type="submit"
              className="bg-yq_main font-medium text-[16px] text-yq_white1 py-3 px-6 w-full hover:opacity-90 transition"
            >
              Envoyer
            </button>
          </form>
        </div>

        <div className="w-[60%] h-[750px] relative -ml-32">
          <Image
            src={contact}
            alt="contact image"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Contact;

