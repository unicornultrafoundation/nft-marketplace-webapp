import { CustomFlowbiteTheme } from "flowbite-react";

const tab: CustomFlowbiteTheme["tab"] = {
  base: "flex flex-col gap-2 block",
  tablist: {
    base: "inline-flex text-center p-1 w-full",
    styles: {
      default: "flex-wrap bg-surface-soft rounded-2xl",
      underline: "flex-wrap border-b border-gray-200 p-0",
    },
    tabitem: {
      base: "flex items-center justify-center px-4 py-3 text-body-14 font-medium first:ml-0 disabled:cursor-not-allowed focus:outline-none",
      styles: {
        default: {
          base: "rounded-xl flex-1 hover:bg-white transition-all",
          active: {
            on: "bg-white text-primary shadow",
            off: "text-secondary bg-transparent",
          },
        },
        underline: {
          base: "text-sm",
          active: {
            on: "text-primary border-b-2 border-primary",
            off: "text-secondary bg-transparent",
          },
        },
      },
    },
  },
  tabpanel: "",
};

const table: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-secondary rounded-2xl",
    shadow:
      "absolute bg-white w-full h-full top-0 left-0 rounded-lg shadow -z-10",
  },
  head: {
    base: "group/head text-heading-xs uppercase text-secondary font-semibold",
  },
};

const accordion: CustomFlowbiteTheme["accordion"] = {
  content: {
    base: "py-5 px-5 last:rounded-b-lg first:rounded-t-lg",
  },
  title: {
    flush: {
      on: "",
      off: "",
    },
  },
};

const modal: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col tablet:h-auto h-full desktop:h-auto max-h-[90vh]",
    base: "relative h-full w-full p-4 desktop:h-auto tablet:h-auto",
  },
};

const carousel: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
};

const appTheme: CustomFlowbiteTheme = {
  tab,
  table,
  accordion,
  modal,
  carousel,
};

export default appTheme;
