import { useState, useCallback, MouseEvent } from 'react'

interface Position {
  x: number
  y: number
}

const initialPosition: Position = { x: 0, y: 0 }

function offsetXYFromParent(
  e: MouseEvent<HTMLElement>,
  offsetParent: HTMLElement
): Position {
  const isBody =
    offsetParent.ownerDocument &&
    offsetParent === offsetParent.ownerDocument.body

  const offsetParentRect = isBody
    ? { left: 0, top: 0 }
    : offsetParent.getBoundingClientRect()

  const x = e.clientX + offsetParent.scrollLeft - offsetParentRect.left
  const y = e.clientY + offsetParent.scrollTop - offsetParentRect.top
  return { x, y }
}

function getControlPosition(e: MouseEvent<HTMLElement>): Position {
  const t = e.target as HTMLElement
  const offsetParent =
    (t.offsetParent as HTMLElement) || (t.ownerDocument && t.ownerDocument.body)
  return offsetXYFromParent(e, offsetParent)
}

export const useDraggable = () => {
  const [position, setPosition] = useState(initialPosition)

  const onDragStart = useCallback((e: MouseEvent<HTMLElement>) => {
    console.log(getControlPosition(e))
  }, [])

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      onDragStart(e)
    },
    [onDragStart]
  )

  return {
    onMouseDown
  }
}
