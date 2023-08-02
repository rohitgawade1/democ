export const data = {
    labels: ['State In Charge', 'Regional Manager', 'District Officer', 'Sales Traniee'],
    datasets: [
        {
            label: 'Target Order',
            data: [51006, 61344, 50344, 50000],
            backgroundColor: [
                '#7978e9', '#dc3912', '#fa7902', '#109618'
            ],
            // borderWidth: 1,
        },
        {
            label: 'Achieved Order',
            data: [51006, 61344, 50344, 50000],
            backgroundColor: [
                '#109618', '#dc3912', '#fa7902', '#109618'
            ],
            // borderWidth: 1,
        },
    ],
};

export const options = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} Lacs`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 10,
            font: {
                resizable: true,
                minSize: 10,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            // barThickness: 25,

            ticks: {
                autoSkip: false,

            }
        }],

        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

export const targetFinancialdata = {
    labels: ['Order Target', 'Order Achievement', 'Financial Target', 'Financial Achievement'],
    datasets: [
        {
            label: 'Target Order',
            data: [51006, 61344, 50344, 50000],
            backgroundColor: [
                '#7978e9', '#dc3912', '#fa7902', '#109618'
            ],
            // borderWidth: 1,
        },

    ],
};

export const targetFinancialOptions = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} Lacs`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 15,
            font: {
                resizable: true,
                minSize: 12,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            barThickness: 40,

            ticks: {
                autoSkip: false,

            }
        }],

        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}



export const Receiveddata = {
    labels: ['Approved', 'Rejected'],
    datasets: [
      {
        label: '# of Votes',
        data: [50, 40],
        backgroundColor: [
          '#172b4d',
          '#993366'
          
        ],
        borderColor: [
          '#172b4d',
          '#993366',
          
        ],
        borderWidth: 1,
      },
    ],
  };


export const Dcdata = {
    labels: ['Order Generated', 'Dc Created', 'Dc Pending'],
    datasets: [
        {
            label: 'Target Order',
            data: [125, 90, 35, 150],
            backgroundColor: [
                // '#7978e9', '#dc3912', '#fa7902', '#109618'
                '#3b6deb', '#28c8c1', '#7a31f4', '#109618'
            ],
            // borderWidth: 1,
        },
    ],
};
export const Dcoptions = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} Lacs`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 15,
            font: {
                resizable: true,
                minSize: 12,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            barThickness: 40,
            ticks: {
                autoSkip: false,

            }
        }],
        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

export const Invoicedata = {
    labels: ['Total Dc Created', 'Invoice Generated', 'Invoice Pending'],
    datasets: [
        {
            label: 'Target Order',
            data: [90, 70, 20, 100],
            backgroundColor: [
                // '#7978e9', '#dc3912', '#fa7902', '#109618'
                '#3b6deb', '#28c8c1', '#7a31f4', '#109618'
            ],
            // borderWidth: 1,
        },
    ],
};
export const Invoiceoptions = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} thousand`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 15,
            font: {
                resizable: true,
                minSize: 12,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            barThickness: 40,
            ticks: {
                autoSkip: false,

            }
        }],
        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}


export const Paymentdata = {
    labels: ['State In Charge', 'Regional Manager', 'District Officer'],
    datasets: [
        {
            label: 'Target Order',
            data: [50, 40, 25, 100],
            backgroundColor: [
                '#7978e9', '#dc3912', '#fa7902'
            ],
            // borderWidth: 1,
        },
        {
            label: 'Achieved Order',
            data: [50, 40, 25, 100],
            backgroundColor: [
                '#109618', '#dc3912', '#fa7902'
            ],
            // borderWidth: 1,
        },
    ],
};

export const Paymentoptions = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} Lacs`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 15,
            font: {
                resizable: true,
                minSize: 12,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            // barThickness: 45,
            ticks: {
                autoSkip: false,

            }
        }],
        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

export const assistantVisitsData = {
    labels: ['Target', 'Completed', 'Pending'],
    datasets: [
        {
            label: 'Field Target',
            data: [70, 40, 20, 100],
            backgroundColor: [
                '#7978e9', '#dc3912', '#fa7902', '#109618'
            ],
            // borderWidth: 1,
        },
        {
            label: 'Field Day Description',
            data: [60, 40, 20, 100],
            backgroundColor: [
                '#109618', '#dc3912', '#fa7902', '#109618'
            ],
            // borderWidth: 1,
        },
    ],
};




export const assistantVisitsOptions = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} Lacs`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 10,
            font: {
                resizable: true,
                minSize: 10,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            // barThickness: 25,

            ticks: {
                autoSkip: false,

            }
        }],

        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
}


export const Expensedata = {
    labels: ['Travelling Expenses', 'Lodging Expenses'],
    datasets: [
        {
            label: 'Target Order',
            data: [80000, 30000, 50344, 100000],
            backgroundColor: [
                // '#7978e9', '#dc3912', '#fa7902', '#109618'
                '#3b6deb', '#28c8c1', '#7a31f4', '#109618'
            ],
            // borderWidth: 1,
        },
    ],
};
export const ExpenseOption = {

    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label || '';
                const value = tooltipItem.yLabel;
                return `${label}: ${value} thousand`;
            }
        }
    },

    layout: {
        padding: {
            // top: 70,
            // bottom: 10
        }
    },
    legend: {
        // position: 'chartArea',
        // align: 'start',
    },
    plugins: {
        labels: {
            render: 'value',
            fontColor: 'black'
        },
        outlabels: {
            color: "black",
            // text: "%l\n%v (%p)",
            stretch: 15,
            font: {
                resizable: true,
                minSize: 12,
                maxSize: 16
            }
        },
    },

    scales: {

        xAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            barThickness: 40,
            ticks: {
                autoSkip: false,

            }
        }],
        yAxes: [{
            stacked: false,
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }

}
