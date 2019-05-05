import { useState, useCallback } from 'react'

interface Position {
  x: number
  y: number
}

const initialPosition: Position = { x: 0, y: 0 }

function offsetXYFromParent(
  e: React.MouseEvent<HTMLElement>,
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

function getControlPosition(e: React.MouseEvent<HTMLElement>): Position {
  const offsetParent =
    (e.target as any).offsetParent || (e.target as any).ownerDocument.body

  return offsetXYFromParent(e, offsetParent)
}

export const useDraggable = () => {
  const [position, setPosition]: [
    Position,
    (newPosition: Position) => void
  ] = useState(initialPosition)

  const onDragStart = useCallback((e: React.MouseEvent<HTMLElement>) => {
    console.log(getControlPosition(e))
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onDragStart(e)
    },
    [onDragStart]
  )

  return {
    onMouseDown
  }
}
