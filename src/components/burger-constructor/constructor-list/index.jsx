import style from './style.module.css'
import ConstructorListItem from './constructor-list-item'
import SimpleBar from 'simplebar-react'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/types'

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
              postision="middle"
            />
          ))}
      </SimpleBar>

      <ConstructorListItem
        item={props.data[0]}
        postision="bottom"
      />
    </div>
  )
}

ConstructorList.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
