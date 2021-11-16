import { useMemo, useState } from 'react'

import { Combobox, Item } from '~/system/combobox'

import { useCitiesQuery } from './graphql/cities'

interface Props {
  country: string
  name: string
}

export const CityInput = (props: Props) => {
  const { country } = props

  const [query, setQuery] = useState('')
  const [{ data, fetching }] = useCitiesQuery({
    variables: {
      input: {
        query,
        country,
      },
    },
    pause: !query,
  })

  const onSelectionChange = (key: any) => {
    console.log(key)
    //   list.setSelectedKeys(new Set([key]))
    //   list.setFilterText('')
  }

  const items = useMemo(() => {
    if (!data) {
      return []
    }

    return data.cities.map(city => ({
      id: city.value,
      name: city.label,
    }))
  }, [data])

  return (
    <>
      <Combobox
        items={items}
        inputValue={query}
        onInputChange={setQuery}
        onSelectionChange={onSelectionChange}
        loading={fetching}
      >
        {item => <Item key={item.id}>{item.name}</Item>}
      </Combobox>
    </>
  )
}
