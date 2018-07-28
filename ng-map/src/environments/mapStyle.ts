export const mapStyle : google.maps.MapTypeStyle [] =  [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eceff1'
                }
            ]
        },
        {
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#cfd8dc'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road.local',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'water',
            stylers: [
                {
                    color: '#b0bec5'
                }
            ]
        }
    ]
