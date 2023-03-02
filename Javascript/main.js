//variables capturas DOM

let botonAsociarse = document.getElementById("botonAsociarse")
let sociosDiv = document.getElementById("sociosDiv")
let sociosIngreso = document.getElementById("sociosIngreso")
let botonPadron = document.getElementById("botonesPadron")
let searchSocio = document.getElementById("buscarSocio")
let searchSocioNumero = document.getElementById("buscarSocioNumero")
let formAsociarse = document.getElementById("formAsociarse")
let formPago = document.getElementById("formPago")
let indicaCuotaValor = document.getElementById("indicaCuotaValor")
let botonAbonar = document.getElementById("botonAbonar")
let botonVaciarInputPago = document.getElementById("vaciarInputPago")
let totalPago = document.getElementById("totalPago")




//funciones principales

function checkIngreso(func, array, array2) {
    if (formAsociarse[0].value != "" && isNaN(formAsociarse[0].value) && formAsociarse[1].value != "" && formAsociarse[2].value != "") {
        func(array, array2)
    }
    else {
        Swal.fire({
            confirmButtonColor: '#ff0000',
            title: `Por favor complete todos los campos correctamente!`
        })
    }
}

function ingresarNuevoSocio(tomaArray, tomaArray2) {
    Swal.fire({
        title: `${formAsociarse[0].value}. Confirma el alta?
        Cant. de abonos: ${formAsociarse[2].value}. Total: $${formAsociarse[2].value * cuotaPorCategoria(parseInt(formAsociarse[1].value))}.`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Descartar`,
        icon: 'question',
        confirmButtonColor: '#008000',
    }).then((result) => {
        if (result.isConfirmed) {
            ultimoAnioPago = 2022 + parseInt(formAsociarse[2].value)
            let nuevoSocio = new Socio(tomaArray.length + tomaArray2.length + 1, formAsociarse[0].value, detectarCategoriaCorrecta(parseInt(formAsociarse[1].value)), cuotaPorCategoria(parseInt(formAsociarse[1].value)), ultimoAnioPago)
            tomaArray.push(nuevoSocio)
            localStorage.setItem("padron", JSON.stringify(socios))
            formAsociarse.reset()
            sociosSiNoBoton.classList.toggle(`classSociosSiNo`)
            serSocio()
            buscarSocioPorNumero(tomaArray[tomaArray.length - 1].id)
            Swal.fire({
                confirmButtonColor: '#ff0000',
                title: `Bienvenido! A continuacion le compartimos sus datos de Socio!`
            })
        }
        else { }
    })
}


function ingresarPago() {
    if (buscarSocios(socios, formPago[0].value) == undefined || (formPago[1].value) < 1) {
        resetFormularioPago()
        Swal.fire('Error N° de socio // Cantidad de abonos incorrecta.', '', 'error')
    }
    else if(buscarSocios(socios, formPago[0].value).ultimoAnioPago == "Baja Solicitada"){
        Swal.fire('Error. Usted ha solicitado la baja, por favor enviar mail a adminSocios@cai.com.ar', '', 'error')
        }
    else{
        let total = buscarSocios(socios, formPago[0].value).cuotaValor * formPago[1].value
        Swal.fire({
            title: `Socio N° ${formPago[0].value}. Confirma el pago?
        Cant. de abonos: ${formPago[1].value}. Total: $${total}.`,
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Descartar`,
            icon: 'question',
            confirmButtonColor: '#008000',
        }).then((result) => {
            if (result.isConfirmed) {
                let actualizarPago = buscarSocios(socios, formPago[0].value).ultimoAnioPago + parseInt(formPago[1].value)
                buscarSocios(socios, formPago[0].value).ultimoAnioPago = actualizarPago
                consultarPadronSocios(socios, sociosBaja)
                localStorage.setItem("padron", JSON.stringify(socios))
                localStorage.setItem("sociosBaja", JSON.stringify(sociosBaja))
                Swal.fire('Pago confirmado.', '', 'success')
                resetFormularioPago()
            } else if (result.isDenied) {
                Swal.fire('Pago cancelado.', '', 'info')
                resetFormularioPago()
            }
        })
    }
}


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
    tomaArray.forEach((asociado) => {
        document.getElementById(`eliminar${asociado.id}`).addEventListener("click", () => {
            Swal.fire({
                title: `Socio N°${asociado.id}: Esta seguro que quiere solicitar la baja?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Descartar`,
                icon: 'question',
                confirmButtonColor: '#008000',
            }).then((result) => {
                if (result.isConfirmed) {
                    let lineaInfo = document.getElementById(`elementoPadron${asociado.id}`)
                    asociado.ultimoAnioPago = "Baja Solicitada"
                    lineaInfo.remove()
                    localStorage.setItem("padron", JSON.stringify(socios))
                    localStorage.setItem("sociosBaja", JSON.stringify(sociosBaja))
                    Swal.fire({
                        title: `Se ha enviado la solicitud de baja a la administracion.
                        Demora aproximada 48hs.
                        Si quiere cancelar la baja por favor enviar un e-mail a adminSocios@cai.com.ar`,
                        confirmButtonColor: '#ff0000',
                        icon: 'success'
                    })
                } else if (result.isDenied) {
                    Swal.fire({
                        title: "Solicitud de baja cancelada.",
                        confirmButtonColor: '#ff0000',
                        icon: 'info'
                    })
                }
            })
        })
    })

}


//funciones accesorios

function informarCuota() {
    if (formPago[0].value == "") {
    }
    else if (buscarSocios(socios, formPago[0].value) == undefined) {
        let verCuota = document.createElement("div")
        verCuota.innerHTML = `   <p>I n d i c a r</p>
                                <p>I n f o </p>
                                <p>C o r r e c t a</p>`
        indicaCuotaValor.replaceChild(verCuota, indicaCuotaValor.firstElementChild)
    }
    else {
        let verCuota = document.createElement("div")
        verCuota.innerHTML = `   <p>${buscarSocios(socios, formPago[0].value).nombre}</p>
                            <p>Cat: "${buscarSocios(socios, formPago[0].value).categoria}"</p>
                            <p>Valor Cuota: $${buscarSocios(socios, formPago[0].value).cuotaValor}</p>`
        indicaCuotaValor.replaceChild(verCuota, indicaCuotaValor.firstElementChild)
    }
}

function limpiarInformarCuota() {
    if (formPago[0].value == "") {
        let verCuota = document.createElement("div")
        verCuota.innerHTML = `   <p>S o c i o</p>
                                <p>I n f o</p>
                                <p>C u o t a</p>`
        indicaCuotaValor.replaceChild(verCuota, indicaCuotaValor.firstElementChild)
    }
    else { }
}

function informarTotalPago() {
    if ((formPago[1].value) >= 1) {
        let totalAAbonar = buscarSocios(socios, formPago[0].value).cuotaValor * formPago[1].value
        totalPago.innerHTML = `<p>Total a abonar: $${totalAAbonar}</p>`
    }
    else {
        limpiarTotalPago()
    }
}

function limpiarTotalPago() {
    totalPago.innerHTML = `<p>Total a abonar:</p>`
}

function resetFormularioPago() {
    formPago.reset()
    limpiarTotalPago()
    limpiarInformarCuota()
}


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
    else if (buscar.length == 0 || isNaN(parametro)) { noEncontrado() }
    else {
        consultarPadronSocios(buscar, [])
        return buscar
    }
}

function buscarSocioPorNombre(parametro) {
    sociosDiv.innerHTML = ""
    let socioBusqueda = parametro.toLowerCase()
    let buscar = socios.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if (buscar.length === socios.length) {
        noBuscado()
    }
    else if (buscar.length == 0) { noEncontrado() }
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

function detectarCategoriaCorrecta(rangoEdad) {
    if (rangoEdad == "") {
        return "Ingresar informacion correcta"
    }
    else if (rangoEdad < 12) {
        return "Socio Infantil"
    }
    else if (rangoEdad >= 12 && rangoEdad < 18) {
        return "Socio Cadete"
    }
    else if (rangoEdad >= 18) {
        return "Socio Activo"
    }
}

function cuotaPorCategoria(rangoEdad) {
    if (rangoEdad < 12) {
        return 2000
    }
    else if (rangoEdad >= 12 && rangoEdad < 18) {
        return 2500
    }
    else if (rangoEdad >= 18) {
        return 3000
    }
}



//DOM


botonPadron.onclick = () => {
    consultarPadronSocios(socios, sociosBaja)
}
searchSocio.addEventListener("input", () => {
    buscarSocioPorNombre(searchSocio.value)
})
searchSocio.addEventListener("focus", () => {
    buscarSocioPorNombre(searchSocio.value)
})
searchSocioNumero.addEventListener("input", () => {
    buscarSocioPorNumero(searchSocioNumero.value)
})
searchSocioNumero.addEventListener("focus", () => {
    buscarSocioPorNumero(searchSocioNumero.value)
})
botonAsociarse.onclick = () => {
    checkIngreso(ingresarNuevoSocio, socios, sociosBaja)
}
formPago[0].addEventListener("input", () => {
    informarCuota()
})
formPago[0].addEventListener("blur", () => {
    limpiarInformarCuota()
})
formPago[1].addEventListener("input", () => {
    informarTotalPago()
})
formPago[1].addEventListener("reset", () => {
    limpiarTotalPago()
})
botonAbonar.onclick = () => {
    ingresarPago()
}
botonVaciarInputPago.onclick = () => {
    resetFormularioPago()
}
