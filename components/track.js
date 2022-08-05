import Image from "next/image";
import { render } from "react-dom";

export default function Track({trackName, artist,image}) {
    
    return(<div>
         <h4>{trackName}</h4>
        <Image
              priority
              src={image}
              height={144}
              width={144}
            />
       
        <h5>{artist}</h5>
    </div>)
  
    





}