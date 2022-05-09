$(() => {
    //Revisar si existen elementos almacenados en localstorage y transcribirlos al carrito.
    let productosCarrito = localStorage.getItem("productos")
    productosCarrito = !productosCarrito ? [] : JSON.parse(productosCarrito)
    transcribirModal(productosCarrito)

    //Dar formato a elementos que ya han sido seleccionados y están en localstorage
    productosCarrito.forEach(e => {
        $(`[data-nombre=${e}]`,"#dashboard").removeClass("prodShadow").addClass("opacity")
    })


    //Crear arreglo con productos seleccionados por usuario
    $(document).on("click", ".prod", function () {
        $(this).removeClass("prodShadow").addClass("opacity")
        const newProd = $(this).data().nombre
        productosCarrito = JSON.parse(localStorage.getItem("productos"))
        if (!productosCarrito.some(elem => elem == newProd)) {
            productosCarrito.push(newProd)
            localStorage.setItem("productos",JSON.stringify(productosCarrito))
            //Transcribir productos a Modal
            transcribirModal(productosCarrito)
        }
    })

    //Quitar productos de modal y reactivarlos en el dashboard
    $(document).on("click",".modal-body .row .col", function () {
        const removeProdName = $(this).data().nombreModal
        let productosCarrito = JSON.parse(localStorage.getItem("productos"))
        productosCarrito = jQuery.grep(productosCarrito, (prod) => {
            return prod !== removeProdName
        })
        localStorage.setItem("productos", JSON.stringify(productosCarrito))
        $(`[data-nombre=${removeProdName}]`,"#dashboard").addClass("prodShadow").removeClass("opacity")
        transcribirModal(productosCarrito)
    })

    //Dar formato a elementos que ya han sido seleccionados y están en localstorage
    /*let prod = $("#productos .prod")
    prod = Object.entries(prod)
    prod = prod.slice(0,-2)
    prod.forEach( e => {
        let nombreProd = $(e[1]).data().nombre
        if(productosCarrito.some(e => e == nombreProd)){

        }
    })*/
    

})

//Transcribir productos a Modal
const transcribirModal = (arreglo) => {
    if (arreglo.length==0) {
        $(".modal-body .row").html("No hay productos en el carrito")
    } else {
        $(".modal-body .row").html("")
        arreglo.forEach(producto => {
            $(".modal-body .row").append(`
                <div class="col prodShadow rounded" data-nombre-modal = "${producto}">
                    <img src="img/${producto}.png" height="120px" alt="Imagen ${producto}">
                </div>
            `)
        })
    }
    
} 