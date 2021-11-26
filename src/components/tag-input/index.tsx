import { useMemo, useState } from 'react'

import { CrossCircledIcon } from '@radix-ui/react-icons'

import { useSearchTagsQuery } from '~/pages/homepage/components/search/graphql/search'
import { BaseButton } from '~/system/button'
import { Combobox, Item } from '~/system/combobox'
import { useField } from '~/system/form'

interface Props {
  name: string
  value?: string[]
  onChange?: (tags: string[]) => void
}

export const TagInput = (props: Props) => {
  const { field } = useField(props)

  const value = props.value ?? (field?.value as Props['value'])
  const onChange = props.onChange ?? (field?.onChange as Props['onChange'])

  const [inputValue, setInputValue] = useState('')

  const [{ data, fetching }] = useSearchTagsQuery({
    variables: {
      name: inputValue,
      not: value!,
    },
  })

  const items = useMemo(() => {
    if (!data) {
      return []
    }

    if (data.searchTags.length === 0) {
      return [
        { id: 'CREATE_NEW', name: `Create new tag: ${inputValue}`, count: 0 },
      ]
    }

    return data.searchTags.map(tag => ({
      id: tag.id,
      name: tag.name,
      count: tag.count,
    }))
  }, [data, inputValue])

  const handleSelectionChange = (key: any) => {
    if (key) {
      onChange?.([...value!, key])
    }
    setInputValue('')
  }

  const handleRemove = (key: string) => {
    onChange?.(value!.filter(item => item !== key))
  }

  return (
    <div>
      <div className="flex space-x-2">
        {value?.map(key => {
          return (
            <div
              key={key}
              className="flex items-center px-2 py-1 border rounded-md bg-gray-1 text-12 text"
            >
              {key}
              <BaseButton
                onClick={() => handleRemove(key)}
                className="ml-2 hover:text"
              >
                <CrossCircledIcon />
              </BaseButton>
            </div>
          )
        })}
      </div>

      <Combobox
        label="Tags"
        items={items}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={handleSelectionChange}
        loading={fetching}
      >
        {item => (
          <Item key={item.id} textValue={item.name}>
            <div className="flex justify-between w-full">
              <span>{item.name}</span>
              <span>{item.count}</span>
            </div>
          </Item>
        )}
      </Combobox>
    </div>
  )
}
