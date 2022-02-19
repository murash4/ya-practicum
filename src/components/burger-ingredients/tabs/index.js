import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Tabs (props) {
  const [current, setCurrent] = React.useState('bun')
  const typesName = {
    sauce: 'Соусы',
    main: 'Начинки',
    bun: 'Булки'
  }

  return (
    <div className="mb-10" style={{ display: 'flex' }}>
      {props.types.map((item, index) => (
        <Tab
          key={index}
          value={item}
          active={current === item}
          onClick={setCurrent}
        >
          {typesName[item]}
        </Tab>
      ))}
    </div>
  )
}
