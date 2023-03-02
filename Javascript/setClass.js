//clases y arrays

class Socio {
    constructor(id, nombre, categoria, cuotaValor, ultimoAnioPago){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.cuotaValor = cuotaValor,
        this.ultimoAnioPago = ultimoAnioPago
    }
}

class SocioBaja {
    constructor(id, nombre, categoria, cuotaValor, ultimoAnioPago){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.cuotaValor = cuotaValor,
        this.ultimoAnioPago = ultimoAnioPago
    }
}

//Padron de socios actual.
const socio1 = new Socio(1,"Mariano Sanchez","Socio Activo", 3000, 2023)
const socio2 = new Socio(2,"Magali Sanchez","Socio Infantil", 2000, 2023)
const socio3 = new Socio(3,"Marcela Roberto","Socio Activo", 3000, 2022)
const socio4 = new Socio(4,"Florencia Sanchez","Socio Activo", 3000, 2023)
const socio5 = new Socio(5,"Luciano Rondo","Socio Cadete", 2500, 2022)
const socio6 = new Socio(6,"Alberto Roberto","Socio Activo", 3000, 2023)
const socio7 = new Socio(7,"Ruben Sanchez","Socio Activo", 3000, 2023)
const socio8 = new Socio(8,"Ariel Fajardo","Socio Activo", 3000, 2022)
