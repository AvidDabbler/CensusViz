require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle", 
    "esri/widgets/BasemapGallery"

  ], function(Map, MapView, BasemapToggle, BasemapGallery) {

    const map = new Map({
        basemap: "dark-gray-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.242347,38.597015],
        zoom: 15
    });
    const baseTog = new BasemapToggle({ // basemap toggle
        view: view,
        nextBasemap: "satellite",
    });
    const baseGall = new BasemapGallery({
        view: view,
        source: {
            portal:{
                url: "https://www.arcgis.com", 
                useVectorBasemaps: true
            }
        }
    });
    const point = {
        type: "point",
        x: -90.242347, 
        y: 38.597015
    };
    const markerSymbol = {
        type: "simple-marker",
        color: [255, 255, 255],
        width: 1
    };
    const pointGraphic = {
        type: "graphic",
        geometry: point,
        symbol: markerSymbol
    };
    //view.ui.add(baseTog, "top-right");

    view.ui.add(baseGall, {
        position: "top-right"
    });
    view.graphics.add(pointGraphic);

  });