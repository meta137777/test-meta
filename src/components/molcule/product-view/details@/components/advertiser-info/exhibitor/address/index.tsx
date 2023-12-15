export default function ExhibitorAddress({ exhibitor_profile }: any) {
  return (
    <div className="lg:w-1/3">
      <p className="text-justify">
        <span className="font-bold">آدرس:</span>
        <span className="text-sm">
          {" "}
          {exhibitor_profile?.exhibition_address}
        </span>
      </p>
    </div>
  );
}
