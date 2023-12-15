
export default function ExhibitorContactInfo({ profile }: any) {
  return (
    <div className="flex flex-col gap-2 border-b border-b-gray-250 mb-4 pb-4">
      <span className="font-bold block text-lg">اطلاعات تماس:</span>
      <span className="block mr-auto">{profile?.exhibition_phone_number}</span>
    </div>
  );
}
