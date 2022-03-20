import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchIngredients } from '../../services/actions/ingredients'
import style from './style.module.css'
import Preloader from '../preloader'

export default function IngredientDetails () {
  const { id } = useParams()
  const { ingredients, ingredientDetails } = useSelector(state => state)
  const dispatch = useDispatch()
  const selectedIngredient = (ingredients.data.length && id) ? ingredients.data.find(item => item._id === id) : ingredientDetails

  if (id && !ingredients.data.length && !ingredients.isLoading) {
    dispatch(fetchIngredients())
  }

  if (!selectedIngredient) {
    return <Preloader />
  }

  return (
    <div className={`${style.ingredient_details} pb-15`}>
      <img
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
        className="mb-4"
      />
      <p className="text text_type_main-medium mb-8">
        {selectedIngredient.name}
      </p>
      <ul className={`${style.composition}`}>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.calories}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.proteins}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}
