import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import { navs } from "@/config/nav";
import Text from "@/components/Text";

export default function NavbarMenu() {
  return (
    <div className="hidden desktop:block w-full" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {navs.map((nav, index) =>
          nav.items ? (
            <Dropdown
              key={index}
              activator={
                <Text
                  className="font-semibold text-secondary hover:text-primary transition-colors"
                  variant="body-16"
                >
                  {nav.label}
                </Text>
              }
              dropdown={
                <div className="flex flex-col">
                  {nav.items.map((item, i) => (
                    <Link
                      className="py-1.5"
                      key={i}
                      href={item.href ?? "/"}
                      target={item.external ? "_blank" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              }
            />
          ) : (
            <li key={index}>
              <Link
                href={nav.href ?? "#"}
                className="font-semibold text-secondary hover:text-primary transition-colors text-body-16"
                aria-current="page"
                target={nav.external ? "_blank" : undefined}
              >
                {nav.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
