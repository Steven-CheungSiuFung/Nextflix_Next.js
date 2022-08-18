import { useRef } from "react";
import PreviewCard from "../preview-card/preview-card.component";
import classes from "./section-cards.module.css";

const SectionCards = ({ title, size, videos = [] }) => {
  const cardsWrapperRef = useRef();

  const scrollLeft = () => {
    cardsWrapperRef.current.scrollLeft += -1000;
  };

  const scrollRight = () => {
    cardsWrapperRef.current.scrollLeft += 1000;
  };
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.leftArrow} onClick={scrollLeft}>
        <h1>{`<`}</h1>
      </div>
      <div className={classes.rightArrow} onClick={scrollRight}>
        <h1>{`>`}</h1>
      </div>

      <div className={classes.cardsWrapper} ref={cardsWrapperRef}>
        {videos.map((movie, index) => (
          <PreviewCard
            key={index}
            id={index}
            imgUrl={movie.imgUrl}
            size={size}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
