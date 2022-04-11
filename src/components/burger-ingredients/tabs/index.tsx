import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TTypesName, TTypeName } from '../../../utils/types'

interface ITabs {
  types: Array<TTypeName>
  current: string
  toggleTab: (type: string) => void
  typesName: TTypesName
}

export default function Tabs (props: ITabs) {
  return (
    <div className="mb-10" style={{ display: 'flex' }}>
      {props.types.map((item, index) => (
        <Tab
          key={index}
          value={item}
          active={props.current === item}
          onClick={props.toggleTab}
        >
          {props.typesName[item]}
        </Tab>
      ))}
    </div>
  )
}
