let i = 0
let divVPClima = document.querySelector(`#climas`)

let lat;
let long;


function mostrarClima() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        long = position.coords.longitude

    })
    setTimeout(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=sp&appid=60703eaf0cf50845cb062140932336a9&units=metric`)
            .then((resp) => resp.json())
            .then((data) => {
                divVPClima.innerHTML = ""
                let divClima = document.createElement(`ul`)
                divClima.className = `clima`
                divClima.innerHTML = `
        <span>${JSON.stringify(data.name)} ${JSON.stringify(data.sys.country)}</span>
        <span>Temp: ${JSON.stringify(data.main.temp)}°C, Humedad: %${JSON.stringify(data.main.humidity)}</span>`
                divVPClima.append(divClima)
            })
            .catch(() => {
                console.warn("La conexion con Open Weather no pudo concretarce. Reintentara mas tarde.")
                divVPClima.innerHTML = ""
                let divClima = document.createElement(`ul`)
                divClima.className = `clima`
                divClima.innerHTML = `
        <ul class="clima">
                <span>"Provincia" "PAIS"</span>
                <span>Info Climatica.</span>              
                </ul>`
                divVPClima.append(divClima)
            })
            .finally(() => {
                i++
                console.log(`Info ${i}: Clima actualizado.`)
            })
    }, 500)
}


setTimeout(() => {
    mostrarClima()
    setInterval(() => {
        mostrarClima()
    }, 120000)
}, 2000)