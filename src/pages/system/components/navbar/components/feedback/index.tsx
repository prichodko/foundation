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

export const Feedback = (props: Props) => {
  const {} = props

  const [, createFeedback] = useCreateFeedbackMutation()

  const handleSubmit: FormSubmitHandler<FormValues> = async values => {
    await createFeedback({
      input: {
        message: values.message,
        reaction: values.reaction,
      },
    })
  }

  return (
    <PopoverTrigger>
      <Button variant="minimal">Feedback</Button>
      <Popover className="p-4 w-[300px]">
        <Form<CreateFeedbackInput>
          defaultValues={{
            email: '',
            message: '',
            reaction: FeedbackReaction.Happy,
          }}
          onSubmit={handleSubmit}
        >
          <Textarea
            label="Feedback"
            name="message"
            placeholder="Tell us the good, the bad, and the ugly…"
          />
          <div className="flex justify-between pt-4">
            <div className="flex gap-4">
              <span className="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                🤩
              </span>
              <span className="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                😐
              </span>
              <span className="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                😭
              </span>
            </div>
            <Button type="submit">Send</Button>
          </div>
        </Form>
      </Popover>
    </PopoverTrigger>
  )
}
