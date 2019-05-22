require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
  ], function(Map, MapView) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-90.242347,38.597015],
      zoom: 15
    });
    var point = {
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
    view.graphics.add(pointGraphic);

  });