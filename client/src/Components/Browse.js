import { useEffect } from "react";
import { useState } from "react";
import BrowseSales from "./BrowseSales";
import Header from "./Header";

function Browse(){
    const [sales, setSales] = useState([]);
    useEffect(()=>{
        fetch(`https://little-esale.herokuapp.com/salesUser`)
        .then(r=>r.json())
        .then(r=>{
            setSales(r)
        })
    }, [])
    return <div>
        <Header/>
        {sales.map((c)=>(
            <BrowseSales sale={c}/>
        ))}
    </div>
}
export default Browse;