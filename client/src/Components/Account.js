import { Link } from "react-router-dom";
import Browse from "./Browse";
import Header from "./Header";

function Account(){
    return<div>
        <Header/>
        <div style={{width:"100%", height:"70px", backgroundColor: "cyan"}}>
            <Link to="/sale"><div style={{backgroundColor:"grey", width:"30%", height:"40px", margin:"15px"}}>Create Sale</div></Link>
        </div>
        <Browse c={true}></Browse>
    </div>
}
export default Account;