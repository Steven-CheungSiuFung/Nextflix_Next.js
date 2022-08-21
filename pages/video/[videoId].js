import Modal from "react-modal";
import { useRouter } from "next/router";

import classes from "./video.module.css";
import { getVideoDetials } from "../../lib/videos";

const VideoPage = ({ videoData }) => {
  const router = useRouter();

  const { id, title, description, channelTitle, publishedAt, viewCount } =
    videoData;

  const descriptionArray = description.split("\n");

  Modal.setAppElement("#__next");
  return (
    <div className={classes.container}>
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
