import { useRef } from 'react'

import { useOverlay, DismissButton, FocusScope } from 'react-aria'

interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
  isOpen?: boolean
  onClose: () => void
}

export function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null)
  let { popoverRef = ref, isOpen, onClose, children } = props

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef
  )

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={popoverRef}
        className="absolute z-10 w-full mt-2 top-full"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}
