import { useEffect, useState } from "react";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./MapComp.css";

const MapComp = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyBHXk3SfXzOQBNgI3akcUeUeNMa82v7qdM",
	});
	const [res, setRes] = useState([]);
	const [selectedOption, setSelectedOption] = useState(0);
	const [center, setCenter] = useState({
		lat: -34.9054475585439,
		lng: -56.16855841716328,
	});

	const handleSelectChange = (event) => {
		setSelectedOption(parseInt(event.target.value));
	};

	const handleRedirect = (path) => {
		if (selectedOption > 0) {
			let value = res.find((item) => item.id === selectedOption);
			window.location.href = value.subdominio;
		}
	};

	useEffect(() => {
		if (selectedOption > 0) {
			let value = res.find((item) => item.id === selectedOption);
			setCenter({
				lat: parseFloat(value.latitud),
				lng: parseFloat(value.longitud),
			});
		}
	}, [selectedOption]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://apitienda.rhinox.io/v1/tienda/getSucursalesNegocio/445",
					{
						headers: {
							Authorization:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Njc1NjQzNyIsIm5hbWUiOiJSdWR5IGJ1cmdlcnMiLCJpYXQiOjEwOTg1NTI1OTJ9.PuC8rQIRpoaIcHJzE16h8-QBPgWhYy_HQ8NenMZfnss",
							// cors
							"Access-Control-Allow-Origin": "*",
						},
					}
				);
				if (!response.ok) {
					throw new Error("Error al cargar los datos");
				}
				const responseData = await response.json();
				setRes(responseData.sucursales);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="map-section h-full">
			<article className="h-full">
				<div className="sucursal-container">
					<div className="select-container">
						<select
							value={selectedOption}
							onChange={handleSelectChange}
							defaultValue="0">
							<option value="0" disabled>
								Elige tu sucursal
							</option>
							{res.map((item) => (
								<option key={item.id} value={item.id}>
									{item.nombre} {item.tiempo_entrega_takeaway}{" "}
									min
								</option>
							))}
						</select>
					</div>
				</div>
				{!isLoaded ? (
					<div className="spinner-container">
						<span className="spinner"></span>
					</div>
				) : (
					<div className="map-container h-full min-h-[375px]">
						<GoogleMap
							mapContainerClassName="map"
							center={center}
							zoom={12}>
							{res.map((item) => (
								<Marker
									key={item.id}
									position={{
										lat: parseFloat(item.latitud),
										lng: parseFloat(item.longitud),
									}}
								/>
							))}
						</GoogleMap>
					</div>
				)}
				<div className="h-full w-full flex items-center justify-center">
					<button className="order " onClick={() => handleRedirect()}>
						{" "}
						Hacer mi pedido
					</button>
				</div>
			</article>
		</section>
	);
};

export default MapComp;
