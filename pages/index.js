import Head from "next/head";
import classes from "../styles/Home.module.css";

import Banner from "../components/banner/banner.component";
import NavBar from "../components/nav-bar/nav-bar.component";
import SectionCards from "../components/section-cards/section-cards.component";

import { getVideos, getPopularVideos } from "../lib/videos";

export default function Home({
  musicVideos,
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
        videoId={"UDVtMYqUAyw"}
        title={"Interstellar Main Theme"}
        subTitle={
          "Interstellar Main Theme - Extra Extented - Soundtrack by Hans Zimmer"
        }
        imgUrl={`/static/interstellar.webp`}
      />
      <div className={classes.videos}>
        <SectionCards title="Travel" size="large" videos={travelVideos} />
        <SectionCards title="Music" size="small" videos={musicVideos} />
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

export const getStaticProps = async () => {
  const musicVideos = await getVideos("Music");
  const travelVideos = await getVideos("Travel");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      musicVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
    revalidate: 24 * 60 * 60,
  };
};
