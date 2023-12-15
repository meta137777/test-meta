"use client";
import { GetAdSaleIdInfo, GetAdsaleGetCode } from "@/apis/ad-sale";
import { AUTH_URL, FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { AxiosRequestConfig } from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

type ImageFileType = {
  id: number;
  name: string;
  size: number;
  src: any;
  isUploaded: boolean;
  blob: any;
};

export default function Page() {

  const [loadingAds, setLoadingAds] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");
  const [postData, setPostData] = useState<any>({});
  const [blobImages, setBlobImages] = useState<any>([]);
  const [imgsSrc, setImgsSrc] = useState<any>([]);
  const [loadingSaveAds, setLoadingSaveAds] = useState<boolean>(false);

  const config: AxiosRequestConfig = { responseType: "blob" as const };

  const fetchImages = async (imageGuids: string) => {
    const imageArray: string[] = imageGuids.split(",").filter((item: any) => item);
    const result = await Promise.all(
      imageArray.map(async (item: string) => {
        const imgRes: any = await httpService.get(`${FRONT2DB}/Images/Id/${item}`, config).then((res) => { return res; })
        return imgRes;
      })
    );
    setLoadingAds(false);
    setBlobImages(result);
  };

  const getAdsDetails = (adsId: number) => {
    GetAdsaleGetCode(adsId).then((response: any) => {
      GetAdSaleIdInfo(response.advertiser_id).then((response1) => {
        setPostData({...response, ...response1});
        fetchImages(response?.image_guids)
      });
    })
  }

  const clickLoadAds = () => {
    setLoadingAds(true);
    getAdsDetails(Number(postId));
  };

  const handleInputChange = (e: any) => {
    setPostId(e.target.value);
  }

  const createThumbnail = (file: File, parentData: ImageFileType): Promise<ImageFileType> => {
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

  const processImage = (file: File, fileName: string): Promise<ImageFileType> => {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target || !event.target.result) return;
        const imageResult = event.target.result as string;

        const img = new window.Image();
        img.src = imageResult;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx: any = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(async (blob) => {
            if (blob) {
              const result: Blob = await new Promise((resolve, reject) => {
                new Compressor(blob, {
                  quality: 0.6,
                  success: resolve,
                  error: reject,
                });
              });
              const compressedImageSrc = URL.createObjectURL(result);
    
              const id = Math.random();
              resolve({
                id: id,
                name: fileName + id,
                size: result.size,
                src: compressedImageSrc,
                blob: result,
                isUploaded: false,
              });
            }
          }, "image/webp", 0.5);

        };
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast.error("خطا در خواندن فایل.");
      };
      
    })
  };

  const compressImages = async () => {
    let temp = [];
  
    for (const file of blobImages) {
      temp.push(processImage(file?.data, "compressImages"));
    }
  
    const processedImages = await Promise.all(temp);
    const thumb = await createThumbnail(blobImages[0].data, processedImages[0]);
    setImgsSrc([thumb, ...processedImages]);
  };

  const updateImages = async () => {
    setLoadingSaveAds(true);
    const formData = new FormData();
    formData.append("user_name", postData?.Info?.info);
    formData.append("advertiser_id", postData?.advertiser_id);
    formData.append("is_public", postData?.is_published);
    imgsSrc.map((image: ImageFileType) => formData.append("files", image.blob));

    await httpService.post(`${AUTH_URL}/Admin/Optimize/AdSale/Images`, formData).finally(() => {
      setLoadingAds(false);
      setPostId("");
      setPostData({});
      setBlobImages([]);
      setImgsSrc([]);
      setLoadingSaveAds(false);
    });
  }

  return (
    <div className="border-solid border-2 p-[25px]">
      <div className="flex justify-between items-center">
        <p>کد آگهی</p>
        <input 
          type="text" 
          id="post_id" 
          name="post_id" 
          className="border border-gray-300 text-gray-900 text-sm rounded-lg" 
          value={postId}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={clickLoadAds}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            بارگزاری
        </button>
      </div>
      <hr className="my-[25px]" />
      <div>
        {
          loadingAds ? <p className="p-[15px] text-center">در حال بارگزاری آگهی ...</p> : (Object.getOwnPropertyNames(postData).length === 0) ? null :
          <Fragment>
            <div dir="ltr">
              <p>ad_code: {postData?.ad_code}</p>
              <p>user_name: {postData?.Info?.info}</p>
              <p>advertiser_id: {postData?.advertiser_id}</p>
              <p>is_public: {postData?.is_published?.toString()}</p>
              <br/>
              <div>
                <p>images Id: </p>
                {
                  postData?.image_guids?.split(",").map((image: any) => (
                    <p>{image}</p>
                  ))
                }
              </div>
            </div>
            <hr className="my-[25px]" />
            <div>
              <p>تصاویر قبلی : </p>
              <div className="flex flex-wrap">
                {
                  blobImages.length > 0 && blobImages?.map((image: any) => (
                    <img
                      // src={`data:image/png;base64,${image}`}
                      src={`${window.URL.createObjectURL(image?.data)}`}
                      className={`h-full object-contain w-[250px] m-[15px]`}
                    />
                  ))
                }
              </div>
            </div>

            <hr className="my-[25px]" />
            <button
              type="button"
              onClick={compressImages}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                تبدیل تصاویر به WEBP و فشرده سازی
            </button>

            <hr className="my-[25px]" />

            <div>
              {
                imgsSrc.length > 0 &&

                <Fragment>

                  <p>تصاویر جدید : </p>
                  <div className="flex flex-wrap">
                    {
                      imgsSrc?.slice(1)?.map((image: any) => (
                        <img src={`${window.URL.createObjectURL(image?.blob)}`}className={`h-full object-contain w-[250px] m-[15px]`}/>
                      ))
                    }
                  </div>
                  <p>تصاویر تامبنیل : </p>
                  <img src={`${window.URL.createObjectURL(imgsSrc[0]?.blob)}`} className={`h-full object-contain w-[250px] m-[15px]`}/>

                  <hr className="my-[25px]" />

                  <button
                    type="button"
                    onClick={updateImages}
                    disabled={loadingSaveAds}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      ویرایش آگهی
                  </button>

                </Fragment>
              }
            </div>

          </Fragment>
        }
      </div>
    </div>
  );
}