// @ts-nocheck

import { useEffect, useState } from 'react'

import { Cross1Icon, Cross2Icon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useAsyncList, useListData } from '@react-stately/data'

import { BaseButton } from '~/system/button'
import { Combobox, Item } from '~/system/combobox'
import { useField } from '~/system/form'
import { Text } from '~/system/text'

import { useCreateTagMutation } from './graphql/create-tag'
import { useTagsQuery } from './graphql/tags'

interface Props {
  name: string
  value?: string[]
  onChange?: (tags: string[]) => void
}

export const TagInput = (props: Props) => {
  const { field, fieldState, formState } = useField(props)

  const value = props.value ?? (field?.value as Props['value'])
  const onChange = props.onChange ?? (field?.onChange as Props['onChange'])

  // const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const [filterText, setFilterText] = useState('')
  const [result, reexecuteQuery] = useTagsQuery({
    variables: { input: { query: filterText, notIn: value! } },
  })

  // const list = useListData({
  //   initialItems: result.data?.tags ?? [],
  // })

  // useEffect(() => {
  //   list.items = result.data?.tags ?? []
  // }, [list, result])

  const [, createTag] = useCreateTagMutation()

  // let list = useAsyncList<{ id: string; name: string }>({
  //   async load({ signal, filterText }) {
  //     // const result = client.query<TagsQuery, TagsQueryVariables>(TagsDocument, {
  //     //   input: { query: filterText ?? '' },
  //     // })

  //     // await wait(2000)

  //     console.log(filterText)

  //     // let res = await fetch(
  //     //   `https://swapi.dev/api/people/?search=${filterText}`,
  //     //   { signal }
  //     // )
  //     // let json = await res.json()

  //     return {
  //       items: [
  //         { id: '1', name: 'test' },
  //         { id: 'CREATE_NEW', name: `Create new tag: ${filterText}` },
  //       ],
  //     }
  //   },
  // })

  const handleSelectionChange = (key: any) => {
    if (key) {
      onChange?.([...value, key])
    }
    // list.setSelectedKeys(new Set([key]))
    setFilterText('')
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
              className="flex items-center px-2 py-1 border rounded-md bg-gray-1 text-12 text-low"
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
        items={result.data?.tags ?? []}
        inputValue={filterText}
        onInputChange={setFilterText}
        onSelectionChange={handleSelectionChange}
        loading={result.fetching}
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
