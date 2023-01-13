// imoprt png logoGas

import Image from "next/image";
import logo from "../../public/logoGas.png";

function Header() {
  return (
    <header className="flex h-24 w-full flex-row items-center justify-end bg-gradient-to-r from-[#ff0000] to-[#B90B23] p-4">
      <Image src={logo} alt="logo" width={150} height={150} />
    </header>
  );
}

export default Header;
