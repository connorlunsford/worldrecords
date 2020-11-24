document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('vendors').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {company:null, email:null, phone:null};
            info.company = document.getElementById('company').value;
            info.email = document.getElementById('email').value;
            info.phone = document.getElementById('phone').value;
            
            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7754/vendors_insert?company=' + info.company + '&email=' + info.email
            + '&phone=' + info.phone, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Vendor Added"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
              }});
            event.preventDefault();
            location.reload();
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        table = document.getElementById("table");
        table.onclick = function(event) {
            let target = event.target;
            if (target.className == "delete_button") {
                var vid = target.parentNode.parentNode.children[0].innerText;
                deleteQuery(vid);
            }
        }
    });
    
    
    deleteQuery = function(vid) {
        var req = new XMLHttpRequest();
        req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/vendors_delete?vid=' + vid, true);
        req.send(null)
    
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <= 400){
                console.log("Product Deleted"); //Success message
            } else {
                console.log("Error in network request: " + req.statusText); //Error message
            }
        }
        );
        location.reload();
    }
