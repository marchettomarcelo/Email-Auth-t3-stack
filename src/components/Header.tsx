import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logoGas.png";
import { api } from "../utils/api";

function Header() {
  const { data } = api.profile.getProfileFromSession.useQuery();
  return (
    <header className="flex h-24 w-full flex-row items-center justify-between bg-gradient-to-r from-[#B90B23] via-red-700 to-red-600 p-4">
      <Link href="/">
        {" "}
        <Image src={logo} alt="logo" width={150} height={150} />{" "}
      </Link>

      {data && (
        <Link href={`/pessoas/${data.username}`}>
          <p className="font-semibold italic text-white">{data?.nome}</p>
        </Link>
      )}
    </header>
  );
}

export default Header;
