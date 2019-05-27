require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle", 
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",

  ], function(Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer, Graphic, SimpleMarkerSymbol, Polygon, SimpleFillSymbol) {
    
    //config
    const map = new Map({
        basemap: "dark-gray-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.242347, 38.597015],
        zoom: 15
    });

    //ui
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

    //census layer
    // function createFillSymbol(value, color){ // https://developers.arcgis.com/javascript/latest/guide/style-feature-layers/
    //     return{
    //         "symbol":{
    //             "color": color,
    //             "type": "simple-fill",
    //             "style": "solid",
    //             "outline": {
    //                 "style": "none"
    //             }
    //         },
    //         "label": value
    //     };
    // }
    var openSpacesRenderer = { // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html

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
    

    const feaLay = new FeatureLayer({
        url: "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/5",
        renderer: openSpacesRenderer, // connects to the SimpleRenderer information 
    });
    // var fillSymbol = new SimpleFillSymbol({
    //     color: [227, 139, 79, 0.8],
    //     outline: {
    //       color: [255, 255, 255],
    //       width: 1
    //     }
    //   });
    //   var polygonGraphic = new Graphic({
    //     geometry: feaLay,
    //     symbol: fillSymbol
    //   });


    view.ui.add(baseTog, {
        position: "top-right"
    });
    view.graphics.add(pointGraphic);
    // view.graphics.add(feaLay);

    map.add(feaLay);
  });