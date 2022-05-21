describe('Проверка работы конструктора бургеров', () => {
  it('проверка перехода на страницу localhost:3000', () => {
    cy.visit('http://localhost:3000/login')
  })

  it('проверка авторизации', () => {
    const email = 'admin1@mail.ru'
    const password = 'qwer'

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('.form button').click()
  })

  it('проверка просмотра информации об ингредиенте', () => {
    cy.get('[data-test="ingredient"]').first().click()
    cy.get('[data-test="modal-overlay"]').click()
  })

  it('проверка перетаскивания ингредиента', () => {
    cy.get('[data-test="ingredient"]').first().trigger('dragstart')
    cy.get('[data-test="drop-target"]').trigger('drop')
    cy.get('[data-test="ingredient"]').eq(3).trigger('dragstart')
    cy.get('[data-test="drop-target"]').trigger('drop')
    cy.get('[data-test="ingredient"]').eq(4).trigger('dragstart')
    cy.get('[data-test="drop-target"]').trigger('drop')
  })

  it('проверка удаления ингредиента', () => {
    cy.get('.constructor-element__action').eq(2).click()
  })

  it('проверка оформления заказа', () => {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'postOrder.json' })
    cy.get('[data-test="footer-constructor"] button').contains('Оформить заказ').click()
  })

  it('проверка закрытия попапа заказа', () => {
    cy.get('[data-test="modal-overlay"]').click()
  })
})
