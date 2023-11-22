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
            on: 'text-primary border-b-2 border-primary font-medium',
            off: 'text-secondary bg-transparent'
          }
        },
      }
    }
  },
  tabpanel: ''
}

const accordion: CustomFlowbiteTheme['accordion'] = {
  root: {
    base: '',
    flush: {
      off: '',
      on: 'hover:bg-transparent'
    }
  },
  content: {
    base: "px-2 last:rounded-b-lg  first:rounded-t-lg"
  },
  title: {
    arrow: {
      base: 'h-6 w-6 shrink-0',
      open: {
        off: '',
        on: 'rotate-180'
      }
    },
    base: "flex w-full items-center justify-between text-left font-medium px-5 py-4",
    flush: {
      off: "",
      on: ""
    },
    heading: "",
    open: {
      off: "",
      on: ""
    }
  }
}

const appTheme: CustomFlowbiteTheme = {
  tab,
  accordion
}

export default appTheme