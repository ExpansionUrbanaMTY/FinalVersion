async function readData(){
    let poblacion = await d3.csv('./data/Poblacion.csv');
    let densidad = await d3.csv('./data/DensidadPob.csv');
    let extension = await d3.csv('./data/Extensiones.csv');
    let pavimentos = await d3.csv('./data/vialidades.csv');
    console.log(pavimentos)
    //Costos
    var costContainer = document.getElementById('costChart');
    var costChart = new Chart(costContainer, {
        type: 'line',
        fillOpacity: .3, 
        data: {
            labels: ["1990",
                "1995",
                "2000",
                "2005",
                "2010",
                "2015",
                "2019",
                ],
            datasets: [{
					label: 'Primaria',
					borderColor: "#a5a5a5",
                    backgroundColor:"#a5a5a5",
                    fillOpacity: .3, 
					data: [
                        18234806,
                        19766072,
                        21158227,
                        24341160,
                        26294035,
                        29284327,
                        31582743
					],
				}, {
					label: 'Secundaria',
					borderColor: "#5a9bd5",
                    backgroundColor: "#5a9bd5",
                    fillOpacity: .3, 
					data: [
                        11265633,
                        14352345,
                        15966692,
                        22150018,
                        27548366,
                        33081501,
                        36331975

					],
				}, {
					label: 'Terciaria',
					borderColor: "#2D5066",
                    backgroundColor: "#2D5066",
                    fillOpacity: .3, 
					data: [
                        46407721,
                        56544632,
                        62745778,
                        79908868,
                        97077561,
                        116000002,
                        127911345

					],
				}
            ]
        },
        options: {
            plugins: {
                datalabels: {
                    display: false,
                },
            },
            labels: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Metros cuadrados de superficie'
                    },
                    
                }],
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Vialidades comprendidas en la mancha urbana correspondiente a cada año (1990-2019)'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return (new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })).format(tooltipItem.value);
                    }
                }
            }
        }
    });
    //Reposicion de pavimientos
    var repsocicionTendencialContainer = document.getElementById('reposicionTendencial');
    var pavimentosTData = {
        label: 'Escenario Tendencial',
        data: [4417876201, 818160248, 892766204, 6128802654, 19543818461],
        backgroundColor: [
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgb(153,43,129)'
        ],
        borderColor: [
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgb(153,43,129)'
        ],
        borderWidth: 2,
        hoverBorderWidth: 0
    };
    var reposicionTendencial = new Chart(repsocicionTendencialContainer, {
        type: 'bar',
        data: {
            labels: ["Vialidades primarias", "Vialidades secundarias", "Vialidades locales", "Costo Total", "Gasto Municipal ZMM"],
            datasets: [pavimentosTData]
        },
        options: {
            tooltips: {
                callbacks: {
                      label: function(tooltipItem, data) {
                          var value = data.datasets[0].data[tooltipItem.index];
                          value = value.toString();
                          value = value.split(/(?=(?:...)*$)/);
                          value = value.join(',');
                          return value;
                      }
                } // end callbacks:
              }, //end tooltips
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Costo anual en pesos mexicanos del 2019'
                    }
                }],
                xAxes:[{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                }]
            }
        }
    });

    var pavimentosOData = {
        label: 'Escenario Óptimo',
        data: [3561522791, 1086228911, 2230665138, 6878416841, 19543818461],
        backgroundColor: [
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgb(153,43,129)'
        ],
        borderColor: [
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgba(210, 65, 111)',
            'rgb(153,43,129)'
        ],
        borderWidth: 2,
        hoverBorderWidth: 0
    };


    var repsocicionOptimaContainer = document.getElementById('reposicionOptima');
    var reposicionOptima = new Chart(repsocicionOptimaContainer, {
        type: 'bar',
        data: {
            labels: ["Vialidades primarias", "Vialidades secundarias", "Vialidades locales", "Costo Total", "Gasto Municipal ZMM"],
            datasets: [pavimentosOData]
        },
        options: {
            tooltips: {
                callbacks: {
                      label: function(tooltipItem, data) {
                          var value = data.datasets[0].data[tooltipItem.index];
                          value = value.toString();
                          value = value.split(/(?=(?:...)*$)/);
                          value = value.join(',');
                          return value;
                      }
                } // end callbacks:
              }, //end tooltips
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Costo anual en pesos mexicanos del 2019'
                    }
                }],
                xAxes:[{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                }]
            }
        }
    });

    var reposicionTendencialPorcentaje = new Chart(document.getElementById("porcentajeReposicionTendencial"), {
        data: {
            datasets: [{
                data: [pavimentosTData.data[3], pavimentosTData.data[4]]
            }]
        }
    });

    // Gráficas Costos Pavimentación 



    //----------------------------------Forma Urbana-------------------------------------------------------------

    let poblacionf = await d3.csv('./data/censo.csv');

    //Poblacion

}

readData(); 