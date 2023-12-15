import { staticData } from "@/data";

interface StaticData {
  [name: string]: any;
}

// @@@___________________ Formik initial Values ___________________@@@
export let carSaleInitialValues: StaticData = {};

// @@@___________________ Formik initial Values ___________________@@@
export let carSaleInitValues = (state: any) => {
  staticData.car_sale_items.forEach(({ name }: { name: string }) => {
    Object.keys(state).includes(name)
      ? (carSaleInitialValues[name] = state[name])
      : (carSaleInitialValues[name] = "");
  });

  return carSaleInitialValues;
};
