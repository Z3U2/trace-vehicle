import { _VehicleData } from './data'
import { _Position } from './position'
import { _ChartData } from './chartData'
import { } from '@types/chart.js'
import { Chart } from 'chart.js'
import * as moment from 'moment'
import { timeOptions } from '../environments/chartOptions'

export class PlotManager {
    map: google.maps.Map;
    chart1Element: any;
    chart2Element: any;
    positionMarkers: google.maps.Marker[];
    tooltip: google.maps.InfoWindow;
    tooltipClick : google.maps.InfoWindow;

    constructor(map: google.maps.Map, chart1Element: any,chart2Element: any) {
        this.map = map;
        this.chart1Element = chart1Element;
        this.chart2Element = chart2Element;
        this.positionMarkers = [];
        this.tooltip = new google.maps.InfoWindow({ 'disableAutoPan': true });
        this.tooltipClick = new google.maps.InfoWindow({ 'disableAutoPan': true })
    }

    cleanMarkers() {
        while(this.positionMarkers.length){
            let marker = this.positionMarkers.pop();
            marker.setMap(null);
        }
    }

    plotLines(data: _Position[]): void {
        let bounds = new google.maps.LatLngBounds;
        let lines = data.map(data => {
            bounds.extend({
                lat: data.lat,
                lng: data.lng
            })
            return {
                lat : data.lat,
                lng : data.lng
            }
        })
        this.map.fitBounds(bounds);
        let path = new google.maps.Polyline({
            path: lines,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
        })
        path.setMap(this.map)
    }

    plotCharts(data: _ChartData[]): void {
        // time labels
        let labels = data.map(data => `${moment(data.time).milliseconds(0).toISOString()}`)

        // fuel chart dataset
        let fuelPlot = data.map(data => {
            return {
                x: +moment(data.time).milliseconds(0),
                y: data.fuel
            }
        }
        )

        // fuel chart
        new Chart(this.chart1Element, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Vehicle's fuel`,
                        data: fuelPlot,
                        fill: false,
                        lineTension: 0,
                        borderColor: '#3f51b5'
                    }
                ]
            },
            options: timeOptions
        })

        // velocity dataset
        let plot2 = data.map(data => {
            return {
                x: +moment(data.time).milliseconds(0),
                y: data.velocity
            }
        }
        )

        new Chart(this.chart2Element, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Vehicle's velocity`,
                    data: plot2,
                    fill: false,
                    lineTension: 0,
                    borderColor: '#3f51b5'
                }]
            },
            options: timeOptions
        })
    }

    plotMarkers(data: _VehicleData[]): void {
        let lines = data.forEach(data => {
            let marker = new google.maps.Marker({
                position: {
                    lat: data.lat,
                    lng: data.lng
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 3,
                    strokeColor:'red',
                    strokeWeight: .75,
                    fillColor: 'white',
                    fillOpacity: 1
                }
            })
            this.positionMarkers.push(marker);
            marker.setMap(this.map)
            let content = this.html(data);
            marker.addListener('mouseover',() => {
                this.tooltip.setContent(content);
                this.tooltip.open(this.map, marker);
            });
            marker.addListener('mouseout', ()=> {
                this.tooltip.close();
            })
            marker.addListener('click', ()=>{
                this.tooltipClick.setContent(content)
                this.tooltipClick.open(this.map,marker)
            })
        })

        

    }

    html(data: _VehicleData) : string {
        
        return (
        `
        <div id="content">
            <p>
            <b>Id</b> : ${data.vehicleId} <br>
            <b>Temps</b> : ${new Date(data.time)} <br>
            <b>Vitesse</b> : ${data.velocity.toFixed(2)}km/s <br>
            <b>Carburant</b> : ${data.fuel.toFixed(2)}% <br>
            </p>
        </div>
        `)
    }
}