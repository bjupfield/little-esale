import { useParams, Link, Navigate } from "react-router-dom"
import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
function CreateSale(){
    const [toCreateOrNotTo, setToCreateOrNotTo] = useState(true); 
    const [date, setDate] = useState("");
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [itemId, setItemId] = useState(0);
    const [startingBid , setStartingBid] = useState(0);
    const [linker, setLinker] = useState("/sale");
    function change(){
        setToCreateOrNotTo(!toCreateOrNotTo);
    }
    function notLessThanZero(value, func, type){
        if(parseFloat(value) >= 0){
            func(value)
        }
        else{
        }
        if(seconds >= 60){
            setHours(parseFloat(hours) + 1)
            setSeconds(0)
        }
        if(hours >= 24){
            setDays(parseFloat(days) + 1)
            setHours(0)
        }
        if(days >= 31){
            if(type === days){
                if(value < 31){
               }
                else{
                    setDays(31)
                }
            }
            else{
            setDays(31)
        }
        }
    }
    function handlePost(e){
        e.preventDefault();
        if(toCreateOrNotTo){
            const b = [date.split("-")[0], date.split("-")[1], date.split("-")[2].split("T")[0], date.split("-")[2].split("T")[1].replace(":", ".")]
            const c = b.reduce((a, d)=>{
            return a + d
            })
            fetch("https://little-esale.herokuapp.com/item",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    httpimage: image,
                    name: name
                })
            })
            .then((r)=>r.json())
            .then((r)=>{
                fetch("https://little-esale.herokuapp.com/sale",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    seller_id: 1, 
                    item_id: r.id,
                    bid: 0,
                    starting_bid: startingBid,
                    bid_time: c,
                    bid_length: parseFloat(days + (hours[1] ? hours : `0${hours}`) + "." + seconds),
                })
                })
                .then(r=>r.json())
                .then(r=>{
                    console.log("hello" + r)
                    setLinker(`/sale/${r.id}`)})
                .catch(error=>console.error('Error:', error))
                return r
            })
            .then(r=>{
                console.log(r)
            })
            .catch(error=>console.error('Error:', error))
        }
        else{

        }
    }
    if(date != ""){
        const b = [date.split("-")[0], date.split("-")[1], date.split("-")[2].split("T")[0], date.split("-")[2].split("T")[1].replace(":", ".")]
        const c = b.reduce((a, d)=>{
            console.log(a)
            return a + d
        })
        console.log(c)
    }
    return linker === "/sale"? 
    <div>
        <Header/>
        <div onClick={()=>change()}>
            {toCreateOrNotTo ? "Choose Item" : "Create Item"}
        </div >
        <form>
            {toCreateOrNotTo? <div>
                <textarea placeholder="Input Http Image Link" value={image} onChange={(e)=>setImage(e.target.value)}></textarea>
                <textarea placeholder="EnterName" value={name} onChange={(e)=>setName(e.target.value)}></textarea>
            </div>: <textarea value={itemId} onChange={(e)=>setItemId(e.target.value)} placeholder="Choose Item Id"></textarea>}
            {/* <textarea onChange={(e)=>e.target.value}>
            </textarea> */}
            <input type={"datetime-local"} value={date} onChange={(e)=>setDate(e.target.value)}></input>
            <input type={"number"} value={days} onChange={(e)=>notLessThanZero(e.target.value, setDays, days)}></input>
            <input type={"number"} value={hours} onChange={(e)=>notLessThanZero(e.target.value, setHours, hours)}></input>
            <input type={"number"} value={seconds} onChange={(e)=>notLessThanZero(e.target.value, setSeconds, seconds)}></input>
            <textarea value={startingBid} onChange={(e)=>setStartingBid(e.target.value)} placeholder="Type Starting Bid Amount"></textarea>
            <button onClick={(e)=>handlePost(e)}></button>
        </form>
    </div>
    :
    <Navigate to={linker}></Navigate>
}
export default CreateSale;