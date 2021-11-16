// @ts-nocheck
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  HeadingIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListBulletIcon,
  CodeIcon,
} from '@radix-ui/react-icons'
import { useId } from '@radix-ui/react-id'
import type { Editor as EditorType } from '@tiptap/react'
import { useEditor, EditorContent } from '@tiptap/react'
import type { StarterKitOptions } from '@tiptap/starter-kit'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'

import type { FieldProps } from '~/system/field'
import { Field } from '~/system/field'
import type { FormFieldProps } from '~/system/form'
import { useField } from '~/system/form'

import { BaseButton } from '../button'

interface MenubarButtonProps {
  editor: EditorType
  name: 'undo' | 'redo' | keyof StarterKitOptions
  icon: React.ReactNode
  onPress: () => void
}

const MenubarButton = (props: MenubarButtonProps) => {
  const { editor, name, icon, onPress } = props

  const active = editor.isActive(name)

  return (
    <BaseButton
      onPress={onPress}
      className={clsx({
        'bg-gray-4': active,
      })}
    >
      {icon}
    </BaseButton>
  )
}

interface MenubarProps {
  editor: EditorType
}

const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="px-3 py-2 border bg-gray-1 rounded-t-[4px] border-b-0">
      <MenubarButton
        editor={editor}
        icon={<ChevronLeftIcon />}
        name="undo"
        onPress={() => editor.chain().focus().undo().run()}
      />
      <MenubarButton
        editor={editor}
        icon={<ChevronRightIcon />}
        name="redo"
        onPress={() => editor.chain().focus().redo().run()}
      />
      <MenubarButton
        editor={editor}
        icon={<HeadingIcon />}
        name="heading"
        onPress={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <MenubarButton
        editor={editor}
        icon={<FontBoldIcon />}
        name="bold"
        onPress={() => editor.chain().focus().toggleBold().run()}
      />
      <MenubarButton
        editor={editor}
        icon={<FontItalicIcon />}
        name="italic"
        onPress={() => editor.chain().focus().toggleItalic().run()}
      />
      <MenubarButton
        editor={editor}
        icon={<StrikethroughIcon />}
        name="strike"
        onPress={() => editor.chain().focus().toggleStrike().run()}
      />
      <MenubarButton
        editor={editor}
        icon={null}
        name="code"
        onPress={() => editor.chain().focus().toggleCode().run()}
      />

      <MenubarButton
        editor={editor}
        icon={<ListBulletIcon />}
        name="bulletList"
        onPress={() => editor.chain().focus().toggleBulletList().run()}
      />
      <MenubarButton
        editor={editor}
        icon={<CodeIcon />}
        name="codeBlock"
        onPress={() => editor.chain().focus().toggleCodeBlock().run()}
      />
    </div>
  )
}

interface EditorProps extends FieldProps, FormFieldProps {
  onChange?: (value: any) => void
  invalid?: boolean
  disabled?: boolean
}

export const Editor = (props: EditorProps) => {
  const { label, error } = props

  const { field, fieldState, formState } = useField(props)

  console.log(field?.value)

  const value = field?.value ?? ''
  const onChange = field?.onChange ?? props.onChange

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: updateProps => {
      const json = updateProps.editor.getJSON()
      onChange?.(json)
    },
  })

  const invalid = props.invalid || Boolean(error) || fieldState?.invalid
  const disabled = props.disabled || formState?.isSubmitting

  const inputId = useId()
  const errorMessage = fieldState?.error?.message ?? error

  if (!editor) {
    return <div>Loading... </div>
  }

  return (
    <Field htmlFor={inputId} label={label} error={errorMessage}>
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="px-3 py-2 border rounded-b-[4px] bg-gray-1 -mt-[1px]"
      />
    </Field>
  )
}
