import Modal from "react-modal";
import { useRouter } from "next/router";

import classes from "./video.module.css";
import NavBar from "../../components/nav-bar/nav-bar.component";

import { getVideoDetials } from "../../lib/videos";
import DislikeIcon from "../../components/dislike-icon/dislike-icon.component";
import { useEffect, useState } from "react";
import LikeIcon from "../../components/like-icon/like-icon.component";

const VideoPage = ({ videoData }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const router = useRouter();

  const { id, title, description, channelTitle, publishedAt, viewCount } =
    videoData;

  const descriptionArray = description.split("\n");

  const onClickLike = async () => {
    setLike(!like);
    if (like === false && like !== dislike) {
      setDislike(false);
    }
    const response = await fetch("/api/stats/update", {
      method: "POST",
      body: JSON.stringify({
        videoId: id,
        favourited: !like ? 1 : null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onClickDislike = async () => {
    setDislike(!dislike);
    if (dislike === false && dislike !== like) {
      setLike(false);
    }
    const response = await fetch("/api/stats/update", {
      method: "POST",
      body: JSON.stringify({
        videoId: id,
        favourited: !dislike ? 0 : null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  Modal.setAppElement("#__next");

  const getStatsData = async () => {
    const response = await fetch(`/api/stats/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const { favourited } = data;
      if (favourited !== null && favourited === 1) {
        setLike(true);
      } else if (favourited !== null && favourited === 0) {
        setDislike(true);
      }
    }
  };

  useEffect(() => {
    getStatsData();
  }, []);

  return (
    <div className={classes.container}>
      <NavBar />
      <Modal
        isOpen={true}
        onRequestClose={() => router.back()}
        className={classes.modal}
        overlayClassName={classes.overlay}
        contentLabel="Watch Video"
      >
        <iframe
          className={classes.player}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          allowFullScreen={true}
          src={`https://www.youtube.com/embed/${id}?autoplay=0&fs=1&rel=0&modestbranding=1&origin=http://localhost:3000`}
          frameBorder="0"
        ></iframe>

        <div className={classes.modalBody}>
          <div className={classes.col1}>
            <p className={classes.publishedAt}>{publishedAt}</p>
            <p className={classes.title}>{title}</p>
            <div className={classes.description}>
              {descriptionArray.map((descriptionString, index) => (
                <p key={index}>{descriptionString}</p>
              ))}
            </div>
          </div>
          <div className={classes.col2}>
            <div className={classes.likeWrapper}>
              <LikeIcon onClickLike={onClickLike} selected={like} />
              <DislikeIcon onClickDislike={onClickDislike} selected={dislike} />
            </div>
            <p className={classes.infoTextWrapper}>
              <span className={classes.infoText}>Cast: </span>
              <span className={classes.channelTitle}>{channelTitle}</span>
            </p>
            <p className={classes.infoTextWrapper}>
              <span className={classes.infoText}>View Count: </span>
              <span className={classes.viewCount}>{viewCount}</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPage;

export const getStaticProps = async (context) => {
  const { videoId } = context.params;

  const videoData = await getVideoDetials(videoId);

  return {
    props: {
      videoData,
    },
  };
};

export async function getStaticPaths() {
  const videosId = ["UDVtMYqUAyw"];

  const paths = videosId.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}
