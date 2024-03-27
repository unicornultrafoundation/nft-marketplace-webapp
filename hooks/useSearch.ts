import { useMemo, useRef, useState } from "react";
import { TabsRef } from "flowbite-react";

export const useSearch = () => {
  const tabsRef = useRef<TabsRef>(null);
  const [openModal, setOpenModal] = useState(false);

  const [text, setText] = useState<Record<string, string>>({
    collection: "",
    nft: "",
    user: "",
  });

  const [activeTab, setActiveTab] = useState(0);
  const searchKey = useMemo(() => {
    switch (activeTab) {
      case 0:
        return "collection";
      case 1:
        return "nft";
      case 2:
        return "user";
    }
  }, [activeTab]);

  const handleTextInput = async (value: string) => {
    if (!searchKey) return;
    setText({
      ...text,
      [searchKey]: value,
    });
  };

  const searchString = useMemo(
    () => (searchKey ? text[searchKey] : ""),
    [searchKey, text],
  );

  return {
    handleTextInput,
    setActiveTab,
    searchKey,
    text,
    tabsRef,
    openModal,
    setOpenModal,
    searchString,
  };
};
