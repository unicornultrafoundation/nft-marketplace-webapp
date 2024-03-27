import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import {
  useReadCollectionRoyalties,
  useUpdateCollectionRoyalties,
} from "@/hooks/useRoyalties";
import { useEffect, useState } from "react";
import { Collection } from "@/types";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Form/Input";
import Icon from "@/components/Icon";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { MAX_ROYALTIES } from "@/config/constants";
import { Address } from "wagmi";
import { isAddress } from "ethers";
import { toast } from "react-toastify";
import { bigint } from "zod";

interface Props extends ModalProps {
  collection: Collection;
}

interface FormState {
  royalties: { account: Address; value: any }[];
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px]",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 ",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

const newRoyalty = { account: "" as Address, value: "" };

export default function UpdateRoyaltiesModal({
  onClose,
  show,
  collection,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { data: royalties } = useReadCollectionRoyalties(collection.address);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: { royalties: [newRoyalty] },
    reValidateMode: "onChange",
  });

  const formRules = {
    validate: (value: FormState["royalties"]) => {
      const isMissingAddress = value.some((item) => !isAddress(item?.account));
      if (isMissingAddress) return "Invalid wallet address";

      const isMissingValue = value.some(
        (item) => isNaN(item.value) || Number(item.value) <= 0,
      );
      if (isMissingValue) return "Royalty value must be greater than Zero";

      const totalRoyalties = value.reduce((accumulator, current) => {
        return Number(current.value) + Number(accumulator);
      }, 0);

      if (totalRoyalties * 100 > MAX_ROYALTIES)
        return `Total royalties cannot exceed ${MAX_ROYALTIES / 100}%`;

      return true;
    },
  };

  const onUpdateRoyalties = useUpdateCollectionRoyalties();

  const onSubmit = async (data: FormState) => {
    setLoading(true);

    try {
      const _royalties = data.royalties.map((item) => {
        const royaltiesBigInt = BigInt(
          Number(Number(item.value).toFixed(2)) * 100,
        );

        return { ...item, value: royaltiesBigInt };
      });
      await onUpdateRoyalties(collection.address, _royalties);
      toast.success("Royalties have been successfully updated", {
        autoClose: 1000,
        closeButton: true,
      });
      handleClose();
    } catch (e: any) {
      toast.error(`Error report: ${e.message || e}`, {
        autoClose: 1000,
        closeButton: true,
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    clearErrors();
    onClose?.();
  };

  useEffect(() => {
    if (royalties) {
      const parsedRoyalties = royalties.map((item) => {
        const valueInNumber = Number(item.value) / 100;
        return { ...item, value: valueInNumber.toString() };
      });
      setValue("royalties", parsedRoyalties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [royalties]);

  return (
    <Modal
      dismissible
      onClose={onClose}
      show={show}
      size="lg"
      theme={modalTheme}
      position="center"
    >
      <Modal.Body className="p-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-primary font-bold text-heading-xs mb-4">
            Update Royalties
          </p>
          <p className="text-secondary font-bold mb-6">
            Add royalties to all users participated in collection creation
          </p>

          <Controller
            control={control}
            name="royalties"
            rules={formRules}
            render={({ field: { value, onChange } }) => {
              return (
                <div className="flex flex-col gap-4 w-full">
                  {value.map((royalty, index) => (
                    <div
                      className="flex items-stretch gap-2"
                      key={(royalty.account || "") + index}
                    >
                      <Input
                        containerClass="flex-1"
                        scale="sm"
                        placeholder="Address"
                        error={!!errors.royalties}
                        value={royalty.account}
                        readOnly={loading}
                        onChange={(e) => {
                          const newRoyalty = {
                            ...royalty,
                            account: e.target.value as Address,
                          };
                          const newRoyalties = [...value];
                          newRoyalties[index] = newRoyalty;
                          setValue("royalties", newRoyalties);
                        }}
                      />
                      <Input
                        scale="sm"
                        type="number"
                        placeholder="Value"
                        error={!!errors.royalties}
                        appendIcon={<p>%</p>}
                        value={royalty.value}
                        readOnly={loading}
                        onChange={(e) => {
                          const newRoyalty = {
                            ...royalty,
                            value: e.target.value,
                          };
                          const newRoyalties = [...value];
                          newRoyalties[index] = newRoyalty;
                          setValue("royalties", newRoyalties);
                        }}
                      />
                      {index > 0 && (
                        <Button
                          variant="icon"
                          onClick={() => {
                            // Delete row
                            const newRoyalties = [...value];
                            newRoyalties.splice(index, 1);
                            setValue("royalties", newRoyalties);
                          }}
                        >
                          <Icon name="close" width={12} height={12} />
                        </Button>
                      )}
                    </div>
                  ))}

                  {/* Add row */}
                  <Button
                    variant="secondary"
                    scale="sm"
                    onClick={() =>
                      setValue("royalties", [...value, newRoyalty])
                    }
                  >
                    Add Address
                  </Button>
                </div>
              );
            }}
          />

          <FormValidationMessages errors={errors} />

          <div className="w-full flex items-center gap-2 mt-6">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              variant="primary"
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
