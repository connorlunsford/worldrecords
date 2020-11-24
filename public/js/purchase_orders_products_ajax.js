document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('POP').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {vid:null, date:null, pid:null, quantity:null};
            info.vid = document.getElementById('vid').value;
            info.date = document.getElementById('date').value;
            info.pid = document.getElementById('pid').value;
            info.quantity = document.getElementById('quantity').value;

            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/purchase_orders_products_insert?vid=' + info.vid
            + '&date=' + info.date + '&pid=' + info.pid + '&quantity=' + info.quantity, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Receipt Added"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
              }});
            event.preventDefault();
            location.reload();
        });
    }