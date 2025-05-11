let map, geocoder, marker;

function initMap() {
  geocoder = new google.maps.Geocoder();
  
  // Xarita markazi va boshlang‘ich pozitsiya
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.730610, lng: -73.935242 }, // Masalan, Nyu-York markazi
    zoom: 12,
  });

  // Marker qo‘ying va uning joylashuvi ustida harakatlaning
  marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    draggable: true,
  });

  // Markerni sudrab olib, yangi manzilni olish
  marker.addListener("dragend", function() {
    geocodePosition(marker.getPosition());
  });
}

export default function geocodePosition(pos) {
  geocoder.geocode({ location: pos }, function(results, status) {
    if (status === "OK") {
      if (results[0]) {
        // Yangi manzilni olish
        const address = results[0].formatted_address;
        console.log("Address: " + address);

        // Postcode va street name-ni olish
        let postcode = '';
        let streetName = '';

        for (let i = 0; i < results[0].address_components.length; i++) {
          const component = results[0].address_components[i];
          if (component.types.includes("postal_code")) {
            postcode = component.long_name;
          }
          if (component.types.includes("route")) {
            streetName = component.long_name;
          }
        }

        console.log("Postcode: " + postcode);
        console.log("Street Name: " + streetName);
      } else {
        console.log("No results found");
      }
    } else {
      console.log("Geocoder failed due to: " + status);
    }
  });
}
