/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console


console.log('hi');
var allGenes = [];

var data = {
  query: "{ genes(size: 100) { id name _id } }"
}

// fetch response from staging metaphysics api
//'https://metaphysics-staging.artsy.net'
fetch('https://metaphysics-staging.artsy.net', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  // myJson = {
  //   data: {
  //     genes: [1,2,3]
  //   }
  // }
  
  allGenes = myJson.data.genes;
  
  });
// give me 3 random genes

var button = document.getElementById("gene-sup");
var geneResults = document.getElementById("gene-results");
button.onclick = function(){
    var results = randomPicker(allGenes)
    geneResults.innerHTML = "";
  for (var x=0; x<results.length; x++){
    var gene = results[x];
    geneResults.innerHTML += "<br></br><a href='https://staging.artsy.net/gene/" + gene._id + "' target=\"_blank\">" + gene.name + "</a>"; 
  }
  
}

var geneDescription = document.getElementById("gene-description");
button.onhover = function() {
  geneDescription.innerHTML = "";
  
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomPicker(arrayOfSomething){
 return [arrayOfSomething[getRandomInt(arrayOfSomething.length)], arrayOfSomething[getRandomInt(arrayOfSomething.length)], arrayOfSomething[getRandomInt(arrayOfSomething.length)]]  
}



