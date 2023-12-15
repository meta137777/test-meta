import { img } from "@/data";
import RegisterCard from "../../components/register/registerCardForm";

const ExhibitorHeaderBanner = () => {
  return (
    
      <div
        className="mx-auto lg:p-10 p-5 flex items-center md:justify-end justify-center rounded my-4"
        style={{
          background: `url(${img.exhibitor_header_banner.src}) no-repeat center right`,
          backgroundSize: "cover",
          boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.16)' 
        }}
      >
        <div
          className="tablet:w-[22rem] md:w-[22rem] w-full flex flex-col rounded pt-4 bg-white p-4"
          style={{ boxShadow: "0px 1px 11px 0px rgba(0, 0, 0, 0.33)" }}
        >
          <div className="tablet:flex tablet:flex-row flex-col justify-between border-b border-b-gray-250 pb-2">
            <span className=" text-lg pb-2 px-2 font-bold">
              نمایشگاه خود را مجازی کنید!
            </span>
          </div>
          <p className="font-medium mt-3">
            کافیست شماره موبایل خود را وارد کنید :
          </p>
          <RegisterCard />
        </div>
      </div>
    
  );
};

export default ExhibitorHeaderBanner;
