import { useCallback, useEffect, useState } from "react";
import { APIParams } from "@/services/api/types";
import { sanitizeObject } from "@/utils";
import { toast } from "react-toastify";
import { Trait } from "@/types";
import { tokens } from "@/config/tokens";

export const useNFTFilters = (
  activeFilters: APIParams.FetchNFTs,
  onApplyFilters?: (filters: APIParams.FetchNFTs) => void,
) => {
  const [localFilters, setLocalFilters] =
    useState<APIParams.FetchNFTs>(activeFilters);

  const handleChange = ({
    updateOnChange,
    ...params
  }: Partial<APIParams.FetchNFTs> & { updateOnChange?: boolean }) => {
    const newFilters = { ...localFilters, ...params };
    setLocalFilters(newFilters);
    if (updateOnChange) {
      // Trigger immediately on input
      onApplyFilters?.(newFilters);
    }
  };

  const handleApplyFilters = () => {
    const { priceMax, priceMin, quoteToken } = localFilters;
    if (
      (priceMin !== "" && priceMin !== undefined) ||
      (priceMax !== "" && priceMax !== undefined)
    ) {
      if (
        (isNaN(Number(priceMin)) && !!priceMin) ||
        (isNaN(Number(priceMax)) && !!priceMax)
      ) {
        return toast.error("Please input a valid number");
      }

      if (Number(priceMin) < 0 || Number(priceMax) < 0) {
        return toast.error("Price cannot be negative");
      }

      if (Number(priceMin) > Number(priceMax) && priceMax?.trim() !== "") {
        return toast.error("Minimum price cannot be greater than maximum one");
      }
    }
    onApplyFilters?.(
      sanitizeObject({
        ...localFilters,
        quoteToken: quoteToken === undefined ? tokens.wu2u.address : quoteToken,
      }),
    );
  };

  const isTraitSelected = useCallback(
    (key: string, value: string) => {
      const traits = activeFilters.traits;
      return traits?.some((t: Trait) => {
        return t.trait_type === key && t.value === value;
      });
    },
    [activeFilters],
  );

  const handleSelectTrait = (
    key: string,
    value: any,
    updateOnChange?: boolean,
  ) => {
    const selectedTraits = localFilters.traits ? [...localFilters.traits] : [];
    const isExist = isTraitSelected(key, value);

    if (isExist) {
      const index = selectedTraits.findIndex((t) => t.trait_type === key);
      selectedTraits.splice(index, 1);
    } else {
      selectedTraits.push({
        trait_type: key,
        value,
      });
    }

    handleChange({ traits: selectedTraits, updateOnChange });
  };

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  return {
    localFilters,
    isTraitSelected,
    handleChange,
    handleApplyFilters,
    handleSelectTrait,
  };
};

export const useCollectionFilters = (
  activeFilters: APIParams.FetchCollections,
  onApplyFilters?: (filters: APIParams.FetchCollections) => void,
) => {
  const [localFilters, setLocalFilters] =
    useState<APIParams.FetchCollections>(activeFilters);

  const handleApplyFilters = () => {
    const { min, max } = localFilters;
    if (
      (min !== "" && min !== undefined) ||
      (max !== "" && max !== undefined)
    ) {
      if ((isNaN(Number(min)) && !!min) || (isNaN(Number(max)) && !!max)) {
        return toast.error("Please input a valid number");
      }

      if (Number(min) < 0 || Number(max) < 0) {
        return toast.error("Price cannot be negative");
      }

      if (Number(min) > Number(max) && max?.trim() !== "") {
        return toast.error("Minimum price cannot be greater than maximum one");
      }
    }

    onApplyFilters?.(localFilters);
  };

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  return {
    localFilters,
    handleApplyFilters,
    setLocalFilters,
  };
};
