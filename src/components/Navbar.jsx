import { navbarLinks } from "../data/navbarLinks.js";
import { mobileNavbarLinks } from "../data/mobileNavbarLinks.js";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaPhone } from "react-icons/fa";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_NUMBER,
  LINKEDIN_URL,
  TWITTER_URL,
  YOUTUBE_URL,
  LOGO
} from "../consts.ts";

const Navbar = ({ pathname }) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [navBar, setNavbar] = useState(false);

  const handleHamburgerClick = () => {
    setOpenMobile(() => !openMobile);
    if (!openMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [subHoveredIndex, setSubHoveredIndex] = useState(null);

  const isActive = (menuItem, pathname) => {
    let selected =
      menuItem?.submenu?.some(
        (item) =>
          item.link === pathname ||
          item.link + "/" === pathname ||
          item.subsubmenu?.some(
            (subItem) =>
              subItem.link === pathname || subItem.link + "/" === pathname,
          ),
      ) ||
      menuItem?.subsubmenu?.some(
        (item) => item.link === pathname || item.link + "/" === pathname,
      ) ||
      menuItem.link === pathname ||
      menuItem.link + "/" === pathname;
    return selected;
  };

  const handleItemClick = (index) => {
    if (hoveredIndex == index) {
      setHoveredIndex(null);
      setSubHoveredIndex(null);
    } else setHoveredIndex(index);
  };

  const handleSubItemClick = (event, subIndex) => {
    event.stopPropagation();
    if (subHoveredIndex == subIndex) setSubHoveredIndex(null);
    else setSubHoveredIndex(subIndex);
  };

  return (
    <nav className="w-full h-0 sticky inset-0 z-20 font-sans2 tracking-wider">
      <div
        className={`${
          navBar || openMobile
            ? "bg-white/70 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        } duration-500`}
      >
        <div className="px-5 max-w-7xl mx-auto top-0">
          <div
            className={`${navBar || openMobile ? "lg:h-24" : "lg:h-28"} relative flex h-28 align-middle justify-center transition-all`}
            id="navbar"
          >
            <div className="flex w-full items-center justify-between">
              <a
                href="/#top"
                title="Dementia Care"
                className="hover:brightness-110 flex lg:h-24 justify-center align-middle items-center duration-200 ease-in-out w-full lg:w-1/5"
              >
                <img
                  src={LOGO}
                  alt="Dementia Care logo"
                  aria-label="Dementia Care logo"
                  title="Dementia Care"
                  loading="eager"
                  className={`${navBar || openMobile ? "h-20 lg:h-20 mt-0" : "h-24 lg:h-24 mt-4"} object-contain duration-500`}
                />
              </a>
              <div className="hidden lg:flex justify-end lg:w-[50%]">
                <ul className="flex justify-end gap-16 align-middle w-full items-center text-black">
                  {navbarLinks.map((item, index) => (
                    <li
                      key={index}
                      className={`${isActive(item, pathname) ? "decoration-transparent underline font-bold" : "font-medium"} py-0 tracking-tight relative group last:no-underline last:px-0`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          target={`${item.link.includes("http") ? "_blank" : "_self"}`}
                          className="font-thin text-xl duration-300 hover:underline decoration-purple-800/80 decoration-4 underline-offset-[10px] py-12 whitespace-nowrap group-last:font-normal group-last:tracking-wide group-last:rounded-xl group-last:bg-purple-900 group-last:py-3 group-last:px-5 group-last:hover:bg-purple-950 group-last:hover:no-underline"
                        >
                          <span className="relative text-black group-last:text-white">
                            {item.name}
                          </span>
                        </a>
                      ) : (
                        <span className="cursor-default text-black text-lg duration-300 hover:underline decoration-purple-500 decoration-4 underline-offset-[10px] py-12 whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                      {item.submenu && item.submenu.length > 0 && (
                        <ul
                          className={`absolute top-12 bg-white/90 min-w-48 text-center border-gray-300 whitespace-nowrap text-gray-900 -left-4 duration-200 ease-out ${hoveredIndex === index ? "max-h-auto w-auto opacity-100" : "max-h-0 h-0 opacity-0 overflow-hidden"}`}
                        >
                          {item.submenu.map((subitem, subIndex) => (
                            <li
                              key={subIndex}
                              className={`${isActive(subitem, pathname) ? "bg-purple-900 text-white" : ""} relative font-normal hover:bg-purple-900/90 hover:text-white hover:scale-105 px-1 hover:font-semibold hover:shadow-sm drop-shadow-sm`}
                              onMouseEnter={() => setSubHoveredIndex(subIndex)}
                              onMouseLeave={() => setSubHoveredIndex(null)}
                            >
                              {subitem.link ? (
                                <a
                                  className="p-3 block"
                                  href={subitem.link}
                                  target={`${subitem.link.includes("http") ? "_blank" : "_self"}`}
                                >
                                  {subitem.name}
                                </a>
                              ) : (
                                <span className="cursor-default p-3 block">
                                  {subitem.name}
                                </span>
                              )}

                              {subitem.subsubmenu &&
                                subitem.subsubmenu.length > 0 && (
                                  <ul
                                    className={`absolute z-20 top-0 bg-primary-400 whitespace-nowrap left-full duration-500 ${subHoveredIndex === subIndex ? "max-h-auto w-auto opacity-100" : "max-h-0 w-0 opacity-0 overflow-hidden"}`}
                                  >
                                    {subitem.subsubmenu.map(
                                      (subsubitem, subsubIndex) => (
                                        <li
                                          key={subsubIndex}
                                          className={`${isActive(subsubitem, pathname) ? "bg-accent" : ""} relative hover:bg-secondary`}
                                        >
                                          <a
                                            href={subsubitem.link}
                                            target={`${subsubitem.link.includes("http") ? "_blank" : "_self"}`}
                                            className="block p-3"
                                          >
                                            {subsubitem.name}
                                          </a>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
              <button
                type="button"
                className="mobile-menu-button relative inline-flex items-center justify-center rounded-md p-2"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={handleHamburgerClick}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className={`${openMobile ? "hidden" : "block"} h-6 w-6 text-purple-900`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  aria-hidden="true"
                  id="x-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  ></path>
                </svg>

                <svg
                  className={`${openMobile ? "block" : "hidden"} h-6 w-6 text-purple-900`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.0"
                  stroke="currentColor"
                  aria-hidden="true"
                  id="hamburger-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          openMobile ? "max-h-screen" : "max-h-0"
        } overflow-x-hidden duration-500 ease-in-out h-screen lg:hidden absolute w-full bg-gradient-to-b from-black to-purple-900 z-20 top-0`}
        id="mobile-menu"
      >
        <div className="flex justify-end pl-5 pr-[26px] py-6">
          <svg
            className={`${openMobile ? "opacity-100" : "opacity-0"} h-6 w-6 text-purple-900 cursor-pointer z-30 text-purple-100-50 duration-300`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden="true"
            id="hamburger-icon"
            onClick={handleHamburgerClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        <a
          href="/"
          className="z-30 relative flex justify-center items-start align-top"
        >
          <img
            src={LOGO}
            alt="Dementia Care logo"
            aria-label="Dementia Care logo"
            title="Dementia Care"
            className="object-contain h-24 w-auto drop-shadow-lg"
          />
        </a>

        <div
          className={`absolute w-full h-48 top-0 z-20 duration-300 ease-in  ${
            openMobile ? "translate-y-0 bg-white" : "translate-y-20 bg-purple-900"
          }`}
        ></div>

        <ul className="px-4 pb-3 mt-5 pt-2 flex flex-col align-middle items-center text-purple-50">
          {mobileNavbarLinks.map((item, index) => (
            <li
              key={index}
              className="relative group border-b border-purple-50/20 last:border-none w-full text-center"
              onClick={() => handleItemClick(index)}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target={`${item.link.includes("http") ? "_blank" : "_self"}`}
                  className="font-medium p-5 block text-xl duration-300 text-white whitespace-nowrap group-last:bg-yellow-600 group-last:font-bold group-last:mt-12 group-last:py-4 group-last:px-8 group-last:rounded-none group-last:text-center group-last:mx-5"
                >
                  {item.name}
                </a>
              ) : (
                <div className="font-medium relative p-5 w-full justify-center flex cursor-pointer text-xl duration-300  border-red whitespace-nowrap">
                  <p>{item.name}</p>
                  <div
                    className={`absolute right-3 p-2 pointer-events-none duration-500 ease-in-out rounded-full ${hoveredIndex === index ? "bg-yellow-100/30 -rotate-90" : "bg-accent-100/20 rotate-90"} 
                    `}
                  >
                    <IoIosArrowForward
                      className={`${hoveredIndex === index ? "text-accent-100" : "text-accent-200"} size-5`}
                    />
                  </div>
                </div>
              )}
              {item.submenu && item.submenu.length > 0 && (
                <ul
                  className={`mx-auto bg-primary-50/10 whitespace-nowrap left-0 duration-500 overflow-hidden ${hoveredIndex === index ? "max-h-[50rem]" : "max-h-0"}`}
                >
                  {item.submenu.map((subitem, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative border-b border-primary-100/20 w-full"
                      onClick={(event) => handleSubItemClick(event, subIndex)}
                    >
                      {subitem.link ? (
                        <a
                          className="p-5 block font-normal"
                          href={subitem.link}
                          target={`${subitem.link.includes("http") ? "_blank" : "_self"}`}
                        >
                          {subitem.name}
                        </a>
                      ) : (
                        <div className="font-normal p-5 w-full justify-between flex cursor-pointer text-lg duration-300 border-accent whitespace-nowrap">
                          <p>{subitem.name}</p>
                          <div
                            className={`p-1 pointer-events-none duration-300 rounded-full ${subHoveredIndex === subIndex ? "bg-white rotate-90" : "bg-accent -rotate-90"} 
                    `}
                          >
                            <IoIosArrowForward
                              className={`${subHoveredIndex === subIndex ? "text-accent-500" : "text-accent-100"} size-5`}
                            />
                          </div>
                        </div>
                      )}

                      {subitem.subsubmenu && subitem.subsubmenu.length > 0 && (
                        <ul
                          className={`ml-8 bg-primary whitespace-nowrap left-full duration-500 overflow-hidden ${subHoveredIndex === subIndex ? "max-h-fit" : "max-h-0"}`}
                        >
                          {subitem.subsubmenu.map((subsubitem, subsubIndex) => (
                            <li key={subsubIndex} className="relative">
                              <a
                                href={subsubitem.link}
                                target={`${subsubitem.link.includes("http") ? "_blank" : "_self"}`}
                                className="block p-5 font-bold"
                              >
                                {subsubitem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="p-5 px-10 font-bold flex flex-col text-white justify-center align-middle items-center gap-5 overflow-hidden">
          <div className="flex gap-3 items-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="p-2 w-fit rounded-full bg-accent-600"
            >
              <FaPhone className="size-4 text-white" />
            </a>
            <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
          </div>

          {(LINKEDIN_URL ||
        INSTAGRAM_URL ||
        FACEBOOK_URL ||
        TWITTER_URL ||
        YOUTUBE_URL) && (
          <div class="flex items-center lg:ml-9 justify-center align-middle gap-x-3">
            {LINKEDIN_URL && (
              <a
                href={LINKEDIN_URL}
                target="_blank"
                aria-label="LinkedIn"
                title="LinkedIn"
                class="transition-colors duration-300 hover:text-blue-600 hover:scale-110"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" class="h-5">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            )}
            {INSTAGRAM_URL && (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                aria-label="Instagram"
                title="Instagram"
                class="transition-colors duration-300 hover:text-blue-600 hover:scale-110"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" class="h-6">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
            )}
            {FACEBOOK_URL && (
              <a
                href={FACEBOOK_URL}
                target="_blank"
                aria-label="Facebook"
                title="Facebook"
                class="transition-colors duration-300 hover:text-blue-600 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            )}
            {TWITTER_URL && (
              <a
                href={TWITTER_URL}
                target="_blank"
                aria-label="Twitter"
                title="X"
                class="transition-colors duration-300 hover:text-blue-600 hover:scale-110"
              >
                <svg
                  class="size-7 -m-1 p-0"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,6v12	c0,1.657-1.343,3-3,3H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12C19.657,3,21,4.343,21,6z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z" />
                </svg>
              </a>
            )}
            {YOUTUBE_URL && (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                aria-label="Youtube"
                title="Youtube"
                class="transition-colors duration-300 hover:text-blue-600 hover:scale-110"
              >
                <svg
                  class="size-7"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
                </svg>
              </a>
            )}
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
