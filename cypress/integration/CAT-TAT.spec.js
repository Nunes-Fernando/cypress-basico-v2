describe("Central de Atendimento ao Cliente CAC-TAT", function(){
        beforeEach(function(){
            cy.visit("./src/index.html")
        })

        it("Verificar o titulo da aplicação", function(){
            cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
        })

        it("Preencher as informações do formulário", function(){
            cy.get("#firstName").type("Fernando")
            cy.get("#lastName").type("Nunes da Silva")
            cy.get("#email").type("fn4586@gmail.com")
            cy.get("#phone").type("1191594-9097")
            cy.get("#open-text-area").type("Aprendendo Cypress haha")
            cy.get("button[type='submit']").click()
            
            cy.get('.success').should("be.visible")
        })

        it("Verifique de erro ao preencher um campo obrigatório incorretamente", function(){
            cy.get("#firstName").type("Fernando")
            cy.get("#lastName").type("Nunes da Silva")
            //nesse caso, estou enviando um e-mail sem o @, com é caracter obrigatório irá dar erro
            cy.get("#email").type("123gmail.com")
            cy.get("#open-text-area").type("Mensagem de erro!!!")
            cy.get("button[type='submit']").click()
            
            cy.get('.error').should("be.visible")
        })

        it.only("Campo de telefone continua vazio ao preencher com valor não numérico", function(){
           cy.get("#phone").type("testando...")
            .should("have.value", '')
        })

    })

