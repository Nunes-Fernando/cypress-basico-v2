Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function(){
    cy.get("#firstName").type("Fernando")
    cy.get("#lastName").type("Nunes da Silva")
    cy.get("#email").type("fn4586@gmail.com")
    cy.get("#phone").type("1191594-9097")
    cy.get("#open-text-area").type("Aprendendo Cypress haha")
    cy.get("button[type='submit']").click()
    
    cy.get('.success').should("be.visible")
})
