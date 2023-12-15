import { PostCreateLeasing } from "@/apis/leasing";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LeasignFormInitValues } from "./initial-values";
import { LeasignFormInitValuesValidationSchema } from "./validation-schema";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  p: 2,
};

export default function LeasingForm({
  open,
  setOpen,
  ad_code,
  advertiser_id,
}: any) {
  // @@@___________________ Cities ___________________@@@
  const { data: cityData } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/City/Get/All`,
  });

  // @@@___________________ Submit formik handler ___________________@@@
  const onSubmit = (values) => {
    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    PostCreateLeasing(postData)
      .then((res) => {
        toast.success("درخواست شما با موفقیت ثبت شد.");
        setOpen(false);
      })
      .catch((err) => {
        toast.error("متاسفانه خطایی رخ داده است.");
        setOpen(false);
      });
  };

  // @@@___________________ use Formik ___________________@@@
  const formik = useFormik({
    initialValues: LeasignFormInitValues(ad_code, advertiser_id),
    onSubmit,
    validationSchema: LeasignFormInitValuesValidationSchema,
  });

  // @@@___________________ Handle close ___________________@@@
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="font-bold mb-6 text-lg border-b border-b-gray-250 pb-4">
            دنبال چه خودرویی هستید؟
          </h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <FormInput formik={formik} name="name" label="نام" />
              <FormInput formik={formik} name="family" label="نام خانوادگی" />
              <DatePickerInput
                label="تاریخ تولد"
                formik={formik}
                name={"birth_date"}
              />
              <FormInput formik={formik} name="national_code" label="کد ملی" />
              <FormInput
                formik={formik}
                name="phone_number"
                label="شماره تلفن"
              />
              <SelectBox
                formik={formik}
                name="city"
                label="استان"
                options={cityData?.cities}
              />
              <FormInput formik={formik} name="job" label="شغل" />
            </div>
            <button
              type="submit"
              className="font-medium text-center text-white bg-blue py-3 rounded w-full mt-4"
            >
              ثبت درخواست
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
