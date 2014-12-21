// custom map markers that use actual dom elements
// from http://aaronmiler.com/blog/google-maps-v3-custom-html-map-marker/

// modified to use options hash
function CustomMarker(options) {
     this.latlng_ = options.position;
     this.path = options.icon.path;
     this.size = options.icon.size;
     this.fillOpacity = options.icon.fillOpacity;
     this.fillColor = options.icon.fillColor;
     this.className = options.className;

     // Once the LatLng and text are set, add the overlay to the map.  This will
     // trigger a call to panes_changed which should in turn call draw.
     this.setMap(options['map']);
   }

   CustomMarker.prototype = new google.maps.OverlayView();

   CustomMarker.prototype.draw = function() {
     var me = this;

     // Check if the div has been created.
     var div = this.div_;
     if (!div) {
       // Create a overlay text DIV
       div = this.div_ = document.createElement('DIV');
       div.innerHTML = '<svg><g transform="translate(4,4.5)">' +
              '<path class="outline" d="'+this.path+'"/>' +
              '<path class="fill" d="'+this.path+'"/>' +
              '</g></svg>' +
              '<div class="marker-text"/>';
       div.className = "marker " + this.className;
       div.style.position = 'absolute';
       div.style.paddingLeft = '0px';
       div.style.cursor = 'pointer';
       div.style.width = this.size[0]+'px';
       div.style.height = this.size[1]+'px';

       google.maps.event.addDomListener(div, "click", function(event) {
         google.maps.event.trigger(me, "click");
       });

       // Then add the overlay to the DOM
       var panes = this.getPanes();
       panes.overlayImage.appendChild(div);
     }

     // Position the overlay 
     var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
     if (point) {
       div.style.left = point.x + 'px';
       div.style.top = point.y + 'px';
     }
   };

   CustomMarker.prototype.remove = function() {
     // Check if the overlay was on the map and needs to be removed.
     if (this.div_) {
       this.div_.parentNode.removeChild(this.div_);
       this.div_ = null;
     }
   };

   CustomMarker.prototype.getPosition = function() {
    return this.latlng_;
   };