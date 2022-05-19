import { ApolloClient } from "@apollo/client";
import { ChevronDown, ChevronUp } from "@components/icons";
import ProductCard from "@components/product/ProductCard";
import { initializeApollo } from "@lib/apollo";
import { getProductsQuery } from "graphql/queries";
import "swiper/css";
import "swiper/css/pagination";
import {
  getProducts,
  getProductsVariables,
} from "graphql/__generated__/getProducts";
import { GetStaticProps } from "next";
import { FC, Fragment, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { meQuery } from "graphql/__generated__/meQuery";
interface IMobileMenu {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  data: meQuery | undefined;
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

const MobileMenu: React.FC<IMobileMenu> = ({
  data,
  navigation,
  setOpen,
  open,
}) => {
  const [currentCatagory, setCurrentCatagory] = useState<any>(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <div className=" flex justify-center  items-center ">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-50 lg:hidden "
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-sm w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className=" flex bg-black items-center justify-center">
                {/* <button
              type="button"
              className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6 buicon" aria-hidden="true" />
            </button> */}
                {data?.me.firstname ? (
                  <Link href="/account/orders">
                    <button
                      className="text-white  w-full h-full text-center px-2 pt-5 pb-4"
                      onClick={() => {
                        setOpen(false);
                        setOpenMenu(false);
                      }}
                    >
                      <span>
                        Merhaba,{" "}
                        <span className="underline">{data?.me.firstname}</span>{" "}
                      </span>
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <span className="text-white  w-full h-full text-center px-2 pt-5 pb-4">
                      {" "}
                      Giriş Yap / kaydol
                    </span>
                  </Link>
                )}
              </div>

              <button
                className="absolute right-0 top-0 text-white p-4"
                onClick={() => {
                  setOpen(false);
                  setOpenMenu(false);
                }}
              >
                <span className="w-5 h-5 text-white ">X</span>
              </button>

              <div className="bg-white relative">
                <Transition
                  show={openMenu}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-50"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-50"
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="-translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="-translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <div className="relative w-full">
                      <div className="absolute top-0 left-0 z-40 lg:hidden w-full  ">
                        <div className="w-full  bg-white">
                          <div className="w-full  h-fit flex flex-col  ">
                            {currentCatagory && (
                              <div className="">
                                <button
                                  className="relative flex items-center justify-start hover:bg-gray-100  h-full w-full"
                                  onClick={() => setOpenMenu(false)}
                                >
                                  <ChevronDown className="   ml-2  mt-1 w-6 h-6 text-gray-600" />
                                  {/* <ChevronLeft className="   ml-2  mt-1 w-6 h-6 text-gray-600" /> */}

                                  <span className="py-4 text-2xl font-black pl-2">
                                    {currentCatagory.name}
                                  </span>
                                </button>
                              </div>
                            )}

                            {/* <ul>
                          {currentCatagory &&
                            currentCatagory.sections.map(
                              (section: any) => (
                                <li>
                                  <span>{section.name}</span>
                                  <ul>
                                    {section.items.map((item: any) => (
                                      <li>{item.name}</li>
                                    ))}
                                  </ul>
                                </li>
                              )
                            )}
                        </ul> */}
                            {currentCatagory && (
                              <ul>
                                {currentCatagory.sections.map(
                                  (section: any) => (
                                    <li key={section.id} className="w-full ">
                                      <div className="my-3  ">
                                        <span
                                          className="text-[#333] border-b flex w-full px-4  py-3 
                                     border-b-gray-500 font-black uppercase text-base "
                                        >
                                          {section.name}
                                        </span>
                                      </div>
                                      {section.items.map((item: any) => (
                                        <ul
                                          key={item.name}
                                          className="flex gap-y-4"
                                        >
                                          <li className="flex">
                                            <Link href={item.href}>
                                              <a
                                                className="text-[#333] font-normal  text-sm hover:underline  py-3"
                                                onClick={() => {
                                                  setClicked((prev) => !prev);
                                                  setOpen(false);
                                                  setOpenMenu(false);
                                                  setCurrentCatagory(null);
                                                }}
                                              >
                                                <span className="px-4 text-sm font-semibold   ">
                                                  {item.name}
                                                </span>
                                              </a>
                                            </Link>
                                          </li>
                                        </ul>
                                      ))}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </Transition>

                <ul className="flex  flex-col  py-1 divide-y">
                  {navigation.categories.map((catagory) => (
                    <li key={catagory.id} className="py-4">
                      <button
                        onClick={() => {
                          setCurrentCatagory(catagory);
                          setOpenMenu((prev) => !prev);
                        }}
                        className="flex px-3 justify-between items-center w-full "
                      >
                        <div className="flex gap-x-2 items-center">
                          <div className="rounded-full bg-[#fafafa] border border-[#e5e5e5] w-fit h-fit"></div>

                          <span className="font-semibold text-base">
                            {catagory.name}
                          </span>
                        </div>
                        <ChevronUp className="text-gray-600 w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="bg-red-600 w-full h-96 relative"> */}

              {/* <div>
              <ul className="flex  flex-col gap-y-2">
                {navigation.categories.map((catagory) => (
                  <li key={catagory.id}>
                    <button className="flex px-5 justify-between items-center w-full ">
                      <div className="flex gap-x-2 items-center">
                        <div className="rounded-full bg-[#fafafa] border border-[#e5e5e5] w-fit h-fit">
                          <img
                            className="w-12 h-12 "
                            src="//img.ltwebstatic.com/images3_abc/2021/12/02/163842944810b47a1d459d7fe835d92815bbdfdbe7.png"
                            alt="menu logo"
                          />
                        </div>

                        <span className="font-semibold text-base">
                          {catagory.name}
                        </span>
                      </div>
                      <ChevronRightIcon className="text-gray-600 w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}
              {/* <SubMenu /> */}
              {/* <button onClick={() => setOpenMenu(true)}>menü</button>
          </div> */}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileMenu;
