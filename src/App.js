import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import SellerImage from "./Components/SellerImage";
import Invoice from "./Components/Invoice";
import {getSellers} from "./Fetching";
import {ChallengeContext} from "./Context";

function App() {
    const [sellers, setSellers]=useState([]);
    const [keyword, setKeyword]=useState("");
    const values=useContext(ChallengeContext);
    const [winner]=values.winner;
    const [total]=values.total;
    const [,setSearchWord]=values.searchWord;

    useEffect(()=>{
        getSellers(setSellers)
    },[]);
    useEffect(()=>{
        console.log(winner);
    },[winner])
    return (
        <div className="App">
            <div className="search-container">
            <input value={keyword} onChange={event => setKeyword(event.target.value)}/>
            <button onClick={()=>setSearchWord(keyword)}>Buscar</button></div>
            <div className="sellers-container">
                {sellers.map((value) => <SellerImage key={value.id} seller={value}/>)}
            </div>
            <h2 >Total: <small>{total}</small></h2>
            {winner?<Invoice winner={winner} total={total}/>:null}
        </div>
    );
}

export default App;
