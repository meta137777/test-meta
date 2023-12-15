import CustomSlider from "./custom-slider";

type MultiImageType = {
  inAdminPanel: boolean;
  base64Images: string[];
  like_count?: number;
};

export default function MultiImage({
  base64Images,
  like_count,
}: MultiImageType) {
  return <CustomSlider base64Images={base64Images} like_count={like_count ?? 0}/>;
}
