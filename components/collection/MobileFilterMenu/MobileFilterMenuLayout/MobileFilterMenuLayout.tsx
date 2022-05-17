import { useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import _ from "lodash";
import React, {
  Children,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IMobileFilterMenuLayout {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
  children: React.ReactNode;
  NumberOfSelectedFilters?: () => number;
  setFilters?: React.Dispatch<any>;
}

const MobileFilterMenuLayout = ({
  isFilterOpen,
  setIsFilterOpen,
  children,
}: IMobileFilterMenuLayout) => {
  return (
    <Transition.Root show={isFilterOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden tablet:hidden"
        onClose={setIsFilterOpen}
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
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="-translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="-translate-y-0"
          leaveTo="translate-y-full"
        >
          <div
            className="relative   w-full   h-[calc(100vh-250px)]  mt-auto rounded-t-3xl
           bg-white shadow-xl object-bottom
            "
          >
            <div className="w-full h-full pb-[130px]">
              <div className="relative flex w-full  border-b h-auto border-gray-200 items-center">
                <h2 className="text-center w-full font-semibold text-base pt-5 pb-3">
                  Filtreler
                </h2>
                <button
                  onClick={() => {
                    setIsFilterOpen((prev) => !prev);
                  }}
                  className="absolute right-0 mr-5"
                >
                  x
                </button>
              </div>

              <div className=" flex flex-col overflow-y-scroll h-full ">
                {children}
              </div>
              <div
                className="sticky   bg-white bottom-0 w-full flex 
               flex-row border-t border-gray-200
                shadow-sm  items-center py-2 px-5
                gap-x-2
              "
              >
                {/* <button
                  disabled={NumberOfSelectedFilters() === 0}
                  className="py-4 px-8 flex bg-gray-100 rounded-full hover:bg-gray-300 text-sm font-semibold"
                  onClick={() => setFilters([])}
                >
                  <span>Clear </span>
                  <span>
                    {" "}
                    {NumberOfSelectedFilters() > 0 &&
                      `(${NumberOfSelectedFilters()})`}
                  </span>
                </button> */}
                <button
                  className="bg-black py-4 px-8 w-full rounded-full 
                text-white text-sm font-semibold"
                >
                  See 4,512 Items
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
export { MobileFilterMenuLayout };
