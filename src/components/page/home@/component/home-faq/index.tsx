import FAQ from "@/attom/faq/faq";

export default function HomeFAQ() {
  const accordionValue = [
    {
      title:
        "چرا خرید و فروش خودرو در اُتو مطمئن‌تر از معامله در بازار سنتی است؟",
      desc: [
        "در اُتو با اتکا به حضور و همراهیِ کارشناسان متخصص و حرفه‌ای، ریسک‌های معامله و اضطراب ناشی از کلاهبرداری، پرداخت غیرامن و عدم تایید اصالتِ مالکیت خودرو از بین رفته و نگرانی‌های فروشنده و خریدار به صورت چشمگیری کاهش می‌یابد.",
      ],
      open: true,
    },
    {
      title: "آیا خرید و فروش خودرو در اُتو هزینه دارد؟",
      desc: [
        "صفر تا صد فرآیند فروش خودرو در اُتو (از کارشناسی و قیمت‌‌گذاری تا بازاریابی و تنظیم مبایعه‌نامه) برای متقاضی، بدون پرداخت هیچ‌گونه هزینه‌ای انجام می‌شود، اما برای خریدارانی که از خدمات ویژه اُتو استفاده می‌کنند، هزینه اندکی در نظر گرفته شده است.",
      ],
    },
    {
      title: "آیا اُتو برای خرید و فروش خودرو به من مشاوره می‌دهد؟",
      desc: [
        "بله. کارشناسان اُتو به صورت تلفنی و یا حضوری آماده ارائه مشاوره تخصصی درباره خرید و فروش خودرو متناسب با شرایط دلخواه شما هستند.",
      ],
    },

    {
      title:
        "آیا اُتو فقط برای خودروهای صفر کیلومتر تسهیلات خرید اقساطی فراهم می‌کند؟",
      desc: [
        "خیر. در اُتو برای خودروهای کارکرده هم می‌توان اقدام به خرید اقساطی و اخذ تسهیلات کرد.",
      ],
    },
    {
      title:
        "آیا اُتو به همه خودروهای تولید داخل، تسهیلات خرید اقساطی ارائه می‌دهد؟",
      desc: [
        "خیر. در اُتو تنها می‌توان برای خودروهایی که سال تولید آنها از سال 1397 به بعد باشند، تسهیلات دریافت کرد.",
      ],
    },
    {
      title: "آیا برای خودروهای وارداتی هم تسهیلات خرید اقساطی ارائه می‌شود؟",
      desc: [
        "بله. در اُتو برای خودروهای وارداتی که سال تولید آنها بالاتر از 2013 باشد، امکان خرید اقساطی فرآهم است.",
      ],
    },
    {
      title: "آیا ثبت آگهی فروش خودرو در اُتو هزینه دارد؟",
      desc: [
        "خیر. ثبت آگهی فروش خودرو در اُتو به صورت رایگان و بدون هیچ محدودیتی در تعداد درج آگهی انجام می‌شود.",
      ],
    },
  ];

  return <FAQ accordionValue={accordionValue} />;
}
