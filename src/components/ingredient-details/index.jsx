import style from './style.module.css'
import { ingredientType } from '../../utils/types'

export default function IngredientDetails (props) {
  return (
    <div className={`${style.ingredient_details} pt-10 pb-15`}>
      <p className={`${style.ingredient_details_title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img
        src={props.data.image_large}
        alt=""
        className="mb-4"
      />
      <p className="text text_type_main-medium mb-8">
        {props.data.name}
      </p>
      <ul className={`${style.composition}`}>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.calories}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.proteins}
          </p>
        </li>
        <li className="mr-5">
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: ingredientType
}
