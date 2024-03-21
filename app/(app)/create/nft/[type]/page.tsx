"use client";

import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import Text from "@/components/Text";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Icon from "@/components/Icon";
import { AssetType, FormState, Trait } from "@/types";
import { classNames } from "@/utils/string";
import useAuthStore from "@/store/auth/store";
import useSWR from "swr";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { Accordion, Tooltip } from "flowbite-react";
import Link from "next/link";
import { toast } from "react-toastify";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { useCreateNFT } from "@/hooks/useNFT";
import ImageUploader from "@/components/Form/ImageUploader";
import { ALLOWED_FILE_TYPES, ALLOWED_IMAGE_TYPES } from "@/config/constants";
import PlusCircleIcon from "@/components/Icon/PlusCircle";
import { redirect, useParams, useRouter } from "next/navigation";
import { formRulesCreateNFT } from "@/config/form/rules";

export default function CreateNftPage() {
  const type = useParams().type.toString().toUpperCase() as AssetType;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const api = useMarketplaceApi();
  const { onCreateNFT } = useCreateNFT(type || "ERC721");
  const userId = useAuthStore((state) => state.credentials?.userId);
  const { data } = useSWR(
    userId || null,
    (userId) =>
      api.fetchCollectionsByUser({
        page: 1,
        limit: 1000,
        userId,
        hasBase: true,
      }),
    { refreshInterval: 3600 * 1000 },
  );
  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormState.CreateNFT>({
    defaultValues: { traits: [{ trait_type: "", value: "" }] },
  });

  const media = watch("media");
  const isNonImageNFT = useMemo(() => {
    if (!media || !media?.length) return false;
    const fileType = media[0].type.split("/")[0];
    if (!fileType) return false;
    return fileType !== "image";
  }, [media]);

  const formRules = {
    amount: {
      required: "Number of copies is required",
      validate: (value: number) => {
        if (type === "ERC721") return true;
        if (value < 1) {
          return "Number of copies must be greater than 1";
        }
        if (!/^\d+$/.test(value.toString())) {
          return "Number of copies must be an integer";
        }

        return true;
      },
    },
  };

  const collectionOptions = useMemo(() => {
    const collections =
      data?.data?.map((c) => ({
        label: c.name ?? c.id,
        value: c.address,
        type: c.type,
      })) || [];
    return collections.filter((c) => c.type === type);
  }, [data, type]);

  const resetForm = () => {
    reset();
    router.push("/create/nft");
  };

  const handleSelectMedia = (file?: Blob) => {
    if (!file) {
      setValue("media", []);
    } else {
      setValue("media", [file]);
      clearErrors("media");
    }
  };

  const handleSelectCoverImage = (file?: Blob) => {
    if (!file) {
      setValue("media", [media[0]]);
    } else {
      setValue("media", [media[0], file]);
      clearErrors("media");
    }
  };

  const handleTraitInput = (index: number, key: keyof Trait, value: any) => {
    const _traits = getValues("traits");
    if (!_traits) return;
    const _trait = { ..._traits[index] };
    if (!_trait) return;
    _trait[key] = value;
    _traits[index] = _trait;
    setValue("traits", _traits);

    const lastTrait = _traits[_traits.length - 1];
    if (!lastTrait) return;
    if (!lastTrait.trait_type || !lastTrait.value) return;
    _traits.push({ trait_type: "", value: "" }); // Add more trait when inputting
    setValue("traits", _traits as Trait[]);
  };

  const onSubmit = async ({ media, traits, ...rest }: FormState.CreateNFT) => {
    if (!type) return;

    setLoading(true);
    const _traits = !!traits
      ? traits.filter((trait) => !!trait.trait_type && trait.value)
      : [];
    const createNFTToast = toast.loading("Uploading Media...", {
      type: "info",
    });

    try {
      const { fileHashes } = await api.uploadFile(media);
      toast.update(createNFTToast, { render: "Sending transaction" });

      const [media1, media2] = fileHashes;
      const params = {
        ...rest,
        traits: _traits,
        image: isNonImageNFT ? media2 : media1,
        animation_url: isNonImageNFT ? media1 : undefined,
      };

      await onCreateNFT(params);

      toast.update(createNFTToast, {
        render: "Item created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      resetForm();
      router.push("/explore/items");
    } catch (e: any) {
      console.error(e);
      toast.update(createNFTToast, {
        render: (error) => `Error report: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateInput = async (
    name: string,
    value: Record<string, any>,
  ) => {
    try {
      setValidating(true);
      if (name === "name" && !!value.name) {
        if (!getValues("collection")) {
          setError("collection", {
            type: "custom",
            message: "Please select a collection first",
          });
        } else {
          clearErrors("collection");
        }
        const existed = await api.validateInput({
          key: "nftName",
          value: value.name,
          collectionId: getValues("collection"),
        });
        if (existed)
          setError("name", {
            type: "custom",
            message: "NFT name already existed",
          });
        else clearErrors("name");
      }
    } finally {
      setValidating(false);
    }
  };

  const handleCollectionChange = (collectionValue: any, onChange: any) => {
    clearErrors("collection");
    onChange(collectionValue);
  };

  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      if (!name) return;
      handleValidateInput(name, value);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    if (type !== "ERC1155" && type !== "ERC721") {
      return redirect("/create/nft");
    }
  }, [type]);

  return (
    <div className="w-full flex justify-center py-10 tablet:py-20 desktop:py-20">
      <div className="flex flex-col tablet:w-[550px] w-full">
        <div className="flex items-center mb-6 tablet:mb-10 desktop:mb-10">
          <Button
            variant="text"
            onClick={resetForm}
            className="min-w-[60px] tablet:min-w-[120px] desktop:min-w-[120px]"
          >
            <Icon name="arrowLeft" width={24} height={24} />
          </Button>
          <Text className="text-body-32 tablet:text-body-40 desktop:text-body-40 font-semibold">
            Create New NFT - {type}
          </Text>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-4">
            {/* Upload file */}
            <div>
              <Text className="text-body-16 font-semibold mb-1">
                Upload file
              </Text>
              <Controller
                name="media"
                control={control}
                rules={formRulesCreateNFT.media}
                render={({ field: { value } }) => (
                  <ImageUploader
                    maxSize={100}
                    loading={uploading}
                    error={!!errors.media}
                    accept={ALLOWED_FILE_TYPES}
                    onInput={handleSelectMedia}
                  />
                )}
              />
            </div>
            {isNonImageNFT && (
              <div>
                <Text className="text-body-16 font-semibold mb-1">
                  Upload Cover Image
                </Text>
                <Controller
                  name="media"
                  control={control}
                  render={({ field: { value } }) => (
                    <ImageUploader
                      loading={uploading}
                      error={!!errors.media}
                      accept={ALLOWED_IMAGE_TYPES}
                      maxSize={20}
                      onInput={handleSelectCoverImage}
                    />
                  )}
                />
              </div>
            )}

            {/* Choose collection */}
            <div>
              <Text className="text-body-16 font-semibold mb-1">
                Choose collection
              </Text>
              <Controller
                name="collection"
                control={control}
                rules={formRulesCreateNFT.collection}
                render={({ field: { onChange, value } }) => (
                  <div className="flex items-center gap-3 w-full max-h-56 overflow-y-auto flex-wrap">
                    {type === "ERC721" || type === "ERC1155" ? (
                      <Link href={`/create/collection`}>
                        <div
                          className={classNames(
                            "w-36 overflow-ellipsis flex flex-col justify-center items-center gap-2 cursor-pointer rounded-2xl p-5 text-center border-2 text-primary bg-white",
                            "hover:border-primary hover:bg-white hover:text-primary transition-all",
                          )}
                        >
                          <PlusCircleIcon width={24} height={24} />
                          <span className="font-bold">
                            Create{" "}
                            <span className="text-tertiary font-normal">
                              {" "}
                              {type === "ERC721" ? "ERC721" : "ERC1155"}
                            </span>
                          </span>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                    {collectionOptions.length
                      ? collectionOptions.map((c) => (
                          <div
                            key={c.value}
                            onClick={() =>
                              handleCollectionChange(c.value, onChange)
                            }
                            className={classNames(
                              "w-36 overflow-ellipsis flex flex-col justify-center items-center gap-2 cursor-pointer rounded-2xl p-8 text-center",
                              "hover:border-primary hover:bg-white hover:text-primary border-2 transition-all",
                              c.value === value
                                ? "border-primary bg-white text-primary"
                                : "text-tertiary bg-surface-soft",
                            )}
                          >
                            <Tooltip content={c.label} placement="top">
                              <Text className="text-body-18 font-bold text-primary text-ellipsis w-[7rem] break-all whitespace-nowrap overflow-hidden">
                                {c.label}
                              </Text>
                            </Tooltip>
                            <Text className="text-body-12 text-secondary text-ellipsis w-[7rem] break-all whitespace-nowrap overflow-hidden">
                              {c.type}
                            </Text>
                          </div>
                        ))
                      : ""}
                  </div>
                )}
              />
            </div>
            {/* Name */}
            <div>
              <Text className="text-body-16 font-semibold mb-1">
                Display name
              </Text>
              <Input
                error={!!errors.name}
                register={register("name", formRulesCreateNFT.name)}
              />
            </div>
            {/* Description */}
            <div>
              <Text className="text-body-16 font-semibold mb-1">
                Description
              </Text>
              <Textarea
                className="h-[160px] resize-none"
                error={!!errors.description}
                register={register(
                  "description",
                  formRulesCreateNFT.description,
                )}
              />
            </div>
            {/* Royalties */}
            <div>
              <Text className="text-body-16 font-semibold mb-1">Royalties</Text>
              <Input
                error={!!errors.royalties}
                register={register("royalties", formRulesCreateNFT.royalties)}
                appendIcon={<Text className="text-secondary">%</Text>}
              />
            </div>

            {type === "ERC1155" && (
              <div>
                <Text className="text-body-16 font-semibold mb-1">
                  Number of copies
                </Text>
                <Input
                  error={!!errors.amount}
                  register={register("amount", formRules.amount)}
                />
              </div>
            )}

            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>Advanced settings</Accordion.Title>
                <Accordion.Content>
                  <Text
                    className="text-primary font-semibold mb-4"
                    variant="body-16"
                  >
                    Properties{" "}
                    <span className="text-secondary">(Optional)</span>
                  </Text>

                  <div className="w-full flex flex-col gap-4">
                    <Controller
                      name="traits"
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <>
                            {Array.isArray(value) &&
                              value.map((trait, index) => (
                                <div
                                  key={index}
                                  className="w-full flex items-center gap-7"
                                >
                                  <Input
                                    value={value[index].trait_type}
                                    containerClass="flex-1"
                                    placeholder="e.g. Size"
                                    onChange={(event) =>
                                      handleTraitInput(
                                        index,
                                        "trait_type",
                                        event.target.value,
                                      )
                                    }
                                  />
                                  <Input
                                    value={value[index].value}
                                    containerClass="flex-1"
                                    placeholder="e.g. M"
                                    onChange={(event) =>
                                      handleTraitInput(
                                        index,
                                        "value",
                                        event.target.value,
                                      )
                                    }
                                  />
                                </div>
                              ))}
                          </>
                        );
                      }}
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <FormValidationMessages errors={errors} />

            <ConnectWalletButton showConnectButton>
              <Button
                loading={loading}
                loadingText="Creating NFT ..."
                disabled={
                  uploading || validating || Object.keys(errors).length > 0
                }
                type="submit"
                className="w-full tablet:w-auto desktop:w-auto"
              >
                Create Item
              </Button>
            </ConnectWalletButton>
          </div>
        </form>
      </div>
    </div>
  );
}
