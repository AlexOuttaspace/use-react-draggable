import React from 'react'
import PropTypes from 'prop-types'

import { useDraggable } from './use-draggable'

export const App: React.FC = () => {
  const { onMouseDown } = useDraggable()

  return <div onMouseDown={onMouseDown}>app component</div>
}
