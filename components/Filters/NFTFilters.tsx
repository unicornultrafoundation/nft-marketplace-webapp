"use client";

import { Checkbox, Label, Radio } from "flowbite-react";
import Text from "@/components/Text";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import React from "react";
import { APIParams, APIResponse } from "@/services/api/types";
import Collapsible from "../Collapsible";
import { classNames } from "@/utils/string";
import { useNFTFilters } from "@/hooks/useFilters";
import Icon from "@/components/Icon";
import Select from "../Form/Select";
import { tokenOptions, tokens } from "@/config/tokens";
import { Address } from "wagmi";

export type FilterType = "price" | "type" | "status";

export interface FilterProps {
  activeFilters: APIParams.FetchNFTs;
  showFilters?: boolean;
  baseFilters?: FilterType[];
  onApplyFilters?: (filters: APIParams.FetchNFTs) => void;
  onResetFilters?: () => void;
  traitsFilter?: APIResponse.CollectionDetails["traitAvailable"];
  containerClass?: string;
}

export default function NFTFilters({
  activeFilters,
  showFilters,
  baseFilters = ["price", "type", "status"],
  traitsFilter,
  onApplyFilters,
  onResetFilters,
  containerClass,
}: FilterProps) {
  const {
    handleApplyFilters,
    localFilters,
    handleChange,
    handleSelectTrait,
    isTraitSelected,
  } = useNFTFilters(activeFilters, onApplyFilters);

  if (!showFilters) return null;

  return (
    <div
      className={classNames(
        "w-full tablet:w-72 flex flex-col rounded-2xl border",
        containerClass,
      )}
    >
      {baseFilters.includes("type") && (
        <Collapsible header="Type" isOpen>
          <div className="flex items-center gap-7 flex-wrap">
            <div className="flex gap-3 items-center">
              <Radio
                id="type-all"
                value=""
                checked={localFilters.type === undefined}
                onChange={() =>
                  handleChange({ type: undefined, updateOnChange: true })
                }
              />
              <Label htmlFor="type-all">All</Label>
            </div>
            <div className="flex gap-3 items-center">
              <Radio
                id="type-single"
                value="ERC721"
                checked={localFilters.type === "ERC721"}
                onChange={() =>
                  handleChange({ type: "ERC721", updateOnChange: true })
                }
              />
              <Label htmlFor="type-single">Single edition</Label>
            </div>
            <div className="flex gap-3 items-center">
              <Radio
                id="type-multiple"
                value="ERC1155"
                checked={localFilters.type === "ERC1155"}
                onChange={() =>
                  handleChange({ type: "ERC1155", updateOnChange: true })
                }
              />
              <Label htmlFor="type-multiple">Multiple editions</Label>
            </div>
          </div>
        </Collapsible>
      )}
      {baseFilters.includes("status") && (
        <Collapsible header="Status" isOpen>
          <div className="flex items-center gap-7 flex-wrap">
            <div className="flex gap-3 items-center">
              <Radio
                id="status-all"
                value=""
                checked={localFilters.sellStatus === undefined}
                onChange={() =>
                  handleChange({ sellStatus: undefined, updateOnChange: true })
                }
              />
              <Label htmlFor="status-all">All</Label>
            </div>
            <div className="flex gap-3 items-center">
              <Radio
                id="status-buy"
                value="AskNew"
                checked={localFilters.sellStatus === "AskNew"}
                onChange={() =>
                  handleChange({ sellStatus: "AskNew", updateOnChange: true })
                }
              />
              <Label htmlFor="type-buy">Buy now</Label>
            </div>
          </div>
        </Collapsible>
      )}
      {baseFilters.includes("status") && (
        <Collapsible header="Price">
          <div className="flex items-center gap-4 mb-4">
            <Input
              containerClass="w-24"
              scale="sm"
              placeholder="Min"
              value={localFilters.priceMin}
              onChange={(e) => handleChange({ priceMin: e.target.value })}
            />
            <Text className="text-primary">to</Text>
            <Input
              containerClass="w-24"
              scale="sm"
              placeholder="Max"
              value={localFilters.priceMax}
              onChange={(e) => handleChange({ priceMax: e.target.value })}
            />
            <Select
              options={tokenOptions}
              containerClass="w-full"
              scale="sm"
              value={localFilters.quoteToken}
              onChange={(e) =>
                handleChange({ quoteToken: e.target.value as Address })
              }
            />
          </div>

          <Button
            className="w-full"
            variant="secondary"
            scale="sm"
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
        </Collapsible>
      )}
      {!!traitsFilter?.length && (
        <Collapsible header="Properties">
          {traitsFilter.map((item) => (
            <div key={item.key}>
              {item.traits.map((trait) => (
                <div key={trait.value} className="flex items-center gap-2 py-2">
                  <Checkbox
                    id={`trait-${trait.value}`}
                    checked={isTraitSelected(item.key, trait.value)}
                    onChange={() =>
                      handleSelectTrait(item.key, trait.value, true)
                    }
                  />
                  <Label
                    htmlFor={`trait-${trait.value}`}
                    className="flex-1 text-secondary font-semibold"
                  >
                    {item.key}:
                  </Label>
                  <Text>
                    {trait.value} ({trait.count})
                  </Text>
                </div>
              ))}
            </div>
          ))}
        </Collapsible>
      )}

      <div className="p-4">
        <Button
          className="w-full"
          variant="outlined"
          scale="sm"
          onClick={onResetFilters}
        >
          Reset <Icon name="refresh" width={12} height={12} />
        </Button>
      </div>
    </div>
  );
}
