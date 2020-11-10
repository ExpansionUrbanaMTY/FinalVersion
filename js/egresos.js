var activeYear = document.getElementById('select-bubbles').value;
var activeTab = 'b';
var selectMun = document.getElementById('select-mun');
var btnRec = document.getElementById('recBtn');
var btnHist = document.getElementById('histBtn');
var yearBubbles = document.getElementById('select-bubbles');
var commaValues = d3.format('$,.0f');

const muncolors = {"Abasolo": "#89C5DA", "Apodaca": "#DA5724","Cadereyta": "#74D944","Ciénaga de Flores": "#CE50CA","El Carmen": "#3F4921","García": "#C0717C", 
    "General Escobedo": "#CBD588", "General Zuazua": "#5F7FC7", "Guadalupe": "#673770", "Juárez": "#D3D93E", "Monterrey": "#c84248","Pesquería": "#508578",
    "Salinas Victoria": "#D7C1B1", "San Nicolás": "#689030","San Pedro": "#8569D5", "Santa Catarina": "#CD9BCD", "Santiago": "#D14285"};

function renderBubbles() {
    Plotly.d3.csv('./data/propinvajustado.csv', function(data) {
        function filterData(year, group) {
            return data.filter(function (d) {
                return (d.Year == year && d.hist === group)});
        }

        function processData(year, group) {
            var pob = [], propInv = [], propIng = [], mun = [];
            var set = filterData(year,group);
            for(var i = 0; i < set.length; i++) {
                pob.push(set[i]['Pob']);
                propInv.push(set[i]['prop_inv']);
                propIng.push(set[i]['prop_ingresos'])
                mun.push(set[i]['Municipio']);
            }

            return [propInv, propIng, pob, mun];

        }

        var config = {
            displayModeBar: false,
            displayLogo: false,
            responsive:true
        };
        
        var layout = {
            title: 'Tamaño de esferas equivale a población',
            xaxis: {
                title: {
                  text: 'Gastos en inversión del municipio (per cápita).',
                },
                hoverformat:'$,.2f'
            },
            yaxis: {
                title: {
                  text: 'Ingresos propios del municipio (per cápita)',
                },
                hoverformat:'$,.2f'
            },
            plot_bgcolor: '#E4E3DF',
            paper_bgcolor:'#E4E3DF',
            hovermode: 'closest',
            legend: {x:1,y:1,font:{size:6}},
            margin : {l:60,r:0,t:50,b:50},
            pad:{t:0,r:0,b:0,l:0},
            font : {
                color:'#000000',
                size: 8
            },
            showlegend:true
        }; 

        function setDenue() {
            var initData = processData(activeYear, activeTab);
            var traces = [];
            for(var i = 0; i < initData[3].length; i++) {
                traces.push(
                    {
                        type:'scatter',
                        x: [initData[0][i]],
                        y: [initData[1][i]],
                        mode: 'markers',
                        name: initData[3][i], 
                        marker: {
                            size: [initData[2][i]],
                            sizeref: 250,
                            sizemode: 'area',
                            color: muncolors[initData[3][i]],
                            line: {color:'#141414'}
                        },
                        text: [initData[3][i]],
                        hovertemplate: '%{text}' +
                        '<br>Población: %{marker.size:,}'
                        + '<br>Gasto en inversión (per cap.): %{x}' + '<br>Ingresos propios (per cap.): %{y}' + '<extra></extra>'
                    }
                )
            }

            Plotly.newPlot('graph_bubbles',traces,layout,config);  
            
        }

        function updateBubbles(year,hist) {
            var initData = processData(year, hist);
            var traces = [];
            for(var i = 0; i < initData[3].length; i++) {
                traces.push(
                    {
                        type:'scatter',
                        x: [initData[0][i]],
                        y: [initData[1][i]],
                        mode: 'markers',
                        name: initData[3][i], 
                        marker: {
                            size: [initData[2][i]],
                            sizeref: 250,
                            sizemode: 'area',
                            color: muncolors[initData[3][i]],
                            line: {color:'#141414'}
                        },
                        text: [initData[3][i]],
                        hovertemplate: '%{text}' +
                        '<br>Población: %{marker.size:,}'
                        + '<br>Gasto en inversión (per cap.): %{x}' + '<br>Ingresos propios (per cap.): %{y}' + '<extra></extra>'
                    }
                )
            }
            Plotly.react('graph_bubbles', traces,layout,config);
        }

        setDenue();

        btnRec.addEventListener('click', function () {
            activeTab = 'b'
            updateBubbles(activeYear,activeTab)
        }, false);

        btnHist.addEventListener('click', function () {
            activeTab = 'a'
            updateBubbles(activeYear,activeTab)
        }, false);

        yearBubbles.addEventListener('change', function () {
            activeYear = yearBubbles.value;
            updateBubbles(activeYear,activeTab);
        }, false);

    });

}
function renderIngresos() {
    Plotly.d3.csv('./data/ingegajustado.csv', function (data) {
        function municipioFilter(mun,tipo) {
            return data.filter(function (d) {
                return(d.mun === mun && d.t === tipo)});
        }

        function processIng(mun,t) {
            var set = municipioFilter(mun,t); 
            var dataProp =  [], dataFed = [], dataDeuda = [];
            var periodo =  d3.map(set, function(d){return(d.year)}).keys(); 
            for(var i = 0; i < set.length; i++) {
                switch(set[i]['concepto']) {
                    case 'Ingresos propios':
                        dataProp.push(set[i]['monto']);
                        break;
                    case 'Ingresos provenientes de transferencias federales':
                        dataFed.push(set[i]['monto']);
                        break;
                    case 'Ingresos de deuda':
                        dataDeuda.push(set[i]['monto']);
                        break;
                    default:
                        console.log('Unknown row found!');
                }
            }

            return [dataProp.map(Number), dataFed.map(Number), dataDeuda.map(Number), periodo.map(Number)];
        }


        function processEg(mun,t) {
            var set = municipioFilter(mun,t); 
            var dataDeuda =  [], dataInv = [], dataGasto = [], dataOtros = [];
            var periodo =  d3.map(set, function(d){return(d.year)}).keys(); 
            for(var i = 0; i < set.length; i++) {
                switch(set[i]['concepto']) {
                    case 'Gasto corriente':
                        dataGasto.push(set[i]['monto']);
                        break;
                    case 'Inversión':
                        dataInv.push(set[i]['monto']);
                        break;
                    case 'Deuda':
                        dataDeuda.push(set[i]['monto']);
                        break;
                    case 'Otros':
                        dataOtros.push(set[i]['monto']);
                        break;
                    default:
                        console.log('Unknown row found!');
                }
            }

            return [dataGasto.map(Number), dataInv.map(Number), dataDeuda.map(Number), dataOtros.map(Number), periodo.map(Number)];
        }




        var config = {
            displayModeBar: false,
            displayLogo: false,
            responsive:true
        };

    
        var layout = {
            xaxis: {
                title: {
                  text: 'Año',
                }
            },
            yaxis: {
                title: {
                  text: 'Monto ingresos del municipio (MXN 2020)',
                },
                hoverformat:'$,.0f'
            },
            plot_bgcolor: '#E4E3DF',
            paper_bgcolor:'#E4E3DF',
            hovermode: 'x unified',
            legend: {x:-0.04, xanchor:'left',y:1.1,orientation:'h', font:{size:8}},
            margin : {l:45,r:10,t:0,b:20},
            pad:{t:0,r:0,b:0,l:0},
            font : {
                color:'#000000',
                size: 8
            }
        }; 

        var layout2 = {
            xaxis: {
                title: {
                  text: 'Año',
                }
            },
            yaxis: {
                title: {
                  text: 'Monto egresos del municipio (MXN 2020)',
                },
                hoverformat:'$,.0f'
            },
            plot_bgcolor: '#E4E3DF',
            paper_bgcolor:'#E4E3DF',
            hovermode: 'x unified',
            legend: {x:-0.04, xanchor:'left',y:1.1,orientation:'h', font:{size:8}},
            margin : {l:45,r:10,t:0,b:20},
            pad:{t:0,r:0,b:0,l:0},
            font : {
                color:'#000000',
                size:8
            }
        }; 

        function setHistIng() {
            var initData = processIng('Abasolo','ing');
            var periodo = initData[3]; 
            var trac_prop = {
               x: periodo,
               y: initData[0],
               name: 'Ingresos propios',
               mode: 'lines+markers', 
               showlegend: true, 
               marker: {
                   width: 3,
                   color: '#182D3A'
               }, 
               hovertemplate: '<b>Propios: </b>%{y} <extra></extra>'

            };

            var trac_fed = {
                x: periodo,
                y: initData[1],
                name: 'Ingresos de transferencias federales',
                mode: 'lines+markers', 
                showlegend: true, 
                marker: {
                    width: 3,
                    color: '#D1B0B2'
                },
                hovertemplate: '<b>Transf. Fed.: </b>%{y} <extra></extra>'
            }; 

            var trac_deuda = {
                x: periodo,
                y: initData[2],
                name: 'Ingresos de deuda',
                mode: 'lines+markers', 
                showlegend: true, 
                marker: {
                    width: 3,
                    color: '#AA4B56'
                },
                hovertemplate: '<b>Deuda: </b>%{y} <extra></extra>'
            };

            var traces = [trac_prop, trac_fed, trac_deuda]; 
            Plotly.newPlot('historico_1', traces, layout, config); 

        }

        function setHistEg() {
            var initData = processEg('Abasolo','eg');
            var periodo = initData[4]; 

            var trac_gasto = {
               x: periodo,
               y: initData[0],
               name: 'Egreso por gasto corriente',
               mode: 'lines+markers', 
               showlegend: true, 
               marker: {
                   width: 3,
                   color: '#C0CACE'
               }, 
               hovertemplate: '<b>Gasto corriente: </b>%{y} <extra></extra>'

            };

            var trac_inv = {
                x: periodo,
                y: initData[1],
                name: 'Egresos por inversión',
                mode: 'lines+markers', 
                showlegend: true, 
                marker: {
                    width: 3,
                    color: '#182D3A'
                },
                hovertemplate: '<b>Inversión: </b>%{y} <extra></extra>'
            }; 

            var trac_deuda = {
                x: periodo,
                y: initData[2],
                name: 'Egresos por deuda',
                mode: 'lines+markers', 
                showlegend: true, 
                marker: {
                    width: 3,
                    color: '#AA4B56'
                },
                hovertemplate: '<b>Deuda: </b>%{y} <extra></extra>'
            };

            var trac_otro = {
                x: periodo,
                y: initData[3],
                name: 'Otros egresos',
                mode: 'lines+markers', 
                showlegend: true, 
                marker: {
                    width: 3,
                    color: '#D1B0B2'
                },
                hovertemplate: '<b>Otros: </b>%{y} <extra></extra>'
            };

            var traces2 = [trac_gasto, trac_inv, trac_deuda, trac_otro]; 
            Plotly.newPlot('historico_2', traces2, layout2, config); 

        }


        function assignOptions() {
            var allGroup = d3.map(data, function(d){return(d.mun)}).keys(); 
            for (var i = 0; i < allGroup.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = allGroup[i];
                selectMun.appendChild(currentOption);
            }
        }   

        function updateIng(mun) {

            var updateData = processIng(mun, 'ing');
            var periodo = updateData[3];
            var up_prop = {
                x: [periodo],
                y: [updateData[0]]
            };
            var up_fed = {
                x:[periodo], 
                y:[updateData[1]]
            };
            var up_deuda = {
                x:[periodo],
                y:[updateData[2]]
            }; 

            Plotly.restyle('historico_1', up_prop,0);
            Plotly.restyle('historico_1', up_fed,1); 
            Plotly.restyle('historico_1', up_deuda,2); 

        }


        function updateEg(mun) {

            var updateData = processEg(mun, 'eg');
            var periodo = updateData[4];
            var up_gasto = {
                x: [periodo],
                y: [updateData[0]]
            };

            var up_inv = {
                x: [periodo],
                y: [updateData[1]]
            }

            var up_deuda = {
                x:[periodo], 
                y:[updateData[2]]
            };
            var up_otro = {
                x:[periodo],
                y:[updateData[3]]
            }; 

            Plotly.restyle('historico_2', up_gasto,0);
            Plotly.restyle('historico_2', up_inv,1);
            Plotly.restyle('historico_2', up_deuda,2); 
            Plotly.restyle('historico_2', up_otro,3); 

        }

      

        assignOptions(); 
        setHistIng(); 
        setHistEg(); 

        selectMun.addEventListener('change', function () {
            updateIng(this.value); 
            updateEg(this.value); 
        });



    });
}

renderBubbles(); 
renderIngresos(); 
