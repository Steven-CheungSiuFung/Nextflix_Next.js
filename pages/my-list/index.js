import { veriftToken } from "../../lib/auth";
import { getFavouritedVideoId } from "../../lib/db/hasura";

import NavBar from "../../components/nav-bar/nav-bar.component";
import SectionCards from "../../components/section-cards/section-cards.component";

import classes from "./index.module.css";

const MyListPage = ({ favouritedVideos }) => {
  return (
    <div className={classes.container}>
      <NavBar />

      <div className={classes.videos}>
        <SectionCards
          title="Favourited"
          size="large"
          videos={favouritedVideos}
        />
      </div>
    </div>
  );
};

export default MyListPage;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  const issuer = token ? veriftToken(token) : null;

  if (!issuer) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await getFavouritedVideoId(token, issuer);
  const videoIdArray = response.data.stats;
  const favouritedVideos = videoIdArray.map((item) => ({
    id: item.videoId,
    imgUrl: `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`,
  }));

  return {
    props: {
      favouritedVideos,
    },
  };
};
