"use client"

import Button from "@/components/Button"
import ChevronDownIcon from "@/components/Icon/ChevronDown"
import SilderIcon from "@/components/Icon/Sliders"
import VerifiedIcon from "@/components/Icon/Verified"
import VerifyIcon from "@/components/Icon/Verify"
import Text from "@/components/Text"
import { Accordion, Tabs } from "flowbite-react"
import Image from "next/image"
import TagIcon from "@/components/Icon/Tag"
import DollarSignIcon from "@/components/Icon/DollarSign"
import RepeatIcon from "@/components/Icon/Repeat"
import TrendingUpIcon from "@/components/Icon/TrendingUp"
import MoreVerticalIcon from "@/components/Icon/MoreVertical"
import CommandIcon from "@/components/Icon/Command"
import Input from "@/components/Form/Input"

export default function UserDetailPage() {
    const itemAccordion = [
        {
            title: 'All',
            icon: <Image
                className="rounded-full w-[24px] h-[24px]"
                width={24}
                height={24}
                src="https://fakeimg.pl/24x24/"
                alt="Avatar"
            />
        },
        {
            title: 'U2U',
            icon: <Image
                className="rounded-full w-[24px] h-[24px]"
                width={24}
                height={24}
                src="https://fakeimg.pl/24x24/"
                alt="Avatar"
            />
        },
        {
            title: 'BNB Chain',
            icon: <Image
                className="rounded-full w-[24px] h-[24px]"
                width={24}
                height={24}
                src="https://fakeimg.pl/24x24/"
                alt="Avatar"
            />
        },
        {
            title: 'Avalanche',
            icon: <Image
                className="rounded-full w-[24px] h-[24px]"
                width={24}
                height={24}
                src="https://fakeimg.pl/24x24/"
                alt="Avatar"
            />
        },
        {
            title: 'Solana',
            icon: <Image
                className="rounded-full w-[24px] h-[24px]"
                width={24}
                height={24}
                src="https://fakeimg.pl/24x24/"
                alt="Avatar"
            />
        }
    ]
    const card = [
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
            image: ''

        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },
        {
            title: 'Winter Madagascar',
            name: 'Clown Ape',
            number: '0.002 U2U',
        },

    ]
    const tableHeadHeader = [
        {
            title: 'Item'
        },
        {
            title: 'Type'
        },
        {
            title: 'Price'
        },
        {
            title: 'By'
        },
        {
            title: 'Time'
        }
    ]
    const tableCell = [
        {
            cell1: 'Explorer5523',
            cell2: 'Listed',
            cell3: '0.0050 WETH',
            cell4: 'JackKrauser',
            cell5: '2 Min ago',
            icon: <TagIcon width={18} height={18} />,
            avatar: <Image
                className="cursor-pointer rounded-xl desktop:w-[48px] desktop:h-[48px] tablet:w-[48px] tablet:h-[48px] w-[80px] h-[80px]"
                width={220}
                height={200}
                src="https://fakeimg.pl/48x48/"
                alt="Avatar"
            />
        },
        {
            cell1: 'Explorer5523',
            cell2: 'Listed',
            cell3: '0.0050 WETH',
            cell4: 'JackKrauser',
            cell5: '2 Min ago',
            icon: <DollarSignIcon width={18} height={18} />,
            avatar: <Image
                className="cursor-pointer rounded-xl desktop:w-[48px] desktop:h-[48px] tablet:w-[48px] tablet:h-[48px] w-[80px] h-[80px]"
                width={220}
                height={200}
                src="https://fakeimg.pl/48x48/"
                alt="Avatar"
            />
        },
        {
            cell1: 'Explorer5523',
            cell2: 'Listed',
            cell3: '0.0050 WETH',
            cell4: 'JackKrauser',
            cell5: '2 Min ago',
            icon: <RepeatIcon width={18} height={18} />,
            avatar: <Image
                className="cursor-pointer rounded-xl desktop:w-[48px] desktop:h-[48px] tablet:w-[48px] tablet:h-[48px] w-[80px] h-[80px]"
                width={220}
                height={200}
                src="https://fakeimg.pl/48x48/"
                alt="Avatar"
            />
        },
        {
            cell1: 'Explorer5523',
            cell2: 'Listed',
            cell3: '0.0050 WETH',
            cell4: 'JackKrauser',
            cell5: '2 Min ago',
            icon: <TrendingUpIcon width={18} height={18} />,
            avatar: <Image
                className="cursor-pointer rounded-xl desktop:w-[48px] desktop:h-[48px] tablet:w-[48px] tablet:h-[48px] w-[80px] h-[80px]"
                width={220}
                height={200}
                src="https://fakeimg.pl/48x48/"
                alt="Avatar"
            />
        },
        {
            cell1: 'Explorer5523',
            cell2: 'Listed',
            cell3: '0.0050 WETH',
            cell4: 'JackKrauser',
            cell5: '2 Min ago',
            icon: <TagIcon width={18} height={18} />,
            avatar: <Image
                className="cursor-pointer rounded-xl desktop:w-[48px] desktop:h-[48px] tablet:w-[48px] tablet:h-[48px] w-[80px] h-[80px]"
                width={220}
                height={200}
                src="https://fakeimg.pl/48x48/"
                alt="Avatar"
            />
        },
    ]
    return (
        <div className="w-full relative flex flex-col items-center">
            {/* Avatar and Cover image */}
            <div className="bg-cover relative w-full desktop:h-[220px] tablet:h-[220px] h-[160px]">
                <Image
                    className="w-full desktop:h-[220px] tablet:h-[220px] h-[160px]"
                    width={1440}
                    height={220}
                    src="https://fakeimg.pl/1440x220/"
                    alt="Avatar"
                />
                <div className="rounded-2xl absolute desktop:ml-20 tablet:ml-10 ml-4 block desktop:w-[120px] tablet:w-[120px] w-[80px] desktop:h-[120px] tablet:h-[120px] h-[80px] desktop:bottom-[-60px] tablet:bottom-[-60px] bottom-[-40px]">
                    <Image
                        className="desktop:w-[120px] tablet:w-[120px] w-[80px] desktop:h-[120px] tablet:h-[120px] h-[80px] rounded-2xl"
                        width={120}
                        height={120}
                        src="https://fakeimg.pl/120x120/"
                        alt="Avatar"
                    />
                </div>
            </div>
            {/* Container */}
            <div className="flex flex-col gap-24 w-full desktop:px-20 tablet:px-10 px-4">
                {/* Info user */}
                <div className="flex flex-col desktop:gap-10 tablet:gap-10 gap-6 desktop:mt-20 tablet:mt-20 mt-14">
                    <div className="flex gap-6 flex-col flex-wrap">
                        <div className="flex justify-between w-full order-1">
                            <div className="flex gap-2 justify-center items-center">
                                <Text className="text-body-32 font-semibold">Jack Krauser</Text>
                                <VerifiedIcon width={24} height={24} />
                            </div>
                            <button className="p-2.5 rounded-xl bg-surface-soft">
                                <MoreVerticalIcon width={20} height={20} />
                            </button>
                        </div>
                        <Text className="text-secondary desktop:order-2 tablet:order-2 order-3">Milady Maker is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by street style tribes.</Text>
                        <Button variant="secondary" className="desktop:w-12 tablet:w-12 w-full desktop:order-3 tablet:order-3 order-2">Edit profile</Button>
                        {/* <Button className="desktop:w-12 tablet:w-12 w-full desktop:order-3 tablet:order-3 order-2">Follow</Button> */}
                    </div>
                    <div className="flex gap-6">
                        <div className="flex justify-center gap-1.5">
                            <Text>235K</Text>
                            <Text className="text-secondary">Followers</Text>
                        </div>
                        <div className="flex justify-center gap-1.5">
                            <Text>2</Text>
                            <Text className="text-secondary">Following</Text>
                        </div>
                    </div>
                </div>
                {/* NFT layout */}
                <div className="w-full">
                    <Tabs.Group aria-label="Tabs with underline" style="underline">
                        <Tabs.Item active title={<Text className="font-medium">Owned <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">5.2K</span></Text>}>
                            <div className="flex flex-col mt-8 gap-10">
                                <div className="flex gap-3 desktop:justify-between justify-start">
                                    <Button variant="secondary">Filters <span className="p-1 bg-surface-medium rounded-lg"><SilderIcon width={14} height={14} /></span></Button>
                                    <Button variant="secondary">Price :  Low to High <span className="p-1 bg-surface-medium rounded-lg"><ChevronDownIcon color="gray-500" width={14} height={14} /></span></Button>
                                </div>
                                <div className="flex gap-8">
                                    <div className="desktop:basis-1/5 tablet:basis-1/3 hidden desktop:block tablet:block  border rounded-2xl  h-[544px]">
                                        <Accordion>
                                            <Accordion.Panel>
                                                <Accordion.Title>All</Accordion.Title>
                                                <Accordion.Content>
                                                    {itemAccordion.map(item => (
                                                        <div className="py-3 px-3 flex gap-4 hover:bg-surface-soft hover:rounded-xl">
                                                            <span>{item.icon}</span>
                                                            <Text className="text-secondary hover:text-primary hover:font-medium">{item.title}</Text>
                                                        </div>
                                                    ))}
                                                </Accordion.Content>
                                            </Accordion.Panel>
                                            <Accordion.Panel>
                                                <Accordion.Title>Status</Accordion.Title>
                                                <Accordion.Content>
                                                    {itemAccordion.map(item => (
                                                        <div className="py-3 px-3 flex gap-4 hover:bg-surface-soft hover:rounded-xl">
                                                            <span>{item.icon}</span>
                                                            <Text className="text-secondary hover:text-primary hover:font-medium">{item.title}</Text>
                                                        </div>
                                                    ))}
                                                </Accordion.Content>
                                            </Accordion.Panel>
                                            <Accordion.Panel>
                                                <Accordion.Title>Price</Accordion.Title>
                                                <Accordion.Content>
                                                    {itemAccordion.map(item => (
                                                        <div className="py-3 px-3 flex gap-4 hover:bg-surface-soft hover:rounded-xl">
                                                            <span>{item.icon}</span>
                                                            <Text className="text-secondary hover:text-primary hover:font-medium">{item.title}</Text>
                                                        </div>
                                                    ))}
                                                </Accordion.Content>
                                            </Accordion.Panel>
                                        </Accordion>
                                    </div>
                                    <div className="desktop:basis-4/5 tablet:basis-2/3 grid grid-cols-2 desktop:grid-cols-4 gap-3 w-full">
                                        {card.map(item => (
                                            <div className="border rounded-xl p-2 desktop:h-[332px] tablet:h-[280px]">
                                                <Image
                                                    className="cursor-pointer rounded-tl-xl rounded-tr-xl object-cover rounded-xl w-full desktop:h-[220px] tablet:h-[164px] h-[160px]"
                                                    width={220}
                                                    height={200}
                                                    src="https://fakeimg.pl/220x200/"
                                                    alt="Cover"
                                                />
                                                <div className="pt-3 px-1 flex flex-col gap-2 ">
                                                    <div className="flex gap-1 items-center">
                                                        <VerifyIcon width={16} height={16} />
                                                        <Text className="text-body-12 text-secondary">{item.title}</Text>
                                                    </div>
                                                    <Text className="font-medium text-body-16">{item.name}</Text>
                                                    <Text>{item.number}</Text>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">On Sale <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">44</span></Text>}>
                            2
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">Created <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">7</span></Text>}>
                            3
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">Activity <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">8</span></Text>}>
                            4
                        </Tabs.Item>
                    </Tabs.Group>
                </div>
                {/* Table Activity */}
                <div className="w-full">
                    <Tabs.Group aria-label="Tabs with underline" style="underline">
                        <Tabs.Item active title={<Text className="font-medium">Owned <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">5.2K</span></Text>}>
                            <div className="desktop:mt-10 tablet:mt-10 mt-4 flex flex-col">
                                <div className="flex gap-3 mb-8">
                                    <div className="relative flex-1">
                                        <Input className="py-4 h-14" placeholder="Type for NFTs" appendIcon={<CommandIcon color="gray-500" width={14} height={14} />} appendIconContainerClass="w-6 h-6 bg-surface-medium rounded-lg top-1/4 right-4 py-0 pr-0 pl-1.5" />
                                    </div>
                                    <div>
                                        <Button className="py-4 h-14" variant="secondary">Filters <span className="p-1 bg-surface-medium rounded-lg"><SilderIcon width={14} height={14} /></span></Button>
                                    </div>
                                    <div>
                                        <Button className="py-4 h-14" variant="secondary">Price :  Low to High <span className="p-1 bg-surface-medium rounded-lg"><ChevronDownIcon color="gray-500" width={14} height={14} /></span></Button>
                                    </div>
                                </div>
                                <div className="hidden tablet:block desktop:block">
                                    <div className="flex">
                                        {tableHeadHeader.map(item => (
                                            <Text className="text-body-12 text-tertiary w-1/5 uppercase pb-4">{item.title}</Text>
                                        ))}
                                    </div>
                                </div>

                                {tableCell.map(item => (
                                    <div className="desktop:items-center tablet:items-center items-start desktop:justify-center tablet:justify-center justify-between desktop:flex-row tablet:flex-row flex desktop:border-b tablet:border-b border-[#E3E3E3]">
                                        <div className="desktop:w-1/5 tablet:w-1/5 flex gap-4 items-center py-4 desktop:pr-4 tablet:pr-1 pr-0">
                                            <span className="">{item.avatar}</span>
                                            <div className="flex flex-col gap-1">
                                                <Text className="text-body-16 font-semibold break-words">{item.cell1}</Text>
                                                <div className="desktop:hidden tablet:hidden block">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex gap-1">
                                                            <Text className="text-body-16 text-tertiary break-words">{item.cell2} by</Text>
                                                            <Text className="text-body-16 underline break-words">{item.cell4}</Text>
                                                        </div>
                                                        <Text className="text-body-16 break-words">{item.cell5}</Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desktop:w-1/5 tablet:w-1/5 py-4 flex gap-2 items-center desktop:pr-4 tablet:pr-1 pr-0">
                                            <span className="bg-surface-soft rounded-xl p-2">{item.icon}</span>
                                            <Text className="text-body-16 font-semibold desktop:block tablet:block hidden break-words">{item.cell2}</Text>
                                        </div>
                                        <div className="desktop:w-1/5 tablet:w-1/5 py-4 desktop:pr-4 tablet:pr-1 hidden tablet:block desktop:block">
                                            <Text className="text-body-16 font-semibold break-words">{item.cell3}</Text>
                                        </div>
                                        <div className="desktop:w-1/5 tablet:w-1/5 py-4 desktop:pr-4 tablet:pr-1 hidden tablet:block desktop:block">
                                            <Text className="text-body-16 font-normal underline break-words">{item.cell4}</Text>
                                        </div>
                                        <div className="desktop:w-1/5 tablet:w-1/5 py-4 desktop:pr-4 tablet:pr-1 hidden tablet:block desktop:block">
                                            <Text className="text-body-16 font-semibold break-words">{item.cell5}</Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">On Sale <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">44</span></Text>}>
                            2
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">Created <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">7</span></Text>}>
                            3
                        </Tabs.Item>
                        <Tabs.Item title={<Text className="font-medium">Activity <span className="px-2.5 py-0.5 bg-surface-soft rounded-2xl ml-1.5 text-secondary text-body-12 font-medium">8</span></Text>}>
                            4
                        </Tabs.Item>
                    </Tabs.Group>
                </div>
            </div>
        </div>
    )
}