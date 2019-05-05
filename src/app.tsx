import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  DraggableEventHandler,
  DraggableData,
  DraggableEvent,
  DraggableCore,
  DraggableBounds
} from 'react-draggable'
import Draggable from 'react-draggable'

type $TODO = any

interface Position {
  x: number
  y: number
}

const initialPosition: Position = { x: 0, y: 0 }

function adjustToInput(
  scale: number,
  position: Position,
  draggableData: DraggableData
): DraggableData {
  return {
    node: draggableData.node,
    x: position.x + draggableData.deltaX / scale,
    y: position.y + draggableData.deltaY / scale,
    deltaX: draggableData.deltaX / scale,
    deltaY: draggableData.deltaY / scale,
    lastX: position.x,
    lastY: position.y
  }
}

const isNum = (num: any): boolean => typeof num === 'number' && !isNaN(num)

function adjustToBounds(
  bounds: DraggableBounds | null,
  draggableData: DraggableData
): DraggableData {
  if (!bounds) return draggableData

  let newX = draggableData.x
  let newY = draggableData.y

  // Keep x and y below right and bottom limits...
  if (isNum(bounds.right)) newX = Math.min(newX, bounds.right)
  if (isNum(bounds.bottom)) newY = Math.min(newY, bounds.bottom)

  // But above left and top limits.
  if (isNum(bounds.left)) newX = Math.max(newX, bounds.left)
  if (isNum(bounds.top)) newY = Math.max(newY, bounds.top)

  return { ...draggableData, x: newX, y: newY }
}

function adjustDraggableData(
  bounds: DraggableBounds | null,
  scale: number,
  position: Position,
  draggableData: DraggableData
): DraggableData {
  const adjustedToInput: DraggableData = adjustToInput(
    scale,
    position,
    draggableData
  )

  const adjustedToBounds: DraggableData = adjustToBounds(
    bounds,
    adjustedToInput
  )

  return adjustedToBounds
}

interface Props {
  scale?: number
  bounds?: DraggableBounds | null
}

export const App: React.FC<Props> = ({ scale, bounds }) => {
  const [position, setPosition] = useState(initialPosition)

  const handleSetPosition: DraggableEventHandler = useCallback(
    (e: DraggableEvent, draggableData: DraggableData) => {
      const correctedData = adjustDraggableData(
        bounds as DraggableBounds | null,
        scale as number,
        position,
        draggableData
      )

      setPosition({ x: correctedData.x, y: correctedData.y })
    },
    [position, setPosition]
  )

  return (
    <div
      style={{
        position: 'relative',
        width: 800,
        height: 800,
        border: '1px solid green'
      }}
    >
      <DraggableCore onStart={console.log} onDrag={handleSetPosition}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            border: '1px solid red',
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          app component
        </div>
      </DraggableCore>
    </div>
  )
}

App.defaultProps = {
  scale: 1,
  bounds: {
    top: 0,
    left: 0,
    bottom: 800,
    right: 800
  }
}
