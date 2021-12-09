import { UserInputError } from 'apollo-server-errors'
import { mutationField, objectType } from 'nexus'

type Response = {
  result: {
    id: string
    uploadURL: string
  }
  result_info: null
  success: boolean
  errors: []
  messages: []
}

export const CreateUploadUrl = mutationField('createUploadUrl', {
  type: objectType({
    name: 'CreateUploadUrlResult',
    definition(t) {
      t.string('uploadUrl')
    },
  }),

  // authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, _args, _ctx) {
    const response = await fetch(
      'https://api.cloudflare.com/client/v4/accounts/fdb1c98381a28f8660f29a0fdc4d0906/images/v1/direct_upload',
      {
        method: 'POST',
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer KCaYYIQ6LfjAK0sovqrjbWIQ9zaBUZ_7TMvum224`,
        },
      }
    )

    if (!response.ok) {
      throw new UserInputError('Failed to create upload url')
    }

    const { result } = (await response.json()) as Response

    return {
      uploadUrl: result.uploadURL,
    }
  },
})
