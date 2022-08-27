import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { getMagicClient } from "../../lib/magic-client";

import classes from "./nav-bar.module.css";

const NavBar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onLogoutHandler = async () => {
    try {
      const magic = await getMagicClient();
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  const getUserState = async () => {
    try {
      const magic = await getMagicClient();
      const { email } = await magic.user.getMetadata();
      if (email && email !== userEmail) {
        setUserEmail(email);
      }
    } catch (error) {
      console.log("get user data error", error);
    }
  };

  useEffect(() => {
    getUserState();
  }, []);

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
          <Link href="/history">
            <li className={classes.item}>History</li>
          </Link>
        </ul>
      </div>
      <div className={classes.setting}>
        <div className={classes.accountWrapper} onClick={toggleDropdown}>
          <p className={classes.account}> {userEmail}</p>
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
            <p className={classes.dropdownText} onClick={onLogoutHandler}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
