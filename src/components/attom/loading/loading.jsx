import { img } from "@/data";

export function Loading() {
  return (
    <div className="flex justify-center h-full items-center py-56">
      <picture>
        <img
          src={img.loading_gif.src}
          alt="loading"
          loading="lazy"
          className="w-36"
        />
      </picture>
    </div>
  );
}
