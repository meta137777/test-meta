import { icons } from "@/data";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function ({ position, name }: { position: any; name: string }) {
  const mapSettings = {
    center: position,
    zoom: 13,
  };

  const markerIcon = L.icon({
    iconUrl: icons.markerIcon.src,
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const navigateLocation = (lat: any, long: any) => {
    const url = `http://maps.google.com/maps?daddr=${lat},${long}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <MapContainer
        {...mapSettings}
        style={{
          // height: "10rem",
          width: "100%",
          borderRadius: "4px",
          marginTop: "10px",
          zIndex: 0
        }}

        className="lg:h-[9.5rem] h-[10rem]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Oto khodro &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> "
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>

      <button
        onClick={() => navigateLocation(position[0], position[1])}
        className="border border-[#B1C8FD] py-2 rounded text-center text-blue w-full mt-2 gap-1 flex items-center justify-center font-medium "
      >
        مسیریابی
        <IoChevronBackOutline />
      </button>
    </div>
  );
}
