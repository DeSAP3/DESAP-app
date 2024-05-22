import React from "react";
import {
	ComposableMap,
	Graticule,
	Geographies,
	Geography,
	Marker,
} from "react-simple-maps";
import { AnnotationLabel, AnnotationCalloutRect } from "react-annotation";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
	return (
		<ComposableMap
			projection='geoAzimuthalEqualArea'
			projectionConfig={{
				rotate: [-10, -52, 0],
				scale: 720,
			}}
		>
			<Graticule stroke='#EEE' />
			<Geographies geography={geoUrl}>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography
							key={geo.rsmKey}
							geography={geo}
							fill='#DDD'
							stroke='#FFF'
						/>
					))
				}
			</Geographies>
			<Marker coordinates={[7.4474, 46.948]}>
				<circle cx={0} cy={0} r={4} fill='#F53' />
				<AnnotationLabel
					x={0}
					y={0}
					dy={-117}
					dx={-162}
					color='#F53'
					className='show-bg'
					note={{
						title: "Bern",
						label: "Switzerland",
						align: "middle",
						orientation: "topBottom",
						bgPadding: 20,
						padding: 15,
						titleColor: "#000",
					}}
				/>
			</Marker>
			<Marker coordinates={[7.9, 41.3]}>
				<AnnotationCalloutRect
					x={0}
					y={0}
					dy={60}
					dx={80}
					color={"#F53"}
					note={{
						title: "Sardinia",
						label: "Italy",
						lineType: "horizontal",
					}}
					subject={{
						width: 21,
						height: 32,
						titleColor: "#000",
					}}
				/>
			</Marker>
		</ComposableMap>
	);
};

export default MapChart;
