import { FC, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure, Transition } from "@headlessui/react";
import { Minus, Plus } from "@components/icons";

interface Props {
  className?: string;
  children?: any;
}

const Footer: FC<Props> = () => {
  const buttonRefs = useRef<any>([]);
  const openedRef = useRef<any>(null);

  const clickRecent = (index: any) => {
    const clickedButton = buttonRefs.current[index];

    // console.log("clickedButton", clickedButton);
    // console.log("openedRef.current", openedRef.current);
    if (clickedButton === openedRef.current) {
      openedRef.current = null;

      return;
    }
    if (Boolean(openedRef.current?.getAttribute("data-value"))) {
      openedRef.current?.click();
      // window.scrollTo({
      //   top: document.documentElement.scrollHeight + 40,
      //   behavior: "smooth",
      // });
    }
    // console.log("no burası");

    openedRef.current = clickedButton;
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight + 40,
    //   behavior: "smooth",
    // });
  };

  return (
    <footer className="bg-black mt-10 " aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* mobile Footer components */}
      <div className="text-white  tablet:hidden py-5 px-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-x-5  w-full px-20  items-center justify-center">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="w-full    ">
          <Disclosure key={1} as="div">
            {({ open }) => (
              <>
                <Disclosure.Button as="div">
                  <button
                    className="flex justify-between w-full px-4 py-4 border-t border-[#7e7e7e] text-sm font-medium text-left  text-white hover:bg-[#f7f7f781] focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75"
                    data-value={open}
                    ref={(ref) => {
                      buttonRefs.current[1] = ref;
                    }}
                    onClick={() => clickRecent(1)}
                  >
                    <h2 className="text-white  font-black text-sm">
                      Hızlı Linkler
                    </h2>

                    {!open ? (
                      <Plus className="   w-5 h-5 text-white" />
                    ) : (
                      <Minus className="   w-5 h-5 text-white"></Minus>
                    )}
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 pt-2 pb-2 text-sm text-gray-500"
                  >
                    <ul>
                      {navigation.quickLinks.map((navItem) => (
                        <li className="py-[6px]" key={navItem.name}>
                          <Link href={navItem.href}>
                            <a>
                              <span className="text-[#7e7e7e] text-xs font-normal">
                                {navItem.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure key={2} as="div">
            {({ open }) => (
              <>
                <Disclosure.Button as="div">
                  <button
                    className="flex justify-between w-full px-4 py-4 border-t border-[#7e7e7e] text-sm font-medium text-left  text-white hover:bg-[#f7f7f781] focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75"
                    data-value={open}
                    ref={(ref) => {
                      buttonRefs.current[2] = ref;
                    }}
                    onClick={() => clickRecent(2)}
                  >
                    <h2 className="text-white  font-black text-sm">Kiralık</h2>
                    {!open ? (
                      <Plus className="   w-5 h-5 text-white" />
                    ) : (
                      <Minus className="   w-5 h-5 text-white"></Minus>
                    )}
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 pt-2 pb-2 text-sm text-gray-500"
                  >
                    <ul>
                      {navigation.rental.map((navItem) => (
                        <li className="py-[6px]" key={navItem.name}>
                          <Link href={navItem.href}>
                            <a>
                              <span className="text-[#7e7e7e] text-xs font-normal">
                                {navItem.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure key={3} as="div">
            {({ open }) => (
              <>
                <Disclosure.Button as="div">
                  <button
                    className="flex justify-between w-full px-4 py-4 border-t border-[#7e7e7e] text-sm font-medium text-left  text-white hover:bg-[#f7f7f781] focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75"
                    data-value={open}
                    ref={(ref) => {
                      buttonRefs.current[3] = ref;
                    }}
                    onClick={() => clickRecent(3)}
                  >
                    <h2 className="text-white  font-black text-sm">Satılık</h2>
                    {!open ? (
                      <Plus className="   w-5 h-5 text-white" />
                    ) : (
                      <Minus className="   w-5 h-5 text-white"></Minus>
                    )}
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 pt-2 pb-2 text-sm text-gray-500"
                  >
                    <ul>
                      {navigation.retail.map((navItem) => (
                        <li className="py-[6px]" key={navItem.name}>
                          <Link href={navItem.href}>
                            <a>
                              <span className="text-[#7e7e7e] text-xs font-normal">
                                {navItem.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure key={4} as="div">
            {({ open }) => (
              <>
                <Disclosure.Button as="div">
                  <button
                    className="flex justify-between w-full px-4 py-4 border-t border-[#7e7e7e] text-sm font-medium text-left  text-white hover:bg-[#f7f7f781] focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75"
                    data-value={open}
                    ref={(ref) => {
                      buttonRefs.current[4] = ref;
                    }}
                    onClick={() => clickRecent(4)}
                  >
                    <h2 className="text-white  font-black text-sm">
                      Müşteri Hizmetleri
                    </h2>
                    {!open ? (
                      <Plus className="   w-5 h-5 text-white" />
                    ) : (
                      <Minus className="   w-5 h-5 text-white"></Minus>
                    )}
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 pt-2 pb-2 text-sm text-gray-500"
                  >
                    <ul>
                      {navigation.customerCare.map((navItem) => (
                        <li className="py-[6px]" key={navItem.name}>
                          <Link href={navItem.href}>
                            <a>
                              <span className="text-[#7e7e7e] text-xs font-normal">
                                {navItem.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure key={5} as="div">
            {({ open }) => (
              <>
                <Disclosure.Button as="div">
                  <button
                    className={`${
                      open ? "border-t" : "border-y"
                    } flex justify-between w-full px-4 py-4 border-[#7e7e7e] text-sm font-medium text-left  text-white hover:bg-[#f7f7f781] focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75`}
                    data-value={open}
                    ref={(ref) => {
                      buttonRefs.current[5] = ref;
                    }}
                    onClick={() => clickRecent(5)}
                  >
                    <h2 className="text-white  font-black text-sm">Kurumsal</h2>
                    {!open ? (
                      <Plus className="   w-5 h-5 text-white" />
                    ) : (
                      <Minus className="   w-5 h-5 text-white"></Minus>
                    )}
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 pt-2 pb-2 text-sm text-gray-500 border-b border-[#7e7e7e] "
                  >
                    <ul>
                      {navigation.company.map((navItem) => (
                        <li className="py-[6px]" key={navItem.name}>
                          <Link href={navItem.href}>
                            <a>
                              <span className="text-[#7e7e7e] text-xs font-normal">
                                {navItem.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
        <div className=" mb-4    pt-4 flex justify-between">
          <p className="text-xs text-[#7e7e7e] xl:text-center">
            &copy; 2020 Vestiyer, Her Hakkı Saklıdır.
          </p>
          <div className="flex text-[#7e7e7e] text-xs gap-x-4">
            <p>KVK ve Gizlilik Politikası</p>
            <p>DSM Grup</p>
            <p>Kullanım Koşulları</p>
          </div>
        </div>
      </div>

      {/* <----- tablet starts-----> */}
      <div className="max-w-7xl mx-auto   px-14 sm:px-6 pt-10 pb-1 hidden tablet:block lg:block ">
        <div className="flex  justify-between ">
          <div className="flex flex-row  gap-x-12 w-full mr-40">
            <div>
              <h2 className="text-white mb-3 font-black text-sm">
                Quick Links
              </h2>
              <ul>
                {navigation.quickLinks.map((navItem) => (
                  <li className="py-[6px]" key={navItem.name}>
                    <Link href={navItem.href}>
                      <a>
                        <span className="text-[#7e7e7e] text-xs font-normal">
                          {navItem.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-3 font-black text-sm">Kiralık</h2>
              <ul>
                {navigation.rental.map((navItem) => (
                  <li className="py-[6px]" key={navItem.name}>
                    <Link href={navItem.href}>
                      <a>
                        <span className="text-[#7e7e7e] text-xs font-normal">
                          {navItem.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-3 font-black text-sm">Satılık</h2>
              <ul>
                {navigation.retail.map((navItem) => (
                  <li className="py-[6px]" key={navItem.name}>
                    <Link href={navItem.href}>
                      <a>
                        <span className="text-[#7e7e7e] text-xs font-normal">
                          {navItem.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-3 font-black text-sm">
                Customer Care
              </h2>
              <ul>
                {navigation.customerCare.map((navItem) => (
                  <li className="py-[6px]" key={navItem.name}>
                    <Link href={navItem.href}>
                      <a>
                        <span className="text-[#7e7e7e] text-xs font-normal">
                          {navItem.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-3 font-black text-sm">Şirket</h2>
              <ul>
                {navigation.company.map((navItem) => (
                  <li className="py-[6px]" key={navItem.name}>
                    <Link href={navItem.href}>
                      <a>
                        <span className="text-[#7e7e7e] text-xs font-normal">
                          {navItem.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" w-480 ">
            <div className="relative group border mb-4 z-10">
              <form onSubmit={() => console.log("submit form discound")}>
                <input
                  name="discount"
                  id="discount"
                  className="pt-7 pb-2  w-full px-4 peer"
                ></input>
                <label
                  htmlFor="discount"
                  className="absolute top-9 left-4 text-sm rounded text-gray-600 peer-focus-visible:text-gray-500  peer-focus-visible:-translate-y-7 transition-all peer-valid:-translate-y-7  peer-valid:text-gray-500 peer-empty:-translate-y-4 peer-empty:text-gray-600"
                >
                  Email adresinizi igiriniz
                </label>
                <button
                  type="submit"
                  className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg absolute top-2.5 right-3 hover:bg-gray-300"
                >
                  {">"}
                </button>
              </form>
            </div>
            <p className="text-white text-xs mb-4">
              By entering your email, you are signing up to receive Lulus
              promotional emails and get 15% off any future order. New
              subscribers only. You are also agreeing to our Privacy Policy and
              Financial Incentive Notice for California customers found here.
              You may unsubscribe at any time here.
            </p>
            <div className="flex space-x-6 mt-5">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 mb-4 border-t  border-[#7e7e7e] pt-4 flex justify-between">
          <p className="text-xs text-[#7e7e7e] xl:text-center">
            &copy; 2020 Vestiyer, Her Hakkı Saklıdır.
          </p>
          <div className="flex text-[#7e7e7e] text-xs gap-x-4">
            <p>KVK ve Gizlilik Politikası</p>
            <p>DSM Grup</p>
            <p>Kullanım Koşulları</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const navigation = {
  quickLinks: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  customerCare: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  rental: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],

  retail: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "#",
      icon: (props: any) => (
        <svg width="21" height="20" fill="none">
          <path
            d="M10.969 20c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
            fill="#000"
          ></path>
          <path
            d="M10.969 0c-5.523 0-10 4.477-10 10 0 4.239 2.633 7.86 6.354 9.317-.09-.79-.165-2.008.033-2.873.18-.781 1.168-4.97 1.168-4.97s-.296-.602-.296-1.482c0-1.391.807-2.428 1.81-2.428.857 0 1.268.642 1.268 1.407 0 .856-.543 2.14-.831 3.334-.239.995.502 1.81 1.481 1.81 1.778 0 3.144-1.876 3.144-4.576 0-2.395-1.72-4.066-4.18-4.066-2.848 0-4.52 2.132-4.52 4.338 0 .856.33 1.777.742 2.28.082.098.09.189.065.288-.074.312-.246.995-.28 1.135-.04.181-.148.223-.337.132-1.25-.584-2.033-2.403-2.033-3.876 0-3.153 2.288-6.05 6.61-6.05 3.464 0 6.164 2.47 6.164 5.778 0 3.449-2.173 6.222-5.185 6.222-1.013 0-1.967-.527-2.288-1.152l-.626 2.379c-.222.872-.831 1.958-1.243 2.625.939.288 1.926.445 2.963.445 5.523 0 10-4.478 10-10A9.98 9.98 0 0010.97 0z"
            fill="#7E7E7E"
          ></path>
          <defs>
            <clipPath id="clip0">
              <path
                fill="#fff"
                transform="translate(.969)"
                d="M0 0h20v20H0z"
              ></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Youtube",
      href: "#",
      icon: (props: any) => (
        <svg width="29" height="20" viewBox="0 0 29 20" fill="none">
          <path
            d="M28.1308 3.12324C27.8016 1.89323 26.835 0.926623 25.605 0.597366C23.3754 0 14.4408 0 14.4408 0C14.4408 0 5.50618 0 3.279 0.597366C2.04899 0.926623 1.08238 1.89323 0.753128 3.12324C0.155762 5.35042 0.155762 10 0.155762 10C0.155762 10 0.155762 14.6496 0.753128 16.8768C1.08238 18.1068 2.04899 19.0734 3.279 19.4026C5.50618 20 14.4408 20 14.4408 20C14.4408 20 23.3754 20 25.6026 19.4026C26.8326 19.0734 27.7992 18.1068 28.1285 16.8768C28.7258 14.6496 28.7258 10 28.7258 10C28.7258 10 28.7258 5.35042 28.1308 3.12324Z"
            fill="#7E7E7E"
          ></path>
          <path
            d="M11.5833 14.2849V5.71484L19.008 9.99989L11.5833 14.2849Z"
            fill="black"
          ></path>
          <defs>
            <clipPath id="clip0">
              <rect
                width="28.5701"
                height="20"
                fill="white"
                transform="translate(0.155762)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Tiktok",
      href: "#",
      icon: (props: any) => (
        <svg width="18" height="20" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.487 0c.33 2.838 1.914 4.53 4.668 4.71v3.193c-1.596.156-2.994-.366-4.62-1.35v5.97c0 7.585-8.27 9.955-11.594 4.518-2.136-3.498-.828-9.636 6.025-9.882v3.366a9.927 9.927 0 00-1.59.39c-1.524.516-2.388 1.482-2.148 3.186.462 3.265 6.45 4.23 5.952-2.148V.006h3.307V0z"
            fill="#7E7E7E"
          ></path>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0h17.156v20H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ],
};
