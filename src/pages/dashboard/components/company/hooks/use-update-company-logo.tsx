import { useState } from 'react'

import { useCreateUploadUrlMutation } from '../graphql/create-upload-url'
import { useUpdateCompanyLogoMutation } from '../graphql/update-company-logo'

export const useUpdateCompanyLogo = (companyId: string) => {
  const [loading, setLoading] = useState(false)

  const [, createUploadUrl] = useCreateUploadUrlMutation()
  const [, updateCompanyLogo] = useUpdateCompanyLogoMutation()

  const updateLogo = async (file: File) => {
    setLoading(true)

    const { data, error } = await createUploadUrl()

    if (error) {
      console.error(error)
      return
    }

    const formData = new FormData()
    formData.append('file', file, file.name)

    const response = await fetch(data!.createUploadUrl.uploadUrl, {
      method: 'POST',
      body: formData,
    })

    const { result } = await response.json()

    await updateCompanyLogo({
      input: {
        id: companyId,
        imageId: result.id,
      },
    })

    setLoading(false)
  }

  return [updateLogo, { loading }] as const
}
