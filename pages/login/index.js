import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import cls from "classnames";

import classes from "./index.module.css";

const defaultFormFileds = {
  email: "",
};

const LoginPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFileds);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formFields);
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
          <button className={classes.btn}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
