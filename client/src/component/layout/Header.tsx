import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className={"fixed w-full top-0 z-50 bg-white shadow"}>
      <div className={"container flex items-center justify-between gap-5 h-24"}>
        <Link href={"/"} className="">
          <Image
            src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
            alt="Tripadvisor Logo"
            width={150}
            height={40}
          />
        </Link>
        <div className={"hidden lg:flex gap-12"}>
          <Link href={"/Discover"}>Discover</Link>
          <Link href={"/Trips"}>Trips</Link>
          <Link href={"/Review"}>Review</Link>
          <Link href={"/More"}>More</Link>
        </div>
        <div>
            asdas
        </div>
      </div>
    </header>
  );
};

export default Header;
