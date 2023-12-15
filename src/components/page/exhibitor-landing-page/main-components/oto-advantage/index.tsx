import { Items } from "./advantage-data";

const OtoAdvantage = () => {
  return (
    <div className="my-20">
      <span className="text-center font-bold xl:text-2xl text-xl block mb-11">
        مزیت های همکاری با اُتو
      </span>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6">
        {Items.map(({ img, title, desc }) => (
          <div className="flex flex-col rounded-md gap-1 items-center px-6 py-3 border border-[#E8E7E6] w-[246px] mx-auto">
            <img className="p-3 rounded-md h-[4rem]" src={img} loading="lazy" />
            <span className="font-bold py-2 text-lg">{title}</span>
            <p className="text-center">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtoAdvantage;
