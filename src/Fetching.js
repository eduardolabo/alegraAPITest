//Headers needed for authentication on the Alegra API
const alegraHeaders=new Headers({
    'Authorization': 'Basic '+ btoa('eduardolaborin@gmail.com:7931221492c0c3cb8f3f'),
    'Content-Type': 'application/x-www-form-urlencoded'
});

//Function to get a list of sellers, the callback function gets the list of sellers once they are ready.
const getSellers=(callback)=>{
    fetch('https://api.alegra.com/api/v1/sellers/', {
        method: 'get',
        headers:alegraHeaders,
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(sellersJSON) {
            callback(sellersJSON);
        });
};

//Function to create an invoice when the winner is selected, the callback function gets the details of the invoice.
const createInvoice=(seller, quantity, callback)=>{
    const date=new Date();
    const data=JSON.stringify({
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        dueDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        client: 1,
        items: [ { id: 1, price: 120, quantity } ],
        paymentMethod: 'cash',
        accountNumber:"0000",
        cfdiUse:'D04',
        seller });
    fetch('https://api.alegra.com/api/v1/invoices',{
        method:'post', headers:alegraHeaders, body:data, json:true
    }).then(res=>res.json()
        .then(
            value => callback(value)
        ))
};

//Function to get a new image based on the keyword, used Math.random to avoid as much as possible same images.
const getImage=(keyword,callback )=>{
    fetch(`https://source.unsplash.com/200x200/?${keyword===""?"random":keyword} ${Math.random()*100}`)
        .then(res=>{
            callback(res.url);
        })
};

export  {getImage, getSellers, createInvoice};