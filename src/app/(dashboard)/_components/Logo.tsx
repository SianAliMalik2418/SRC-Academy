import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex cursor-pointer items-center justify-center gap-2"
    >
      <Image width={50} height={50} src={"/logo.svg"} alt="Logo" />
      <p className="font-bold italic">Src Academy</p>
    </Link>
  );
};

export default Logo;
