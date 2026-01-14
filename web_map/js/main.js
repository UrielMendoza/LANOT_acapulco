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
    var mapaSimbologiaImg = document.getElementById('mapa-simbologia-img');
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const toggleMenuButtonImg = document.getElementById("toggleMenuButtonImg");
    const toggleMenuButton2 = document.getElementById("toggleMenuButton2");
    const toggleMenuButtonImg2 = document.getElementById("toggleMenuButtonImg2");
    const menuContainer = document.getElementById("menu-container");
    const buttonInfo = document.getElementById("button_info");  
    const info = document.getElementById("info");
    const info_close = document.getElementById("info_close");

    // Mostrar el botón de inicio después de 1 segundo
    setTimeout(function() {
        btnInicio.style.opacity = '1';
    }, 1000);

    // Esconde el titulo
    mapaTitulo.style.opacity = '0';
    // Esconde la simbologia
    mapaSimbologia.style.opacity = '0';
    
    // ========================================
    // FUNCIÓN PARA TOGGLE DEL MENÚ
    // ========================================
    function showMenu() {
        menuContainer.style.display = "block";
        toggleMenuButton.style.display = "none";
        toggleMenuButton2.style.display = "flex";
        // Oculta titulo y simbologia cuando el menú está abierto en móvil
        if (window.innerWidth < 768) {
            mapaTitulo.style.opacity = '0';
            mapaSimbologia.style.display = 'none';
        }
    }

    function hideMenu() {
        menuContainer.style.display = "none";
        toggleMenuButton.style.display = "flex";
        toggleMenuButton2.style.display = "none";
        // Muestra titulo y simbologia cuando el menú está cerrado
        mapaTitulo.style.opacity = '0.75';
        mapaSimbologia.style.display = 'block';
    }

    // Manejar el evento clic en el botón de inicio
    document.getElementById('btn-inicio').addEventListener('click', function() {
        inicio.style.display = 'none';
        mapaContainer.style.opacity = '1';
        mapaTitulo.style.opacity = '0.75';
        mapaSimbologia.style.background = 'var(--white)';

        // Muestra el menú por defecto
        menuContainer.style.display = "block";
        // El botón de cerrar siempre visible dentro del panel
        toggleMenuButton2.style.display = "flex";
        // El botón de abrir oculto al inicio (porque el menú está visible)
        toggleMenuButton.style.display = "none";

        // Evento para ABRIR el menú (botón hamburguesa)
        toggleMenuButton.addEventListener("click", function () {
            showMenu();
        });

        // Evento para CERRAR el menú (botón X)
        toggleMenuButton2.addEventListener("click", function () {
            hideMenu();
        });

        var mapContainer = document.getElementById('map');
        mapContainer.style.height = (window.innerHeight - 20) + 'px';

        // Ajusta el tamaño del mapa al cambiar el tamaño de la ventana
        window.addEventListener('resize', function() {
            var mapContainer = document.getElementById('map');
            mapContainer.style.height = (window.innerHeight - 20) + 'px';
        });

        // Inicializar el mapa
        var map = L.map('map', {
        }).setView([16.85, -99.85], 12);    

        // Tiles hasta detras de las capas
        const cartodb = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://cartodb-basemaps-a.global.ssl.fastly.net">cartoDB</a>',
            zindex: 0
        }).addTo(map);
        const cartodb_dark = L.tileLayer('https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://a.basemaps.cartocdn.com/">cartoDB</a>',
            zindex: 0
        });
        const osm = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://a.tile.openstreetmap.org">OSM</a>',
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
        const googlemaps_satelital = L.tileLayer('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
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

                    // Pone la capa al frente de las demas
                    limite_gro.bringToFront();

                    // Controlador de simbologia al activar la capa
                    if (checkboxId == 'capa5') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo5.png';                      
                    }else if (checkboxId == 'capa6') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo6.png';
                    }else if (checkboxId == 'capa11') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo11.png';
                    }else if (checkboxId == 'capa13') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo13.png';
                    }else if (checkboxId == 'capa15') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo15.png';
                    }else if (checkboxId == 'capa16') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo16.png';
                    }else if (checkboxId == 'capa17') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo17.png';
                    }else if (checkboxId == 'capa18') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo18.png';
                    }else if (checkboxId == 'capa20' || checkboxId == 'capa39') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo20.png';
                    }else if (checkboxId == 'capa30') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo30.png';
                    }else if (checkboxId == 'capa31') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo31.png';        
                    }else if (checkboxId == 'capa38') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo38.png';        
                    }// De la capa 21 a la 29 usa la misma sombologia la 21
                    else if (checkboxId == 'capa19' || checkboxId == 'capa21' || checkboxId == 'capa22' || checkboxId == 'capa23' || checkboxId == 'capa24' || checkboxId == 'capa25' || checkboxId == 'capa26' || checkboxId == 'capa27' || checkboxId == 'capa28' || checkboxId == 'capa29') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo21.png';
                    }else if (checkboxId == 'capa32') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo32.png';
                        // Manda detras el video de todas la demas capas
                        videoOverlay1.bringToBack();
                        map.fitBounds(bounds1);
                    }else if (checkboxId == 'capa33') {
                        mapaSimbologia.style.opacity = '1';
                        mapaSimbologiaImg.src = './assets/icons/simbo32.png';
                        // Manda detras el video de todas la demas capas
                        videoOverlay2.bringToBack();
                        map.fitBounds(bounds2);
                    }
                    
                    else {
                        mapaSimbologiaImg.src = './assets/icons/sin_simbologia.png ';
                        // Esconde la simbologia
                        mapaSimbologia.style.opacity = '0';
                    }
                } else {
                    map.removeLayer(wmsLayer);
                    mapaSimbologia.style.opacity = '0';
                }
            });
        }

        /* Funcion que muestra una ventana emergente con la informacion de la capa al hacer clic en el boton de info que se llama buttonInfo */
        function showInfo(idInfo) {
            /*Funcion que se activa al hacer clic en el boton de info*/
            buttonInfo.addEventListener("click", function () {
                /* Muestra la ventana emergente */
                info.style.display = "block";
                info.style.opacity = "1";
                swal('integrate from g to a integrate from h to b integrate from i to c u * v * w du dv dw');
            });
            /* Cierra la ventana emergente al hacer clic en el boton de cerrar */
            info_close.addEventListener("click", function () {
                info.style.display = "none";
                info.style.opacity = "0";
            });
        }
              

        // Capas WMS
        const wms = 'https://www.lanot.unam.mx/geoserver/acapulco/wms'
        const wms2 = 'https://www.lanot.unam.mx/geoserver/ceniza/wms'

        var edomex_2022 = L.tileLayer.wms(wms, {
            layers: 'probosque:edomex_2022',
            transparent: true,
            format: 'image/png',
            zindex: 5
        }).addTo(map);

        var planet_skysat_20230113 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_skysat_c_20230113',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var planet_20231023 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_20231023',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var planet_20231031 = L.tileLayer.wms(wms, {
            layers: 'acapulco:planet_20231031',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231026 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231026',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231028 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231028',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var geoeye_20231029 = L.tileLayer.wms(wms, {
            layers: 'acapulco:geoeye_20231029',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        }).addTo(map);

        var worldview3_20231027 = L.tileLayer.wms(wms, {
            layers: 'acapulco:worldview3_20231027',
            transparent: true,
            format: 'image/png',
            maxZoom: 20,
            zindex: 10
        });

        var dnb_20231023_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231023_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231026_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231026_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231027_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231027_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231028_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231028_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231029_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231029_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231030_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231030_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231031_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231031_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231101_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231101_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231102_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231102_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231103_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231103_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var poblacion_municipal = L.tileLayer.wms(wms2, {
            layers: 'ceniza:poblacion_municipal',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 0.50
        });

        var poblacion_municipal_densidad = L.tileLayer.wms(wms2, {
            layers: 'ceniza:poblacion_municipal_densidad',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 0.50
        });

        var manzana_gro = L.tileLayer.wms(wms, {
            layers: 'acapulco:manzana_2020',
            transparent: true,
            format: 'image/png',
            zindex: 10
        });

        var otis_lin_ren = L.tileLayer.wms(wms, {
            layers: 'acapulco:otis_lin_ren',
            transparent: true,
            format: 'image/png',
            zindex: 10
        });

        var otis_pts = L.tileLayer.wms(wms, {
            layers: 'acapulco:otis_pts',
            transparent: true,
            format: 'image/png',
            zindex: 10
        });

        var otis_windswath = L.tileLayer.wms(wms, {
            layers: 'acapulco:otis_windswath',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 0.50
        });

        var limite_gro = L.tileLayer.wms(wms, {
            layers: 'acapulco:limite_gro',
            transparent: true,
            format: 'image/png',
            zindex: 10
        }).addTo(map);

        var pob_ageb = L.tileLayer.wms(wms, {
            layers: 'acapulco:pob_ageb',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 0.50
        });

        var carretera_gro = L.tileLayer.wms(wms, {
            layers: 'acapulco:carretera_gro',
            transparent: true,
            format: 'image/png',
            zindex: 10
        });

        var infraestructura = L.tileLayer.wms(wms, {
            layers: 'acapulco:infraestructura',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 0.75
        });


        var riesgos = L.tileLayer.wms(wms, {
            layers: 'acapulco:riesgos',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });


        var s1_inundacion = L.tileLayer.wms(wms, {
            layers: 'acapulco:s1_inundacion',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        
        var cuerpos_agua = L.tileLayer.wms(wms, {
            layers: 'acapulco:cuerpos_agua',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var saocom_inundacion = L.tileLayer.wms(wms, {
            layers: 'acapulco:saocom_inundacion',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231104_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231104_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231105_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231105_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });


        var dnb_20231106_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231105_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var dnb_20231107_mask = L.tileLayer.wms(wms, {
            layers: 'acapulco:dbn_20231105_mask',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var puentes_carreteras = L.tileLayer.wms(wms, {
            layers: 'acapulco:puentes_carreteras',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });
        var s1_inundacion_2 = L.tileLayer.wms(wms, {
            layers: 'acapulco:s1_inundacion_3',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var kusam_20231031_1 = L.tileLayer.wms(wms, {
            layers: 'acapulco:kusam_20231031_1',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        var kusam_20231031_2 = L.tileLayer.wms(wms, {
            layers: 'acapulco:kusam_20231031_2',
            transparent: true,
            format: 'image/png',
            zindex: 10,
            opacity: 1
        });

        // Video overlay
        const videoUrls1 = [
            'https://www.lanot.unam.mx/acapulco/data/videos/goes18-oti-2023-pos1.webm',
            'https://www.lanot.unam.mx/acapulco/data/videos/goes18-oti-2023-pos1.mp4'
        ];
        const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
        const bounds1 = L.latLngBounds([[17.8953364, -104.7754401], [7.6764766, -88.0010854]]);    
        const videoOverlay1 = L.videoOverlay(videoUrls1, bounds1, {
            opacity: 0.75,
            errorOverlayUrl,
            interactive: true,
            autoplay: true,
            muted: true,
            playsInline: true,
            zIndex: -1
        });

        // Envia el video detras de las demas capas
        videoOverlay1.bringToBack();
    
        videoOverlay1.on('load', () => {
            const MyPauseControl = L.Control.extend({
                onAdd() {
                    const button = L.DomUtil.create('button');
                    button.title = 'Pause';
                    button.innerHTML = '<span aria-hidden="true">⏸</span>';
                    L.DomEvent.on(button, 'click', () => {
                        videoOverlay1.getElement().pause();
                    });
                    return button;
                }
            });
            const MyPlayControl = L.Control.extend({
                onAdd() {
                    const button = L.DomUtil.create('button');
                    button.title = 'Play';
                    button.innerHTML = '<span aria-hidden="true">▶️</span>';
                    L.DomEvent.on(button, 'click', () => {
                        videoOverlay1.getElement().play();
                    });
                    return button;
                }
            });
    
            const pauseControl = (new MyPauseControl()).addTo(map);
            const playControl = (new MyPlayControl()).addTo(map);
        });

        // Video overlay
        const videoUrls2 = [
            'https://www.lanot.unam.mx/acapulco/data/videos/goes18-oti-2023-pos2.webm',
            'https://www.lanot.unam.mx/acapulco/data/videos/goes18-oti-2023-pos2.mp4'
        ];
        const errorOverlayUr2 = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
        const bounds2 = L.latLngBounds([[21.3619321, -106.7229585], [10.8613293, -89.7938372]]);    
        const videoOverlay2 = L.videoOverlay(videoUrls2, bounds2, {
            opacity: 0.75,
            errorOverlayUrl,
            interactive: true,
            autoplay: true,
            muted: true,
            playsInline: true,
            zIndex: -1
        });

        // Envia el video detras de las demas capas
        videoOverlay2.bringToBack();
    
        videoOverlay2.on('load', () => {
            const MyPauseControl = L.Control.extend({
                onAdd() {
                    const button = L.DomUtil.create('button');
                    button.title = 'Pause';
                    button.innerHTML = '<span aria-hidden="true">⏸</span>';
                    L.DomEvent.on(button, 'click', () => {
                        videoOverlay2.getElement().pause();
                    });
                    return button;
                }
            });
            const MyPlayControl = L.Control.extend({
                onAdd() {
                    const button = L.DomUtil.create('button');
                    button.title = 'Play';
                    button.innerHTML = '<span aria-hidden="true">▶️</span>';
                    L.DomEvent.on(button, 'click', () => {
                        videoOverlay2.getElement().play();
                    });
                    return button;
                }
            });
    
            const pauseControl = (new MyPauseControl()).addTo(map);
            const playControl = (new MyPlayControl()).addTo(map);
        });

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
        toggleLayer('capa11', otis_lin_ren);
        toggleLayer('capa12', otis_pts);
        toggleLayer('capa13', otis_windswath);
        toggleLayer('capa14', limite_gro);
        toggleLayer('capa15', pob_ageb);
        toggleLayer('capa16', carretera_gro);
        toggleLayer('capa17', infraestructura);
        toggleLayer('capa18', riesgos);
        toggleLayer('capa19', dnb_20231023_mask);
        toggleLayer('capa20', s1_inundacion);
        toggleLayer('capa21', dnb_20231026_mask);
        toggleLayer('capa22', dnb_20231027_mask);
        toggleLayer('capa23', dnb_20231028_mask);
        toggleLayer('capa24', dnb_20231029_mask);
        toggleLayer('capa25', dnb_20231030_mask);
        toggleLayer('capa26', dnb_20231031_mask);
        toggleLayer('capa27', dnb_20231101_mask);
        toggleLayer('capa28', dnb_20231102_mask);
        toggleLayer('capa29', dnb_20231103_mask);
        toggleLayer('capa30', cuerpos_agua);
        toggleLayer('capa31', saocom_inundacion);
        toggleLayer('capa32', videoOverlay1);
        toggleLayer('capa33', videoOverlay2);
        toggleLayer('capa34', dnb_20231104_mask);
        toggleLayer('capa35', dnb_20231105_mask);
        toggleLayer('capa36', dnb_20231106_mask);
        toggleLayer('capa37', dnb_20231107_mask);
        toggleLayer('capa38', puentes_carreteras);
        toggleLayer('capa39', s1_inundacion_2);
        toggleLayer('capa40', kusam_20231031_1);
        toggleLayer('capa41', kusam_20231031_2);

        // Muestra la ventana emergente con la informacion de la capa
        showInfo('capa1');

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
            // En móvil, ocultar el menú al inicio y mostrar botón hamburguesa
            hideMenu();
        }

        if (window.innerWidth >= 768) {
            // Si es version de escritorio, mostrar menú y simbologia
            menuContainer.style.display = "block";
            toggleMenuButton2.style.display = "flex";
            toggleMenuButton.style.display = "none";
            mapaSimbologia.style.opacity = '1';
        }   

        
    });
});