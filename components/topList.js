import Track from "./track";
import Artist from "./artist";
import { render } from "react-dom";
import utilStyles from "../styles/utils.module.css";

export default function TopList({ listType, trackData, artistData }) {
    console.log("mangooooo")
    console.log(listType,trackData,artistData);
    
  if (listType === "track") {
    console.log("bananaaa")
    return (
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top Tracks</h2>
        {/* <button onClick={() => getMyTop('tracks')}>Get My Top Tracks</button> */}
        <ol className={utilStyles.list}>
          {trackData.slice(0, 5).map((item) => (
            <li className={utilStyles.listItem} key={item.id}>
              <Track
                trackName={item.name}
                artist={item.artists[0].name}
                image={item.album.images[0].url}
              />
            </li>
          ))}
        </ol>
      </section>
    );
  } else {
    return (
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top Artists</h2>
        {/* <button onClick={() => getMyTop('artists')}>Get My Top Artists</button> */}
        <ol className={utilStyles.list}>
          {artistData.slice(0, 5).map((item) => (
            <li className={utilStyles.listItem} key={item.id}>
              <Artist artist={item.name} image={item.images[0].url} />
            </li>
          ))}
        </ol>
      </section>
    );
  }
}
