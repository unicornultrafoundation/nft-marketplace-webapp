import { CustomFlowbiteTheme } from 'flowbite-react'

const tab: CustomFlowbiteTheme['tab'] = {
  base: 'flex flex-col gap-2 block',
  tablist: {
    base: 'inline-flex text-center p-1 w-full',
    styles: {
      default: 'flex-wrap bg-surface-soft rounded-2xl',
      underline: 'flex-wrap border-b border-gray-200 p-0'
    },
    tabitem: {
      base: 'flex items-center justify-center px-4 py-3 text-body-14 font-medium first:ml-0 disabled:cursor-not-allowed focus:outline-none',
      styles: {
        default: {
          base: 'rounded-xl flex-1',
          active: {
            on: 'bg-white text-primary shadow',
            off: 'text-secondary bg-transparent'
          }
        },
        underline: {
          base: 'text-sm',
          active: {
            on: 'text-primary border-b-2 border-primary',
            off: 'text-secondary bg-transparent'
          }
        }
      }
    }
  },
  tabpanel: ''
}

const table: CustomFlowbiteTheme['table'] = {
  root: {
    base: "w-full text-left text-sm text-secondary dark:text-gray-400 rounded-2xl",
    shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg shadow -z-10"
  },
  head: {
    base: "group/head text-heading-xs uppercase text-secondary font-semibold dark:text-gray-400"
  }
}

const modal: CustomFlowbiteTheme['modal'] = {
  root: {
    "show": {
      "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ",
    },
  },
  content: {
    "base": "relative w-[300px] p-4  overflow-hidden",
    "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col h-screen overflow-hidden "
  },
  body: {
    "base": "p-6 flex-1 bg-black overflow-hidden ",
  },
}

const appTheme: CustomFlowbiteTheme = {
  tab,
  table,
  modal
}

export default appTheme
