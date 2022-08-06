import Image from "next/image";
import { render } from "react-dom";

export default function Track({ trackName, artist, image }) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <Image priority src={image} height={144} width={144} />
      </div>
      <div>
        <h4 >{trackName}</h4>
        <h5 className="text-slate-500" >{artist}</h5>
      </div>
    </div>
  );
}
