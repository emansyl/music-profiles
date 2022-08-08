import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import User from "../components/user";
import TopList from "../components/topList";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ context }) {
  const { data: session } = useSession();
  const [trackList, setTrackList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);
  const [activeList, setActiveList] = useState("track");

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlist");
    const { items } = await res.json();
    setPlaylistList(items);
  };

  const getMyTop = async (type) => {
    const res = await fetch(`api/top/10/0/long_term/${type}`);
    const { items } = await res.json();
    // const responses = await Promise.all(items.map( async (item) =>{
    //   return await fetch(`/api/track/${item.id}`);
    // }));

    // items = await Promise.all(
    //   responses.map(async(res) => {
    //     return await res.json()
    //   })
    // )
    if (type === "tracks") {
      setTrackList(items);
    } else {
      setArtistList(items);
    }
  };

  const switchLists = (list) => {
    if (list !== activeList) {
      setActiveList(list);
    }

    if (list === "track") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getMyTop("tracks");
    getMyTop("artists");
  }, []);

  if (session) {
    const name = session.token?.name;
    const profileImage = session.token?.picture;
    const activeButton =
      "text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";
    const inActiveButton =
      "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";

    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <User name={name} profileImage={profileImage} />
        <ul className="flex">
          <li onClick={() => switchLists("track")} className="flex-1 mr-2">
            <a
              className={activeList === "track" ? activeButton : inActiveButton}
              href="#"
            >
              Top Tracks
            </a>
          </li>
          <li onClick={() => switchLists("artist")} className="flex-1 mr-2">
            <a
              className={
                activeList === "artist" ? activeButton : inActiveButton
              }
              href="#"
            >
              Top Artists
            </a>
          </li>
        </ul>
        <TopList
          listType={activeList}
          trackData={trackList}
          artistData={artistList}
        />
      </Layout>
    );
  }
  return (
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Spotify Music Profiles</div>
          <p class="text-gray-700 text-base">
            Sign In to Spotify to see your top tracks and artist. This is work
            in progress btw. - Eman
          </p>
        </div>
      </div>
      <button
        onClick={() => signIn()}
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    </>
  );
}
