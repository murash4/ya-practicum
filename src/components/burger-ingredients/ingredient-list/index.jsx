import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CLEAR_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from '../../../services/actions/ingredientDetails'
import { ingredientsNameType, ingredientType } from '../../../utils/types'
import IngredientItem from './ingredient-item'
import Modal from '../../hocs/modal'
import IngredientDetails from '../../ingredient-details'
import style from './style.module.css'

export default function IngredientList (props) {
  const { ingredientDetails } = useSelector(state => state)
  const dispatch = useDispatch()

  /**
   * Показать попап с деталями об ингредиенте
   * @param {object} item
   */
  const showDetails = (item) => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      data: item
    })
  }

  /**
   * Скрыть попап с деталями об ингредиенте
   */
  const resetSelectedItem = () => {
    dispatch({
      type: CLEAR_INGREDIENT_DETAILS
    })
  }

  return (
    <>
      <p
        ref={props.refLink}
        className="text text_type_main-medium mb-6"
      >
        {props.typesName[props.typeName]}
      </p>
      <div className={`${style.list} pt-6 pr-4 pb-2 pl-4`}>

        {props.data.map(item => (
          <IngredientItem
            key={item._id}
            item={item}
            showDetails={showDetails}
          />
        ))}
      </div>

      {
        ingredientDetails &&
        <Modal
          title="Детали ингредиента"
          close={resetSelectedItem}
        >
          <IngredientDetails />
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
