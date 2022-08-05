import Head from "next/head";
import Image from 'next/image'
import Layout, { siteTitle } from "../components/layout";
import Track from "../components/track";
import Artist from "../components/artist";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getUsersTop } from "../lib/spotify";

import {useEffect, useState} from 'react';
import {getSession, useSession, signIn, signOut} from 'next-auth/react';




export default function Home({ context }) {

  const {data: session} = useSession();
  const [trackList, setTrackList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);
  const [isLoading, setLoading] = useState(false)

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlist');
    const {items} = await res.json();
    console.log(items);
    setPlaylistList(items);
  };



  const getMyTop = async (type) => {
    const res = await fetch(`api/top/10/0/long_term/${type}`);
    const {items} = await res.json();
    // const responses = await Promise.all(items.map( async (item) =>{
    //   return await fetch(`/api/track/${item.id}`);
    // }));

    // items = await Promise.all(
    //   responses.map(async(res) => {
    //     return await res.json()
    //   })
    // )
    console.log(items)
    if(type === 'tracks'){
      setTrackList(items);
    } else {
      setArtistList(items);
    }
    
  }

  useEffect(() =>{
    getMyTop('tracks');
    getMyTop('artists')
  },[])

  if(session){

    
    console.log(session);
    console.log(session.token?.name)
    console.log(session.token?.picture)
    const name = session.token?.name;
    const profileImage = session.token?.picture;
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Image
              priority
              src={profileImage}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}'s Music Profile</h1>
        <section className={utilStyles.headingMd}>
          
          <p>"Hi, I'm {name}. Checkout my music taste</p>
        </section>
        {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Top Playlists</h2>
          <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
          <ol className={utilStyles.list}>
            {playlistList.slice(0,5).map((item) => (
              <li className={utilStyles.listItem} key={item.id}>
                
                <h1>{item.name}</h1>
                <img src={item.images[0]?.url} width="100" />
  
              </li>
            ))}
          </ol>
        </section> */}
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Top Tracks</h2>
          {/* <button onClick={() => getMyTop('tracks')}>Get My Top Tracks</button> */}
          <ol className={utilStyles.list}>
            {trackList.slice(0,5).map((item) => (
              
              <li className={utilStyles.listItem} key={item.id}>
                
                <Track trackName={item.name} artist={item.artists[0].name} image={item.album.images[0].url}/>
               
  
              </li>
            ))}
          </ol>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Top Artists</h2>
          {/* <button onClick={() => getMyTop('artists')}>Get My Top Artists</button> */}
          <ol className={utilStyles.list}>
            {artistList.slice(0,5).map((item) => (
              
              <li className={utilStyles.listItem} key={item.id}>
                
                <Artist artist={item.name} image={item.images[0].url}/>
               
  
              </li>
            ))}
          </ol>
        </section>
      </Layout>
    );

  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  
}
