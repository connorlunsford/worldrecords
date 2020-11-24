document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/cart_individual?cid=' + cid, true);
        req.send(null);

        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <= 400){
                console.log("Cart Loaded"); //Success message
            } else {
                console.log("Error in network request: " + req.statusText); //Error message
          }});
          event.preventDefault();
    })
});

document.addEventListener('DOMContentLoaded', function() {
    table = document.getElementById("table");
    table.onclick = function(event) {
        let target = event.target;
        if (target.className == "delete_button") {
            var cid = target.parentNode.parentNode.children[0].innerText;
            var pid = target.parentNode.parentNode.children[2].innerText;
            deleteQuery(cid,pid);
        }
    }
})


deleteQuery = function(cid, pid) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/cart_delete?cid=' + cid + '&pid=' + pid, true);
    req.send(null)

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log("Product Deleted From Cart"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
    }
    );
    location.reload();
}