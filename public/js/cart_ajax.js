document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('addcart').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {quantity:null, cid:null, pid:null, date:null};
            info.quantity = document.getElementById('quantity').value;
            info.cid = document.getElementById('cid').value;
            info.pid = document.getElementById('pid').textContent;
            info.date = new Date();
            
            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/sales_orders_products_insert?cid=' + info.cid + 
            '&date=' + info.date.getFullYear() + '-' + (info.date.getMonth()+1) + '-' + info.date.getDate()
             + '&pid=' + info.pid + '&quantity=' + info.quantity + '&purchased=0', true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Added to Cart"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
              }});
            event.preventDefault();
        });
    }