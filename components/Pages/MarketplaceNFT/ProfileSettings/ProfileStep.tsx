import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/auth/store";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { urlRegex } from "@/utils/regex";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { FormState } from "@/types";
import VerifyAccountModal from "@/components/Modal/VerifyAccountModal";
import { formRulesProfile } from "@/config/form/rules";

export default function ProfileStep() {
  const profile = useAuthStore((state) => state.profile);
  const [showPopup, setShowPopup] = useState(false);
  const { onUpdateProfile, onVerifyAccount } = useAuth();
  const [verifyData, setVerifyData] = useState<FormState.VerifyAccount>({
    accountStatus: false,
    listVerify: {
      email: false,
      username: false,
      shortLink: false,
      avatar: false,
      bio: false,
      twitterLink: false,
      ownerOrCreater: false,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
    setValue,
  } = useForm<FormState.UpdateProfile>({
    defaultValues: {
      bio: profile?.bio,
      shortLink: profile?.shortLink,
      username: profile?.username,
      twitterLink: profile?.twitterLink,
      webURL: profile?.webURL,
      facebookLink: profile?.facebookLink,
      telegram: profile?.telegramLink,
      discord: profile?.discordLink,
    },
  });

  const onSubmitProfile = async (params: FormState.UpdateProfile) => {
    const toastId = toast.loading("Uploading Profile...", { type: "info" });

    try {
      await onUpdateProfile(params);

      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } catch (e: any) {
      console.error("Error:", e);
      toast.update(toastId, {
        render: `Profile updating: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  const handleGetVerify = async () => {
    try {
      let response = await onVerifyAccount();
      if (response !== undefined) {
        setVerifyData(response);
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    } catch (e: any) {
      toast.error(`Error report: ${e.message || e}`, {
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  return (
    <div className="flex gap-8 w-full desktop:flex-row tablet:flex-row flex-col-reverse mt-10 tablet:mt-8 desktop:mt-8">
      <form className="flex-1" onSubmit={handleSubmit(onSubmitProfile)}>
        <div className="flex gap-8 mb-8">
          <div className=" flex gap-8 w-full flex-col">
            <div>
              <label className="block mb-2 font-semibold text-primary">
                Display name
              </label>
              <Input
                placeholder="Limit 6 to 25 characters"
                error={!!errors.username}
                type="text"
                register={register("username", formRulesProfile.username)}
              />
            </div>
            <div>
              <label className="block mb-2 text-base font-semibold text-primary">
                Short link
              </label>
              <Input
                prependIcon="@"
                placeholder="shortlink"
                error={!!errors.shortLink}
                register={register("shortLink", formRulesProfile.shortLink)}
              />
              <Text className="text-tertiary mt-1" variant="body-12">
                Your profile will be available on
                https://marketplace.uniultra.xyz/user/[shortLink]
              </Text>
            </div>
            <div>
              <label className="block mb-2 text-base font-semibold text-primary">
                Bio
              </label>
              <Textarea
                className="h-[160px] resize-none"
                register={register("bio")}
                maxLength={1200}
                placeholder="Limit 1200 character"
              />
            </div>
            <div>
              <Text className="text-body-24 tablet:text-body-32 desktop:text-body font-semibold ">
                Social links
              </Text>
              <Text className="text-tertiary" variant="body-16">
                Add your existing social links to build a stronger reputation
              </Text>
            </div>
            <div>
              <label className="block mb-2 text-base font-semibold text-primary">
                Website URL
              </label>
              <Input
                placeholder="https://"
                error={!!errors.webURL}
                register={register("webURL", {
                  pattern: { value: urlRegex, message: "Wrong web url format" },
                })}
                className="console.error"
              />
            </div>
            <div>
              <label className="block mb-2 text-base font-semibold text-primary">
                X (Twitter)
              </label>
              <Input
                prependIcon={<Icon name="circle" />}
                placeholder="https://twitter.com/[your-twitter-username]"
                error={!!errors.twitterLink}
                register={register("twitterLink", {
                  pattern: {
                    value: urlRegex,
                    message: "Wrong twitter url format",
                  },
                })}
              />
            </div>
            <div>
              <label className="block mb-2 text-base font-semibold text-primary">
                Facebook
              </label>
              <Input
                placeholder="https://www.facebook.com/[your-facebook-username]"
                error={!!errors.facebookLink}
                register={register("facebookLink", {
                  pattern: {
                    value: urlRegex,
                    message: "Wrong facebook url format",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <FormValidationMessages errors={errors} />
        <div className="w-full tablet:w-auto desktop:w-auto">
          <Button
            type="submit"
            disabled={!isDirty}
            className="w-full tablet:w-auto desktop:w-auto"
          >
            Save settings
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center desktop:items-start tablet:items-start ">
        <div
          className=" w-[244px] rounded-2xl flex justify-center items-center p-4 gap-2 flex-col text-center"
          style={{ boxShadow: "rgba(27, 32, 50, 0.12) 0px 10px 40px" }}
        >
          <div>
            <Icon name="verified" width={72} height={72} />
          </div>
          <Text className="font-semibold  text-body-24">
            Verify your account
          </Text>
          <Text className="text-secondary text-body-16">
            Proceed with verification process to get more visibility and gain
            trust on U2NFT
          </Text>
          <Button
            onClick={() => handleGetVerify()}
            variant="secondary"
            scale="sm"
            className="w-full tablet:w-auto desktop:w-auto"
          >
            Get Verified
          </Button>
        </div>
      </div>
      <VerifyAccountModal
        show={showPopup}
        reponseVerify={verifyData}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
