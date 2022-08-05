import Image from "next/image";
import { render } from "react-dom";

export default function Artist({artist,image}) {
    
    return(<div>
        <h4>{artist}</h4>
        <Image
              priority
              src={image}
              height={144}
              width={144}
            />
        
        
    </div>)
  
    





}