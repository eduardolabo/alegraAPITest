import React, {useContext, useEffect, useState} from 'react';
import {createInvoice} from "../Fetching";
import {ChallengeContext} from "../Context";

const Invoice = (props) => {
    const [invoice, setInvoice]=useState(null);
    const values=useContext(ChallengeContext);
    const [winner]=values.winner;

    useEffect(()=>{
        createInvoice(winner, props.total, setInvoice);
    }, [props.total, winner]);
    return (
        <div className='invoice-container'>
            <div className='invoice-title'><h2>Factura: {invoice?(invoice.message?<h1>error en la api</h1>:invoice.id):'cargando...'}</h2></div>
            <div className='invoice-inner-container'>
                <div className='invoice-column'>
                    <h3>Vendedor: <small>{invoice?(invoice.message?<h1>error en la api</h1>:invoice.seller.name):"cargando..."}</small></h3>
                    <h3>Cantidad(Puntos): <small>{invoice?(invoice.message?<h1>error</h1>:invoice.items[0].quantity):'cargando...'}</small></h3>
                </div>
                <div className='invoice-column'>
                    <h3>Creacion:<small>{invoice?(invoice.message?<h1>error en la api</h1>:invoice.date):'cargando...'}</small></h3>
                </div>
            </div>
        </div>
    );
};

export default Invoice;