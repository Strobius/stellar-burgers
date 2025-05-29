const testUrl = 'http://localhost:4000';

describe('Тест приложения', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'test-refresh');
    
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    localStorage.clear();
    cy.clearCookies();
  });

  describe('Работа модального окна ингредиента', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredients"]').find('li').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('Модальное окно закрывается при нажатии на крестик', () => {
      cy.get('[data-cy="closeButton"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Модальное окно закрывается при клике на оверлей', () => {
      cy.get('[data-cy="overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Модальное окно закрывается при нажатии Escape', () => {
      cy.document().trigger('keydown', { key: 'Escape' });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('тест на добавление ингредиентов в конструктор', () => {
    it('добавляем игредиенты', () => {
      cy.get('h3').contains('Булки').next('ul').find('button:contains("Добавить")').first().click();
      cy.get('h3').contains('Начинки').next('ul').find('button:contains("Добавить")').first().click();
      cy.get('h3').contains('Соусы').next('ul').find('button:contains("Добавить")').first().click();
    });
    
});

  describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
  });

  it('Успешное оформление заказа', () => {
    cy.get('h3').contains('Булки')
      .next('ul')
      .find('button:contains("Добавить")')
      .first()
      .click();

    cy.get('h3').contains('Начинки')
      .next('ul')
      .find('button:contains("Добавить")')
      .first()
      .click();

    cy.get('h3').contains('Соусы')
      .next('ul')
      .find('button:contains("Добавить")')
      .first()
      .click();

    cy.get('button:contains("Оформить заказ")')
      .should('not.be.disabled')
      .click();

    cy.contains('идентификатор заказа').should('be.visible');
    cy.fixture('order.json').then(order => {
      cy.contains(order.order.number).should('exist');
    });

    cy.get('[data-cy="closeButton"]').click();
    cy.contains('идентификатор заказа').should('not.exist');
  });
});

});
