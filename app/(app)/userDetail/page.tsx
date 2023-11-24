import React from "react";
import BgImage from "@/assets/images/user-detail-bg.png";
import Avatar from "@/assets/images/user-avatar.png";
import DropdownIcon from "@/assets/svg/dropdown-icon";
import FilterIcon from "@/assets/svg/filter-icon";
import TabCategory from "@/app/(app)/userDetail/components/tabCategory/TabCategory";
import Card from "@/assets/images/card-image.png";
import CardNFT from "@/app/(app)/userDetail/components/cardNFT/CardNFT";
import ItemImage from "@/assets/images/item-image.png";
import Profile from "@/app/(app)/userDetail/components/profile/Profile";
import TableExplore from "@/app/(app)/userDetail/components/tableExplore/TableExplore";

interface NftCards {
    name: string;
    amount: number;
    symbol: string;
    nftImg: any;
    category: string;
    isVerify: boolean;
}

interface Explores {
    exploreName: string;
    thumbnailImage?: any;
    type: string;
    price: string;
    symbol: string;
    by: string;
    time: number;
}

export default function ProfilePage() {
    const listData: NftCards[] = [
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
        {
            name: "Winter Madagascar",
            amount: 0.002,
            symbol: "U2U",
            nftImg: Card,
            category: "Clown Ape",
            isVerify: true,
        },
    ];

    const userProfile = {
        name: "Jack Krauser",
        bio: "Milady Maker is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by street style tribes.",
        avatarImage: Avatar,
        backgroundImage: BgImage,
        totalFollower: "235K",
        totalFollowing: "22",
        isVerify: true,
    };

    const explores: Explores[] = [
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Listed",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Minted",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Listed",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Bids",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Listed",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Minted",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Purchased",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Transfered",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Purchased",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
        {
            exploreName: "Explorer5523",
            thumbnailImage: ItemImage,
            type: "Bids",
            price: "0.0050",
            symbol: "WETH",
            by: "JackKrauser",
            time: new Date().getTime(),
        },
    ];

    return (
        <>
            <Profile
                name={userProfile.name}
                bio={userProfile.bio}
                avatarImage={userProfile.avatarImage}
                backgroundImage={userProfile.backgroundImage}
                totalFollowing={userProfile.totalFollowing}
                totalFollower={userProfile.totalFollower}
                isVerify={userProfile.isVerify}
            />

            <div className="mt-[100px]">
                <div className="pt-[40px] px-[80px] pb-[40px] gap-[32px] flex gap-[32px] flex-col">
                    <TabCategory />

                    <div className="flex items-center justify-between">
                        <div className="bg-surface-soft pt-[16px] pb-[16px] pl-[24px] pr-[24px] flex gap-2 rounded-2xl">
                            <span>Filters</span>
                            <FilterIcon width={24} height={24} />
                        </div>
                        <div className="bg-surface-soft pt-[16px] pb-[16px] pl-[24px] pr-[24px] flex gap-2 rounded-2xl items-center">
                            <span>Price: </span>
                            <span>Low to High</span>
                            <button className="bg-surface-medium p-[2px] flex rounded-xl ">
                                <DropdownIcon width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pb-[80px] px-[80px] flex gap-[32px]  ">
                    <div>
                        <div className="w-[296px] rounded-2xl border">
                            <div className="flex justify-between px-[16px] py-[20px] rounded-2xl hover:bg-surface-soft">
                                <span>Blockchain</span>
                                <button>
                                    <DropdownIcon width={24} height={24} />
                                </button>
                            </div>

                            <div className="flex justify-between px-[16px] py-[20px] rounded-2xl hover:bg-surface-soft">
                                <span>Status</span>
                                <DropdownIcon width={24} height={24} />
                            </div>
                            <div className="flex justify-between px-[16px] py-[20px] rounded-2xl hover:bg-surface-soft">
                                <span>Price</span>
                                <button>
                                    <DropdownIcon width={24} height={24} />
                                </button>
                            </div>
                            <div className="flex justify-between px-[16px] py-[20px] rounded-2xl hover:bg-surface-soft">
                                <span>Category</span>
                                <button>
                                    <DropdownIcon width={24} height={24} />
                                </button>
                            </div>
                            <div className="flex justify-between px-[16px] py-[20px] rounded-2xl hover:bg-surface-soft">
                                <span>Collections</span>
                                <button>
                                    <DropdownIcon width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-[12px] w-full">
                        {listData.map((option, index) => (
                            <CardNFT
                                key={index}
                                name={option.name}
                                amount={option.amount}
                                category={option.category}
                                isVerify={option.isVerify}
                                nftImg={option.nftImg}
                                symbol={option.symbol}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-[100px]">
                <div className="pt-[40px] px-[80px] pb-[40px] gap-[32px] flex gap-[32px] flex-col">
                    <TabCategory />

                    <div
                        id="detailed-pricing"
                        className="w-full overflow-x-auto"
                    >
                        <div className="overflow-hidden min-w-max">
                            <div className="grid grid-cols-5 font-medium text-xs text-tertiary uppercase py-[16px] uppercase">
                                <div>Item</div>
                                <div>Type</div>
                                <div>Price</div>
                                <div>By</div>
                                <div>Time</div>
                            </div>
                            {explores.map((option, index) => (
                                <div key={index}>
                                    <TableExplore
                                        exploreName={option.exploreName}
                                        type={option.type}
                                        price={option.price}
                                        symbol={option.symbol}
                                        by={option.by}
                                        time={option.time}
                                        thumbnailImage={option.thumbnailImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
