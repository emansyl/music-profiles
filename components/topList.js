import Track from "./track";
import Artist from "./artist";
import utilStyles from "../styles/utils.module.css";

export default function TopList({ listType, trackData, artistData }) {
  if (listType === "track") {
    return (
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Top Tracks</h2>
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
