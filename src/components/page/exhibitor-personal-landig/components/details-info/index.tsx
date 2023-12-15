import ExhibitorAddress from "@/molcule/product-view/details@/components/advertiser-info/exhibitor/address";
import ExhibitorMap from "@/molcule/product-view/details@/components/advertiser-info/exhibitor/map";
import ExhibitorBranches from "./branches";
import ExhibitorContactInfo from "./contact-info";
import ExhibitorWorkHours from "./work-hours";

export default function ExhibiitorsDetailInfo({ profile }: any) {
  return (
    <div className="border border-gray-250 p-6 rounded mt-4 grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="lg:col-span-2 col-span-1">
        <ExhibitorContactInfo profile={profile}/>
        <ExhibitorBranches profile={profile}/>
        <ExhibitorWorkHours profile={profile}/>
      </div>
      <div className="lg:col-span-3 col-span-1 lg:flex gap-4">
        <ExhibitorAddress exhibitor_profile={profile} />

        {profile?.exhibition_location_lat && (
          <ExhibitorMap
            exhibitor_name={profile?.exhibition_name}
            location={[
              profile?.exhibition_location_lat,
              profile?.exhibition_location_long,
            ]}
          />
        )}
      </div>
    </div>
  );
}
