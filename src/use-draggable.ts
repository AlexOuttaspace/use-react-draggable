import { useState, useCallback, useRef } from 'react'

interface Position {
  x: number
  y: number
}

type $TODO = any

function offsetXYFromParent(
  e: React.MouseEvent<HTMLElement>,
  offsetParent: Element
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
  const target = e.target as HTMLElement

  const offsetParent =
    target.offsetParent ||
    ((target.ownerDocument && target.ownerDocument.body) as Element)

  return offsetXYFromParent(e, offsetParent)
}

interface UseDraggableArgs {
  position: Position
  onDragStart: $TODO
}

const useDragStartEvents = ({ onDragStart, setIsDragging }: $TODO): $TODO => {
  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      getControlPosition(e)
      onDragStart(e)
      setIsDragging(true)
    },
    [onDragStart, setIsDragging]
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      handleDragStart(e)
    },
    [handleDragStart]
  )

  return { onMouseDown }
}

export const useDraggable = ({ position, onDragStart }: UseDraggableArgs) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleRef = useRef(null)

  const { onMouseDown } = useDragStartEvents({ onDragStart, setIsDragging })

  const getHandleProps = useCallback(
    (props = {}) => ({
      onMouseDown,
      ref: handleRef,
      ...props
    }),
    [onMouseDown, handleRef]
  )

  return {
    getHandleProps
  }
}

// function adjustToInput(
//   scale: number,
//   position: Position,
//   draggableData: DraggableData
// ): DraggableData {
//   return {
//     node: draggableData.node,
//     x: position.x + draggableData.deltaX / scale,
//     y: position.y + draggableData.deltaY / scale,
//     deltaX: draggableData.deltaX / scale,
//     deltaY: draggableData.deltaY / scale,
//     lastX: position.x,
//     lastY: position.y
//   }
// }

// const isNum = (num: any): boolean => typeof num === 'number' && !isNaN(num)

// function adjustToBounds(
//   bounds: DraggableBounds | null,
//   draggableData: DraggableData
// ): DraggableData {
//   if (!bounds) return draggableData

//   let newX = draggableData.x
//   let newY = draggableData.y

//   // Keep x and y below right and bottom limits...
//   if (isNum(bounds.right)) newX = Math.min(newX, bounds.right)
//   if (isNum(bounds.bottom)) newY = Math.min(newY, bounds.bottom)

//   // But above left and top limits.
//   if (isNum(bounds.left)) newX = Math.max(newX, bounds.left)
//   if (isNum(bounds.top)) newY = Math.max(newY, bounds.top)

//   return { ...draggableData, x: newX, y: newY }
// }

// function adjustDraggableData(
//   bounds: DraggableBounds | null,
//   scale: number,
//   position: Position,
//   draggableData: DraggableData
// ): DraggableData {
//   const adjustedToInput: DraggableData = adjustToInput(
//     scale,
//     position,
//     draggableData
//   )

//   const adjustedToBounds: DraggableData = adjustToBounds(
//     bounds,
//     adjustedToInput
//   )

//   return adjustedToBounds
// }
