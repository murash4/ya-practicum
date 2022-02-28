import style from './style.module.css'
import ConstructorListItem from './constructor-list-item'
import SimpleBar from 'simplebar-react'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/types'

export default function ConstructorList (props) {
  const notBunIngredients = props.data.filter((item, index) => (index !== 0))
  const bun = props.data.find(item => item.type === 'bun')

  return (
    <div className={`${style.list} mb-10`}>
      {bun &&
        <ConstructorListItem
          item={bun}
          position="top"
        />
      }

      <SimpleBar className={`${style.simplebar} mb-4`}>
        {notBunIngredients.map((item) => (
            <ConstructorListItem
              key={item._id}
              item={item}
            />
          ))}
      </SimpleBar>

      {
        bun && <ConstructorListItem
          item={bun}
          position="bottom"
        />
      }
    </div>
  )
}

ConstructorList.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
