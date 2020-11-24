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
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/customers_insert?f_name=' + info.f_name + '&l_name=' + info.l_name
            + '&email=' + info.email, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Customer Added"); //Success message
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
        if (target.className == "update_button") {
            var cid = target.parentNode.parentNode.children[0].innerText;
            var f_name = target.parentNode.parentNode.children[1].firstElementChild.firstElementChild.value;
            var l_name = target.parentNode.parentNode.children[2].firstElementChild.firstElementChild.value;
            var email = target.parentNode.parentNode.children[3].firstElementChild.firstElementChild.value;
            updateQuery(cid,f_name,l_name,email);
        }
        if (target.className == "delete_button") {
            var cid = target.parentNode.parentNode.children[0].innerText;
            deleteQuery(cid);
        }
    }
})

updateQuery = function(cid,f_name,l_name,email) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/customers_update?f_name=' + f_name + '&l_name=' + l_name
            + '&email=' + email + '&cid=' + cid, true);
    req.send(null)

    req.addEventListener('load', function(){
    if(req.status >= 200 && req.status <= 400){
        console.log("Customer Updated"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
    }
    );
    location.reload();
}

deleteQuery = function(cid) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/customers_delete?cid=' + cid, true);
    req.send(null)

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log("Customer Deleted"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
    }
    );
    location.reload();
}