import { useEffect, useMemo, useRef, useState } from 'react'

import { MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons'
import type { ComboBoxProps } from '@react-types/combobox'
import { useComboBox, useFilter, useButton, useSearchField } from 'react-aria'
import {
  useComboBoxState,
  useSearchFieldState,
  Item,
  // Section,
} from 'react-stately'

import { useTagsQuery } from '~/components/tag-input/graphql/tags'

import { ListBox } from './listbox'
import { Popover } from './popover'

export { Item, Section } from 'react-stately'

const INTIAL_ITEMS = [
  { id: 'tags', name: 'Tags' },
  {
    id: 'role',
    name: 'Role',
    options: [
      { id: 'design', name: 'Design' },
      { id: 'engineering', name: 'Engineering' },
    ],
  },
  { id: 'location', name: 'Location' },
  { id: 'company', name: 'Company' },
  { id: 'salary', name: 'Salary' },
  { id: 'position', name: 'Position' },
  { id: 'posted', name: 'Posted' },
  { id: 'type', name: 'Type' },
]

export function Search<T extends object>(
  b: Omit<ComboBoxProps<T>, 'children'> & {
    fff: any
    onChange: (query: any) => void
  }
) {
  const [query, setQuery] = useState('')

  const [{ data }] = useTagsQuery({
    variables: {
      input: {
        notIn: [],
        query,
      },
    },
  })

  const children = useMemo(() => {
    // if (!data) {
    //   return []
    // }
    return INTIAL_ITEMS.map(tag => <Item key={tag.id}>{tag.name}</Item>)
    // return data.tags.map(tag => <Item key={tag.id}>{tag.name}</Item>)
  }, [data])

  const props = {
    ...b,
    children,
  }

  const { contains } = useFilter({ sensitivity: 'base' })
  const state = useComboBoxState({
    ...props,
    defaultFilter: contains,
    selectedKey: 'tags',
    onSelectionChange: key => {
      props.onChange({ ...props.fff, tags: [...props.fff.tags, key] })
      state.open()
    },
    onInputChange: key => setQuery(key),
    menuTrigger: 'manual',
  })

  console.log(state)

  useEffect(() => {
    if (state.isFocused) {
      console.log('here')
      state.open('first')
    }
  }, [state.isFocused])

  const inputRef = useRef(null)
  const listBoxRef = useRef(null)
  const popoverRef = useRef(null)

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,

      inputRef,
      listBoxRef,
      popoverRef,
    },
    state
  )

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  }

  const searchState = useSearchFieldState(searchProps)
  const { clearButtonProps } = useSearchField(
    searchProps,
    searchState,
    inputRef
  )
  const clearButtonRef = useRef(null)
  const { buttonProps } = useButton(clearButtonProps, clearButtonRef)

  return (
    <div className="relative flex flex-col mt-4">
      <label
        {...labelProps}
        className="block text-sm font-medium text-left text-gray-700"
      >
        {props.label}
      </label>

      <div className="border rounded">
        <div className="h-[66px] flex items-center px-3">
          <div className="w-[42px] h-[42px] rounded-md  flex items-center justify-center">
            <MagnifyingGlassIcon width={20} height={20} />
          </div>
          <input
            {...inputProps}
            ref={inputRef}
            className="flex-1 block w-full bg-transparent outline-none"
            placeholder="Query by tags, role, location (cmd+/)"
            id="search"
          />
          <button
            {...buttonProps}
            ref={clearButtonRef}
            style={{
              visibility: state.inputValue !== '' ? 'visible' : 'hidden',
            }}
            className="text-gray-500 cursor-default hover:text-gray-600"
          >
            <Cross1Icon aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>

        {state.isOpen && (
          <Popover
            popoverRef={popoverRef}
            isOpen={state.isOpen}
            onClose={state.close}
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </div>
    </div>
  )
}
