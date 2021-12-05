import { Button } from '~/system/button'
import { Form } from '~/system/form'
import { Textarea } from '~/system/input'
import { PopoverTrigger, Popover } from '~/system/popover'
import { FeedbackReaction } from '~/types/graphql'
import type { CreateFeedbackInput } from '~/types/graphql'
import { createFeedbackSchema } from '~/validation/feedback'

import { useCreateFeedbackMutation } from './graphql/create-feedback'

interface Props {}

type Values = Required<CreateFeedbackInput>

export const FeedbackPopover = (props: Props) => {
  const {} = props

  const [, createFeedback] = useCreateFeedbackMutation()

  const handleSubmit = (close: VoidFunction) => async (values: Values) => {
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
          <Form<Values>
            defaultValues={{
              email: '',
              message: '',
              reaction: FeedbackReaction.Happy,
            }}
            onSubmit={handleSubmit(close)}
            schema={createFeedbackSchema}
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
