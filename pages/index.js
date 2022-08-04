import Head from "next/head";
import Image from 'next/image'
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Song from "../components/song";
import { getUserData } from "../lib/getUser";
import {useState} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import { list } from "mdast-util-to-hast/lib/handlers/list";




// export default function Home() {
//   const {data: session} = useSession();
//   const [list, setList] = useState([]);

//   const getMyPlaylists = async () => {
//     const res = await fetch('/api/playlist');
//     const {items} = await res.json();
//     console.log(items);
//     setList(items);
//   };

//   if (session) {
//     return (
//       <>
//         Signed in as {session?.token?.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//         <hr />
//         <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
//         {list.map((item) => (
//           <div key={item.id}>
//             <h1>{item.name}</h1>
//             <img src={item.images[0]?.url} width="100" />
//           </div>
//         ))}
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   );
// }

export default function Home() {

  const {data: session} = useSession();
  const [trackList, setTrackList] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlist');
    const {items} = await res.json();
    console.log(items);
    setPlaylistList(items);
  };

  const getMyTopTracks = async () => {
    const res = await fetch('/api/toptracks');
    const {items} = await res.json();
    console.log(items);
    setTrackList(items);
  }



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
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Top Tracks</h2>
          <button onClick={() => getMyTopTracks()}>Get My Top Tracks</button>
          <ol className={utilStyles.list}>
            {trackList.slice(0,5).map((item) => (
              <li className={utilStyles.listItem} key={item.id}>
                <h1>{item.name}</h1>
                {/* <img src={item.images[0]?.url} width="100" /> */}
  
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
