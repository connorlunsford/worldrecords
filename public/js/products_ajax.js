document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('products').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {vid:null, title:null, artist:null, genre:null, year:null, stock:null, price:null, link:null};
            info.vid = document.getElementById('vid').value;
            info.title = document.getElementById('title').value;
            info.artist = document.getElementById('artist').value;
            info.genre = document.getElementById('genre').value;
            info.year = document.getElementById('year').value;
            info.stock = document.getElementById('stock').value;
            info.price = document.getElementById('price').value;
            info.link = document.getElementById('link').value;

            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/products_insert?vid=' + info.vid + '&title=' + info.title
            + '&artist=' + info.artist + '&genre=' + info.genre + '&year=' + info.year + '&stock=' + info.stock + '&price=' + info.price 
            + '&link=' + info.link, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Product Added"); //Success message
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
                var pid = target.parentNode.parentNode.children[0].innerText;
                deleteQuery(pid);
            }
        }
    })
    
    
    deleteQuery = function(pid) {
        var req = new XMLHttpRequest();
        req.open('GET', 'http://flip3.engr.oregonstate.edu:7755/products_delete?pid=' + pid, true);
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