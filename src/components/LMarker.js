import React from "react";
import { PropTypes } from "prop-types";
import { MapContext } from "./LMap";

class LMarker extends React.Component {
  constructor() {
    super();
    this.marker = null;
  }
  static contextType = MapContext;
  static propTypes = {
    point: PropTypes.array.isRequired,
    options: PropTypes.any,
  };
  render() {
    this._initialLayer();
    return <></>;
  }
  _initialLayer() {
    const map = this.context;
    const { point, options } = this.props;
    if (map && !this.marker) {
      let marker = L.marker(point, options);
      marker.addTo(map);
      this.marker = marker;
    }
  }
  _removeLayer() {
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }
}

export default LMarker;
