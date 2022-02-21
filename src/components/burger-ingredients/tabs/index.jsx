import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function Tabs (props) {
  return (
    <div className="mb-10" style={{ display: 'flex' }}>
      {props.types.map((item, index) => (
        <Tab
          key={index}
          value={item}
          active={props.current === item}
          onClick={props.setCurrent}
        >
          {props.typesName[item]}
        </Tab>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.string,
  setCurrent: PropTypes.func,
  typesName: PropTypes.shape({
    sauce: PropTypes.string,
    main: PropTypes.string,
    bun: PropTypes.string
  })
}
