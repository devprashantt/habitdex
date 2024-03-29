import { toast } from "react-toastify";

const customToast = ({ message, type, ...customToastOptions }) => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...customToastOptions,
  });
  return;
};

export default customToast;
