
export default function ExhibitorBranches({ profile }: any) {
  return profile?.exhibition_branches_infos?.map(
    ({ branch_name, phone_number }: any) => {
      return (
        <div key={phone_number} className="flex justify-between mt-5">
          <span>{branch_name}:</span>
          <span>{phone_number}</span>
        </div>
      );
    }
  );
}
