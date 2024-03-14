import Features from "@/components/shared/Features";
import Header from "@/components/shared/Header";
import LandingPage from "@/components/shared/LandingPage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <LandingPage />
      <Features />
    </div>
  );
}
