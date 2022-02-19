import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

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
