"use client";
import Link from "next/link";
import Image from "next/image";
import { GrLanguage } from "react-icons/gr";
import { useRouter } from "next/navigation";


const Header = () => {
  const router = useRouter();

  const handleAuthClick = () => {
    router.push("/login");
  };
  return (
    <header className={"fixed w-full top-0 z-50 bg-white shadow"}>
      <div className={"flex items-center justify-around gap-5 h-24"}>
        <Link href={"/"} className="">
          <Image
            src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
            alt="Tripadvisor Logo"
            width={150}
            height={40}
          />
        </Link>
        <div className={"flex justify-around gap-12"}>
          <Link href={"/Discover"}>Discover</Link>
          <Link href={"/Trips"}>Trips</Link>
          <Link href={"/Review"}>Review</Link>
          <Link href={"/More"}>More</Link>
        </div>
        <div className={"flex justify-around gap-12"}>
          <button>
            <div className="flex items-center gap-4 ">
              <GrLanguage />
              VND
            </div>
          </button>
          <button className="rounded-full bg-color" onClick={handleAuthClick}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
