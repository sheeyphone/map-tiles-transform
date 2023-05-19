// Define the function we could use after.
function getParamString(obj, existingUrl, uppercase) {
  var params = [];
  for (var i in obj) {
    params.push(
      encodeURIComponent(uppercase ? i.toUpperCase() : i) +
        '=' +
        encodeURIComponent(obj[i])
    );
  }
  return (
    (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') +
    params.join('&')
  );
}

// Define the function we could use after.
function toBounds(a, b) {
  if (!a || a instanceof L.Bounds) {
    return a;
  }
  return new L.Bounds(a, b);
}

async function fetchPostForBlob(url, body) {
  const result = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return await result.blob();
}

if (L && L.TileLayer && L.TileLayer.WMS) {
  L.TileLayer.WMSCqlFetch = L.TileLayer.WMS.extend({
    initialize(wmsUrl, options, cql) {
      L.TileLayer.WMS.prototype.initialize.call(this, wmsUrl, options);
      this.cql = cql;
    },
    getTileUrl(coords) {
      // Get the default coords.
      let [Nw, Se] = this._tileCoordsToNwSe(coords);

      // Combine the url with some parameters.
      let crs = this._crs,
        bounds = toBounds(crs.project(Nw), crs.project(Se)),
        min = bounds.min,
        max = bounds.max,
        bbox = [min.x, min.y, max.x, max.y].join(','), // left-bottom -> right-top
        url = L.TileLayer.prototype.getTileUrl.call(this, coords);

      // Put cql filter into form body.
      let formBody = [];
      if (this.cql) {
        formBody.push(`cql_filter=${this.cql}`);
      }
      formBody = formBody.join('&');

      // Request for image blob.
      let requestUrl =
        url +
        getParamString(this.wmsParams, url, this.options.uppercase) +
        (this.options.uppercase ? '&BBOX=' : '&bbox=') +
        bbox;
      return fetchPostForBlob(requestUrl, formBody);
    },
    createTile(coords, done) {
      const tile = document.createElement('img');

      L.DomEvent.on(tile, 'load', this._tileOnLoad.bind(this, done, tile));
      L.DomEvent.on(tile, 'error', this._tileOnError.bind(this, done, tile));

      if (this.options.crossOrigin || this.options.crossOrigin === '') {
        tile.crossOrigin =
          this.options.crossOrigin === true ? '' : this.options.crossOrigin;
      }
      if (typeof this.options.referrerPolicy === 'string') {
        tile.referrerPolicy = this.options.referrerPolicy;
      }

      tile.alt = '';
      this.getTileUrl(coords).then((res) => {
        tile.src = URL.createObjectURL(res);
      });

      return tile;
    },
  });
  L.tileLayer.wmsCqlFetch = function (url, options) {
    return new L.TileLayer.WMSCqlFetch(url, options);
  };
} else {
  throw Error('You must import the leaflet.js before.');
}
