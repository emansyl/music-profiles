import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Song from "../components/song";
import { getUserData } from "../lib/getUser";

import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allUserData= getUserData()
  console.log(allUserData)

  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      allUserData
    },
  };
}

export default function Home({ allPostsData, allUserData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>"Hi, I'm Emmanuel. Checkout my music taste</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top Songs</h2>
        <ol className={utilStyles.list}>
          {allUserData.songs.slice(0,5).map(({title,artist }) => (
            <li className={utilStyles.listItem} key={title}>
              <Song title = {title} artist = {artist} />

            </li>
          ))}
        </ol>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Favourite Playlists</h2>
        <ol className={utilStyles.list}>
          {allUserData.playlists.slice(0,5).map(({name,createdBy }) => (
            <li className={utilStyles.listItem} key={name}>
              <Song title = {name} artist = {createdBy} />

            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
