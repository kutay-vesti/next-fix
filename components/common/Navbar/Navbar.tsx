import { Heart, Menu, Search } from "@components/icons";
import { Logo } from "@components/ui";

import Link from "next/link";
import { FC, useState } from "react";
import AccountOverlay from "./AccountOverlay";
import NavbarRoot from "./NavbarRoot";
import ShoppingBagOverlay from "./ShoppingBagOverlay";
interface IHeader {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  // data: meQuery | undefined;
  navigation: {
    categories: {
      id: string;
      name: string;
      featured: {
        name: string;
        href: string;
        imageSrc: string;
        imageAlt: string;
      }[];
      sections: {
        id: string;
        name: string;
        items: {
          name: string;
          href: string;
        }[];
      }[];
    }[];
    pages: {
      name: string;
      href: string;
    }[];
  };
}

const Navbar: FC<IHeader> = ({ setOpen, open, navigation }) => {
  const [index1, setIndex1] = useState<any>(null);

  const [clicked, setClicked] = useState(false);

  const HandleOpenCategory = (index: number) => {
    setIndex1(index);
    setClicked(false);
  };
  const HandleCloseCategory = (index: number) => {
    setIndex1(null);
    setClicked(false);
  };

  const handleDisplay = (index: any, index1: any): boolean => {
    if (index1 === index) {
      setTimeout(() => {
        return true;
      }, 1000);
    }
    return false;
  };
  return (
    <NavbarRoot>
      <header
        className="  w-full 
          shadow-sm  border-b border-[#DDDDDD]} bg-[#fff]  z-100"
      >
        {/* Header Logo Part */}
        <div className=" header__inner flex relative items-center justify-between  h-14 ">
          <button
            type="button"
            className="bg-white p-2 rounded-md text-gray-400 tablet:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="invisible tablet:visible">
            <Link href="/">
              <a>Düğün Planla</a>
            </Link>
          </div>
          <div className="absolute inset-x-1/2 transform -translate-x-1/2  top-1 w-fit h-fit pt-1">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="flex gap-x-2 justify-center items-center mx-4 ">
            <div className="hidden tablet:block ">
              <form
                className="flex justify-center items-center"
                onSubmit={() => console.log("searching")}
              >
                <input
                  className="border-b border-black py-1 text-sm focus:outline-none placeholder:text-sm placeholder:text-[#333] "
                  placeholder="Arama yap "
                ></input>
                <div className="pr-2">
                  <Search className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70" />
                </div>
              </form>
            </div>
            {/* className="p-2 hover:bg-gray-200 rounded-full transition-all flex items-center justify-center" */}
            {/* <Link href="/account/orders" className="">
        <UserCircleIcon className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70 " />
      </Link> */}
            <div className="hidden tablet:block z-50">
              <AccountOverlay />
            </div>
            <div className=" tablet:hidden">
              <div className="pr-2">
                <Search className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70 " />
              </div>
            </div>
            <div className="hidden tablet:block">
              <div className="group flex justify-center items-center relative hover:bg-[#efefef] rounded-full p-2  ">
                <Link href="/">
                  <a>
                    {" "}
                    <Heart className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-90" />
                  </a>
                </Link>
              </div>
            </div>
            {/* <div className="group flex justify-center items-center relative hover:bg-[#efefef] rounded-full p-2 -mr-1.5 ">
        <button
          className="relative hover:opacity-70 flex items-center justify-center "
          onClick={() => setOpenCart(!openCart)}
        >
          <ShoppingBagIcon className="h-6 w-6 ml-0.5 text-[#333] hover:opacity-70" />

          {cart.data?.myCart.cart?.cartItems?.length !== undefined &&
          cart.data?.myCart.cart?.cartItems?.length > 0 ? (
            <div className="absolute -right-0.5 top-3.5 flex justify-center items-center h-2 w-2 p-2 rounded-full bg-black ">
              <span className="text-white text-[10px] font-bold">
                {cart.data?.myCart.cart?.cartItems?.length}
              </span>
            </div>
          ) : null}
        </button>
      </div> */}
            <ShoppingBagOverlay />
          </div>
        </div>
        {/* Header Menu List Part */}

        <div className="header__Menu hidden tablet:block  ">
          <nav className=" relative flex ">
            <ul className="flex w-full justify-center overflow-x-auto scroll-smooth border-b-1  border-t-[#EEEEEE] ">
              {navigation.categories.map((categories, index) => {
                return (
                  <li
                    className="flex flex-col  h-auto  "
                    key={index}
                    onMouseEnter={() => HandleOpenCategory(index)}
                    onMouseLeave={() => HandleCloseCategory(index)}
                  >
                    <div
                      // href="yeni"
                      className="flex group relative cursor-pointer w-fit h-fit z-100  px-6 py-2"
                    >
                      <span className="text-[#333] uppercase font-normal text-sm">
                        {categories.name}
                      </span>
                      <span
                        className={`${
                          index === index1 ? "opacity-100 " : ""
                        } opacity-0 transition-opacity  bg-black w-7 h-1 bottom-0 absolute inset-x-1/2 transform -translate-x-1/2`}
                      ></span>
                    </div>
                    {/* buradakisıyla oynayarak menüyü düzeltebilrisin */}
                    <div
                      hidden={handleDisplay(index, index1) || clicked}
                      className={`${
                        index === index1 ? "opacity-100 " : " opacity-0  hidden"
                      } delay-200 absolute left-0 top-8 overflow-y-auto mt-1 bg-white  max-h-screen w-full transition-all border-b-1 border-b-[#EEEEEE] border-t border-t-[#EEEEEE] `}
                    >
                      <div className="nav menu w-full  flex ">
                        <ul className="nav menu blocks bg-white  w-full flex mx-8 gap-x-8 justify-start  p-4">
                          <div className="image mt-2">
                            <Link href={categories.featured[0].href}>
                              <a onClick={() => setClicked((prev) => !prev)}>
                                <img
                                  width={400}
                                  height={320}
                                  src={categories.featured[0].imageSrc}
                                  alt={categories.featured[0].imageAlt}
                                />
                                <span>{categories.featured[0].name}</span>
                              </a>
                            </Link>
                          </div>
                          {categories.sections.map((section) => (
                            <li key={section.id} className="w-56">
                              <div className="mb-2">
                                <span className="text-[#333] border-b flex grow  border-b-gray-500 font-semibold uppercase text-sm ">
                                  {section.name}
                                </span>
                              </div>
                              {section.items.map((item) => (
                                <ul key={item.name}>
                                  <li>
                                    <Link href={item.href}>
                                      <a
                                        className="text-[#333] font-normal  text-sm hover:underline"
                                        onClick={() =>
                                          setClicked((prev) => !prev)
                                        }
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              ))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </NavbarRoot>
  );
};

export default Navbar;
