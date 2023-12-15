type ImageComponentType = {
  src: string;
  alt: string;
  className?: string;
};
const ImageComponent = ({ src, alt, className }: ImageComponentType) => {
  return (
    <div className="bg-[#F7F6F4] w-full rounded flex justify-center items-center h-96">
      <img
        src={src}
        alt={alt}
        className={`${className} h-full object-contain`}
      />
    </div>
  );
};

export default ImageComponent;
