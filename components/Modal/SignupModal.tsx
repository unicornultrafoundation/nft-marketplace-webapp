import {
  Checkbox,
  CustomFlowbiteTheme,
  Label,
  Modal,
  ModalProps,
} from "flowbite-react";
import Text from "@/components/Text";
import Input from "@/components/Form/Input";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { sleep } from "@/utils";
import { useForm } from "react-hook-form";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { toast } from "react-toastify";
import { FormState } from "@/types";
import { formRulesSigupModal } from "@/config/form/rules";
import useAuthStore from "@/store/auth/store";

interface Props extends ModalProps {
  onSignupSuccess?: (accessToken?: string) => void;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px]",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 ",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function SignupModal({ onSignupSuccess, show, onClose }: Props) {
  const { credentials } = useAuthStore();
  const { onUpdateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState.SignUp>();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onSignup = async (data: FormState.SignUp) => {
    if (!acceptedTerms) return;
    try {
      setIsSigningUp(true);
      await onUpdateProfile({ ...data, acceptedTerms });
      await sleep(500);
      toast.success("Signed up successfully", {
        autoClose: 1000,
        closeButton: true,
      });
      onSignupSuccess?.(credentials?.accessToken);
    } catch (e: any) {
      toast.error(`Error report: ${e.message || e}`);
      console.error("Error signing up:", e);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Modal
      theme={modalTheme}
      dismissible
      show={show}
      onClose={onClose}
      size="lg"
    >
      <Modal.Body>
        <form onSubmit={handleSubmit(onSignup)}>
          <div className="max-w-[400px] mx-auto flex flex-col gap-4 py-8">
            <Text
              className="font-semibold text-primary text-center"
              variant="heading-md"
            >
              Sign-up to U2 NFT!
            </Text>
            <Text className="text-secondary text-center" variant="body-18">
              Choose a display name and enter your email address to receive
              updates when your NFTs sell or receive offers.
            </Text>

            <div className="flex flex-col gap-5">
              <Input
                error={!!errors.username}
                placeholder="Display name"
                register={register("username", formRulesSigupModal.username)}
              />
              <Input
                error={!!errors.email}
                placeholder="Enter your email"
                register={register("email", formRulesSigupModal.email)}
              />

              <div className="flex gap-5 items-center">
                <Checkbox
                  id="accept"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                <Label
                  htmlFor="accept"
                  className="text-body-16 text-tertiary cursor-pointer"
                >
                  I have read and accept the{" "}
                  <a href="#" className="text-primary">
                    Terms of Service
                  </a>
                  , the{" "}
                  <a href="#" className="text-primary">
                    Term of Creator
                  </a>{" "}
                  and confirm that I am at least 13 years old
                </Label>
              </div>

              <FormValidationMessages errors={errors} />
            </div>

            <div className="flex flex-col gap-5">
              <Button
                type="submit"
                loading={isSigningUp}
                loadingText="Signing up"
                disabled={!acceptedTerms}
              >
                Finish sign-up
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
