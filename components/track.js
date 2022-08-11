import Image from "next/image";
import { render } from "react-dom";

export default function Track({ trackName, artist, image }) {
  return (
    <div className="p-2 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0 ">
        <Image priority src={image} height={50} width={50} />
      </div>
      <div>
        <h4 className="text-sm">{trackName}</h4>
        <h5 className="text-slate-500 text-xs">{artist}</h5>
      </div>
    </div>
  );
}
