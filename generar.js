const fs = require('fs');
var QRCode = require('qrcode')



const alergenos = JSON.parse(fs.readFileSync('alergenos.json'));
//const config = JSON.parse(fs.readFileSync('sifoneria.json'));
const config = JSON.parse(fs.readFileSync('generado-sifo.json'));


function headComponent(title, favicon) {

    return (`
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>${title}</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="${favicon}" />
    <!-- Font Awesome icons (free version)-->
    <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossorigin="anonymous"></script>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Cookie&display=swap" rel="stylesheet">


    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">

    <!-- Third party plugin CSS-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/styles.css" rel="stylesheet" />
</head>`);

}






function productComponent(product) {

    function alergenoComponent(alergeno) {
        console.log(alergeno);
        if (alergeno !== undefined) {
            return (`                                
        <li class="d-flex flex-row align-items-center">
            <a class="nav-link js-scroll-trigger" href="#${alergeno.id}">
                <img class="img-fluid align-self-center" 
                    style="height: 2em;" 
                    src="${alergeno.src}" 
                    alt="${alergeno.name}">
            </a>
        </li>`);
        } else {
            return "";
        }
    }


    function imageComponent(src) {
        if (src !== "" && src !== undefined) {
            return (
                `
                <figure>
                <img class="img-fluid" src="${src}"></img>
                </figure>`
            )
        } else {
            return ("")
        }
    }

    console.log("<--------- Producto ---------->")
    console.log(product);

    console.log(product.alergenos);


    return (
        `

        <div class="col-lg-8 col-md-6 col-sm-12  mb-4 mx-auto">
            <div class="card p-4 d-flex flex-column">
                <div class="d-flex flex-column">
                    <!-- Nombre-->
                    <h2 d-block>${product.product}</h2>
                    <p d-block>${product.description}</p>
                    <div class="price display-4">${Number(product.price).toFixed(2)}€</div>
                </div>
                <!-- Descripción-->

                ${imageComponent(product.src)}

            <!-- Lista de Alergenos-->

            <div class="alergias mt-3">
                <ul class="d-flex flex-row flex-wrap">
                    ${product.alergenos !== null ? product.alergenos.map(item => alergenoComponent(alergenos[item])).join("") : ""}
                </ul>
            </div>


        </div>

    </div>
`
    );
}


function productSectionComponent(section) {

    return (
        `<!-- Sección de Menú: Bocadillos-->
        <section class="page-section bg-primary" id="${section.id}">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mt-0">${section.section}</h2>
                    <hr class="divider my-4" />
                    <p class="text-muted mb-5">${section.description}</p>
                </div>
            </div>
            <div class="container-fluid p-0">
                <div class="row">
    
                    ${section.products.map(product => productComponent(product)).join("")}
    
                </div>
            </div>
        </section>
        <!-- FIN Sección de Menú: Bocadillos-->`
    );
}


function infoAlergenoComponent(alergeno) {
    return (
        `<div class="card p-4 d-flex flex-row justify-content-between">

    <div id="${alergeno.id}" class="price mr-auto align-self-center">
        <h2 d-block>${alergeno.name}</h2>
    </div>
    <img class="img-fluid" style="height: 5em;" src="${alergeno.src}" alt="${alergeno.name}">
</div>`);
}

function sectionInfoAlergenosComponent(alergenos) {
    return (`
    <!-- Información sobre alergenos-->
    <section class="page-section bg-primary" id="alergenos">
        <div>
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="mt-0">Información sobre alergenos</h2>
                    <hr class="divider my-4" />
                    <p class="text-muted mb-5">Ponte en contacto con nosotros y pide lo que quieras. Te atenderemos encantados ;)</p>
                </div>
            </div>

            <div class="p-2 m-4">
                <div class="d-flex flex-column">

                    ${Object.values(alergenos).map(item => infoAlergenoComponent(item)).join("")}
                </div>
            </div>


        </div>
    </section>`);
}

function footerComponent(name, link) {
    return (`    
    <footer class="bg-light py-5">
        <div class="container">
            <div class="small text-center text-muted">
                Copyright © 2020 - <a href="${link}">${name}</a>
            </div>
        </div>
    </footer>`);
}

function scriptsComponent() {
    return (`    
    <!-- Bootstrap core JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
    <!-- Third party plugin JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>
    <!-- Core theme JS-->
    <script src="js/scripts.js"></script>`);
}

function bodyComponent(brand, links, logo, background) {

    function navigationComponent(brand, links) {

        function linkComponent(link) {
            return `<li class="nav-item my-lg-3"><a class="nav-link js-scroll-trigger" href="#${link.id}">${link.name}</a></li>`
        }

        let content = `
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">${brand}</a><button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0 d-flex flex-wrap justify-content-end">
                        ${links.map(link => linkComponent(link)).join("")}
                    </ul>
                </div>
            </div>
        </nav>
    `;

        return content;
    }


    function mastheadComponent(logo, brand, background) {
        return (`
        <!-- Masthead-->
        <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-10 align-self-end">
                        <img class="img-fluid" src="${logo}" />
                        <h1 class="text-white font-weight-bold sub-logo">${brand}</h1>
                        <hr class="divider my-4" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                    </div>
                </div>
            </div>
        </header>
        `)
    }


    return (`
    <body id="page-top">
    ${navigationComponent(brand, links)}
    ${mastheadComponent(logo, brand)}
    </body>
    `);
}




function document() {

    const links = [...config.productData.sections.map(item => {
        return ({ "id": item.id, "name": item.section })
    }), {
        "name": "Información sobre alergenos",
        "id": "alergenos",
        "a": "#alergenos"
    }]


    content = `
    <!DOCTYPE html>
    <html lang="es">
    ${headComponent(config.configuration.title, config.configuration.favicon)}
    ${bodyComponent(config.configuration.brand, links, config.configuration.logo, config.configuration.background)}
    ${ Object.values(config.productData.sections).map(section => productSectionComponent(section)).join("")}
    ${ sectionInfoAlergenosComponent(alergenos)}
    ${ footerComponent(config.configuration.copyrightName, config.configuration.copyrightLink)}
    ${ scriptsComponent()}

    </html > `;
    return content;
}

fs.writeFile(`tmp/index.html`, document(), function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("Generación Completada");
});

QRCode.toFile(`build/qrcode.png`, `http://dev.nohaywebs.com/cartaweb/`, { scale: 8 })