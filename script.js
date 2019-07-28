
//! INITIAL STYLEING FOR MAP
const defaultSymb = {//! OUTLINE PARAMETER FOR layDef
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: {
        // autocasts as new SimpleLineSymbol()
        color: [128, 128, 128],
        width: "0"
        }
};

const symb = {//! LAYER CHOICES
    population:{ 
        style:{
            type: "simple",
            symbol: defaultSymb,
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
            ]},
        popup:{
            "title": "Census Block Groups",
            "content": "Population {pop07_sqmi}"
        }

    },
    senior:{ 
        style:{
            type: "simple",
            symbol: defaultSymb,
            label: "Blockgroups",
            visualVariables: [
                {
                    type: "color",
                    field: "AGE_65_UP",
                    stops: [
                        {
                            value:100,
                            color: "#FCDFEB",
                        },
                        {
                            value:1000,
                            color: "#34091C",
                        }
                    ]
                }
            ]},
        popup:{
            "title": "Senior Block Groups",
            "content": "Senior Population: {AGE_65_UP}"
        }
    },
    hisp:{ 
        style:{
            type: "simple",
            symbol: defaultSymb,
            label: "Blockgroups",
            visualVariables: [
                {
                    type: "color",
                    field: "HISPANIC",
                    stops: [
                        {
                            value:10,
                            color: "#FFE5DC",
                        },
                        {
                            value:100,
                            color: "#341509",
                        }
                    ]
                }
            ]},
        popup:{ 
            "title": "Hispanic Block Groups",
            "content": "Hispanic: {HISPANIC}"
        }
    },
    renter:{ 
        style:{
            type: "simple",
            symbol: defaultSymb,
            label: "Blockgroups",
            visualVariables: [
                {
                    type: "color",
                    field: "RENTER_OCC",
                    stops: [
                        {
                            value:50,
                            color: "#FFFCD4",
                        },
                        {
                            value:1000,
                            color: "#350242",
                        }
                    ]
                }
            ]},
        popup:{ 
            "title": "Senior Block Groups",
            "content": "Renter: {RENTER_OCC}"
        }
    },
    vac:{ 
        style:{
            type: "simple",
            symbol: defaultSymb,
            label: "Blockgroups",
            visualVariables: [
                {
                    type: "color",
                    field: "VACANT",
                    stops: [
                        {
                            value:10,
                            color: "#EBF7E3",
                        },
                        {
                            value:500,
                            color: "#1B3409",
                        }
                    ]
                }
            ]},
        popup:{ 
            "title": "Senior Block Groups",
            "content": "Vacant Properties: {VACANT}"
        }
    },
};

let layDef =symb.population;

const config =(stat)=>{//! ONCLICK LOGIC AND RENDER PROPERTIES FOR DIFFERENT DEMOGRAPHICS


    switch(stat) {
        case `pop`:
            layDef =symb.population;
            init();
            break;
        case `senior`:
            layDef =symb.senior;
            init();
            break;
        case `hisp`:
            layDef =symb.hisp;
            init();
            break;
        case `renter`:
            layDef =symb.renter;
            init();
            break;
        case `vac`:
            layDef =symb.vac;
            init();
            break;
        default:
            console.log(`clkFunct error`)
        }    
};


const init = (()=>{//! ARCGIS API 4.11 INTITIALIZATION AND MAP FUNCTIONALITY
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle", 
        "esri/layers/FeatureLayer"

    ],(Map, MapView, BasemapToggle, FeatureLayer)=>{
        //config base map
        const mapConfig = new Map({//! SET UP OF INITITAL BASEMAP
            basemap: "dark-gray-vector",
        });

        const viewConfig = new MapView({//! DEFAULT VIEW CONFIG
            container: "viewDiv",
            map: mapConfig,
            center: [-90.242347, 38.597015],
            zoom: 10
        });

        //ui
        const baseTog = new BasemapToggle({ //! BASEMAP TOGGLE FUNCTIONALITY 
            view: viewConfig,
            nextBasemap: "satellite"
        });
        const feaLay = new FeatureLayer({  //! LINK TO LAYER, STYLING AND POPUP
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/1",
            renderer: layDef.style,  
            popupTemplate: layDef.popup,
            opacity: .4

        })
        // ARCGIS API CALLS
        viewConfig.ui.add(baseTog, {
            
            position: "top-right"
        })
        mapConfig.add(feaLay);

        window.onload = function() {};
        return{
            layShift: mapConfig.add(feaLay),
        };
    });
});

init();
