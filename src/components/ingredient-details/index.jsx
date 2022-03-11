import { useSelector } from 'react-redux'
import style from './style.module.css'

export default function IngredientDetails () {
  const { ingredientDetails } = useSelector(state => state)

  return (
    <div className={`${style.ingredient_details} pb-15`}>
      <img
        src={ingredientDetails.image_large}
        alt={ingredientDetails.name}
        className="mb-4"
      />
      <p className="text text_type_main-medium mb-8">
        {ingredientDetails.name}
      </p>
      <ul className={`${style.composition}`}>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.calories}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}
