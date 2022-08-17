import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner.component";
import NavBar from "../components/nav-bar/nav-bar.component";
import PreviewCard from "../components/preview-card/preview-card.component";
import SectionCards from "../components/section-cards/section-cards.component";

export default function Home() {
  const sciFiVideos = [
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
    {
      imgUrl: "/static/interstellar.webp",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar userName={"Steven@gmail.com"} />

      <Banner
        title={"Interstellar Official Soundtrack"}
        subTitle={"The Complete Expanded Edition Soundtrack"}
        imgUrl={`/static/interstellar.webp`}
      />

      <SectionCards title="Sci-Fi" videos={sciFiVideos} />

      <PreviewCard imgUrl="/static/interstellar.webp" size="medium" />
      <PreviewCard imgUrl="/static/interstellar.webp" size="small" />
    </div>
  );
}
