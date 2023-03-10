import { wgs84togcj02 } from "coordtransform";

// Define the function we could use after.
function getParamString(obj, existingUrl, uppercase) {
  var params = [];
  for (var i in obj) {
    params.push(
      encodeURIComponent(uppercase ? i.toUpperCase() : i) +
        "=" +
        encodeURIComponent(obj[i])
    );
  }
  return (
    (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") +
    params.join("&")
  );
}

// Define the function we could use after.
function toBounds(a, b) {
  if (!a || a instanceof L.Bounds) {
    return a;
  }
  return new L.Bounds(a, b);
}

/* 
 Check whether the L, the L.TileLayer and 
 the L.TileLayer.WMS has been imported. 
*/
if (L && L.TileLayer && L.TileLayer.WMS) {
  L.TileLayer.WMSOffset = L.TileLayer.WMS.extend({
    initialize(wmsUrl, options) {
      L.TileLayer.WMS.prototype.initialize.call(this, wmsUrl, options);
    },
    getTileUrl(coords) {
      // Get the default coords.
      let [Nw, Se] = this._tileCoordsToNwSe(coords);
      // Calculate the transformed coords.
      let pt1To02 = wgs84togcj02(Nw.lng, Nw.lat),
        pt2To02 = wgs84togcj02(Se.lng, Se.lat),
        pt1Trans = { lat: pt1To02[1], lng: pt1To02[0] },
        pt2Trans = { lat: pt2To02[1], lng: pt2To02[0] };
      // Combine the url with some parameters.
      let crs = this._crs,
        bounds = toBounds(crs.project(pt1Trans), crs.project(pt2Trans)),
        min = bounds.min,
        max = bounds.max,
        bbox = [min.x, min.y, max.x, max.y].join(","), // left-bottom -> right-top
        url = L.TileLayer.prototype.getTileUrl.call(this, coords);
      return (
        url +
        getParamString(this.wmsParams, url, this.options.uppercase) +
        (this.options.uppercase ? "&BBOX=" : "&bbox=") +
        bbox
      );
    },
  });
  L.tileLayer.wmsOffset = function (url, options) {
    return new L.TileLayer.WMSOffset(url, options);
  };
} else {
  throw Error("You must import the leaflet.js before.");
}

/* 
 Check whether the L, the L.TileLayer has been imported. 
*/
if (L && L.TileLayer) {
  L.TileLayerOffset = L.TileLayer.extend({
    /* Set a transform of the centre point by the function wgs84togcj02.*/
    _setTransCenter(center) {
      const centerTrans = wgs84togcj02(center.lng, center.lat);
      return { lat: centerTrans[1], lng: centerTrans[0] };
    },
    _setZoomTransform(level, center, zoom) {
      center = this._setTransCenter(center);
      const scale = this._map.getZoomScale(zoom, level.zoom),
        translate = level.origin
          .multiplyBy(scale)
          .subtract(this._map._getNewPixelOrigin(center, zoom))
          .round();
      L.DomUtil.setTransform(level.el, translate, scale);
    },
    _getTiledPixelBounds(center) {
      center = this._setTransCenter(center);
      const map = this._map,
        mapZoom = map._animatingZoom
          ? Math.max(map._animateToZoom, map.getZoom())
          : map.getZoom(),
        scale = map.getZoomScale(mapZoom, this._tileZoom),
        pixelCenter = map.project(center, this._tileZoom).floor(),
        halfSize = map.getSize().divideBy(scale * 2);

      return new L.Bounds(
        pixelCenter.subtract(halfSize),
        pixelCenter.add(halfSize)
      );
    },
  });
  L.tileLayerOffset = function (url, options) {
    return new L.TileLayerOffset(url, options);
  };
} else {
  throw Error("You must import the leaflet.js before.");
}
