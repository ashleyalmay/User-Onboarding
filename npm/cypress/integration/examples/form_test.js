describe('user-boarding', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')
    })
    it('can submit', () => {
        cy.get('input[name="name"]')
        .type('Raymond')
        .should('have.value', 'Raymond')
        cy.get('input[name="password"]')
        .type('AnimalcrossingNH')
        .should('have.value', 'AnimalcrossingNH')
        cy.get('input[name="email"]')
        .type('raymondthecat@gmail.com')
        .should('have.value', 'raymondthecat@gmail.com')
        cy.get('input[name="terms"]')
        .check()
        .should('have.checked')
        cy.get('button')
        .click()
    })
    it('has validation error if username has 0 chars', () =>{
        cy.get('input')
        .should((valid) => {
            expect(valid).to.have.length
        })
        
      })
})