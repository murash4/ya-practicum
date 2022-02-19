import style from './style.module.css'
import ConstructorListItem from './constructor-list-item'
import SimpleBar from 'simplebar-react'

export default function ConstructorList (props) {
  return (
    <div className={`${style.list} mb-10`}>
      <ConstructorListItem
        item={props.data[0]}
        postision="top"
      />

      <SimpleBar className={`${style.simplebar} mb-4`}>
        {props.data
          .filter((item, index) => (index !== 0 && index !== props.data.length - 1))
          .map((item) => (
            <ConstructorListItem
              key={item._id}
              item={item}
            />
          ))}
      </SimpleBar>

      <ConstructorListItem
        item={props.data[props.data.length - 1]}
        postision="bottom"
      />
    </div>
  )
}
