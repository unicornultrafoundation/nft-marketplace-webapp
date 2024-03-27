import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import React from "react";
import Button from "@/components/Button";
import { APIParams } from "@/services/api/types";
import Input from "@/components/Form/Input";
import Text from "@/components/Text";
import { useCollectionFilters } from "@/hooks/useFilters";
import Icon from "@/components/Icon";
import Select from "../Form/Select";
import { tokenOptions, tokens } from "@/config/tokens";
import { Address } from "wagmi";

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

interface Props extends ModalProps {
  onApplyFilters: (filters: APIParams.FetchCollections) => void;
  activeFilters: APIParams.FetchCollections;
  onResetFilters?: () => void;
}

export default function MobileCollectionFiltersModal({
  onClose,
  show,
  activeFilters,
  onApplyFilters,
  onResetFilters,
}: Props) {
  const { setLocalFilters, handleApplyFilters, localFilters } =
    useCollectionFilters(activeFilters, onApplyFilters);

  return (
    <Modal
      theme={modalTheme}
      position="center"
      onClose={onClose}
      show={show}
      size="md"
      className="bg-black flex items-center justify-center"
    >
      <Modal.Header>Collections Filters</Modal.Header>
      <Modal.Body>
        <Text className="font-semibold text-secondary mb-2">Floor price</Text>
        <div className="flex items-center gap-4 mb-4">
          <Input
            name="min"
            value={localFilters.min}
            onChange={(e) =>
              setLocalFilters((state) => ({ ...state, min: e.target.value }))
            }
            containerClass="w-24"
            scale="sm"
            placeholder="Min"
          />
          <Text className="text-primary">to</Text>
          <Input
            value={localFilters.max}
            onChange={(e) =>
              setLocalFilters((state) => ({ ...state, max: e.target.value }))
            }
            containerClass="w-24"
            scale="sm"
            placeholder="Max"
          />
          {/* <Select 
              options={tokenOptions} 
              containerClass="w-2/3" scale='sm'
              value={localFilters.quoteToken}
              onChange={(e) => setLocalFilters(state => ({ ...state, quoteToken: e.target.value as Address }))}
            /> */}
        </div>

        <div className="mt-6">
          <Button
            className="w-full mb-5"
            variant="secondary"
            scale="sm"
            onClick={() => {
              setLocalFilters({
                min: "",
                max: "",
                quoteToken: tokens.wu2u.address,
              });
              onResetFilters?.();
              onClose?.();
            }}
          >
            Reset <Icon name="refresh" width={12} height={12} />
          </Button>
          
          <div className="w-full flex items-center gap-2 mt-2">
            <Button
              scale="sm"
              className="flex-1"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              scale="sm"
              className="flex-1"
              onClick={() => {
                handleApplyFilters();
                onClose?.();
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
