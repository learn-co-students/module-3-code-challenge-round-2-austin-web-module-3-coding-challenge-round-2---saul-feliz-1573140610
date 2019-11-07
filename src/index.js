document.addEventListener("DOMContentLoaded", function(){
    getBeers()
})

function getBeers() {// create a beer object, and for each beer, render it. 
    fetch("http://localhost:3000/beers")
    .then((response) => response.json())
    .then((beer) => { console.log(x = beer)
        beer.forEach(renderBeerList)
    })
}

function renderBeerList(beerObj) {
    //create beer list, append to document with event listener to show beers

    let beer = document.createElement("ul")
    let beerId = beerObj.id
    beer.innerText = beerObj.name
    document.getElementById("list-group").append(beer)  
    beer.addEventListener("click", showBeer)
    function showBeer() {
        let showPanel = document.getElementById("beer-detail") 
        showPanel.innerHTML = ""
        beerURL = `http://localhost:3000/beers/${beerId}`
        
        fetch(beerURL)
        .then(response => response.json())
        .then(showBeerDetails => {

            // create all element detials for the beer 

            let beerTitle = document.createElement("h1")
            beerTitle.innerText = beerObj.name
            document.getElementById("beer-detail").append(beerTitle)

            let beerImg = document.createElement("img")
            beerImg.src = beerObj.image_url
            document.getElementById("beer-detail").append(beerImg)

            let beerTagline = document.createElement("h2")
            beerTagline.innerText = beerObj.tagline
            document.getElementById("beer-detail").append(beerTagline)

            let beerDesc = document.createElement("textarea")
            beerDesc.setAttribute("id", "beer-desc");
            beerDesc.innerText = beerObj.description
            document.getElementById("beer-detail").append(beerDesc)

            let saveBtn = document.createElement("button")
            saveBtn.innerText = "Save"
            document.getElementById("beer-detail").append(saveBtn)
            saveBtn.addEventListener("click", saveDesc)

            function saveDesc() {
                
                updatedDesc = document.getElementById("beer-desc").value
                
                const configObject = {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json",
                    "Accept": "application/json"},
                    body: JSON.stringify({"description": updatedDesc}) 
                }
                
                fetch(beerURL, configObject)
                .then(response => response.json())
                .then(updatePage => { //auto re render of element is not working. check later. 
                    document.getElementById("beer-desc").value = ""
                    document.getElementById("beer-detail").value = updatedDesc
                })
            }
        })
    }
}
