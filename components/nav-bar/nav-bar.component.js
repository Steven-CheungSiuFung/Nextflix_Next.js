import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import classes from "./nav-bar.module.css";

const NavBar = ({ userName }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onLogoutHandler = () => {
    router.push("/login");
  };
  return (
    <div className={classes.container}>
      <Link href="/">
        <div className={classes.logo}>Nextflix</div>
      </Link>
      <div className={classes.listWrapper}>
        <ul className={classes.list}>
          <Link href="/">
            <li className={classes.item}>Home</li>
          </Link>
          <Link href="/my-list">
            <li className={classes.item}>My List</li>
          </Link>
        </ul>
      </div>
      <div className={classes.setting}>
        <div className={classes.account} onClick={toggleDropdown}>
          <p>{userName}</p>
          {isDropdown ? (
            <Image
              src="/static/expand-less.svg"
              alt="expand-less-icon"
              width="16px"
              height="16px"
            />
          ) : (
            <Image
              src="/static/expand.svg"
              alt="expand-icon"
              width="16px"
              height="16px"
            />
          )}
        </div>
        {isDropdown && (
          <div className={classes.dropdown}>
            <p onClick={onLogoutHandler}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
