// "use client";

// import { postExhibitorRequestLoginAPI } from "@/apis/authentication@";
// import { FormInput } from "@/attom/form@/components@/inputs/form-input";
// import { regexPhoneNumber } from "@/utils/regex";
// import { LinearProgress } from "@mui/material";
// import { useFormik } from "formik";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import RequestRegistrationModal from "./requestRegistrationModal";
// import { useRouter } from "next/navigation";
// import { IoChevronBackOutline } from "react-icons/io5";

// export default function RegisterCard() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showStepper, setShowStepper] = useState(false);

//   const router = useRouter();

//   // Formik initialValue
//   let initialValues = {
//     phone_number: "",
//   };

//   // Formik validationSchema
//   const validationSchema = Yup.object({
//     phone_number: Yup.string()
//       .matches(regexPhoneNumber, "شماره همراه صحیح نیست")
//       .required("شماره همراه الزامی است."),
//   });

//   const onSubmit = (values) => {
//     setLoading(true);

//     let formData = new FormData();

//     formData.append("phone_number", values.phone_number);

//     postExhibitorRequestLoginAPI(formData)
//       .then((res) => {
//         setLoading(false);
//         let response = res.data;

//         localStorage.setItem(
//           "phone_number",
//           JSON.stringify(values.phone_number)
//         );
//         //تا حالا ثبت نام نکرده
//         if (response.verify_code) {
//           setOpen(true);
//           setShowStepper(false);
//         } else {
//           router.push("/auth/login-pass");
//         }
//       })
//       .catch((err) => {
//         setLoading(false);

//         toast.error(
//           "به علت تعداد ۱۰ تلاش ناموفق، دسترسی به مدت 20 دقیقه مسدود می‌شود."
//         );
//       });
//   };

//   const handleResendCode = () => {
//     let formData = new FormData();

//     formData.append("phone_number", values.phone_number);
//     postExhibitorRequestLoginAPI(formData)
//       .then((res) => {})
//       .catch(() => {
//         toast.error("ورود موفقیت آمیز نبود.");
//       });
//   };

//   // UseFormik
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//     enableReinitialize: true,
//     validateOnMount: true,
//   });

//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="flex flex-col pt-4 px-4">
//           <div className="flex tablet:flex-col flex-col gap-4">
//             <div className="flex tablet:flex-col flex-col gap-6">
//               <FormInput
//                 formik={formik}
//                 name="phone_number"
//                 label="شماره همراه"
//               />

//               <button
//                 type="submit"
//                 className="bg-blue text-white font-bold w-full py-2 rounded flex gap-2 items-center justify-center mt-4"
//                 disabled={loading}
//               >
//                 ثبت درخواست
//                 <IoChevronBackOutline />
//                 {loading && <LinearProgress />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//       {open && (
//         <RequestRegistrationModal
//           setShowStepper={setShowStepper}
//           showStepper={showStepper}
//           handleResendCode={handleResendCode}
//           phone={formik?.values.phone_number}
//           open={open}
//           setOpen={setOpen}
//         />
//       )}
//       {/* {showStepper && open && <HorizontalLinearStepper />} */}
//     </>
//   );
// }

"use client";

import { postExhibitorRequestLoginAPI } from "@/apis/authentication@";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { regexPhoneNumber } from "@/utils/regex";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import * as Yup from "yup";
import RequestRegistrationModal from "./requestRegistrationModal";

const RegisterCard = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStepper, setShowStepper] = useState(false);

  const router = useRouter();

  // Formik initialValue
  let initialValues = {
    phone_number: "",
  };

  // Formik validationSchema
  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(regexPhoneNumber, "شماره همراه صحیح نیست")
      .required("شماره همراه الزامی است."),
  });

  const onSubmit = (values) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("phone_number", values.phone_number);

    postExhibitorRequestLoginAPI(formData)
      .then((res) => {
        setLoading(false);
        let response = res.data;

        localStorage.setItem(
          "phone_number",
          JSON.stringify(values.phone_number)
        );
        //تا حالا ثبت نام نکرده
        if (response.verify_code) {
          setOpen(true);
          setShowStepper(false);
        } else {
          router.push("/auth/login-pass");
        }
      })
      .catch((err) => {
        setLoading(false);

        toast.error(
          "به علت تعداد ۱۰ تلاش ناموفق، دسترسی به مدت 20 دقیقه مسدود می‌شود."
        );
      });
  };

  const handleResendCode = () => {
    let formData = new FormData();

    formData.append("phone_number", values.phone_number);
    postExhibitorRequestLoginAPI(formData)
      .then((res) => {})
      .catch(() => {
        toast.error("ورود موفقیت آمیز نبود.");
      });
  };

  // UseFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });
  return (
    <div className="mt-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <FormInput formik={formik} name="phone_number" label="شماره همراه" />

          <button
            type="submit"
            className="bg-blue text-white font-bold w-full py-2 rounded flex gap-2 items-center justify-center mt-4"
            disabled={loading}
          >
            ثبت درخواست
            <IoChevronBackOutline />
            {loading && <LinearProgress />}
          </button>
        </div>
      </form>
      {open && (
        <RequestRegistrationModal
          setShowStepper={setShowStepper}
          showStepper={showStepper}
          handleResendCode={handleResendCode}
          phone={formik?.values.phone_number}
          open={open}
          setOpen={setOpen}
        />
      )}
      {/* {showStepper && open && <HorizontalLinearStepper />} */}
    </div>
  );
};

export default RegisterCard;
