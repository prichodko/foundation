import { useEffect, useMemo, useRef, useState } from 'react'

import { Cross1Icon } from '@radix-ui/react-icons'
import type { ComboBoxProps } from '@react-types/combobox'
import { useComboBox, useFilter, useButton, useSearchField } from 'react-aria'
import { useComboBoxState, useSearchFieldState, Item } from 'react-stately'

import { Text } from '~/system/text'
import type { JobsFilter } from '~/types/graphql'

import { useSearchCompaniesQuery, useSearchTagsQuery } from './graphql/search'
import { ListBox } from './listbox'
import { Popover } from './popover'

export { Item, Section } from 'react-stately'

const INTIAL_ITEMS = [
  {
    id: 'tags',
    name: 'Tags',
    type: 'search',
  },
  {
    id: 'remote',
    name: 'Remote',
  },
  {
    id: 'country',
    name: 'Country',
    options: [
      { id: 'us', name: 'United States' },
      { id: 'gr', name: 'Germany' },
      { id: 'jp', name: 'Japan' },
      { id: 'cz', name: 'Czechia' },
    ],
  },
  {
    id: 'company',
    name: 'Company',
    type: 'search',
  },
  {
    id: 'salary',
    name: 'Salary',
    type: 'number',
  },
  {
    id: 'position',
    name: 'Position',
    type: 'string',
  },
  {
    id: 'posted',
    name: 'Posted',
    options: [
      { id: '1', name: 'Last Day' },
      { id: '7', name: 'Last 7 Days' },
      { id: '30', name: 'Last Month' },
      { id: '90', name: 'Last 3 Months' },
    ],
  },
  {
    id: 'role',
    name: 'Role',
    options: [
      { id: 'AccountingAndFinance', name: 'Accounting & Finance' },
      { id: 'Administration', name: 'Administration' },
      { id: 'BusinessDevelopment', name: 'Business Development' },
      { id: 'CustomerService', name: 'Customer Service' },
      { id: 'Design', name: 'Design' },
      { id: 'Engineering', name: 'Engineering' },
      { id: 'IT', name: 'IT' },
      { id: 'Legal', name: 'Legal' },
      { id: 'MarketingAndCommunications', name: 'Marketing & Communications' },
      { id: 'Operations', name: 'Operations' },
      { id: 'PeopleAndHR', name: 'People & HR' },
      { id: 'Product', name: 'Product' },
      { id: 'QualityAssurance', name: 'Quality Assurance' },
      { id: 'Sales', name: 'Sales' },
      { id: 'Other', name: 'Other' },
    ],
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { id: 'FullTime', name: 'Full-time' },
      { id: 'Contract', name: 'Contract' },
      { id: 'Internship', name: 'Internship' },
      { id: 'PartTime', name: 'PartTime' },
    ],
  },
]

type FilterKey = keyof JobsFilter

interface SearchProps {
  filter: JobsFilter
  onChange: (filter: JobsFilter) => void
}

export function Search(props: SearchProps) {
  const { filter, onChange } = props

  const [command, setCommand] = useState('')
  const [inputValue, setInputValue] = useState('')

  const [{ data: tags, fetching: tagsFetching }] = useSearchTagsQuery({
    variables: {
      name: inputValue,
      not: filter.tags ?? [],
    },
    pause: command !== 'tags',
  })

  const [{ data: companies, fetching: companiesFetching }] =
    useSearchCompaniesQuery({
      variables: {
        name: inputValue,
        not: filter.company ?? [],
      },
      pause: command !== 'company',
    })

  const reset = () => {
    setCommand('')
    setInputValue('')
  }

  const handleSelectionChange = (key: FilterKey) => {
    console.log('SELECT', key)

    if (key === 'remote') {
      onChange({ ...filter, remote: true })
      reset()
      return
    }

    if (!command) {
      setInputValue('')
      setCommand(key)
      return
    }

    // blur on selected command
    if (key === command) {
      reset()
      return
    }

    switch (command) {
      case 'tags': {
        onChange({ ...filter, tags: [...(filter.tags ?? []), key] })
        reset()
        return
      }
      case 'company': {
        onChange({ ...filter, company: [...(filter.company ?? []), key] })
        reset()
        return
      }
      case 'salaryMin': {
        return onChange({ ...filter })
      }
      case 'salaryMax': {
        return onChange({ ...filter })
      }
      case 'position': {
        onChange({ ...filter, position: inputValue })
        reset()
        return
      }
      case 'role': {
        onChange({ ...filter, role: key as any })
        reset()
        return
      }

      // case 'type': {return}
    }
  }

  // console.log('tags', ...(tags?.searchTags ?? []))
  // console.log('companiese', ...(companies?.searchCompanies ?? []))

  const items = useMemo(() => {
    if (command === 'company') {
      return (
        companies?.searchCompanies.map(company => ({
          id: company.id,
          name: company.name,
        })) ?? []
      )
    }
    if (command === 'tags') {
      return (
        tags?.searchTags.map(company => ({
          id: company.id,
          name: company.name,
        })) ?? []
      )
    }

    if (command) {
      const option = INTIAL_ITEMS.find(item => item.id === command)

      if (option?.type === 'string') {
        return [{ id: '1', name: `Position contains: ${inputValue}` }]
      }

      if (option?.options) {
        return option.options.map(o => ({
          id: o.id,
          name: o.name,
        }))
      }
    }
    return INTIAL_ITEMS.map(item => ({ id: item.id, name: item.name }))
  }, [command, companies, tags, inputValue])

  const loading = tagsFetching || companiesFetching

  return (
    <Combobox
      selectedKey={command}
      onSelectionChange={key => handleSelectionChange(key as FilterKey)}
      inputValue={inputValue}
      onInputChange={setInputValue}
      allowsCustomValue={false}
      command={command}
      onRemove={() => setCommand('')}
      loading={loading}
      disallowEmptySelection
    >
      {items.map(item => (
        <Item key={item.id}>{item.name}</Item>
      ))}
    </Combobox>
  )
}

export function Combobox<T extends object>(
  props: ComboBoxProps<T> & {
    command?: string
    loading?: boolean
    onRemove: VoidFunction
  }
) {
  const { command, onRemove, loading } = props

  const { contains } = useFilter({ sensitivity: 'base' })
  const state = useComboBoxState({
    ...props,
    defaultFilter: contains,
    // menuTrigger: 'manual',
  })

  console.log(state)

  useEffect(() => {
    if (state.isFocused && state.isOpen === false) {
      console.log('here closed', state.isFocused, state.isOpen)
      state.open('first', 'focus')
      state.selectionManager.setFocusedKey(state.collection.getFirstKey()!)
    }
  })

  useEffect(() => {
    state.selectionManager.setFocusedKey(state.collection.getFirstKey()!)
  }, [state.inputValue, command])

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

      <div className="border rounded border-gray-11">
        <div className="h-[66px] flex items-center px-6">
          {/* <div className="w-[42px] h-[42px] rounded-md  flex items-center justify-center">
            <MagnifyingGlassIcon width={20} height={20} />
          </div> */}
          {command && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-1 text-blue mr-2">
              <Text>{command}</Text>
            </span>
          )}
          <input
            {...inputProps}
            ref={inputRef}
            className="flex-1 block w-full bg-transparent outline-none"
            placeholder="Search (cmd+/)"
            id="search"
            onKeyDown={e => {
              // if (e.key === 'Enter') {
              //   e.preventDefault()
              //   return
              // }
              e.key === 'Backspace' && state.inputValue === '' && onRemove()
              inputProps.onKeyDown?.(e)
            }}
          />
          {loading && (
            <svg
              className="animate-spin absolute right-[9px] top-[9px]"
              fill="none"
              viewBox="0 0 24 24"
              width={16}
              height={16}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
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
