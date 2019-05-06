import React from 'react'

import { useDraggable } from './use-draggable'

type $TODO = any

interface Position {
  x: number
  y: number
}

const initialPosition: Position = { x: 0, y: 0 }

export const App: React.FC = () => {
  const { getHandleProps } = useDraggable({
    position: { x: 0, y: 0 },
    onDragStart: console.log
  })

  return <div {...getHandleProps()}>hey there</div>
}
