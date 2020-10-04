import { toast } from "react-toastify";

export const successToast = (msg: string) => toast(<div className="bg-red-700">{msg}</div>);
