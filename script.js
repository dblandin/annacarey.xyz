/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console


console.log('hi');
var allGenes = [];

var query = `
{
	genes(size: 100) {
    id
    name
    artists_connection(first: 1) {
      edges {
        node {
          name
        }
      }
    }
  }
}
`

var data = { query: query }

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
var geneArtistName = document.getElementById("gene-description");

button.onclick = function(){
    var results = randomPicker(allGenes)
    geneResults.innerHTML = "";
  for (var x=0; x<results.length; x++){
    var gene = results[x];
    var artistName = gene.artists_connection.edges[0].node.name
    console.log(gene)
    geneResults.innerHTML += "<br></br><a data-artist='" + artistName + "' href='https://staging.artsy.net/gene/" + gene._id + "' target=\"_blank\">" + gene.name + "</a>"; 
    
    // add event listent to new <a> elements
  }
  
  var elements = document.getElementsByTagName("a")
  for (var x=0; x<elements.length; x++) {
    elements[x].onmouseover = function(event) {
      var artistName = event.target.getAttribute("data-artist")
      geneArtistName.innerHTML = artistName
    }
    
    elements[x].onmouseout = function() {
      geneArtistName.innerHTML = "";
    }
  }
}

// var geneDescription = document.getElementById("gene-description");
// button.onmouseover = function() {
//   geneDescription.innerHTML = "i'm hovering";
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomPicker(arrayOfSomething){
 return [arrayOfSomething[getRandomInt(arrayOfSomething.length)], arrayOfSomething[getRandomInt(arrayOfSomething.length)], arrayOfSomething[getRandomInt(arrayOfSomething.length)]]  
}