import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

function DisplaySale(){
    const [seller, setSeller] = useState(0);
    const [sellerName, setSellerName] = useState("");
    const [item, setItem] = useState(0);
    const [itemImage, setItemImage] = useState("");
    const [itemName, setItemName] = useState("")
    const [bid, setBid] = useState(0);
    const [startingBid, setStartingBid] = useState(0);
    const [bidTime, setBidTime] = useState(0);
    const [isSeller, setIsSeller] = useState(false);
    const { id } = useParams();
    const [activate, setActivate] = useState(false);
    const [counterBid, setCounterBid] = useState("");
    const [highestBidder, setHighestBidder] = useState("");
    const [highestBid, setHighestBid] = useState(0);
    const [reload, setReload] = useState(false)
    useEffect(()=>{
        fetch(`https://little-esale.herokuapp.com/sale/${id}`)
        .then(r=>r.json())
        .then(r=>{
            console.log(r)
            setSeller(r.seller_id)
            setItem(r.item_id)
            setBid(parseFloat(r.bid))
            setStartingBid(r.starting_bid)
            setBidTime(r.bid_time)
            return r
        })
        .then(r=>{
            fetch(`https://little-esale.herokuapp.com/item/${r.item_id}`)
            .then(r=>r.json())
            .then(r=>{
                setItemImage(r.httpimage)
                setItemName(r.name)
            })
            fetch(`https://little-esale.herokuapp.com/user/${r.seller_id}`)
            .then(r=>r.json())
            .then(r=>{
                setSellerName(r.username)
            })
            fetch(`https://little-esale.herokuapp.com/saleshighestBid/${id}`)
            .then(r=>r.json())
            .then(r=>{
                if(r.greater){
                    setHighestBid(r.highest_bid.buy_price)
                    setHighestBidder(r.highest_bid.user.username)
                }
                else{
                    setHighestBid(0)
                }
            })
            return r
        })
        .then((r)=>{
            // below code will rely on series or whatever it is
            fetch(`https://little-esale.herokuapp.com/sellermatchuser/${r.seller_id}`,{
                method:"GET",
                credentials:"include"
            })
            .then(r=>r.json())
            .then(r=>{
                if(r.yesis){
                    setIsSeller(true);
                }
                else{
                    setIsSeller(false);
                }
            })
        })
    }, [id, reload])
    function buttonClick(){
        setActivate(!activate);
    }
    function submitAttempt(){
        fetch(`https://little-esale.herokuapp.com/bidtime/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                "item_id" : item,
                "bidet": parseFloat(counterBid) + parseFloat(bid >= startingBid? bid: startingBid),
                "sessions": 2
            })
        })
        .then(r=>r.json())
        .then(r=>{
            console.log(r)
            setReload(!reload)
        })
    }
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
    const parsingStart = sale.bid_time.toString()
    const parsedDate = `${parsingStart.slice(6,8)}/${parsingStart.slice(4, 6)}/${parsingStart.slice(0,4)}  ${parsingStart.slice(8,10)}:${parsingStart.slice(11,13)}`;
    return <div>
        <Header/>
        <div>{isSeller ? "Your Sale" : sellerName}</div>
        <div>{currTime >= sale.bid_time?  (!bidLength ? "Bidding For this Item has Ended" : bidLength)  : "Bidding Begins At: " +parsedDate}</div>
        <img src={itemImage} alt={itemName}/>
        <div>{bid >= startingBid ? `Bidding By ${highestBidder} for : ${bid}`: `Starting Price at: ${startingBid}`}</div>
        {isSeller ? "" : 
        <div>
            {activate && bidLength ? 
            <div>
                <div style={{float: "right", width: "2px"}}><button onClick={()=>buttonClick()}>NoBid</button></div>
                <ul style={{listStyleType: "none"}}>
                    <li onClick={()=>setCounterBid(parseFloat((bid >= startingBid ? bid : startingBid) * .01))}>1%</li>
                    <li onClick={()=>setCounterBid(parseFloat((bid >= startingBid ? bid : startingBid) * .05))}>5%</li>
                    <li onClick={()=>setCounterBid(parseFloat((bid >= startingBid ? bid : startingBid) * .2))}>20%</li>
                </ul> 
                <textarea placeholder="$$$" value={counterBid} onChange={(e)=>setCounterBid(e.target.value)}></textarea>
                <div><button onClick={()=>submitAttempt()}>SubmitBid</button></div>
            </div>
            :
            <div><button onClick={()=>buttonClick()}>Bid</button></div>}
        </div>}
    </div>
}
export default DisplaySale;