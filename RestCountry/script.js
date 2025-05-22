var center = document.querySelector(".center")
var second = document.querySelector(".second")

function generate(key, value) {
    var container = document.createElement("div")
    container.classList.add("container")

    var keyDiv = document.createElement("div")
    keyDiv.classList.add("key")

    var valueDiv = document.createElement("div")
    valueDiv.classList.add("value")

    keyDiv.innerHTML = key

    if(key==="Flag"){
        let img = document.createElement("img")
        img.src = value
        valueDiv.appendChild(img)
    }
    else if(key==="Google Map"){
        let a = document.createElement("a")
        a.href = value
        a.target = "_blank"
        a.innerHTML = "Click To Open Google Map"
        valueDiv.appendChild(a)
    }
    else
    valueDiv.innerHTML = value

    container.appendChild(keyDiv)
    container.appendChild(valueDiv)

    second.append(container)
}
function getAPIData() {
    let input = document.getElementById("country")
    let country = "Bharat"
    if(input.value!=="")
        country = input.value

    let request = new XMLHttpRequest()
    request.open("get", "https://restcountries.com/v3.1/name/"+country)
    request.send()

    center.removeChild(second)
    second = document.createElement("second")
    second.classList.add("second")
    center.appendChild(second)

    request.addEventListener("load", () => {
        let data = JSON.parse(request.responseText)
        data.forEach(country => {
            generate("Name", country.name.official)
            generate("Capital", country.capital)
            generate("Flag", country.flags.png)
            generate("Population", country.population)
            generate("Area", country.area)
            generate("Region", country.region)
            generate("Subregion", country.subregion)
            generate("Currency", Object.values(Object.values(country.currencies)[0]))
            generate("Language", Object.values(country.languages))
            generate("Continent", country.continents)
            generate("Borders", country.borders)
            generate("TimeZones", country.timezones)
            generate("Google Map", country.maps.googleMaps)
            generate("Landlocked", country.landlocked)
            generate("Indepenent", country.independent)
            generate("UnMember", country.unMember)

            let gap = document.createElement("div")
            gap.classList.add("gap")
            second.appendChild(gap)
        });
    })
}
getAPIData()