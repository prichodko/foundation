import { useRef } from 'react'

import { CheckIcon } from '@radix-ui/react-icons'
import type { AriaListBoxOptions } from '@react-aria/listbox'
import type { Node } from '@react-types/shared'
import { useListBox, useListBoxSection, useOption } from 'react-aria'
import type { ListState } from 'react-stately'

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>
  state: ListState<unknown>
}

interface SectionProps {
  section: Node<unknown>
  state: ListState<unknown>
}

interface OptionProps {
  item: Node<unknown>
  state: ListState<unknown>
}

export function ListBox(props: ListBoxProps) {
  let ref = useRef<HTMLUListElement>(null)
  let { listBoxRef = ref, state } = props
  let { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="px-8 pb-4 overflow-auto outline-none max-h-72"
    >
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  )
}

function ListBoxSection({ section, state }: SectionProps) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  })

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span
            {...headingProps}
            className="mx-3 text-xs font-bold text-gray-500 uppercase"
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map(node => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  )
}

function Option({ item, state }: OptionProps) {
  let ref = useRef<HTMLLIElement>(null)
  let { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  )

  let text = 'text-gray-12'
  if (isFocused || isSelected) {
    text = 'text-blue-12'
  } else if (isDisabled) {
    text = 'text-red-12'
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`m-1 rounded-md py-2 px-2 text-sm outline-none cursor-default flex items-center justify-between ${text} ${
        isFocused ? 'bg-gray-3' : ''
      } ${isSelected ? 'font-bold' : ''}`}
    >
      {item.rendered}
      {isSelected && (
        <CheckIcon aria-hidden="true" className="w-5 h-5 text-pink-600" />
      )}
    </li>
  )
}
