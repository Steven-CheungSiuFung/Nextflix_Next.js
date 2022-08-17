import Image from "next/image";
import classes from "./banner.module.css";

const Banner = ({ title, subTitle, imgUrl }) => {
  const handleOnClick = () => {
    console.log("handle on click");
  };
  return (
    <div className={classes.container}>
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className={classes.leftWrapper}>
        <div className={classes.nSeries}>
          <p className={classes.n}>N</p>
          <p className={classes.series}>S E R I E S</p>
        </div>
        <h3 className={classes.title}>{title}</h3>
        <h3 className={classes.subTitle}>{subTitle}</h3>
        <button className={classes.btn} onClick={handleOnClick}>
          <Image
            src="/static/play.svg"
            alt="play-icon"
            width="32px"
            height="32px"
          />
          <span className={classes.btnText}>Play</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
