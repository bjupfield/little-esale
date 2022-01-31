import { useEffect } from "react";
import { useState } from "react";
import BrowseSales from "./BrowseSales";
import Header from "./Header";

function Browse({c = false}){
    const [sales, setSales] = useState([]);
    useEffect(()=>{
        if(c === false){
        fetch(`https://little-esale.herokuapp.com/salesUser`, {
            method: "GET",
            credentials: "include"
        })
        .then(r=>r.json())
        .then(r=>{
            setSales(r)
        })
        }
        else{
        fetch(`https://little-esale.herokuapp.com/userSales`, {
            method: "GET",
            credentials: "include"
        })
        .then(r=>r.json())
        .then(r=>{
            setSales(r)
        })
        }
    }, [])
    return <div>
        { !c ? <Header/> : ""}
        {sales.map((c)=>(
            <BrowseSales sale={c}/>
        ))}
    </div>
}
export default Browse;