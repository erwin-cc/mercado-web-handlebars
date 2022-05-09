const express = require('express')
const hbs = require('express-handlebars')
const _ = require('lodash')
const app = express()

app.set('view engine', 'handlebars')

app.engine (
    'handlebars',
    hbs.engine ({
        layoutsDir: `${__dirname}/views`,
        partialsDir: `${__dirname}/views/partials`
    })
)

app.use("/css", express.static(`${__dirname}/assets/css`))
app.use("/img", express.static(`${__dirname}/assets/img`))
app.use("/js", express.static(`${__dirname}/assets/js`))
app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist`))
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist`))

app.listen(3000, () => console.log("Servidor activo en http://localhost:3000"))

// 1. Crear una ruta raíz que al ser consultada renderice una vista con un parcial
// “Dashboard” enviándole en el render un arreglo con los nombres de los productos. 
// Se recomienda que estos coincidan con las imágenes de cada producto.
app.get('/', (req, res) => {
    const productosBruto = ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate" ]
    const productos = _.chunk(productosBruto, 3)
    res.render("main", {
        productos
    })
})

// 2. Incluir en la vista un parcial que contenga el menú del sitio web y sea renderizado
// antes del Dashboard. (2 Puntos)
 
// (En archivo menu.handlebars, que se usa en main.handlebars)

// 3. Crear un parcial “producto” que contenga el template correspondiente a la
// presentación de cada producto en el Dashboard y reciba como parámetro el nombre
// del producto. (2 Puntos)

//(En archivo producto.handlebar, que se usa en dashboard.handlebars)

// 4. Crear un parcial para la sección principal en donde se renderice un helper con el
// mensaje de bienvenida y se realice una iteración para renderizar un parcial “producto”
// pasándole como argumento el nombre de cada producto. (2 Puntos)

//(En archivo dashboard.handlers, que se usa en main.handlebars)

// 5. Consumir los códigos fuentes de Bootstrap y jQuery a través de rutas o middlewares
// creados en el servidor. Estas dependencias deben ser instaladas con NPM. (1 Punto)

// (OK)
