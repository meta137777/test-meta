import { img } from "@/data";

const OurBenefits = () => {
  const detail = [
    {
      title: "قابل اعتماد",
      descrption:
        "برای خرید و فروش خودروی مور نظرتان به کارشناسان ما اعتماد کنید.",
      icon: img.trust_icon.src,
    },
    {
      title: "سرعت و دقت",
      descrption:
        "دقت در ارائه خدمات، شما را در سریع‌ترین زمان به هدفتان می‌رساند.",
      icon: img.speed_icon.src,
    },
    {
      title: "همراهی",
      descrption:
        "کارشناسان ما تا لحظه عقد قرارداد د مراحل مختلف همراه شما خواهند بود.",
      icon: img.communicate_icon.src,
    },
    {
      title: "تنوع خدمات",
      descrption:
        "کلیه خدمات شامل خرید، فروش، کارشناسی و قیمت‌گذاری را از ما بخواهید.",
      icon: img.variety_icon.src,
    },
  ];

  return (
    <div className="mt-16">
      <h3 className="font-bold text-center text-xl mb-6">ارزش‌های ما</h3>
      <img src={img.line_benefits.src} alt="line" />
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-4 gap-2 lg:px-16 mt-4">
        {detail.map((item, index) => {
          return (
            <div
              className="flex flex-col lg:gap-8 gap-2 p-4 rounded-3xl justify-center"
              key={index}
            >
              <img src={item.icon} className="h-10 mx-auto" />
              <h4 className="font-bold font-bols text-lg text-center">
                {item.title}
              </h4>
              <p className="text-center leading-relaxed md:text-base text-sm">
                {item.descrption}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurBenefits;
