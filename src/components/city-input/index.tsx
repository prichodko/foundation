import { useMemo, useState } from 'react'

import { Combobox, Item } from '~/system/combobox'

import { useSearchCitiesQuery } from './graphql/cities'

interface Props {
  country: string
  name: string
}

export const CityInput = (props: Props) => {
  const { country } = props

  const [name, setName] = useState('')
  const [{ data, fetching }] = useSearchCitiesQuery({
    variables: {
      country,
      name,
    },
    pause: !name,
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

    return data.searchCities.map(city => ({
      id: city.id,
      name: city.name,
    }))
  }, [data])

  return (
    <>
      <Combobox
        items={items}
        inputValue={name}
        onInputChange={setName}
        onSelectionChange={onSelectionChange}
        loading={fetching}
      >
        {item => <Item key={item.id}>{item.name}</Item>}
      </Combobox>
    </>
  )
}
