import React, {useState} from "react";

const ChallengeContext=React.createContext(null);

const ChallengeProvider=(props)=>{
    const [winner, setWinner]=useState(null);
    const [searchWord, setSearchWord]=useState("");
    const [total, setTotal]=useState(0);

    const values={
        winner:[winner, setWinner],
        searchWord:[searchWord, setSearchWord],
        total:[total, setTotal],
    };
    return(<ChallengeContext.Provider value={values}>
        {props.children}
    </ChallengeContext.Provider>)
};

export {ChallengeContext, ChallengeProvider};