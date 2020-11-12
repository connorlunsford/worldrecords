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
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7753/products_insert?vid=' + info.vid + '&title=' + info.title
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
        });
    }
