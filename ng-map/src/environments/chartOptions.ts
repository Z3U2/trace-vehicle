export const timeOptions = {
    scales: {
        xAxes: [{
            type: 'time',
            ticks: {
                autoSkip: true,
                maxTicksLimit: 20
            }
        }]
    },
    tooltips: {
        mode: 'x-axis'
    },
    elements: {
        point: {
            radius:0
        }
    }
}