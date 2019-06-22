require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle", 
    "esri/layers/FeatureLayer",

  ], function(Map, MapView, BasemapToggle, FeatureLayer) {
    
    //config base map
    const mapConfig = new Map({
        basemap: "dark-gray-vector",
    });

    const viewConfig = new MapView({
        container: "viewDiv",
        map: mapConfig,
        center: [-90.242347, 38.597015],
        zoom: 10
    });

    //ui
    const baseTog = new BasemapToggle({ // basemap toggle
        view: viewConfig,
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
    const defaultSym = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [128, 128, 128],
          width: "1px"
        }
    };
    const censusRender = { // https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html

        type: "simple",
        symbol: defaultSym,
        label: "Blockgroups",
        visualVariables: [
            {
                type: "color",
                field: "pop07_sqmi",
                stops: [
                    {
                        value:1000,
                        color: "#FFFCD4",
                    },
                    {
                        value:17000,
                        color: "#350242",
                    }
                ]
            }
        ]

    };
    const feaLayPop = { // popup configuration
        "title": "Census Block Groups",
        "content": "Population 2000: {pop2000} </br> Population 2007: {pop2007} </br> Population Density 2000: {pop00_sqmi} </br> Population Density: {pop07_sqmi} </br> Renter: {RENTER_OCC} </br> Owner: {OWNER_OCC}",
        opacity: .7
    }

    const feaLay = new FeatureLayer({  // connects to the SimpleRenderer information
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/1",
        renderer: censusRender,  
        popupTemplate: feaLayPop
    });

    // CALLS
    viewConfig.ui.add(baseTog, {
        position: "top-right"
    });
    viewConfig.graphics.add(pointGraphic);
    mapConfig.add(feaLay);
  });