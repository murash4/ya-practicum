import style from './style.module.css'
import checkboxImg from '../../images/done.png'
import { useSelector } from '../../services/store'

export default function OrderDetails () {
  const order = useSelector(state => state.orderDetails.data?.order)
  const number = order?.number || 0

  return (
    <div className={`${style.order_details} pt-30 pb-30`}>
      <p className="text text_type_digits-large mb-8">
        {number}
      </p>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      <img
        src={checkboxImg}
        alt="Готово"
        className={`${style.checkbox} mb-15`}
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
