import type { PlacesAutocompleteResponse } from 'nexus'
import { queryField, list, inputObjectType } from 'nexus'

declare module 'nexus' {
  export type PlacesAutocompleteResponse = {
    predictions: google.maps.places.AutocompletePrediction[]
    status: google.maps.places.PlacesServiceStatus
    error_message?: string
  }
}

export const GetCities = queryField('cities', {
  type: list('City'),
  args: {
    input: inputObjectType({
      name: 'GetCitiesInput',
      definition(t) {
        t.string('country')
        t.string('query')
      },
    }),
  },
  authorize: (_parent, _args, ctx) => ctx.auth.user(ctx),
  async resolve(_root, { input }, _ctx) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input.query}&components=country:${input.country}&types=(cities)&key=${process.env.GOOGLE_PLACES_API_KEY}`
    )

    const json = (await response.json()) as PlacesAutocompleteResponse

    const { predictions } = json

    return predictions.map(prediction => ({
      label: prediction.description,
      value: prediction.structured_formatting.main_text,
    }))
  },
})
