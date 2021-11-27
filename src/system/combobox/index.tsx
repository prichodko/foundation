// @ts-nocheck
import { useEffect, useRef } from 'react'

import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons'
import type { ComboBoxProps } from '@react-types/combobox'
import { useComboBox, useFilter, useButton, useSearchField } from 'react-aria'
import {
  useComboBoxState,
  useSearchFieldState,
  Item,
  Section,
} from 'react-stately'

import { Field } from '../field'
import { Input } from '../input/text-input/style'

import { ListBox } from './listbox'
import { Popover } from './popover'
import { Wrapper } from './style'

export { Item, Section } from 'react-stately'

interface Props {
  loading: boolean
}

const Combobox = <T extends object>(props: Props & ComboBoxProps<T>) => {
  const { label, loading } = props

  const { contains } = useFilter({ sensitivity: 'base' })

  const state = useComboBoxState({
    ...props,
    defaultFilter: contains,
    menuTrigger: 'focus',
  })

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

  // console.log(state.selectionManager.focusedKey)

  // useEffect(() => {
  //   if (!state.selectionManager.focusedKey) {
  //     state.selectionManager.setFocusedKey(state.collection.getFirstKey())
  //   }
  // }, [state.selectionManager.focusedKey])

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => {
      state.setInputValue(v)
      // state.selectionManager.setFocusedKey(state.collection.getFirstKey())
    },
  }

  const searchState = useSearchFieldState({
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  })

  const { clearButtonProps } = useSearchField(
    searchProps,
    searchState,
    inputRef
  )

  const clearButtonRef = useRef(null)
  const { buttonProps } = useButton(clearButtonProps, clearButtonRef)

  return (
    <Field label={label}>
      <Wrapper as="div">
        {/* <label
        {...labelProps}
        className="block text-sm font-medium text-left text-gray-700"
      >
        {props.label}
      </label> */}
        <div className={`relative overflow-hidden`}>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="absolute z-10 w-4 h-4 -translate-y-1/2 pointer-events-none fill-current top-1/2 left-3"
          />
          <Input {...inputProps} {...searchProps} ref={inputRef} />
          <button
            {...buttonProps}
            ref={clearButtonRef}
            style={{
              visibility: state.inputValue !== '' ? 'visible' : 'hidden',
            }}
            className="absolute text-gray-500 -translate-y-1/2 cursor-default right-3 top-1/2 hover:text-gray-600"
          >
            <Cross2Icon aria-hidden="true" className="w-3 h-3" />
          </button>
          {/* {loading && (
            <svg
              className="animate-spin absolute left-[9px] top-[9px]"
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
          )} */}
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
      </Wrapper>
    </Field>
  )
}

Combobox.Section = Section
Combobox.Item = Item

export { Combobox }
export type { Props as ComboboxProps }
