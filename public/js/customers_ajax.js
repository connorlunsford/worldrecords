document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('customers').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {f_name:null, l_name:null, email:null};
            info.f_name = document.getElementById('f_name').value;
            info.l_name = document.getElementById('l_name').value;
            info.email = document.getElementById('email').value;

            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7753/customers_insert?f_name=' + info.f_name + '&l_name=' + info.l_name
            + '&email=' + info.email, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Customer Added"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
              }});
            event.preventDefault();
        });
    }