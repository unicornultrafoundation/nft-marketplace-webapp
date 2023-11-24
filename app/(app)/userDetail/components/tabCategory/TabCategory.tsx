import React from "react";


interface Props {


}

export default function TabCategory({}: Props) {

    return (
        <div>
            <div className="flex w-full border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500"
                    id="tabs-category" role="tabList">
                    <li className="me-2 hover:text-primary hover:border-primary border-b-2 border-transparent" role="presentation">
                        <button
                            className="flex items-center px-[16px] py-[12px] text-sm font-medium gap-[6px]   "
                            id="profile-tab-example"
                            type="button"
                            role="tab"
                            aria-controls="profile-example"
                            aria-selected="false"
                        >
                            <span className="">Owned</span>
                            <span className="bg-surface-soft rounded-2xl px-[10px] py-[2px] ">5.2K</span>
                        </button>

                    </li>
                    <li className="me-2 hover:text-primary  hover:border-primary border-b-2 border-transparent" role="presentation">
                        <button
                            className="flex items-center px-[16px] py-[12px] text-sm font-medium gap-[6px]   "
                            id="profile-tab-example"
                            type="button"
                            role="tab"
                            aria-controls="profile-example"
                            aria-selected="false"
                        >
                            <span className="">On Sale</span>
                            <span className="bg-surface-soft rounded-2xl px-[10px] py-[2px] ">44</span>
                        </button>

                    </li>
                    <li className="me-2 hover:text-primary  hover:border-primary border-b-2 border-transparent" role="presentation">
                        <button
                            className="flex items-center px-[16px] py-[12px] text-sm font-medium gap-[6px]   "
                            id="profile-tab-example"
                            type="button"
                            role="tab"
                            aria-controls="profile-example"
                            aria-selected="false"
                        >
                            <span className="">Created</span>
                            <span className="bg-surface-soft rounded-2xl px-[10px] py-[2px] ">7</span>
                        </button>

                    </li>
                    <li className="me-2 hover:text-primary  hover:border-primary border-b-2 border-transparent" role="presentation">
                        <button
                            className="flex items-center px-[16px] py-[12px] text-sm font-medium gap-[6px]   "
                            id="profile-tab-example"
                            type="button"
                            role="tab"
                            aria-controls="profile-example"
                            aria-selected="false"
                        >
                            <span className="">Activity</span>
                            <span className="bg-surface-soft rounded-2xl px-[10px] py-[2px] ">8</span>
                        </button>

                    </li>
                </ul>
            </div>
        </div>

    )
}
