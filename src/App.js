import "./App.scss";
import React from "react";
import { LMap, LTileLayer } from "map-on-react";
import LMarker from "./components/LMarker";

const osmUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const gaodeUrl =
  "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";

const hkAirportWGS84 = [22.31292, 113.92715];
const mapConfig = {
  center: [22.31292, 113.92715],
  zoom: 15,
  zoomControl: false,
  attributionControl: true,
};

class App extends React.Component {
  state = {};
  render() {
    return (
      <div className="Container">
        <div className="App">
          <LMap mapId={"LMapDemo1"} configs={mapConfig}>
            <LTileLayer url={osmUrl} options={{ maxZoom: 19 }} />
            <LMarker point={hkAirportWGS84} options={{}} />
          </LMap>
          <div className="MapTips">OpenStreetMap(WGS84)</div>
        </div>
        <div className="App">
          <LMap mapId={"LMapDemo2"} configs={mapConfig}>
            <LTileLayer url={gaodeUrl} options={{ maxZoom: 19 }} />
            <LMarker point={hkAirportWGS84} options={{}} />
          </LMap>
          <div className="MapTips">GaoDeMap(GCJ02)</div>
        </div>
        <div className="App">
          <LMap mapId={"LMapDemo3"} configs={mapConfig}>
            <LTileLayer
              url={gaodeUrl}
              options={{ maxZoom: 19 }}
              CRSFix={true}
            />
            <LMarker point={hkAirportWGS84} options={{}} />
          </LMap>
          <div className="MapTips">GaoDeMap(Transformed)</div>
        </div>
      </div>
    );
  }
  /* The component's methods should be defined below. */
}

export default App;
