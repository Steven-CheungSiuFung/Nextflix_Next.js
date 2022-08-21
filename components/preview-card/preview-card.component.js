import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

import classes from "./preview-card.module.css";

const PreviewCard = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80",
  size = "medium",
  videoId,
  id,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const router = useRouter();

  const classMap = {
    large: classes.large,
    medium: classes.medium,
    small: classes.small,
  };

  const scaleType = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const onErrorHandler = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80"
    );
  };

  const onCardClickHandler = () => {
    router.push(`/video/${videoId}`);
  };

  return (
    <div className={classes.container} onClick={onCardClickHandler}>
      <motion.div
        className={cls(classes.motionWrapper, classMap[size])}
        whileHover={{ ...scaleType }}
      >
        <Image
          className={classes.image}
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={onErrorHandler}
        />
      </motion.div>
    </div>
  );
};

export default PreviewCard;
