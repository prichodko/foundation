import type { Describe} from 'superstruct';
import { type , enums, object, optional, string, nullable } from 'superstruct'


import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { Textarea } from '~/system/input'
import { PopoverTrigger, Popover } from '~/system/popover'
import { FeedbackReaction } from '~/types/graphql'
import type { CreateFeedbackInput } from '~/types/graphql'

import { useCreateFeedbackMutation } from './graphql/create-feedback'

interface Props {}

type FormValues = CreateFeedbackInput

const schema: Describe<CreateFeedbackInput> = object({
  message: string(),
  reaction: enums([
    FeedbackReaction.Happy,
    FeedbackReaction.Sad,
    FeedbackReaction.Neutral,
  ]),
  email: optional(nullable(string())),
})

const sssssss: Describe<CreateFeedbackInput> = type({
  message: string(),
  // reaction: enums([
  //   FeedbackReaction.Happy,
  //   FeedbackReaction.Sad,
  //   FeedbackReaction.Neutral,
  // ]),
  email: optional(nullable(string())),
})

export const FeedbackPopover = (props: Props) => {
  const {} = props

  const [, createFeedback] = useCreateFeedbackMutation()

  const handleSubmit = (close: VoidFunction) => async (values: FormValues) => {
    await createFeedback({
      input: {
        message: values.message,
        reaction: values.reaction,
      },
    })
    close()
  }

  return (
    <PopoverTrigger>
      <Button variant="minimal">Feedback</Button>
      {close => (
        <Popover className="p-4 w-[300px]">
          <Form<FormValues>
            defaultValues={{
              email: '',
              message: '',
              reaction: FeedbackReaction.Happy,
            }}
            onSubmit={handleSubmit(close)}
            schema={schema}
          >
            <Textarea
              label="Feedback"
              name="message"
              placeholder="Tell us the good, the bad, and the ugly…"
            />
            <div className="flex justify-between pt-4">
              <div className="flex gap-4">
                <span className="hover:scale-50 w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                  🤩
                </span>
                <span className="hover:scale-50 w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                  😐
                </span>
                <span className="hover:scale-50 w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                  😭
                </span>
              </div>
              <Button type="submit">Send</Button>
            </div>
          </Form>
        </Popover>
      )}
    </PopoverTrigger>
  )
}
