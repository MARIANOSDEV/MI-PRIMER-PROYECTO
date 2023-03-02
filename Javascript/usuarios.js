let admin = "admin"
let passAdmin = ""
let botonAdmin = document.getElementById("botonAdmin")



if (sessionStorage.getItem("password")) {
    passAdmin = sessionStorage.getItem("password")
}

async function logAdmin() {
    if (admin == passAdmin) {
        window.location.href = `admin.html`
    }
    else {
        const { value: password } = await Swal.fire({
            title: 'Ingrese su contraseña de administrador',
            input: 'password',
            inputPlaceholder: 'UAT contraseña = admin',
            confirmButtonColor: '#ff0000',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off',
            }
        })
        if (password == admin) {
            passAdmin = `${password}`
            sessionStorage.setItem("password", `${password}`)
            window.location.href = `admin.html`
        }
        else {
            if (password) {
                Swal.fire({
                    title: "Contraseña incorrecta.",
                    confirmButtonColor: '#ff0000',
                })
            }
        }

    }
}

botonAdmin.onclick = () => {
    logAdmin()
}
