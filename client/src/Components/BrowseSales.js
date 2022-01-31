import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrowseSales({ sale }){
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [itemName, setItemName] = useState("");
    useEffect(()=>{
        fetch(`https://little-esale.herokuapp.com/userbysale/${sale.seller_id}`)
        .then(r=>r.json())
        .then(r=>{
            setName(r.username)
        })
        fetch(`https://little-esale.herokuapp.com/item/${sale.item_id}`)
        .then(r=>r.json())
        .then(r=>{
            setUrl(r.httpimage);
            setItemName(r.name);
        })
    }, [])
    const de = new Date()
    const currTime = parseFloat(de.getFullYear().toString() + (de.getMonth().toString()[1] ? de.getMonth().toString() : `0${de.getMonth().toString()}`) + (de.getDate().toString()[1] ? de.getDate().toString() : `0${de.getDate().toString()}`) + (de.getHours().toString()[1] ? de.getHours().toString() : `0${de.getHours().toString()}`) + "." + (de.getMinutes().toString()[1] ? de.getMinutes().toString() : `0${de.getMilliseconds().toString()}`))
    let bidLength = (sale.bid_time <= currTime && sale.bid_time + sale.bid_length <= currTime) ? sale.bid_length + sale.bid_time - currTime : false;
    if(bidLength){
        const theId = setInterval(() => {
            --bidLength
            if(!bidLength){
                clearInterval(theId);
            }
        }, 1000);
    }
    console.log(document.cookie)
    const parsingStart = sale.bid_time.toString()
    const parsedDate = `${parsingStart.slice(6,8)}/${parsingStart.slice(4, 6)}/${parsingStart.slice(0,4)}  ${parsingStart.slice(8,10)}:${parsingStart.slice(11,13)}`;
    return <div style={{width: "90%", height: "100px", backgroundColor: "red", marginTop: "15px", marginLeft:"5%"}}>
        <div
            style={{float: "left", margin: "1%", width: "10%", height:"20%", textAlign:"center", fontWeight: '900', overflow: "hidden",textOverflow: "ellipsis", marginBottom:"1%"}}
            >{name}
        </div>
        <img style={{float: "left",height: "100%", width: "40%", marginRight: "2%", backgroundColor: "slategrey"}}
            layout="fill"
            src={url}
            alt={itemName}
        />
        <div style={{float: "left",width:"20%", height:"40%", textAlign:"left", overflow: "hidden", textOverflow: "ellipsis"}}>
            {itemName}
        </div>
        <div style={{float:"right", marginRight: "2%", marginTop: ".05%", width: "12%", height: "40%", overflow:"auto"}}>
            {currTime >= sale.bid_time?  (!bidLength ? "Bidding For this Item has Ended" : sale.bid_length)  : "Bidding Begins At: " +parsedDate}
        </div>
        <div style={{float:"left",width: "20%", overflow: "hidden", textOverflow: "ellipsis"}}>
            {`Current BidPrice: ${sale.bid > sale.starting_bid ? sale.bid :sale.starting_bid}`}
        </div>
        <Link to={`/sale/${sale.id}`}>
            <div style={{float: "right", width: "20%", height: "59.95%", backgroundColor:"purple", overflow:"hidden"}}>
                Inspect
            </div>
        </Link>
    </div>
}
export default BrowseSales;