// Mapa para PROBOSQUE Cambio Cobertura Arbórea 2015-2022
// Autor: urielm

// Inicio
window.addEventListener('DOMContentLoaded', function() {
    var inicio = document.getElementById('inicio');
    var btnInicio = document.getElementById('btn-inicio-container');
    var inicioTitulo = document.getElementById('inicio-titulo');
    var inicioLogos = document.getElementById('inicio-logos');
    var mapaContainer = document.getElementsByClassName('mapa-container')[0];
    var menu = document.getElementById('menu');
    var mapaTitulo = document.getElementById('mapa-titulo');
    var mapaSimbologia = document.getElementById('mapa-simbologia');
    //var mapaSimbologiaImg_1 = document.getElementById('mapa-simbologia-img_1');
    //var mapaSimbologiaImg_2 = document.getElementById('mapa-simbologia-img_2');
    var mapaSimbologiaImg = document.getElementById('mapa-simbologia-img');
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const toggleMenuButtonImg = document.getElementById("toggleMenuButtonImg");
    const toggleMenuButton2 = document.getElementById("toggleMenuButton2");
    const toggleMenuButtonImg2 = document.getElementById("toggleMenuButtonImg2");
    const menuContainer = document.getElementById("menu-container");

    // Mostrar el título y los logos después de 1 segundo
    setTimeout(function() {
        //inicioTitulo.style.opacity = '1';
        //inicioLogos.style.opacity = '1';
    }, 2000);
    // Mostrar el botón de inicio después de 3 segundos
    setTimeout(function() {
        btnInicio.style.opacity = '1';
    }, 1000);

    // Esconde el menú al inicio
    menuContainer.style.display = "none";
    // Esconde el titulo
    mapaTitulo.style.opacity = '0';
    // Esconde la simbologia
    mapaSimbologia.style.opacity = '0';
    
    // Manejar el evento clic en el botón de inicio
    document.getElementById('btn-inicio').addEventListener('click', function() {
        inicio.style.display = 'none';
        mapaContainer.style.opacity = '1';
        mapaTitulo.style.opacity = '0.75';
        mapaSimbologia.style.background = 'var(--white)';
        //mapaSimbologiaImg.style.opacity = '1';
        //mapaSimbologiaImg_1.style.opacity = '1';
        //mapaSimbologiaImg_2.style.opacity = '0.85';

        // Muestra el botón de toggleMenuButton
        toggleMenuButton.classList.toggle("hide-button");
        toggleMenuButton.style.display = "block";

        // Menu responsivo
        toggleMenuButton.addEventListener("click", function () {
            menuContainer.style.display = "block";
            toggleMenuButton.classList.toggle("hide-button");
            // Oculta el titulo
            mapaTitulo.style.opacity = '0';
            // Oculta la simbologia
            mapaSimbologia.style.display = 'none';

            // Pone la imagen de toggleMenuButton por encima del menu
            toggleMenuButtonImg.style.zIndex = '1000';

            // Muestra el boton de cierre
            toggleMenuButton2.classList.toggle("hide-button");
            toggleMenuButton2.style.display = "block";

            // Esconde el boton de toggleMenuButton
            toggleMenuButton.style.display = "none";
        });

        // Boton de cierre
        toggleMenuButton2.addEventListener("click", function () {
            menuContainer.style.display = "none";
            toggleMenuButton2.classList.toggle("hide-button");
            // Muestra el titulo
            mapaTitulo.style.opacity = '0.75';
            // Muestra la simbologia
            mapaSimbologia.style.display = 'block';

            // Muestra el boton de toggleMenuButton
            toggleMenuButton.style.display = "block";
        });

        // Activa la simbologia de la capa 1
        //mapaSimbologiaImg.src = './assets/icons/simbologia.png';

        var mapContainer = document.getElementById('map');
        mapContainer.style.height = (window.innerHeight - 20) + 'px'; // Ajusta el tamaño del mapa

        // Ajusta el tamaño del mapa al cambiar el tamaño de la ventana
        window.addEventListener('resize', function() {
            var mapContainer = document.getElementById('map');
            mapContainer.style.height = (window.innerHeight - 20) + 'px'; // Ajusta el tamaño del mapa
        });

        // Inicializar el mapa
        // Mapa
        // Cambia el nivel de zoom en la version movil
        if (window.innerWidth < 768) {
            // Mapa
            var map = L.map('map', {
            }).setView([16.85, -99.85], 12);
        }
         // version de escritorio
        if (window.innerWidth > 768) {
            // Mapa
            var map = L.map('map', {
            }).setView([16.85, -99.85], 12);
        }       

        // Tiles hasta detras de las capas
        const cartodb = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://cartodb-basemaps-a.global.ssl.fastly.net">cartoDB</a>',
            zindex: 0
        }).addTo(map);
        const cartodb_dark = L.tileLayer('http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://a.basemaps.cartocdn.com/">cartoDB</a>',
            zindex: 0
        });
        const osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://a.tile.openstreetmap.org">OSM</a>',
            zindex: 0
        });
        const ESRI_satelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://server.arcgisonline.com">ESRI</a>',
            zindex: 0
        });
        const ESRI_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://server.arcgisonline.com">ESRI</a>',
            zindex: 0
        });
        const googlemaps = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://mt1.google.com">GoogleMaps</a>',
            zindex: 0
        });
        const googlemaps_satelital = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://mt1.google.com">GoogleMaps</a>',
            zindex: 0
        });
        
        // Controlador de eventos para el checkbox
        function toggleLayer(checkboxId, wmsLayer) {
            const checkbox = document.getElementById(checkboxId);
        
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    wmsLayer.addTo(map);
                    /* Pone la capa al frente de las demas */
                    wmsLayer.bringToFront();
                    mapaSimbologiaImg.style.opacity = '1';

                    // Pone la capa de sombras al frente de las demas
                    //entidades.bringToFront();

                    // Controlador de simbologia al activar la capa
                    if (checkboxId == 'capa1') {
                        //mapaSimbologia.style.opacity = '1';
                        //mapaSimbologiaImg.src = './assets/icons/simbologia.png';
                        
                    } else if (checkboxId == 'capa15') {
                        //mapaSimbologia.style.opacity = '1';
                        //mapaSimbologiaImg.src = './assets/icons/simbologia_sd.png';
                    } else {
                        mapaSimbologiaImg.src = './assets/icons/sin_simbologia.png ';
                        // Esconde la simbologia
                        mapaSimbologia.style.opacity = '0';
                    }
                } else {
                    map.removeLayer(wmsLayer);
                    mapaSimbologia.style.opacity = '0';
                    //mapaSimbologiaImg.style.opacity = '0';
                }
            });
        }
              

        // Capas WMS
        const wms = 'http://132.247.103.145:8080/geoserver/acapulco/wms'
        const wms2 = 'http://132.247.103.145:8080/geoserver/ceniza/wms'

        var edomex_2022 = L.tileLayer.wms(wms, {
            layers: 'probosque:edomex_2022',
            transparent: true,
            format: 'image/png',
            zindex: 5
        }).addTo(map);

        //const select = document.getElementById('cobertura');

        //select.addEventListener('change', function () {
        //    const selectedValue = this.value;
        //    const cqlFilter = "clase_2022 = " + selectedValue; // Reemplaza "atributo_de_la_capa" con el nombre del atributo en tu capa WMS
            
            // Si el valor es "todos", pone todas las categorías
        //    if (selectedValue == 'todos') {
            // Actualizar el parámetro CQL_FILTER de la capa WMS
        //    edomex_2022.setParams({ CQL_FILTER: null });
        //    }
        //    else {
            // Actualizar el parámetro CQL_FILTER de la capa WMS
        //    edomex_2022.setParams({ CQL_FILTER: cqlFilter });
        //    }
        //});

        var planet_skysat_20230113 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_skysat_20230113',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var planet_20231023 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_20231023',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var planet_20231031 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_20231031',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231026 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231026',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231028 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231028',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231029 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231029',
            transparent: true,
            format: 'image/png',
            // Quita restricciones de zoom
            maxZoom: 20,
            // Siempre esta por encima de las demas
            zindex: 10
        }).addTo(map);

        var worldview3_20231027 = L.tileLayer.wms(wms, {
            layers: 'acapulco:worldview3_20231027',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            maxZoom: 20,
            zindex: 10
        });

        var poblacion_municipal = L.tileLayer.wms(wms2, {
            layers: 'ceniza:poblacion_municipal',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            zindex: 10
        });

        var poblacion_municipal_densidad = L.tileLayer.wms(wms2, {
            layers: 'ceniza:poblacion_municipal_densidad',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            zindex: 10
        });

        var manzana_gro = L.tileLayer.wms(wms, {
            layers: '	acapulco:manzana_2020',
            transparent: true,
            format: 'image/png',
            // Siempre esta por encima de las demas
            zindex: 10
        });

        // Pone al frente la capa de entidades y la sombra
        //entidades.bringToFront();


        // Activacion y desactivacion de capas
        toggleLayer('capa1', geoeye_20231026);
        toggleLayer('capa2', geoeye_20231028);
        toggleLayer('capa3', geoeye_20231029);
        toggleLayer('capa4', worldview3_20231027);
        toggleLayer('capa5', poblacion_municipal);
        toggleLayer('capa6', poblacion_municipal_densidad);
        toggleLayer('capa7', manzana_gro);
        toggleLayer('capa8', planet_skysat_20230113);
        toggleLayer('capa9', planet_20231023);
        toggleLayer('capa10', planet_20231031);


        // Control de capas
        var baseMaps = {
            "CartoDB Light": cartodb,
            "CartoDB Dark": cartodb_dark,
            "OSM": osm,
            "ESRI Satelital": ESRI_satelital,
            "ESRI Topo": ESRI_topo,
            "Google Maps": googlemaps,
            "Google Maps Satelital": googlemaps_satelital
        };

/*         var overlays = {
        "Edomex_2022":edomex_2022,
        "Planet True Color": planet_true_color,
        "Planet False Color": planet_false_color,
        "Planet NIR Color": planet_nir_color,
        "Spot NDVI 2015": spot_ndvi_2015,
        "Planet NDVI 2022": planet_ndvi_2022,
        "Spot-Planet DNDVI": spot_planet_dndvi,
        "Spot-Planet DNDVI 1 SD": spot_planet_dndvi_1sd,
        "Spot-Planet DNDVI 2 SD": spot_planet_dndvi_2sd,
        "Spot-Planet DNDVI 3 SD": spot_planet_dndvi_3sd,
        "Sombra IGECEM2": sombra_igecem2,
        "Entidades": entidades
        }; */


        var overlays = {
        };
        
        // Crear el controlador de capas y agregarlo al mapa
        L.control.layers(baseMaps, overlays).addTo(map);

        // Agrega geocoder
        L.Control.geocoder().addTo(map);

        // Función para obtener información de la capa
        function getFeatureInfo(evt) {
            var url = wms + '?service=WMS&version=1.1.1&request=GetFeatureInfo&' +
                'layers=' + edomex_2022.options.layers + '&' +
                'query_layers=' + edomex_2022.options.layers + '&' +
                'info_format=text/html&' +
                'feature_count=50&' +
                'format=image/png&' +
                'transparent=true&' +
                'width=' + map.getSize().x + '&' +
                'height=' + map.getSize().y + '&' +
                'srs=' + map.options.crs.code + '&' +
                'bbox=' + map.getBounds().toBBoxString() + '&' +
                'x=' + evt.layerPoint.x + '&' +
                'y=' + evt.layerPoint.y;

            // Realizar una solicitud AJAX para obtener la información de la capa
            $.ajax({
                url: url,
                dataType: 'html',
                success: function(data) {
                    // Mostrar el contenido en un pop-up
                    L.popup()
                        .setLatLng(evt.latlng)
                        .setContent(data)
                        .openOn(map);
                }
            });
        }

        // Evento click en la capa para obtener información
        edomex_2022.on('click', getFeatureInfo);

        // Añadir un control de escala
        L.control.scale().addTo(map);

        // Cambia el nivel de zoom en la version movil
        if (window.innerWidth < 768) {
            map.setZoom(10);
            // Cambia las coordenadas de inicio en la version movil
            map.panTo(new L.LatLng(16.85, -99.85));
            mapaSimbologia.style.opacity = '1';
        }

        if (window.innerWidth > 768) {
            // Si es version de escritorio, elimina la imagen de toggleMenuButton
            toggleMenuButtonImg.style.display = "none";
            // Elimina el boton de cierre
            toggleMenuButton2.style.display = "none";
            // Muestra el menu
            menuContainer.style.display = "block";
            // Muestra la simbologia
            mapaSimbologia.style.opacity = '1';
            
        }   

        
    });
});


