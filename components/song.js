
import utilStyles from "../styles/utils.module.css";
export default function Song({title, artist}){
    return(
        <div>
            <p>{title}</p>
            <small className={utilStyles.lightText}>
                {artist}
            </small> 
        
        </div>
    )
        
    


}