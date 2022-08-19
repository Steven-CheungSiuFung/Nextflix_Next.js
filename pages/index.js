import Head from "next/head";
import classes from "../styles/Home.module.css";

import Banner from "../components/banner/banner.component";
import NavBar from "../components/nav-bar/nav-bar.component";
import SectionCards from "../components/section-cards/section-cards.component";

import { getVideos, getPopularVideos } from "../lib/videos";

export default function Home({
  natureVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <div className={classes.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <Banner
        title={"Interstellar Official Soundtrack"}
        subTitle={"The Complete Expanded Edition Soundtrack"}
        imgUrl={`/static/interstellar.webp`}
      />
      <div className={classes.videos}>
        <SectionCards title="Nature" size="large" videos={natureVideos} />
        <SectionCards title="Travel" size="small" videos={travelVideos} />
        <SectionCards
          title="Productivity"
          size="medium"
          videos={productivityVideos}
        />
        <SectionCards title="Popular" size="small" videos={popularVideos} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const natureVideos = await getVideos("Nature");
  const travelVideos = await getVideos("Travel");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      natureVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
};
