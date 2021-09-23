import { Children, cloneElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

import type { TabsProps } from '@radix-ui/react-tabs'

import { Root, List, Trigger, Content } from './style'

interface Props extends TabsProps {
  tabs: string[]
  children: ReactElement[]
}

const Tabs = (props: Props) => {
  const { tabs, children, defaultValue = tabs[0] } = props

  return (
    <Root defaultValue={defaultValue}>
      <List>
        {tabs.map(tab => (
          <Trigger key={tab} value={tab}>
            {tab}
          </Trigger>
        ))}
      </List>
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          value: tabs[index],
        })
      })}
    </Root>
  )
}

interface TabsPanelProps {
  children: ReactNode
}

const TabsPanel = (props: TabsPanelProps) => {
  const { children } = props

  return <Content value={(props as any).value}>{children}</Content>
}

Tabs.Panel = TabsPanel

export { Tabs }
export type { Props as TabsProps }
