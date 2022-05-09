import { ChevronDown } from "@components/icons";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSortBy } from "react-instantsearch-hooks-web";
import * as _ from "lodash";

function CustomSortBy(props) {
  const { initialIndex, currentRefinement, options, refine, hasNoResults } =
    useSortBy(props);
  const [menu, setMenu] = useState(currentRefinement);

  //   console.log("the things", initialIndex, hasNoResults);
  //   console.log("currentRefinement the ", currentRefinement);
  //   console.log("options the ", options);
  //   console.log("refine the ", refine);
  //   console.log("selectedValselectedVal", selectedVal);

  const selectedVal = _.find(options, { value: menu }).label;

  useEffect(() => {
    refine(menu);
  }, [menu]);

  return (
    <div className="content-top    justify-end p-2 hidden  tablet:flex ">
      <Listbox value={menu} onChange={setMenu}>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">
              Filter menu options
            </Listbox.Label>
            <div className="relative">
              <div className="inline-flex  rounded-md py-2">
                <div className="relative z-0 inline-flex  rounded-md ">
                  <Listbox.Button
                    className={`relative inline-flex items-center  rounded-lg
                        bg-white p-2 text-sm font-medium text-black hover:bg-gray-50 ${
                          open ? " bg-gray-200" : ""
                        }`}
                  >
                    <div className="flex items-center">
                      <p className="mr-2.5 text-sm font-normal ">
                        Sorted by {selectedVal}
                      </p>
                    </div>
                    <span className="sr-only">Filter menu options</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#272727] ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="origin-top-right absolute z-10 
                      right-0   rounded-md shadow-lg overflow-hidden bg-white w-[255px]  p-5
                       ring-1 ring-black ring-opacity-5
                        focus:outline-none flex flex-col gap-y-4"
                >
                  {options.map((option) => {
                    return (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          `  ${active ? "text-gray-700" : "text-gray-900"}
                                "cursor-default select-none relative text-sm")
                              `
                        }
                        value={option.value}
                      >
                        {({ selected, active }) => (
                          <div className="flex justify-start items-center  group  ">
                            <div
                              className={`${
                                selected
                                  ? "border-black  ring-1 ring-black"
                                  : "border-gray-400"
                              } w-6 h-6 border rounded-full 
                                 group-hover:border-black 
                                flex items-center justify-center`}
                            >
                              {selected ? (
                                <span className="w-4 h-4 bg-black rounded-full "></span>
                              ) : null}
                            </div>
                            <label
                              htmlFor="products"
                              className="pl-2 text-sm font-normal"
                            >
                              {option.label}
                            </label>
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default CustomSortBy;
