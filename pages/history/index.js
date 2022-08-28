import { verifyToken } from "../../lib/auth";
import { getVideoIdByUserId } from "../../lib/db/hasura";

import NavBar from "../../components/nav-bar/nav-bar.component";
import SectionCards from "../../components/section-cards/section-cards.component";

import classes from "./index.module.css";

const HistoryPage = ({ historyVideos = [] }) => {
  return (
    <div className={classes.container}>
      <NavBar />

      <div className={classes.videos}>
        <SectionCards title="Watch Again" size="large" videos={historyVideos} />
      </div>
    </div>
  );
};

export default HistoryPage;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  const issuer = token ? await verifyToken(token) : null;

  if (!issuer) {
    return {
      props: {},
    };
  }

  const response = await getVideoIdByUserId(token, issuer);
  const videoIdArray = response.data.stats;
  const historyVideos = videoIdArray.map((item) => ({
    id: item.videoId,
    imgUrl: `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`,
  }));

  return {
    props: {
      historyVideos,
    },
  };
};
