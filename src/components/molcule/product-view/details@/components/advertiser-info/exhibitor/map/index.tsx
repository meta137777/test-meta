import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@/page/exhibitor-personal-landig/components/address/map"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          flexGrow: 1,
          textAlign: "center",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        در حال بارگزاری نقشه ...
      </div>
    ),
  }
);

export default function ExhibitorMap({ location, exhibitor_name }: any) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Map name={exhibitor_name} position={location} />
    </div>
  );
}
