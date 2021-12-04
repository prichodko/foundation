import { env } from '../config/env'

const sales = async (message: string) => {
  await fetch(env.slack.salesWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
    }),
  })
}

const feedback = async (message: string) => {
  await fetch(env.slack.feedbackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
    }),
  })
}

export const slack = {
  sales,
  feedback,
}
