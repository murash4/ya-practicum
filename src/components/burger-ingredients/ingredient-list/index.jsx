import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientsNameType, ingredientType } from '../../../utils/types'
import Modal from '../../hocs/modal'
import IngredientDetails from '../../ingredient-details'
import style from './style.module.css'

export default function IngredientList (props) {
  const [selectedItem, setSelectedItem] = React.useState(null)

  /**
   * Показать попап с деталями об ингредиенте
   * @param {object} item
   */
  const showDetails = (item) => {
    setSelectedItem({...item})
  }

  /**
   * Скрыть попап с деталями об ингредиенте
   */
  const resetSelectedItem = () => {
    setSelectedItem(null)
  }

  return (
    <>
      <p className="text text_type_main-medium mb-6">
        {props.typesName[props.typeName]}
      </p>
      <div className={`${style.list} pt-6 pr-4 pb-2 pl-4`}>

        {props.data.map(item => (
          <div
            key={item._id}
            className={`${style.item} mb-8`}
            onClick={() => {showDetails(item)}}
          >
            <Counter count={1} size="default" />

            <img
              className={`ml-4 mr-4 mb-1`}
              src={item.image}
              alt={item.name}
            />

            <div className={`${style.price_wrap} mb-1`}>
              <div className={`${style.price} text text_type_main-default primary-color`}>
                {item.price}
              </div>
              <CurrencyIcon type="primary" />
            </div>

            <div className={`${style.item_name} text text_type_main-default primary-color`}>
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {
        selectedItem &&
        <Modal
          title="Детали ингредиента"
          close={resetSelectedItem}
        >
          <IngredientDetails data={selectedItem} />
        </Modal>
      }
    </>
  )
}

IngredientList.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  typesName: ingredientsNameType.isRequired,
  typeName: PropTypes.string.isRequired
}
