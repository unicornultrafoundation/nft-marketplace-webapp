import React from "react";
import { Dropdown } from "flowbite-react";
import Input, { BaseInputProps } from "@/components/Form/Input";

export default function SearchInput(props: BaseInputProps) {
  return (
    <Dropdown label="" renderTrigger={() => <Input {...props} />}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
