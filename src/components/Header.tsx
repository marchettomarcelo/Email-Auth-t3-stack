// imoprt png logoGas
import Image from "next/image";
import logo from "../../public/logoGas.png";
import { api } from "../utils/api";

function Header() {
  const { data } = api.profile.getProfileFromSession.useQuery();
  console.log(data);
  return (
    <header className="flex h-24 w-full flex-row items-center justify-between bg-gradient-to-r from-[#B90B23] via-red-700 to-red-600 p-4">
      <Image src={logo} alt="logo" width={150} height={150} />

      <div className="flex flex-col items-end justify-end">
        
        <p className="font-semibold italic text-white">{data?.nome}</p>
      </div>
    </header>
  );
}

export default Header;
