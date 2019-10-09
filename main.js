const mymap = L.map('mapid', {zoomControl:true, maxZoom:10, minZoom:3}).setView([39.8283, -98.5795], 5);
	
	const basemap = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	
	const basemap2 = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.satellite'
	}).addTo(mymap);
	
	
	const districtStyle = {
		shape: 'diamond',
		radius: 7,
        opacity: 1,
        color: 'Black',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'Yellow'
       };
	
	   const HQstyle = {
		
		radius: 10.000000000000002,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(247,128,30,1.0)',
	};
	
	const getDivisionColor = (d) => {
    return d == "Great Lakes and Ohio River Division" ? '#df65b0' :
			d == "Mississippi Valley Division" ? 'Teal' :
			d == "North Atlantic Division" ? 'Turquoise' : 
			d == "Northwestern Division" ? 'Red' : 
			d == "Pacific Ocean Division" ? 'Blue' : 
			d == "South Atlantic Division" ? 'Orange' : 
			d == "South Pacific Division" ? 'Green' : 
			d == "Southwestern Division" ? 'Yellow' : 
											'#BD0026' ; 
	};


	const divisionStyle = (feature) => {
    return {
        fillColor: getDivisionColor(feature.properties.DIVISION),
		weight: 2,
		fillOpacity: 0.4,
		color: 'gray'  //outline color
    	};
	};



const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: 'solid',
		fillOpacity: 2,
		color: 'gray'  //Outline color on mouseover hightlight
    });
	 
    
	info.update(layer.feature.properties);
}


const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
}

const resetHighlight = (e) => {
	divisions.resetStyle(e.target);
	info.update();
	
}

const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}



const divisions = L.geoJSON(json_PacificOceanDivision_1, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_NorthAtlanticDivision_2, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_SouthAtlanticDivision_3, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_GreatLakesOhioRiverDivision_4, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_MississippiValleyDivision_5, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_SouthwesternDivision_6, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_SouthPacificDivision_7, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			L.geoJSON(json_NorthwesternDivision_8, {style: divisionStyle, onEachFeature: onEachFeature}).addTo(mymap);
			//L.geoJSON(json_USACEHQ_9, {pointToLayer: function (point, latlng){ return L.circleMarker(latlng, HQ).bindPopup("HQ: " + point.properties.Name)}}).addTo(mymap);
			//L.geoJSON(json_USACEInstallations_10, {pointToLayer: function (point, latlng){ return L.circleMarker(latlng, districts).bindPopup("District: " + point.properties.Name)}}).addTo(mymap);
	


const HQ = L.geoJSON(json_USACEHQ_9, {pointToLayer: function (point, latlng){ return L.circleMarker(latlng, HQstyle).bindPopup("HQ: " + point.properties.Name)}}).addTo(mymap);
				
	


const districts = L.geoJSON(json_USACEInstallations_10, {pointToLayer: function (point, latlng){ return L.shapeMarker(latlng, districtStyle).bindPopup("District: " + point.properties.Name)}}).addTo(mymap);
		


	const baseLayer = {
		"Satellite": basemap2,
		"Streets": basemap,
	};
		
	const installationLayer = {
		
		"Districts": districts,
		"Headquarters": HQ,
		
		
	};
	
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
	const div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Legend</strong>'],
    categories = ["Northwestern Division", "Pacific Ocean Division", "North Atlantic Division", "Southwestern Division", "South Atlantic Division", "Mississippi Valley Division", "Great Lakes and Ohio River Division", "South Pacific Division"];

    for (let i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
				'<i class="square" style="background:' + getDivisionColor(categories[i]) + ' "></i> ' + 
				(categories[i] ? categories[i] : '+'));
	};
        div.innerHTML = labels.join('<br>');
    return div;
    };


legend.addTo(mymap);

const legend2 = L.control({position: 'bottomleft'});

legend2.onAdd = function (map) {
	const div = L.DomUtil.create('div', 'info legend');
		div.innerHTML += '<strong class="text1">Headquarters</strong>' + '<br>' + '<div id="circle"></div>'
		div.innerHTML += '<br>'
        div.innerHTML += '<strong class="text2">Districts</strong>' + '<br>' + '<div id="square"></div>'
    return div;
    };

legend2.addTo(mymap);



const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>USACE</h4>' +  (props ?
        '<b>' + props.DISTRICT + ' District' + '</b><br />' + props.DIVISION + ''
        : 'Hover over a district');
};

info.addTo(mymap);

L.control.layers(baseLayer, installationLayer).addTo(mymap);


