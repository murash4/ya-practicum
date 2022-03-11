import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import { throttle } from 'lodash'
import IngredientList from './ingredient-list'
import Tabs from './tabs'
import style from './style.module.css'

const typesName = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы'
}

export default function BurgerIngredients () {
  const ingredients = useSelector(state => state.ingredients.data)
  const [currentIngredientType, setCurrent] = React.useState('bun')
  const scrollableNodeRef = useRef()
  const refs = {
    bun: useRef(),
    main: useRef(),
    sauce: useRef()
  }

  const toggleTab = (type) => {
    setCurrent(type)
    scrollableNodeRef.current.scrollTop = refs[type].current.offsetTop
  }

  /**
   * Возвращает все названия типов ингредиентов
   * @return {array}
   */
  const ingredientTypes = ingredients.reduce((acc, item) => {
    if (!acc.includes(item.type)) {
      acc.push(item.type)
    }

    return acc
  }, [])

  useEffect(() => {
    const scrollbarNode = scrollableNodeRef.current
    /**
     * Подсветка нужной табы при скроле ингредиентов
     */
    function checkScroll () {
      const scrollTop = scrollableNodeRef.current.scrollTop
      const scrolls = [
        { name: 'bun', value: Math.abs(refs.bun.current.offsetTop - scrollTop) },
        { name: 'main', value: Math.abs(refs.main.current.offsetTop - scrollTop) },
        { name: 'sauce', value: Math.abs(refs.sauce.current.offsetTop - scrollTop) }
      ]

      const sortRefsByScroll = scrolls.sort((a, b) => a.value - b.value)

      setCurrent(sortRefsByScroll[0].name)
    }

    const onScroll = throttle(function () {
      checkScroll()
    }, 100)

    scrollbarNode.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      scrollbarNode.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [refs.bun, refs.main, refs.sauce])

  return (
    <section className={`${style.section} pb-10`}>
      <Tabs
        types={ingredientTypes}
        typesName={typesName}
        current={currentIngredientType}
        toggleTab={toggleTab}
      />

      <SimpleBar
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        className={style.simplebar}
      >
        {
          ingredientTypes.map(name => {
            const filteredData = ingredients.filter(ingredient => ingredient.type === name)

            return (
              <IngredientList
                key={name}
                data={filteredData}
                typesName={typesName}
                typeName={name}
                refLink={refs[name]}
              />
            )
          })
        }
      </SimpleBar>
    </section>
  )
}
