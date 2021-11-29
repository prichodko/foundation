const sales = async (message: string) => {
  await fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  )
}

const feedback = async (message: string) => {
  await fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  )
}

export const slack = {
  sales,
  feedback,
}
