require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle", 
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",

  ], function(Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer) {
    
    //config base map
    const mapConfig = new Map({
        basemap: "dark-gray-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: mapConfig,
        center: [-90.242347, 38.597015],
        zoom: 15
    });

    //ui
    const baseTog = new BasemapToggle({ // basemap toggle
        view: view,
        nextBasemap: "satellite",
    });


    //point
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

    const openSpacesRenderer = { // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html

        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [ 255, 128, 200, 0.5 ],
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
              }
        }
    };
    const feaLayPop = { // popup configuration
        "title": "Census Block Groups",
        "content": "Hello There!!! {GEOID}"
    }

    const feaLay = new FeatureLayer({  // connects to the SimpleRenderer information
        url: "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/5",
        renderer: openSpacesRenderer,  
        outFields: ["GEOID"],
        popupTemplate: feaLayPop
    });

    // CALLS
    view.ui.add(baseTog, {
        position: "bottom-right"
    });
    view.graphics.add(pointGraphic);
    mapConfig.add(feaLay);
  });