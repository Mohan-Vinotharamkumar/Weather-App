document.addEventListener('DOMContentLoaded', function() 
{
    const locationInput = document.getElementById('locationInput');
    locationInput.addEventListener('keydown', function(event) 
    {
        if (event.key === 'Enter') 
        {
            const searchText = locationInput.value;
            // addSection();
            check(searchText);
            locationInput.value="";
            styleText("recent");
        }
    });
});

const apiKey = 'c319a71e5de54ee4a26184816240301';
function check(val)
{
    const location = val.toLowerCase();
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network not reachable');
        }
        return response.json();
    })
    .then(data => 
    {
        console.log(data);
        addSection(data.location.name,data.location.country,data.current.condition.text,data.current.temp_c);
    })
}

function addSection(city,country,climate,temp)
{
    var parent = document.getElementById('recentSearch');
            // parent.textContent="hello";
    var division = document.createElement("div");
    division.className = 'locationTwo';
            // division.textContent='div added'
    var h1 = document.createElement("h1");
    h1.textContent=city;
    h1.className = 'locPlace';
    var p = document.createElement("p");
    p.textContent = country;
    p.className = 'contPlace';
    var span = document.createElement("span");
    span.className = 'spanArea';
    var p1 = document.createElement("p");
    p1.textContent = climate;
    p1.className = 'cliPlace';
    var p2 = document.createElement("p");
    p2.textContent = temp;
    p2.className = 'temPlace';
    span.append(p1,p2);
    division.append(h1,p,span);

    if (temp < 0) 
    {
        division.style.backgroundColor='#3366FF';
    } 
    else if (temp >= 0 && temp < 10) 
    {
        division.style.backgroundColor='#3399FF';
    } 
    else if (temp >= 10 && temp < 20) 
    {
        division.style.backgroundColor='#66CCFF';
    } 
    else if (temp >= 20 && temp < 30) 
    {
        division.style.backgroundColor='#FF9900';
    } 
    else if (temp >= 30) 
    {
        division.style.backgroundColor='#FF3300';
    }
    parent.appendChild(division);
    console.log(parent.childElementCount);

    var count = 1;
    if(parent.childElementCount>count)
    {
        console.log("here i am");
        parent.removeChild(parent.firstChild);
    }
}
function styleText(id)
{
    document.getElementById(id).style.opacity='1';
    document.getElementById(id).style.visibility='visible';
}