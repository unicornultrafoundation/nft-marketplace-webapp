import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import Textarea from '@/components/Form/Textarea';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import React from 'react';
import {useForm} from 'react-hook-form';
import useAuthStore from '@/store/auth/store'
import {toast} from 'react-toastify'
import {useAuth} from '@/hooks/useAuth'
import {emailRegex, nameRegex, urlRegex} from '@/utils/regex';
import FormValidationMessages from '@/components/Form/ValidationMessages';
import {FormState} from '@/types'

export default function ProfileStep() {
  const profile = useAuthStore(state => state.profile)
  const {onUpdateProfile} = useAuth()

  const {handleSubmit, register, formState: {isDirty, errors}, setValue} = useForm<FormState.UpdateProfile>({
    defaultValues: {
      bio: profile?.bio,
      shortLink: profile?.shortLink,
      username: profile?.username,
      twitterLink: profile?.twitterLink,
      webURL: profile?.webURL,
      facebookLink: profile?.facebookLink,
      telegram: profile?.telegramLink,
      discord: profile?.discordLink
    }
  })

  const onSubmitProfile = async (params: FormState.UpdateProfile) => {
    const toastId = toast.loading('Uploading Profile...', {type: 'info'})

    try {
      await onUpdateProfile(params)

      toast.update(toastId, {
        render: 'Profile updated successfully',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        closeButton: true
      })
    } catch (e) {
      console.error('Error:', e)
      toast.update(toastId, {
        render: `Profile updating: ${e}`,
        type: 'error',
        isLoading: false,
        autoClose: 1000,
        closeButton: true
      })
    }
  }

  const formRules = {
    username: {
      required: 'Please input username',
      pattern: { value: nameRegex, message: 'Invalid username' }

    },
    shortLink: {
      required: 'Please input short link',
      pattern: { value: nameRegex, message: 'Invalid short link' }
    }
  }

  return (
     <form onSubmit={handleSubmit(onSubmitProfile)}>
       <div className="flex gap-8 mb-8">
         <div className="desktop:mt-5 tablet:mt-5 mt-7 flex gap-8 w-full flex-col">
           <div>
             <label className="block mb-2 font-semibold text-primary">Username</label>
             <Input
                placeholder="Limit 6 to 25 characters"
                error={!!errors.username}
                type="text"
                register={register('username', formRules.username)}
             />
           </div>
           <div>
             <label className="block mb-2 text-base font-semibold text-primary">Short link</label>
             <Input
                prependIcon="@"
                placeholder="shorlink"
                error={!!errors.username}
                register={register('shortLink',formRules.shortLink)}
             />
             <Text className="text-tertiary mt-1" variant="body-12">
               Your profile will be available on https://marketplace.uniultra.xyz/user/[shortLink]
             </Text>
           </div>
           <div>
             <label className="block mb-2 text-base font-semibold text-primary">Bio</label>
             <Textarea
                className="h-[160px] resize-none"
                register={register('bio')}
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
             <label className="block mb-2 text-base font-semibold text-primary">Website URL</label>
             <Input
                placeholder="https://"
                error={!!errors.webURL}
                register={register('webURL', {
                  pattern: {value: urlRegex, message: 'Wrong web url format'}
                })}
                className="console.error"
             />
           </div>
           <div>
             <label className="block mb-2 text-base font-semibold text-primary">X (Twitter)</label>
             <Input
                prependIcon={<Icon name="circle"/>}
                placeholder="https://twitter.com/[your-twitter-username]"
                error={!!errors.twitterLink}
                register={register('twitterLink', {
                  pattern: {value: urlRegex, message: 'Wrong twitter url format'}
                })}
             />
           </div>
           <div>
             <label className="block mb-2 text-base font-semibold text-primary">Facebook</label>
             <Input
                placeholder="https://www.facebook.com/[your-facebook-username]"
                error={!!errors.facebookLink}
                register={register('facebookLink', {
                  pattern: {value: urlRegex, message: 'Wrong facebook url format'}
                })}
             />
           </div>
         </div>
       </div>
       <FormValidationMessages errors={errors}/>
       <div className="w-full tablet:w-auto desktop:w-auto">
         <Button
            type="submit"
            disabled={!isDirty}
            className="w-full tablet:w-auto desktop:w-auto">
           Save settings
         </Button>
       </div>
     </form>
  )
}