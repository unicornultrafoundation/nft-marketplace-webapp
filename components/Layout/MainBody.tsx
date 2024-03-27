import { useEffect } from "react";
import { CHAIN_ID } from "@/config/constants";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { useNetwork, useSwitchNetwork } from "wagmi";

export default function MainBody({ children }: { children: React.ReactNode }) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (!!chain?.id && chain?.id !== Number(CHAIN_ID)) {
      toast.warning(
        <p className="whitespace-nowrap">Wrong network detected</p>,
        {
          toastId: "changeNetwork",
          position: "bottom-center",
          closeOnClick: false,
          autoClose: false,
          closeButton: ({ closeToast }) => (
            <div
              className="cursor-pointer whitespace-nowrap flex justify-center items-center text-body-14 font-semibold text-info mr-2"
              onClick={(e) => {
                switchNetwork?.(Number(CHAIN_ID));
                closeToast(e);
              }}
            >
              Change now
            </div>
          ),
        },
      );
    } else {
      toast.dismiss();
    }
  }, [chain, switchNetwork]);

  return <div className="flex-1">{children}</div>;
}
