1. run 'npm install' in terminal
2. run 'npm start' in terminal
3. should run in http://localhost:3000

Note: 
The current implementation does have all the functionalities of product and bid. I have encountered a CORS error so not all api calls will work. However, a postman request can be used to substitute for not functioning api calls.

create product api call:
method: POST
url: http://127.0.0.1:8000/api/products/
JSON body: 
{
    "product": {
        "title": "sample",
        "desc": "sample",
        "max_bid_amount": 20000,
        "min_bid_amount": 10000,
        "created_by": 6,
        "expiry": "2020-10-11T23:28:56.782Z"
    }
}

create bid api call
method: POST
url: http://127.0.0.1:8000/api/bids/
JSON body: 
{
    "bid": {
        "bid_amount": 1000,
        "created_by": {user_id}
    }
}


create bid api call
method: POST
url: http://127.0.0.1:8000/api/bids/{product_id}
JSON body: 
{
    "bid": {
        "bid_amount": 1000,
        "user_id": 5,
        "product_id": 1
    }
}