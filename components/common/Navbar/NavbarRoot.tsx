import { FC, useState, useEffect, ReactNode } from "react";
import * as _ from "lodash";

import s from "./Navbar.module.css";

interface INavbarRoot {
  children: ReactNode;
}

const NavbarRoot: FC<INavbarRoot> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled);
      }
    }, 200);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const isTablet: Boolean =
    typeof window !== "undefined" && window.innerWidth < 970;

  const [position, setPosition] = useState<number>(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );
  const [visible, setVisible] = useState<"up" | "in-down" | "in-up">("up");

  useEffect(() => {
    const handleScroll = () => {
      let moving: number =
        typeof window !== "undefined" ? window.pageYOffset : 0;

      if (position < 18) {
        setVisible("up");
      } else if (position > moving) {
        setVisible("in-up");
      } else {
        setVisible("in-down");
      }

      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  return (
    <div className="block h-[56px] tablet:h-[93px] z-100">
      <div
        className={`z-100 transition transform ease-menuAnim    ${
          isTablet
            ? "fixed top-0 left-0 right-0"
            : visible === "up"
            ? "z-100 "
            : visible === "in-up"
            ? "fixed top-0 left-0 right-0 translate-y-0   "
            : "-translate-y-full  "
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default NavbarRoot;
