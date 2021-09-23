import { useState } from 'react'

import clsx from 'clsx'
import type { Page } from 'next'

import { Button } from '~/system/buttons'
import { Checkbox } from '~/system/checkbox'
import { DialogTrigger, Dialog, AlertDialogTrigger } from '~/system/dialogs'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/inputs'
import { MenuTrigger, Menu } from '~/system/menu'
import { Popover } from '~/system/popover'
import { RadioGroup } from '~/system/radio-group'
import { Select } from '~/system/select'
import { Switch } from '~/system/switch'
import { Tabs } from '~/system/tabs'
import { Text } from '~/system/text'

import { Navbar } from './components/navbar'

const Section = ({
  heading,
  children,
  center,
}: {
  heading: string
  children: React.ReactNode
  center?: boolean
}) => {
  return (
    <div className="h-[80vh] py-32">
      <Heading className="mb-8">{heading}</Heading>
      <div className="border rounded flex items-center justify-center min-h-[600px] gap-2 font p-10 bg-gray-2">
        <div className={clsx('w-full', { 'text-center': center })}>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Homepage: Page = () => {
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [radioValue, setRadioValue] = useState('hello')

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />

      <div className="flex items-center justify-center h-screen">
        <Text weight="500" className="text-[128px] leading-none">
          Build
          <br />
          Better
          <br />
          Experience
        </Text>
      </div>

      <Section heading="Button" center>
        <div className="space-x-4">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="minimal">Minimal</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section heading="Menu" center>
        <MenuTrigger>
          <Button>Menu</Button>
          <Menu>
            <Menu.Item onSelect={() => alert('New Tab')}>New Tab</Menu.Item>
            <Menu.Item onSelect={() => alert('New Window')}>
              New Window
            </Menu.Item>
            <Menu.Item onSelect={() => alert('New Private Window')}>
              New Private Window
            </Menu.Item>
            <Menu.Separator />
            <Menu.Label>Edit</Menu.Label>
            <Menu.Item disabled>Undo</Menu.Item>
            <Menu.Item>Redo</Menu.Item>
            <Menu.Separator />
            <Menu.Label>Theme</Menu.Label>
            <Menu.RadioGroup value="dark">
              <Menu.RadioItem value="light">Light</Menu.RadioItem>
              <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
            </Menu.RadioGroup>
            <Menu.Separator />
            <Menu.CheckboxItem checked>Show Full URLs</Menu.CheckboxItem>
            <Menu.CheckboxItem>Show Bookmarks</Menu.CheckboxItem>
            <Menu.Separator />
            <Menu.Submenu label="More Tools">
              <Menu.Item>Save Page As...</Menu.Item>
              <Menu.Item>Create Shortcut...</Menu.Item>
              <Menu.Item>Name Window...</Menu.Item>
            </Menu.Submenu>
          </Menu>
        </MenuTrigger>
      </Section>

      <Section heading="Heading" center>
        <div className="space-y-8">
          <div>
            <Heading size="64">Heading 64px semibold</Heading>
            <Heading size="48">Heading 48px semibold</Heading>
            <Heading size="32">Heading 32px semibold</Heading>
            <Heading size="24">Heading 24px semibold</Heading>
          </div>
          <div>
            <Heading weight="600" size="64">
              Heading 64px bold
            </Heading>
            <Heading weight="600" size="48">
              Heading 48px bold
            </Heading>
            <Heading weight="600" size="32">
              Heading 32px bold
            </Heading>
            <Heading weight="600" size="24">
              Heading 24px bold
            </Heading>
          </div>
        </div>
      </Section>

      <Section heading="Text" center>
        <div className="space-y-8">
          <div>
            <Text size="16">Text 16px</Text>
            <Text size="14">Text 14px</Text>
            <Text size="12">Text 12px</Text>
          </div>
          <div>
            <Text size="16" weight="500">
              Text 16px semibold
            </Text>
            <Text size="14" weight="500">
              Text 14px semibold
            </Text>
            <Text size="12" weight="500">
              Text 12px semibold
            </Text>
          </div>
          <div>
            <Text size="16" weight="600">
              Text 16px bold
            </Text>
            <Text size="14" weight="600">
              Text 14px bold
            </Text>
            <Text size="12" weight="600">
              Text 12px bold
            </Text>
          </div>
        </div>
      </Section>

      <Section heading="Input">
        <div className="space-y-4">
          <TextInput label="Default" placeholder="Placeholder" />
          <TextInput label="Disabled" placeholder="Placeholder" disabled />
          <TextInput label="Invalid" placeholder="Placeholder" invalid />
          <TextInput
            label="Error"
            placeholder="Placeholder"
            error="This is an error"
          />
        </div>
      </Section>

      <Section heading="Select">
        <div className="space-y-4">
          <Select value="" placeholder="Placeholder">
            <Select.Option value="hello">Hello</Select.Option>
            <Select.Option value="world">World</Select.Option>
          </Select>

          <Select disabled>
            <Select.Option value="hello">Hello</Select.Option>
            <Select.Option value="world">World</Select.Option>
          </Select>

          <Select invalid>
            <Select.Option value="hello">Hello</Select.Option>
            <Select.Option value="world">World</Select.Option>
          </Select>

          <Select error="This is an error">
            <Select.Option value="hello">Hello</Select.Option>
            <Select.Option value="world">World</Select.Option>
          </Select>
        </div>
      </Section>

      <Section heading="Checkbox" center>
        <div className="flex justify-center space-x-4 ">
          <Checkbox checked={checkboxValue} onChange={setCheckboxValue}>
            Checked
          </Checkbox>
          <Checkbox checked={false}>Unchecked</Checkbox>
          <Checkbox checked invalid>
            Invalid
          </Checkbox>
          <Checkbox checked={false} invalid>
            Invalid
          </Checkbox>
        </div>
      </Section>

      <Section heading="Switch">
        <div className="flex justify-center space-x-4 ">
          <Switch checked={switchValue} onChange={setSwitchValue}>
            Checked
          </Switch>
          <Switch checked={false}>Unchecked</Switch>
          <Switch checked={false} disabled>
            Disabled
          </Switch>
        </div>
      </Section>

      <Section heading="Radio Group" center>
        <div className="flex flex-col items-center space-y-8 ">
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <RadioGroup.Item value="hello">Hello</RadioGroup.Item>
            <RadioGroup.Item value="world">World</RadioGroup.Item>
          </RadioGroup>
          {/* <RadioGroup disabled>
            <RadioGroup.Item value="hello">Hello</RadioGroup.Item>
            <RadioGroup.Item value="world">World</RadioGroup.Item>
          </RadioGroup>
          <RadioGroup invalid>
            <RadioGroup.Item value="hello">Hello</RadioGroup.Item>
            <RadioGroup.Item value="world">World</RadioGroup.Item>
          </RadioGroup> */}
        </div>
      </Section>

      <Section heading="Dialog" center>
        <DialogTrigger
          dialog={() => (
            <Dialog title="Hello" onAction={close => close()}>
              content
            </Dialog>
          )}
        >
          <Button>Open</Button>
        </DialogTrigger>
      </Section>

      <Section heading="Alert Dialog" center>
        <div className="space-x-4">
          <AlertDialogTrigger
            title="Beware"
            description="Are you sure you want to do this?"
            onAction={() => {}}
          >
            <Button>Open</Button>
          </AlertDialogTrigger>

          <AlertDialogTrigger
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            onAction={() => {}}
            variant="danger"
          >
            <Button variant="danger">Danger</Button>
          </AlertDialogTrigger>
        </div>
      </Section>

      <Section heading="Tabs">
        <Tabs tabs={['One', 'Two', 'Three']}>
          <Tabs.Panel>One</Tabs.Panel>
          <Tabs.Panel>Two</Tabs.Panel>
          <Tabs.Panel>Three</Tabs.Panel>
        </Tabs>
      </Section>

      <Section heading="Popover" center>
        <Popover trigger={<Button>Trigger</Button>}>Content</Popover>
      </Section>
    </div>
  )
}
