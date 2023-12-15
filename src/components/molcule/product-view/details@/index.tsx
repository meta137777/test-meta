"use client";
import { GetAdSaleIdView } from "@/apis/ad-sale/get-ad-sale-id-view";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useEffect } from "react";
import ProductExhibitorData from "./components/advertiser-info/exhibitor";
import ProductUserData from "./components/advertiser-info/user";
import AdminConfirm from "./components/delete-reason";
import ImagePreview from "./components/image-preview";
import ProductLeasing from "./components/leasing";
import MainInfo from "./components/main-info";
import Description from "./components/main-info/description";
import CarDetail from "./components/main-info/detail";
import ReturnButton from "./components/return-button";
import { ProductDetailsTypes } from "./type";

const ProductDetails = ({
  productData = {},
  inAdminPanel = false,
  isLoading = false,
  exhibitor_profile = {},
  user_name = null,
}: ProductDetailsTypes) => {
  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && Object.keys(productData).length === 0) {
    return <Alert type="error" title="کد آگهی نامعتبر است." />;
  } else {
    const is_leasing = productData.is_car_made_aboard
      ? productData.year_of_manufacture_display > 2013
        ? true
        : false
      : productData.year_of_manufacture_display > 1397
      ? true
      : false;

    useEffect(() => {
      GetAdSaleIdView(productData.advertiser_id);
    }, []);

    return (
      <>
        <ReturnButton />
        <div className="product-details grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
          {/* نمایش عکس‌ها */}

          <ImagePreview
            imageGuids={productData.image_guids}
            ad_code={productData.ad_code}
            inAdminPanel={inAdminPanel}
            like_count={productData.like}
          />
          {/* اطلاعات کلی خودرو - خرید */}
          <MainInfo productData={productData} is_leasing={is_leasing} />
        </div>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 mt-4">
          {/* اقساطی*/}
          {is_leasing ? (
            <ProductLeasing
              announced_price={productData.announced_price}
              advertiser_id={productData.advertiser_id}
              ad_code={productData.ad_code}
            />
          ) : (
            <div></div>
          )}

          {/* اطلاعات ریز خودرو */}
          <div>
            <CarDetail
              mileage={productData.mileage}
              year_of_manufacture_display={
                productData.year_of_manufacture_display
              }
              fuel_type={productData.fuel_type}
              gear_box_type={productData.gear_box_type}
            />
            {/* توضیحات */}
            <Description
              data={productData.description}
              keywords={productData.keywords}
            />
          </div>
        </div>

        {/* اطلاعات نمایشگاه دار*/}
        {productData.advertiser_type == "نمایشگاه دار" && (
          <ProductExhibitorData
            exhibitor_profile={exhibitor_profile}
            user_name={user_name}
          />
        )}

        {/* اطلاعات شخصی*/}
        {productData.advertiser_type == "شخصی" && (
          <ProductUserData
            name={productData.name}
            location={[productData?.location_long, productData?.location_lat]}
          />
        )}

        {/* تایید و عدم تایید آگهی*/}
        {inAdminPanel && (
          <AdminConfirm
            name={productData.name}
            advertiser_id={productData.advertiser_id}
            is_published={productData.is_published}
          />
        )}
      </>
    );
  }
};

export default ProductDetails;
