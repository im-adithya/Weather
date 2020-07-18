//Let's start
const today = new Date()

let url = "https://fcc-weather-api.glitch.me/api/current?"

let theurl = ""
let iconurl = ""

const sunurl = "https://scx1.b-cdn.net/csz/news/800/2015/extremeheatw.jpg"
const clearurl = "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const rainurl = "https://www.kclu.org/sites/kclu2/files/201905/rain_2.jpg"
const stormurl = "https://grist.files.wordpress.com/2016/06/thunder-lightning-storm.jpg"
const nighturl = "https://c.stocksy.com/a/bK6000/z9/24341.jpg"

const clouds = "<img src='https://svgshare.com/i/Ms2.svg' width = 60 height = 60 title='' />"
const drizzle = "<img src='https://svgshare.com/i/Mr7.svg' width = 60 height = 60 title='' />"
const night = "<img src='https://svgshare.com/i/MsM.svg' width = 60 height = 60 title='' />"
const rain = "<img src='https://svgshare.com/i/Mr8.svg' width = 60 height = 60 title='' />"
const snow = "<img src='https://svgshare.com/i/Mt3.svg' width = 60 height = 60 title='' />"
const sun = "<img src='https://svgshare.com/i/MrY.svg' width = 60 height = 60 title='' />"
const thunderstorm = "<img src='https://svgshare.com/i/MsB.svg' width = 60 height = 60 title='' />"

function ndec(x, n) {
    return Math.round(x * Math.pow(10, n)) / Math.pow(10, n)
}

function conv(s, t) {
    if (s == "C") {
        t = t * (9 / 5) + 32
        return ndec(t, 1) + " °F"
    }
    else {
        t = (t - 32) * (5 / 9)
        return ndec(t, 1) + " °C"
    }
}

function iconsetter(x) {
    if (today.getHours() > 17) {
        switch (x) {
            case 'Drizzle':
                return drizzle
            case 'Clouds':
                return clouds
            case 'Rain':
                return rain
            case 'Snow':
                return snow
            case 'Thunderstom':
                return thunderstorm
            default:
                return night
        }
    }
    else {
        switch (x) {
            case 'Drizzle':
                return drizzle
            case 'Clouds':
                return clouds
            case 'Rain':
                return rain
            case 'Snow':
                return snow
            case 'Thunderstom':
                return thunderstorm
            default:
                return sun
        }
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        url = url + "lat=" + ndec(latitude, 2).toString()
        url = url + "&lon=" + ndec(longitude, 2).toString()

 //       url = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=12"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const thedata = data

                document.getElementById('location').innerHTML = `${thedata.name}, ${thedata.sys.country}`
                document.getElementById('temp').innerHTML = `${ndec(thedata.main.temp, 1)} °C`
                console.log(url, ndec(thedata.main.temp, 1),thedata.weather[0].main,today.getHours());

                function bgsetter (){
                    if (today.getHours() > 17) {
                        theurl = nighturl
                        document.getElementById('temp').style.color = "white"
                        document.getElementById('header').style.backgroundColor = "#131338"
                        document.getElementById('footer').style.backgroundColor = "rgb(0, 39, 75)"
                    }
    
                    else if (ndec(thedata.main.temp, 1) > 40) {
                        theurl = sunurl
                        document.getElementById('temp').style.color = "rgb(201, 57, 0)"
                        document.getElementById('header').style.backgroundColor = "rgb(255, 187, 0)"
                        document.getElementById('footer').style.backgroundColor = "rgb(255, 94, 0)"
                    }
    
                    else if (thedata.weather[0].main == "Rain") {
                        console.log("yaya");
                        theurl = rainurl
                        document.getElementById('temp').style.color = "white"
                        document.getElementById('header').style.backgroundColor = "#131338"
                        document.getElementById('footer').style.backgroundColor = "rgb(0, 39, 75)"
                    }
    
                    else if (thedata.weather[0].main == "Thunderstorm") {
                        theurl = stormurl
                        document.getElementById('temp').style.color = "white"
                        document.getElementById('header').style.backgroundColor = "#131338"
                        document.getElementById('footer').style.backgroundColor = "rgb(0, 39, 75)"
                    }
    
                    else {
                        theurl = clearurl
                        document.getElementById('temp').style.color = "rgb(0, 40, 73)"
                        document.getElementById('header').style.backgroundColor = "rgb(0, 174, 255)"
                        document.getElementById('footer').style.backgroundColor = "rgb(0, 39, 75)"
                    }
                }
                
                bgsetter()
                iconurl = iconsetter(thedata.weather[0].main)

                document.getElementById('body').style.backgroundImage = `url(${theurl})`
                document.getElementById('icon').innerHTML = iconurl

                document.getElementById('temp').onclick = function () {
                    var a = event.target.innerHTML.toString()
                    var scale = a.split(" °")[1]
                    var temp = parseFloat(a.split(" °")[0])
                    event.target.innerHTML = conv(scale, temp)
                }

            })
    })
}
