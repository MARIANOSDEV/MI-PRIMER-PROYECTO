let sociosDiv = document.getElementById("sociosDiv")
let botonPadron = document.getElementById("botonesPadron")
let searchSocioNumero = document.getElementById("buscarSocioNumero")
let botonDeslog = document.getElementById("botonDeslog")


//funciones principales

function consultarPadronSocios(tomaArray, tomaArrayBaja) {
    sociosDiv.innerHTML = ""
    for (let asociado of tomaArray) {
        let verSocio = document.createElement("tr")
        verSocio.id = `elementoPadron${asociado.id}`
        verSocio.innerHTML = `

        <th scope="row">${asociado.id}</th>
        <td>${asociado.nombre}</td>
        <td>${asociado.categoria}</td>
        <td>$${asociado.cuotaValor}</td>
        <td>${asociado.ultimoAnioPago}</td>
        <td><button type="button" class="btn-close" aria-label="Close" id="eliminar${asociado.id}"></button></td>
        `
        sociosDiv.append(verSocio)
    }
    for (let asociado1 of tomaArrayBaja) {
        let verSocio = document.createElement("tr")
        verSocio.id = `elementoPadron${asociado1.id}`
        verSocio.className = `inactivo`
        verSocio.innerHTML = `

        <th scope="row">${asociado1.id}</th>
        <td>${asociado1.nombre}</td>
        <td>${asociado1.categoria}</td>
        <td>$${asociado1.cuotaValor}</td>
        <td>Inactivo</td>
        <td>Socio de baja</td>
        `
        sociosDiv.append(verSocio)
    }
    tomaArray.forEach((asociado) => {
        document.getElementById(`eliminar${asociado.id}`).addEventListener("click", () => {
            Swal.fire({
                title: `Socio N°${asociado.id}: Esta seguro que desea desasociar a ${asociado.nombre}?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Descartar`,
                icon: 'question',
                confirmButtonColor: '#008000',
            }).then((result) => {
                if (result.isConfirmed) {
                    let lineaInfo = document.getElementById(`elementoPadron${asociado.id}`)
                    lineaInfo.remove()
                    let posicion = socios.indexOf(asociado)
                    const bajasSocioStorage = new SocioBaja(asociado.id, asociado.nombre, asociado.categoria, asociado.cuotaValor, asociado.ultimoAnioPago)
                    socios.splice(posicion, 1)
                    sociosBaja.push(bajasSocioStorage)
                    localStorage.setItem("padron", JSON.stringify(socios))
                    localStorage.setItem("sociosBaja", JSON.stringify(sociosBaja))
                    Swal.fire({
                        title: "Baja confirmada.",
                        confirmButtonColor: '#ff0000',
                        icon: 'success'
                    })
                } else if (result.isDenied) {
                    Swal.fire({
                        title: "Baja cancelada.",
                        confirmButtonColor: '#ff0000',
                        icon: 'info'
                    })
                }
            })
        })
    })

}


//funciones accesorios

function buscarSocios(tomaArray, parametro) {

    let socioBuscado = parametro
    let socioEncontrado = tomaArray.find(
        (buscado) => buscado.id == socioBuscado
    )
    if (socioEncontrado == undefined) {
        if (socioBuscado != null) { }
        else { }
    }
    else {
        return socioEncontrado
    }
}

function buscarSocioPorNumero(parametro) {
    sociosDiv.innerHTML = ""
    let socioBusqueda = parseInt(parametro)
    let buscar = socios.filter(
        (socio) => socio.id == socioBusqueda)
    if (parametro == "") {
        noBuscado()
    }
    else if (buscar.length == 0 && isNaN(parametro)) { noEncontrado() }
    else {
        consultarPadronSocios(buscar, [])
        return buscar
    }
}

function noBuscado() {
    sociosDiv.innerHTML = ""
    let verSocio = document.createElement("tr")
    verSocio.innerHTML = `
        <th scope="row"></th>
        <td>Busqueda Socios</td>`
    sociosDiv.append(verSocio)
}
function noEncontrado() {
    sociosDiv.innerHTML = ""
    let verSocio = document.createElement("tr")
    verSocio.innerHTML = `
        <th scope="row">Error</th>
        <td>Datos no encontrados</td>`
    sociosDiv.append(verSocio)
}

//DOM


botonPadron.onclick = () => {
    consultarPadronSocios(socios, sociosBaja)
}
searchSocioNumero.addEventListener("input", () => {
    buscarSocioPorNumero(searchSocioNumero.value)
})
searchSocioNumero.addEventListener("focus", () => {
    buscarSocioPorNumero(searchSocioNumero.value)
})
botonDeslog.onclick = () => {
    window.location.href = `socios.html`
    sessionStorage.clear()
}


//
botonDeslog