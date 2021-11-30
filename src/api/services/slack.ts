const sales = async (message: string) => {
  await fetch(process.env.SLACK_SALES_WEBHOOK_URL!, {
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
  await fetch(process.env.SLACK_FEEDBACK_WEBHOOK_URL!, {
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
