import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_INGREDIENT_DETAILS } from '../../../services/actions/ingredientDetails'
import { IIngredient, TTypeName, TTypesName } from '../../../utils/types'
import IngredientItem from './ingredient-item'
import style from './style.module.css'

interface IIngredientList {
  refLink: string
  typesName: TTypesName,
  typeName: TTypeName
  data: Array<IIngredient>
}

export default function IngredientList (props: IIngredientList) {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  /**
   * Показать попап с деталями об ингредиенте
   * @param {object} item
   */
  const showDetails = (item: IIngredient): void => {
    history.push({
      pathname: `/ingredients/${item._id}`,
      state: {
        backgroundLocation: location
      }
    })
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      data: item
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
    </>
  )
}
