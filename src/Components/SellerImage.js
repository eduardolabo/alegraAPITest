import React, {useContext, useEffect, useState} from 'react';
import {getImage} from '../Fetching';
import {ChallengeContext} from "../Context";

const SellerImage = ({seller}) => {
    const [imgURL, setImgURL]=useState("");
    const [points, setPoints]=useState(0);
    const [isLoading, setIsLoading]=useState(true);
    const values=useContext(ChallengeContext);
    const [winner, setWinner]=values.winner;
    const [total, setTotal]=values.total;
    const [searchWord]=values.searchWord;

    //Get image based on the searchWord at the mount and when
    //points, sellers, searchWord or the total points(when someone voted) have changed
    useEffect(()=>{
        setIsLoading(true);
        getImage(searchWord, (url)=>{setImgURL(url);setIsLoading(false)});
        if(points>=20){
            setWinner(seller);
        }

    },

        [points, seller, searchWord, setWinner, total]);
    return (
        <div className="seller-card">
            {(isLoading)?<h3>Cargando...</h3>:<img src={imgURL} alt={`Imagen de ${seller.name}`}/>}<br/>
            <div style={{padding: '0.01em 16px'}}>
                <h2>{seller.name}</h2>
                <button disabled={(isLoading||winner)} onClick={()=>{setPoints(points+3);setTotal(total+3)}}>Votar</button>
                <h4>Puntos: <small>{points}</small></h4>
                <h4>Faltan: <small>{points>20?0:(20-points)}</small></h4>
            </div>
        </div>
    );
};

export default SellerImage;