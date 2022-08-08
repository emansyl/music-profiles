import Image from "next/image";
import { render } from "react-dom";

export default function User({ name, profileImage }) {
  return (
    <div>
      <div class="p-3 bg-white rounded-xl max-w-lg hover:shadow">
        <div class="flex justify-between w-full">
          <div>
            <Image
              priority
              src={profileImage || "/images/music-placeholder.png"}
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
            />
          </div>
          <div class="ml-2">
            <div class="p-3">
              <h3 class="text-2xl">{name}</h3>
              <span></span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
              <div class="mr-3">
                <span class="text-gray-400 block">Following</span>
                <span class="font-bold text-black text-xl">34</span>
              </div>
              <div class="mr-3">
                <span class="text-gray-400 block">Followers</span>
                <span class="font-bold text-black text-xl">940</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex">
      <div>
        <Image
          priority
          src={profileImage || "/images/music-placeholder.png"}
          className="rounded-full"
          height={144}
          width={144}
          alt={name}
        />
      </div>
      <p>{name}</p>
    </div> */
}
