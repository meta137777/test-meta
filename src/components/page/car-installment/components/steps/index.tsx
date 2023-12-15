import { img } from "@/data";

export default function InstallmentSteps() {
  return (
    <>
      <h1 className="text-center mt-10 font-bold text-2xl mb-4">
        مراحل خرید اقساطی 
      </h1>
      <img
        src={img.installment_steps.src}
        alt="installment_steps"
        className="md:block hidden"
      />
      <img
        src={img.installment_steps_mobile.src}
        alt="installment_steps"
        className="md:hidden block px-4 mx-auto"
      />
    </>
  );
}
