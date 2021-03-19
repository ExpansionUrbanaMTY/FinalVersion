mapboxgl.accessToken = 'pk.eyJ1Ijoicm9wb25teCIsImEiOiJja2MyajhuMjIwMGxhMnN1bTRudTk5MmlxIn0.FaHKa4n3CaUvaTKcwLXXGw';
const colors = ['#6B0F1A', '#C2737C', '#CEABB1', '#E4E3DF', '#ffffff', '#BEE7E8', '#94B5B8', '#527D9A', '#2D5066', '#182D3A']; 
const colors_seq = ['#ebfcfd', '#b8e0e4', '#88c6d2', '#65a8c6', '#4e8aba', '#416cae', '#3e4d92', '#323467', '#1d1e3a', '#030512']; 
const thresholds = {'dist_cbd':[4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
'Pop0_20': [-35029, -12122, 10785, 33692, 56599, 79506, 102413, 125320, 148227, 171134],
'Pop0_16':[-17405, -1855, 13695, 29245, 44795, 60345, 75895, 91445, 106995, 122545],
'Emp10_19':[-1999, 383, 2765, 5147, 7529, 9911, 12293, 14675, 17057, 19439],
'AreaC':[0.1, 0.172, 0.243, 0.314, 0.385, 0.456, 0.527, 0.598, 0.669, 0.74],
'CUS':[0.17, 0.31, 0.45, 0.59, 0.73, 0.87, 1.01, 1.15, 1.29, 1.43],
'Densidad90':[338, 676, 1014, 1352, 1690, 2028, 2366, 2704, 3042, 3380],
'Densidad00':[319.985, 630.32, 940.65, 1250.99, 1561.325, 1871.65, 2181.995, 2492.33, 2802.665, 3113.0],
'Densidad16':[340.698, 537.586, 734.473, 931.362, 1128.25, 1325.138, 1522.026, 1718.914, 1915.802, 2112.69],
'Densidad20':[77.17, 277.0, 476.82, 676.64, 876.46, 1076.29, 1276.11, 1475.93, 1675.76, 1875.58],
'PropPC':[1.378, 2.196, 3.014, 3.832, 4.65, 5.468, 6.286, 7.104, 7.922, 8.74],
'ConpP':[96.679, 145.128, 193.577, 242.025, 290.475, 338.924, 387.373, 435.822, 484.271, 532.72],
'PorPav':[10.988, 12.596, 14.204, 15.812, 17.42, 19.028, 20.636, 22.244, 23.852, 25.46],
'CambioPP90':[-4.97, -3.858, -2.747, -1.636, -0.525, 0.586, 1.697, 2.808, 3.919, 5.03],
'CambioPP20':[-54983.2, -42940.4, -30897.6, -18854.8, -6812.0, 5230.8, 17273.6, 29316.4, 41359.2, 53402]
};
const layerLegends = {
'dist_cbd':['Distancia','km.'], 'Emp10_19':['Dif. Empleos','empleos'], 'Pop0_16':['Dif. Población','personas'],'Pop0_20':['Dif. Población','personas'], 'AreaC':['Área const.','porcentaje'], 'CUS':['CUS','metros'], 'Densidad90':['Jov. 90','personas/m2'],
'Densidad00':['Jov. 00','personas/m2'], 'Densidad16':['Jov. 16','personas/m2'], 'Densidad20':['Jov. 20','personas/m2'], 'PropPC':['Pav/Const.','pav/m2'], 'ConpP':['Cons. Pav.','m2/personas'], 'PorPav':['Porc. Pav','%'], 'CambioPP90':['Dif. Jov.','cambio'], 'CambioPP20':['Dif. Jov.','cambio']
}
const cardcontent = {
    'CUS': ['A partir de la información catastral consultada, estimamos el Coeficiente de Utilización del Suelo (CUS) promedio en los círculos concéntricos trazados a partir del centro de la ciudad. El CUS se refiere a la proporción de superficie construida respecto a la superficie del predio. Un mayor CUS significa un mayor aprovechamiento del suelo. El color azul oscuro indica el CUS más alto.',
    'El patrón espacial que se observa es que en términos generales el CUS más alto se encuentra en la zona central y funcional de la ciudad. Conforme nos movemos a la periferia, el CUS disminuye. Hay algunos valores atípicos en la periferia urbana, ubicaciones con un CUS muy alto. Estos corresponden a ubicaciones específicas con altas densidades de vivienda social en García y Cadereyta. Este patrón espacial hace sentido y responde al alto valor del suelo en la zona funcional que hemos mencionado anteriormente. El alto valor del suelo incentiva un proceso de mejor aprovechamiento del suelo y densificación de la ciudad. El siguiente paso en un futuro será identificar los diferentes CUS por tipo de uso de suelo y zona de la ciudad para comparar el valor para destino residencial versus comercial.'],
    'AreaC':['Este mapa se elaboró utilizando la información catastral de los predios. En este caso, se muestra el Área Construida dividida entre la superficie total del anillo concéntrico. Se hace esto debido a que es natural que a mayor área tenga el anillo, mayor superficie construida habría. Podemos observar que la proporción de Área Construida con Área Total es mayor en el centro de la ciudad, con valores arriba de 0.7. Sin embargo, mientras más se aleja uno del centro, la proporción disminuye constantemente, excepto por un pequeño incremento entre los 30 y 35 kilómetros de distancia que corresponden a centros históricos en García, Juárez y Santiago. ',
    'Este mapa confirma lo que observábamos anteriormente: la zona central de Monterrey registra un mayor aprovechamiento del suelo, la misma zona central de la ciudad que se ha despoblado, que es accesible y que se está convirtiendo en un enorme corredor comercial y de servicios, pero con poca vivienda. Este mapa es otra forma de observar el CUS, pero considerando toda la superficie del territorio y no solamente de los predios (es decir, incluyendo las vialidades y espacio público además de la superficie de los lotes catastrales).'],
    'PorPav':['Este mapa muestra el porcentaje del anillo concéntrico que se encuentra pavimentado. Es decir, se dividió la superficie de vialidades entre el área total del anillo y se multiplicó por cien. Un valor mayor indica que un porcentaje mayor del área total disponible se dispone a vialidades. En promedio el 19.6% del área disponible de los anillos se dedica a infraestructuras viales, lo cual es consistente con los estimados que aparecen en la sección de Costos de este menú. Este valor es relativamente constante a través del Área Metropolitana, a excepción de unas caídas drásticas entre los 24 y 31 kilómetros de distancia. En general, los porcentajes de vialidades son mayores en la zona central de la ciudad, lo cual corrobora que la parte central y funcional de la ciudad es el área de la ciudad con mayor accesibilidad vial, donde un 25% de la superficie corresponde a calles.','']
}
var activeLayer = '';
var loadFiles = [d3.json('./data/MapaGradientes.json'), d3.csv('./data/gradiente.csv')];
var commaValues = d3.format(',');
var formatFloat = d3.format('.4f');
var commaFloat = d3.format(',.2f');
var commaFloat_a = d3.format(',.1f');
var nofloat = d3.format('.1f');

var map_dist = new mapboxgl.Map({
    container: 'map_dist',
    style: 'mapbox://styles/roponmx/ckgiiclqk1w7s19o9kavul2ta',
    center: [-100.310015, 25.668289],
    zoom: 8.8
});

var map_grad = new mapboxgl.Map({
    container: 'map_grad',
    style: 'mapbox://styles/roponmx/ckgiiclqk1w7s19o9kavul2ta',
    center: [-100.310015, 25.668289],
    zoom: 8.8
});


function changeText(s) {
    document.getElementById('cus_text').textContent = cardcontent[s][0];
    document.getElementById('cus_text2').textContent = cardcontent[s][1];

}

function changeLegend(s) {
    document.getElementById('leg-title').textContent = layerLegends[s][0];
    document.getElementById('leg-unit').textContent = '('+layerLegends[s][1]+')';
    for (var i = 0; i < 10; i++) {
        if(s === 'Densidad16' || s === 'Densidad00' || s === 'Densidad20' || s === 'CambioPP90' || s === 'CambioPP20') {
            document.getElementById('leg'+String(i)).childNodes[1].textContent = commaFloat_a(thresholds[s][i]);
        } else if (s === 'PorPav') {
            document.getElementById('leg'+String(i)).childNodes[1].textContent = nofloat(thresholds[s][i]);
        } else if (s === 'Pop0_16' || s === 'Pop0_20' || s === 'Emp10_19' || s === 'Densidad90') {
            document.getElementById('leg'+String(i)).childNodes[1].textContent = commaValues(thresholds[s][i]);
        } else {
            document.getElementById('leg'+String(i)).childNodes[1].textContent = commaFloat(thresholds[s][i]);
        }
    }
}


function forceHide() {
    if(!(activeLayer === ''))  {
        if(map_grad.getLayoutProperty(activeLayer, 'visibility') == 'visible') {
            map_grad.setLayoutProperty(activeLayer, 'visibility', 'none');
        }
    }   
}

function displayLayer(s) {
    if(map_grad.getLayoutProperty(s, 'visibility') != 'visible') {
        forceHide();
        map_grad.setLayoutProperty(s, 'visibility','visible');
        activeLayer = s; 
    }
    changeLegend(s); 
}

Promise.all(loadFiles).then(function (data){
    data[0].feature = data[0].features.map(feature => {
        data[1].forEach(gradienteData => {
            if (feature.properties.distance == gradienteData['dist_cbd']) {
                feature.properties.dist_cbd = Number(gradienteData['dist_cbd']);
                feature.properties.Emp10_19 = Number(gradienteData['Emp10_19']);
                feature.properties.Pop0_16 = Number(gradienteData['Pop0_16']);
                feature.properties.Pop0_20 = Number(gradienteData['Pop0_20']);
                feature.properties.AreaC = Number(gradienteData['AreaC']);
                feature.properties.CUS = Number(gradienteData['CUS']);
                feature.properties.Densidad90 = Number(gradienteData['Densidad90']);
                feature.properties.Densidad00 = Number(gradienteData['Densidad00']);
                feature.properties.Densidad16 = Number(gradienteData['Densidad16']);
                feature.properties.Densidad20 = Number(gradienteData['Densidad20']);
                feature.properties.PropPC = Number(gradienteData['PropPC']);
                feature.properties.ConpP = Number(gradienteData['ConpP']);
                feature.properties.PorPav = Number(gradienteData['PorPav']);
                feature.properties.CambioPP90 = Number(gradienteData['CambioPP90']);
                feature.properties.CambioPP20 = Number(gradienteData['CambioPP20']);
            }
        });
        return feature;
    });
    var margedGeoJSON = data[0];

    var rows = Object.keys(thresholds);

    var stepsDist = thresholds['dist_cbd'].map((num,i) => {
        return[num,colors_seq[i]]; 
    });

    map_dist.on('load', function() {
        map_dist.addSource('dist', {
            type:'geojson',
            data:margedGeoJSON
        });

        map_dist.addLayer({
            'id':'dist_cbd',
            'type':'fill',
            'source':'dist',
            'paint':{
                'fill-color':'#088',
                'fill-opacity':0.80
            },
            'paint': {
                'fill-color': {
                    property: 'dist_cbd',
                    stops: stepsDist
                },
                'fill-opacity':0.9
            },
            'layout': {
                'visibility': 'visible'
            }
        });
    });



    var stepsList = thresholds['Pop0_20'].map((num,i) => {
        return[num,colors[i]]; 
    });
  

    map_grad.on('load', function() {

        map_grad.addSource('gradiente', {
            type:'geojson',
            data:margedGeoJSON
        });

        map_grad.addLayer({
            'id':'Pop0_20',
            'type':'fill',
            'source':'gradiente',
            'paint':{
                'fill-color':'#088',
                'fill-opacity':0.80
            },
            'paint': {
                'fill-color': {
                    property: 'Pop0_20',
                    stops: stepsList
                },
                'fill-opacity':0.9
            },
            'layout': {
                'visibility': 'visible'
            }
        });

        activeLayer = 'Pop0_20' 

        rows.slice(2).forEach(header => {

            stepsList = thresholds[header].map((num,i) => {
                return[num,colors[i]]; 
            });

            map_grad.addLayer({
                'id':header,
                'type':'fill',
                'source':'gradiente',
                'paint':{
                    'fill-color':'#088',
                    'fill-opacity':0.80
                },
                'paint': {
                    'fill-color': {
                        property: header,
                        stops: stepsList
                    },
                    'fill-opacity':0.9
                },
                'layout': {
                    'visibility': 'none'
                }
            });
        });

        var distPointer =  new mapboxgl.Popup({
            closeButton: false,
        });
        map_dist.on('click', 'dist_cbd', function(e) {
            map_dist.getCanvas().style.cursor = 'pointer'; 
            distPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance).addTo(map_dist);
        });

        map_dist.on('mouseleave', 'dist_cbd', function(e) {
            map_dist.getCanvas().style.cursor = '';
            distPointer.remove(); 
        });

        var empPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'Emp10_19', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            empPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Cambio: </b>' + commaValues(e.features[0].properties.Emp10_19)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Emp10_19', function(e) {
            map_grad.getCanvas().style.cursor = '';
            empPointer.remove(); 
        });

        var popPointer2 =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'Pop0_20', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            popPointer2.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Cambio: </b>' + commaValues(e.features[0].properties.Pop0_20)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Pop0_20', function(e) {
            map_grad.getCanvas().style.cursor = '';
            popPointer2.remove(); 
        });


        var popPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'Pop0_16', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            popPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Cambio: </b>' + commaValues(e.features[0].properties.Pop0_16)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Pop0_16', function(e) {
            map_grad.getCanvas().style.cursor = '';
            popPointer.remove(); 
        });

        var acPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'AreaC', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            acPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Porc.: </b>' + formatFloat(e.features[0].properties.AreaC)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'AreaC', function(e) {
            map_grad.getCanvas().style.cursor = '';
            acPointer.remove(); 
        });

        var cusPointer =  new mapboxgl.Popup({
            closeButton: false,
        });
        
        map_grad.on('click', 'CUS', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
           cusPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>CUS.: </b>' + formatFloat(e.features[0].properties.CUS)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'CUS', function(e) {
            map_grad.getCanvas().style.cursor = '';
            cusPointer.remove(); 
        });

        var den9Pointer =  new mapboxgl.Popup({
            closeButton: false,
        });


        map_grad.on('click', 'Densidad90', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            den9Pointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + commaFloat(e.features[0].properties.Densidad90)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Densidad90', function(e) {
            map_grad.getCanvas().style.cursor = '';
            den9Pointer.remove(); 
        });

        var den0Pointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'Densidad00', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            den0Pointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + commaFloat(e.features[0].properties.Densidad00)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Densidad00', function(e) {
            map_grad.getCanvas().style.cursor = '';
            den0Pointer.remove(); 
        });

        var den6Pointer =  new mapboxgl.Popup({
            closeButton: false,
        });


        map_grad.on('click', 'Densidad16', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            den6Pointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + commaFloat(e.features[0].properties.Densidad16)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Densidad16', function(e) {
            map_grad.getCanvas().style.cursor = '';
            den6Pointer.remove(); 
        });

        var den20Pointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'Densidad20', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            den20Pointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + commaFloat(e.features[0].properties.Densidad20)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'Densidad20', function(e) {
            map_grad.getCanvas().style.cursor = '';
            den20Pointer.remove(); 
        });


        var propPointer =  new mapboxgl.Popup({
            closeButton: false,
        })

        map_grad.on('click', 'PropPC', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            propPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + formatFloat(e.features[0].properties.PropPC)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'PropPC', function(e) {
            map_grad.getCanvas().style.cursor = '';
            propPointer.remove(); 
        });


        var consPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'ConpP', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            consPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Prop.: </b>' + formatFloat(e.features[0].properties.ConpP)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'ConpP', function(e) {
            map_grad.getCanvas().style.cursor = '';
            consPointer.remove(); 
        });

        var pavPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'PorPav', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            pavPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Porc.: %</b>' + nofloat(e.features[0].properties.PorPav)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'PorPav', function(e) {
            map_grad.getCanvas().style.cursor = '';
            pavPointer.remove(); 
        });
        
        var cambioPointer =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'CambioPP90', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            cambioPointer.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Cambio: </b>' + commaFloat(e.features[0].properties.CambioPP90)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'CambioPP90', function(e) {
            map_grad.getCanvas().style.cursor = '';
            cambioPointer.remove(); 
        });

        var cambioPointer2 =  new mapboxgl.Popup({
            closeButton: false,
        });

        map_grad.on('click', 'CambioPP20', function(e) {
            map_grad.getCanvas().style.cursor = 'pointer'; 
            cambioPointer2.setLngLat(e.lngLat).setHTML('<b>Distancia: </b>' + e.features[0].properties.distance + '<br><b>Cambio: </b>' + commaFloat(e.features[0].properties.CambioPP20)).addTo(map_grad);
        });

        map_grad.on('mouseleave', 'CambioPP20', function(e) {
            map_grad.getCanvas().style.cursor = '';
            cambioPointer2.remove(); 
        });
  
    });
}); 

function renderCenso() {
    Plotly.d3.csv('./data/censo.csv' , function (data) {
        processData(data.filter(function (d) {return (d.year == 2000)}), 
        data.filter(function (d) {return (d.year == 2016)}));
    });    
}


function processData(setA, setB) {
    var viv0 = [],pop0 = [], viv1 = [], pop1 = [],distancia = [];
    for(var i = 0; i < 40; i++) {
        viv0.push(setA[i]['DenViv']);
        pop0.push(setA[i]['DenPop']);
        viv1.push(setB[i]['DenViv']);
        pop1.push(setB[i]['DenPop']);
        distancia.push(i+1);
    } 

    makePlot(viv0,viv1,pop0,pop1,distancia);
}

function makePlot(viv0,viv1,pop0,pop1,distancia) {

    var trace_viv0 = {
        x: distancia,
        y: viv0,
        name: 'Viv. 2000',
        mode: 'lines+markers',
        showlegend:true,
        marker: {
            width:3,
            color: '#C0CACE'
        }
    };
    var trace_viv1 = {
        x: distancia,
        y: viv1,
        name: 'Viv. 2016',
        mode: 'lines+markers',
        showlegend:true,
        marker: {
            width:3,
            color: '#182D3A'
        }
    };

    var trace_pop0 = {
        x: distancia,
        y: pop0,
        name: 'Pob. 2000',
        mode: 'lines+markers',
        showlegend:true,
        marker: {
            width:3,
            color: '#D1B0B2'
        }
    };
    var trace_pop1 = {
        x: distancia,
        y: pop1,
        name: 'Pob. 2016',
        mode: 'lines+markers',
        showlegend:true,

        marker: {
            width:3,
            color: '#AA4B56'
        }
    };

    var data = [trace_viv0, trace_viv1, trace_pop0, trace_pop1]

    var config = {
        displayModeBar: false,
        displayLogo: false,
        responsive:true
    };

    var layout = {
        xaxis: {
            title: {
              text: 'Distancia a centro de la ciudad (km).',
            },
        },
        yaxis: {
            title: {
              text: 'Densidad de personas por km. cuadrado.',
            },
            hoverformat:',.2f'
        },
        plot_bgcolor: '#E4E3DF',
        paper_bgcolor:'#E4E3DF',
        hovermode: 'x unified',
        legend: {x:1,xanchor:'right',y:1},
        margin : {l:90,r:40,t:80,b:80},
        pad:{t:0,r:0,b:0,l:0},
        font : {
            color:'#000000'
        }
    }; 

    Plotly.newPlot('graph_censo', data,layout,config);

}


function renderDenue() {

    Plotly.d3.csv('./data/denue.csv' , function (data) {

        function filterData(year) {
            return data.filter(function (d) {return (d.anno == year)});  
        }

        function processRows(year) {

            var denCom = [],denInd = [], denOfic = [], denServ = [];
            var set = filterData(year); 
            for(var i = 0; i < 40; i++) {
                denCom.push(set[i]['DenCom']);
                denInd.push(set[i]['DenInd']);
                denOfic.push(set[i]['DenOfic']);
                denServ.push(set[i]['DenServ']);
            } 
            return [denCom,denInd,denOfic,denServ];
        }

        var config = {
            displayModeBar: false,
            displayLogo: false,
            responsive:true
        };

        var layout = {
            xaxis: {
                title: {
                  text: 'Distancia a centro de la ciudad (km).',
                }
            },
            yaxis: {
                title: {
                  text: 'Densidad de empleos por km. cuadrado.',
                },
                hoverformat:',.2f'
            },
            plot_bgcolor: '#E4E3DF',
            paper_bgcolor:'#E4E3DF',
            hovermode: 'x unified',
            legend: {x:1,xanchor:'right',y:1},
            margin : {l:90,r:40,t:80,b:80},
            pad:{t:0,r:0,b:0,l:0},
            font : {
                color:'#000000'
            }
        }; 

        var distancia = Array.from({length: 40}, (_, i) => i + 1); 

        function setDenue() {
            var initData = processRows(2019);   
            var trace_com = {
                x: distancia,
                y: initData[0],
                name: 'Comercio',
                mode: 'lines+markers',
                showlegend:true,
                marker: {
                    width:3,
                    color: '#C0CACE'
                }
            };
            var trace_ind = {
                x: distancia,
                y: initData[1],
                name: 'Industria',
                mode: 'lines+markers',
                showlegend:true,
                marker: {
                    width:3,
                    color: '#182D3A'
                }
            };
        
            var trace_of = {
                x: distancia,
                y: initData[2],
                name: 'Oficina',
                mode: 'lines+markers',
                showlegend:true,
                marker: {
                    width:3,
                    color: '#D1B0B2'
                }
            };
            var trace_serv = {
                x: distancia,
                y: initData[3],
                name: 'Servicios',
                mode: 'lines+markers',
                showlegend:true,
        
                marker: {
                    width:3,
                    color: '#AA4B56'
                }
            };

        
            var data = [trace_com, trace_ind, trace_of, trace_serv]; 
            Plotly.newPlot('graph_denue', data,layout,config);
        }
        
        function updateDenue(year) {
            var updateData = processRows(year);

            var up_com = {
                y: [updateData[0]],
            };
            var up_ind = {
                y: [updateData[1]],
            };
        
            var up_of = {
                y: [updateData[2]],
            };
            var up_serv = {
                y: [updateData[3]],
            };

            Plotly.restyle('graph_denue', up_com, 0); 
            Plotly.restyle('graph_denue', up_ind, 1); 
            Plotly.restyle('graph_denue', up_of, 2); 
            Plotly.restyle('graph_denue', up_serv,3); 

            
        }

        setDenue(); 

        var btn2019 = document.getElementById('denue-2019');
        var btn2015 = document.getElementById('denue-2015');
        var btn2010 = document.getElementById('denue-2010');

        btn2019.addEventListener('click', function () {
            updateDenue(2019);
        }, false);

        btn2015.addEventListener('click', function () {
            updateDenue(2015);
        }, false);

        btn2010.addEventListener('click', function () {
            updateDenue(2010); 
        }, false);



    });

}

renderCenso(); 
renderDenue();

