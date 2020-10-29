document.addEventListener('DOMContentLoaded', bindButtons);

    function bindButtons(){
        document.getElementById('search').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            //Set info property values equal to the value of the corresponding text box
            var info = {term:null};
            info.term = document.getElementById("terms").value;
            
            //Does GET based on info properties
            req.open('GET', 'http://flip3.engr.oregonstate.edu:7754/search?name=' + info.term, true);
            req.send(null)
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    var response = JSON.parse(req.responseText);
                    var tableExists = document.getElementById('myTable');
                    
                    //Delete the table containing the previous search results
                    if (tableExists !== null){
                        tableExists.remove();
                    }
                    
                    var myTable = document.createElement('table');
                    myTable.id = 'myTable';
                    var tableHead = document.createElement('thead');
                    var tableBody = document.createElement('tbody');
                    var headRow = document.createElement('tr');
                    var proHead = document.createElement('th');
                    var priHead = document.createElement('th');

                    proHead.textContent = 'Product';
                    priHead.textContent = 'Price';

                    document.body.appendChild(myTable);
                    myTable.appendChild(tableHead);
                    myTable.appendChild(tableBody);
                    tableHead.appendChild(headRow);

                    if (response.results.length == 0){
                        proHead.textContent = 'Sorry. No products match those keywords.';
                        priHead.textContent = '';

                        headRow.appendChild(proHead);
                        headRow.appendChild(priHead);

                    } else {
                
                        headRow.appendChild(proHead);
                        headRow.appendChild(priHead);

                        for (var j = 0, result_row; result_row = response.results[j]; j++){
                            var newRow = document.createElement('tr');
                            var newNameBox = document.createElement('td');
                            var newPrice = document.createElement('td');
                            var newName = document.createElement('a');
                            
                            newName.href = 'http://flip3.engr.oregonstate.edu:7754/product?id=' + result_row.id;
                            newName.textContent = result_row.name;
                            newPrice.textContent = '$' + result_row.price + '.00';

                            tableBody.appendChild(newRow);
                            newRow.appendChild(newNameBox);
                            newRow.appendChild(newPrice);
                            newNameBox.appendChild(newName);
                            
                        }
                    };
                    // For Troubleshooting
                    console.log(response);
                } else {
                    console.log("Error in network request: " + req.statusText);
              }});
            event.preventDefault();
        });
    }
