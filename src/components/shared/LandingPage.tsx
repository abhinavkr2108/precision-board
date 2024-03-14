"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function LandingPage() {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path

  return (
    <>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
            Digital whiteboarding with
            <span className="text-blue-600"> Precision Board</span>
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            PrecisionBoard.io is your premier destination for digital
            whiteboarding solutions designed with meticulous attention to
            detail. Our platform offers unparalleled precision and accuracy,
            empowering professionals to craft intricate diagrams, charts, and
            illustrations with ease.
          </p>
          <div className="space-x-3">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button className="font-bold">Get Started</Button>
            </LoginLink>
            <Button variant={"secondary"} className="font-bold">
              Know More
            </Button>
          </div>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          <img
            src="https://i.postimg.cc/kgd4WhyS/container.png"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
            width={300}
            height={300}
            alt="container"
          />
        </div>
      </section>
    </>
  );
}
