import { useState, useCallback, useRef } from 'react'

type $TODO = any

interface Position {
  x: number
  y: number
}

interface DraggableEventData extends Position {
  node: Element
}

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
  onDragStart?: $TODO
  onDragStop?: $TODO
  onDrag?: $TODO
}

const useDragStartEvents = ({
  onDragStart,
  setIsDragging,
  handleDrag,
  handleDragStop
}: $TODO): $TODO => {
  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { x, y } = getControlPosition(e)
      const node = e.target as Element
      const draggableData: DraggableEventData = { x, y, node }
      setIsDragging(true)
      onDragStart(e, draggableData)

      window.addEventListener('mousemove', handleDrag, false)
      window.addEventListener('mouseup', handleDragStop, false)
    },
    [onDragStart, setIsDragging, handleDrag, handleDragStop]
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      handleDragStart(e)
    },
    [handleDragStart]
  )

  return { onMouseDown }
}

const useDragEvents = ({ onDrag, onDragStop, onDragStart }: $TODO): $TODO => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onDrag(e)
      console.log(e)
    },
    [onDrag]
  )

  const handleDragStop = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onDragStop(e)

      window.removeEventListener('mousemove', handleDrag as $TODO, false)
      window.removeEventListener('mouseup', handleDragStop as $TODO, false)
    },
    [onDragStop]
  )

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { x, y } = getControlPosition(e)
      const node = e.target as Element
      const draggableData: DraggableEventData = { x, y, node }
      setIsDragging(true)
      onDragStart(e, draggableData)

      window.addEventListener('mousemove', handleDrag as $TODO, false)
      window.addEventListener('mouseup', handleDragStop as $TODO, false)
    },
    [onDragStart, setIsDragging, handleDrag, handleDragStop]
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      handleDragStart(e)
    },
    [handleDragStart]
  )

  return { onMouseDown }
}

export const useDraggable = ({
  onDrag = () => {},
  onDragStart = () => {},
  onDragStop = () => {}
}: UseDraggableArgs) => {
  const handleRef = useRef(null)

  const { onMouseDown } = useDragEvents({
    onDrag,
    onDragStop,
    onDragStart
  })

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
