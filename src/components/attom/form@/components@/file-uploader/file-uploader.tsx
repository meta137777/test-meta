import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import ImageGuideModal from "./image-guide";
import Compressor from "compressorjs";

const DIVISION: number = 1048576; // 1 مگابایت
const MAX_FILE_SIZE: number = 250000; // 250 کیلوبایت

const fileTypes: string[] = ["JPG", "PNG", "JPEG"];

type ImageFileType = {
  id: number;
  name: string;
  size: number;
  src: any;
  isUploaded: boolean;
  blob: any;
};

type ImageUploaderProps = {
  imgsSrc: ImageFileType[];
  setImgsSrc: (images: ImageFileType[]) => void;
  imageCount?: number;
  tempStatus?: "update" | "add" | "single";
  tempLastImagesLength?: number;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imgsSrc,
  setImgsSrc,
  imageCount = 10,
  tempStatus = "add",
  tempLastImagesLength = 0,
}) => {
  

  const createThumbnail = (
    file: File,
    parentData: ImageFileType
  ): Promise<ImageFileType> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target || !event.target.result) {
          reject("FileReader did not load the file successfully.");
          return;
        }
        const imageResult = event.target.result as string;
        const img = new window.Image();
        img.src = imageResult;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject("Failed to get canvas context.");
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject("Failed to create blob from canvas.");
                return;
              }
              new Compressor(blob, {
                quality: 0.6,
                width: 270,
                height: 210,
                resize: "cover",
                success(result) {
                  const compressedImageSrc = URL.createObjectURL(result);
                  resolve({
                    id: parentData.id,
                    name: "resized-" + parentData.name,
                    size: result.size,
                    src: compressedImageSrc,
                    blob: result,
                    isUploaded: false,
                  });
                },
                error(err) {
                  reject(err);
                },
              });
            },
            "image/webp",
            0.5
          );
        };
        img.onerror = () => {
          reject("Image failed to load.");
        };
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast.error("Error reading file.");
        reject(error);
      };
    });
  };

  const processImage = (file: File, imageNumber: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target || !event.target.result) return;
      const imageResult = event.target.result as string;

      if (file.size > MAX_FILE_SIZE) {
        toast.error("حجم فایل نباید بیشتر از 250 کیلوبایت باشد.");
        return;
      }

      const img = new window.Image();
      img.src = imageResult;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx: any = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              if (imageNumber === 0) {
                const compressedImageSrc = URL.createObjectURL(blob);
                const uniqueId = Math.random();
                const tempImage = {
                  id: uniqueId,
                  name: file.name,
                  size: blob.size,
                  src: compressedImageSrc,
                  blob: blob,
                  isUploaded: false,
                };

                if (
                  (tempStatus === "update" && tempLastImagesLength <= 0) ||
                  tempStatus === "add"
                ) {
                  setImgsSrc([
                    await createThumbnail(file, tempImage),
                    tempImage,
                  ]);
                } else {
                  setImgsSrc([tempImage]);
                }
              } else {
                await new Compressor(blob, {
                  quality: 0.6,
                  success(result) {
                    const compressedImageSrc = URL.createObjectURL(result);
                    setImgsSrc([
                      ...imgsSrc,
                      {
                        id: Math.random(),
                        name: file.name,
                        size: result.size,
                        src: compressedImageSrc,
                        blob: blob,
                        isUploaded: false,
                      },
                    ]);
                  },
                });
              }
            }
          },
          "image/webp",
          0.5
        );
      };
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      toast.error("خطا در خواندن فایل.");
    };
  };

  const PreviewImage: React.FC<{ file: ImageFileType }> = ({ file }) => {
    return (
      <div
        className="flex flex-col items-center rounded-md m-2 justify-between bg-white p-3 relative w-full border border-grey-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-4 -right-3 gap-3 cursor-pointer">
          <CloseCircle
            onClick={(e) => cancleUpload(e, file.id)}
            size="28"
            variant="Bulk"
            color="#697689"
          />
        </div>

        <img className="rounded object-cover w-full h-24" src={file.src} />
        <span className=" whitespace-nowrap truncate hover:text-clip font-bold ltr w-full text-center mt-4">
          {file.name}
        </span>

        <span className="text-[#ACADAC] mt-2">
          {Math.round(file.size / DIVISION) <= 0
            ? "1mb"
            : `${Math.round(file.size / DIVISION)}Mb`}
        </span>
      </div>
    );
  };

  const fileRef: any =
    typeof window !== "undefined" &&
    window.document.querySelector("input[type='file']");

  if (fileRef) fileRef["value"] = "";

  const cancleUpload = async (e: any, id: any) => {
    const index = imgsSrc.findIndex((item) => item.id === id);
    if (index === 0) {
      const arr = imgsSrc.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      arr.shift();
      if (arr.length && tempStatus === "add") {
        arr.unshift(await createThumbnail(arr[0].blob, arr[0]));
      }
      setImgsSrc(arr);
      return;
    }

    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setImgsSrc(
      [...imgsSrc].filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleChange = (files: File[]) => {
    if (imgsSrc?.length > imageCount) {
      toast.error(`شما قادر به آپلود ${imageCount} عکس هستید.`);
      return;
    } else {
      for (const file of files) {
        processImage(file, imgsSrc?.length);
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  return (
    <div
      className={`bg-white rounded-md file_uploader ${
        imgsSrc.length == 0 ? "h-[18rem]" : "h-max"
      }`}
    >
      <div className="border w-full justify-center border-grey-dark border-dashed flex flex-col items-center rounded-md p-5 bg-white relative h-full">
        <ImageGuideModal
          onClick={handleOpen}
          open={open}
          onClose={handleClose}
        />

        <div className="grid md:grid-cols-4 grid-cols-1 flex-wrap p-3 gap-4 w-full">
          {tempStatus === "update"
            ? [...imgsSrc]?.map((file, index) => {
                return <PreviewImage key={index} file={file} />;
              })
            : [...imgsSrc]?.map((file, index) => {
                if (index !== 0) {
                  return <PreviewImage key={index} file={file} />;
                }
                return null;
              })}
        </div>

        {imgsSrc.length > 0 && (
          <h3>
            {tempStatus === "update" ? imgsSrc.length : imgsSrc.length - 1}/
            {imageCount}
          </h3>
        )}

        <FileUploader
          className="flex flex-wrap p-3"
          multiple={true}
          handleChange={handleChange}
          name="file"
          onTypeError={() => toast.error("فرمت فایل غیرمجاز است.")}
          types={fileTypes}
        ></FileUploader>
      </div>
    </div>
  );
};

export default ImageUploader;
