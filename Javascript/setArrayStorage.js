//Seteo primera vez.
let socios = []


if(localStorage.getItem("padron"))  {
    for (let socio of JSON.parse(localStorage.getItem("padron"))){
    const nuevoSocioStorage = new Socio(socio.id, socio.nombre, socio.categoria, socio.cuotaValor, socio.ultimoAnioPago)
    socios.push(nuevoSocioStorage)
}}
else    {
    Swal.fire({title: "La informacion del servidor ha sido actualizada!",
                confirmButtonColor: '#ff0000',})
    socios.push(socio1, socio2, socio3, socio4, socio5, socio6, socio7, socio8)
    localStorage.setItem("padron", JSON.stringify(socios))
}

let sociosBaja = []

if (localStorage.getItem("sociosBaja") == []){
        JSON.stringify(localStorage.removeItem("sociosBaja"))}
else if(localStorage.getItem("sociosBaja") && localStorage.getItem("sociosBaja") != []){
        for (let socioBaja of JSON.parse(localStorage.getItem("sociosBaja"))){
        const bajasSocioStorage = new SocioBaja(socioBaja.id, socioBaja.nombre, socioBaja.categoria, socioBaja.cuotaValor, socioBaja.ultimoAnioPago)
        sociosBaja.push(bajasSocioStorage)}}
else  if(sociosBaja.length>1) {
        localStorage.setItem("sociosBaja", JSON.stringify(sociosBaja))
        }