import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import cls from "classnames";

import { getMagicClient } from "../../lib/magic-client";

import classes from "./index.module.css";

const defaultFormFileds = {
  email: "",
};

const LoginPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFileds);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const magic = await getMagicClient();
      const didToken = await magic.auth.loginWithMagicLink({
        email: formFields.email,
      });

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const loginResponse = await response.json();

      if (loginResponse.ok) {
        router.push("/");
      } else {
        console.log("login process not complete");
      }
    } catch (error) {
      console.log("Error logging in", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>Nextflix Signin</title>
      </Head>
      <Link href="/">
        <div className={classes.logo}>Nextflix</div>
      </Link>
      <div className={classes.bg}></div>
      <div className={classes.formWrapper}>
        <form className={classes.loginForm} onSubmit={onSubmitHandler}>
          <h1 className={classes.formTitle}>Sign In</h1>
          <div className={classes.controls}>
            <input
              type="email"
              name="email"
              value={formFields.email}
              onChange={onChangeHandler}
            />
            <label
              className={cls(
                classes.controlsLabel,
                formFields.email && classes.shrinkLable
              )}
              htmlFor="email"
            >
              Email
            </label>
          </div>
          {isLoading ? (
            <div className={classes.loading}>Loading...</div>
          ) : (
            <button className={classes.btn}>Sign In</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
