import classes from "./loading.module.css";

const Loading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
