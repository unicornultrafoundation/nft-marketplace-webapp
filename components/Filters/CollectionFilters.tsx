"use client";

import Text from "@/components/Text";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { APIParams } from "@/services/api/types";
import React from "react";
import Collapsible from "../Collapsible";
import { classNames } from "@/utils/string";
import { useCollectionFilters } from "@/hooks/useFilters";
import Icon from "@/components/Icon";
import Select from "../Form/Select";
import { tokenOptions } from "@/config/tokens";
import { Address } from "wagmi";

export interface CollectionProps {
  showFilters: boolean;
  onApplyFilters: (filters: APIParams.FetchCollections) => void;
  activeFilters: APIParams.FetchCollections;
  onResetFilters?: () => void;
  containerClass?: string;
}

export default function CollectionFilters({
  onApplyFilters,
  showFilters,
  onResetFilters,
  activeFilters,
  containerClass,
}: CollectionProps) {
  const { setLocalFilters, handleApplyFilters, localFilters } =
    useCollectionFilters(activeFilters, onApplyFilters);

  if (!showFilters) return null;

  return (
    <>
      <div
        className={classNames(
          "w-full tablet:w-72 flex flex-col",
          containerClass,
        )}
      >
        <Collapsible isOpen header="Floor Price" className="rounded-2xl border">
          <div className="flex items-center gap-4 mb-4">
            <Input
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
              containerClass="w-full" scale='sm'
              value={localFilters.quoteToken}
              onChange={(e) => setLocalFilters(state => ({ ...state, quoteToken: e.target.value as Address }))}
            /> */}
          </div>

          <Button
            variant="outlined"
            scale="sm"
            className="w-full"
            onClick={() => {
              setLocalFilters({ min: "", max: "" });
              onResetFilters?.();
            }}
          >
            Reset <Icon name="refresh" width={12} height={12} />
          </Button>

          <Button
            scale="sm"
            className="w-full mt-3"
            variant="primary"
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
        </Collapsible>
      </div>
    </>
  );
}
