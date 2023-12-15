import ExhibitorAddress from "./address";
import Branches from "./branches";
import ExhibitorMap from "./map";
import ExhibitorName from "./name";

export default function ProductExhibitorData({ exhibitor_profile, user_name }: any) {
  return (
    <div className="border border-gray-250 p-6 rounded mt-4 grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="lg:col-span-2 col-span-1">
        <ExhibitorName exhibitor_profile={exhibitor_profile} user_name={user_name}/>
        <Branches
          exhibition_branches_infos={
            exhibitor_profile?.exhibition_branches_infos
          }
          exhibition_working_hours={exhibitor_profile?.exhibition_working_hours}
        />
      </div>
      <div className="lg:col-span-3 col-span-1 lg:flex gap-4">
        <ExhibitorAddress exhibitor_profile={exhibitor_profile} />

        {exhibitor_profile?.exhibition_location_lat && (
          <ExhibitorMap
            exhibitor_name={exhibitor_profile?.exhibition_name}
            location={[
              exhibitor_profile?.exhibition_location_lat,
              exhibitor_profile?.exhibition_location_long,
            ]}
          />
        )}
      </div>
    </div>
  );
}
