import { AnonymousUserLikeAdAPI, LoginUserLikeAdAPI } from "@/apis/like-ad";
import { FRONT2MESSAGE } from "@/config/url";
import { icons } from "@/data";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";
import httpService from "@/services/http-service";
import { checkExistWindow } from "@/utils/check-exist-window";
import { isTokenExpired } from "@/utils/jwt";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

type LikeIconInCardsPropsType = {
  productDetail: {
    advertiser_id: string | number;
    like: boolean | number;
  };
  index: string | number;
  advertiser_id: number | string;
};

export default function LikeIconInCards({
  productDetail,
  index,
  advertiser_id,
}: LikeIconInCardsPropsType) {
  const [likeCounts, setLikeCounts] = useState<number | boolean>();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [isLiked, setIsliked] = useState(false);

  useEffect(() => {
    if (
      userInfo.phone_number &&
      !isTokenExpired(
        checkExistWindow() && window.localStorage.getItem("userToken")
      )
    ) {
      LoginUserLikeAdAPI().then((res) => {
        return res.ads?.map((item: { advertiser_id: number | string }) => {
          if (item.advertiser_id == advertiser_id) {
            setIsliked(true);
          }
        });
      });
    } else {
      AnonymousUserLikeAdAPI().then((res) => {
        res?.user?.Likes?.map((item: number | string) => {
          if (item == advertiser_id) {
            setIsliked(true);
          }
        });
      });
    }
    setLikeCounts(productDetail?.like);
  }, [advertiser_id]);

  {
    /*@ts-ignore */
  }

  const handleLike = (e, position) => {
    //*@ts-ignore

    setLikeCounts(likeCounts + 1);
    setLoading(true);
    e.stopPropagation();
    console.log("i am children");
    httpService
      .get(
        `${FRONT2MESSAGE}/AdSale/Id/${
          advertiser_id ? advertiser_id : productDetail.advertiser_id
        }/Like`
      )
      .then((res) => {
        setLoading(false);
        setIsliked(true);
      })
      .catch(() => {
        setLoading(false);
        toast.error("مشکلی پیش آمده است");
      });
  };

  const handleDisLike = (e: React.MouseEvent, position: number) => {
    e.stopPropagation();
    setLikeCounts(Number(likeCounts) - 1);
    setLoading(true);
    httpService
      .get(
        `${FRONT2MESSAGE}/AdSale/Id/${
          advertiser_id ? advertiser_id : productDetail.advertiser_id
        }/UnLike`
      )
      .then(() => {
        setLoading(false);
        setIsliked(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("حذف آگهی با خطا مواجه شد.");
      });
  };

  return isLiked ? (
    <button className="flex items-center justify-center h-9 w-9 hover:bg-[#FFE6E8] rounded-full p-2">
      <img
        src={icons.heart_2.src}
        alt=""
        className="w-7"
        onClick={(e) => (loading ? () => {} : handleDisLike(e, Number(index)))}
      />
    </button>
  ) : (
    <button className="flex items-center h-9 w-9 hover:bg-[#FFE6E8] rounded-full p-2">
      <img
        src={icons.heart_1.src}
        alt="like"
        onClick={(e) => (loading ? () => {} : handleLike(e, index))}
      />
    </button>
  );
}
