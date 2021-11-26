import type { PlacesAutocompleteResponse } from 'nexus'
import { stringArg, queryField, list } from 'nexus'

declare module 'nexus' {
  export type PlacesAutocompleteResponse = {
    predictions: google.maps.places.AutocompletePrediction[]
    status: google.maps.places.PlacesServiceStatus
    error_message?: string
  }
}

export const SearchCities = queryField('searchCities', {
  type: list('City'),
  args: {
    country: stringArg(),
    name: stringArg(),
  },
  authorize: (_parent, _args, ctx) => ctx.auth.user,
  async resolve(_root, { country, name }, _ctx) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&components=country:${country}&types=(cities)&key=${process.env.GOOGLE_PLACES_API_KEY}`
    )

    const json = (await response.json()) as PlacesAutocompleteResponse

    const { predictions } = json

    return predictions.map(prediction => ({
      id: prediction.description,
      name: prediction.structured_formatting.main_text,
    }))
  },
})
