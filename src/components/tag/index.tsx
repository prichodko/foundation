interface Props {
  children: string
}

export const Tag = (props: Props) => {
  const { children } = props

  return (
    <span className="inline-flex items-center py-0.5 rounded text-[12px] font-medium text-gray-12 hover:underline">
      #{children}
    </span>
  )
}
