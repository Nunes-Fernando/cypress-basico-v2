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

        it("Verifique mensagem de erro ao preencher um campo obrigatório incorretamente", function(){
            cy.get("#firstName").type("Fernando")
            cy.get("#lastName").type("Nunes da Silva")
            //nesse caso, estou enviando um e-mail sem o @, com é caracter obrigatório irá dar erro
            cy.get("#email").type("123gmail.com")
            cy.get("#open-text-area").type("Mensagem de erro!!!")
            cy.get("button[type='submit']").click()
            
            cy.get('.error').should("be.visible")
        })

        it("Campo de telefone continua vazio ao preencher com valor não numérico", function(){
           cy.get("#phone").type("testando...")
            .should("have.value", '')
        })

        it("Verificar mensagem de erro ao submeter o forms deixando o telefone vazio", function(){
            cy.get("#firstName").type("Fernando")
            cy.get("#lastName").type("Nunes da Silva")
            cy.get("#email").type("fn4586@gmail.com")
            cy.get("#phone-checkbox").click()
            cy.get("#open-text-area").type("Telefone vazio!!!")
            cy.get("button[type='submit']").click()

            cy.get(".error").should("be.visible")
        })

        it("Limpa os campos preenchidos", function(){
            cy.get("#firstName").type("Fernando").clear().should("have.value", "")
            cy.get("#lastName").type("Nunes da Silva").clear().should("have.value", "")
            cy.get("#email").type("fn4586@gmail.com").clear().should("have.value", "")
            cy.get("#phone").type("1191594-9097").clear().should("have.value", "")
            cy.get("#open-text-area").type("limpando os campos").clear().should("have.value", "")

        })

        it("Enviando o forms com comandos customizados", function(){
            cy.fillMandatoryFieldsAndSubmit()
        })

       it("Selecionando uma opção no menu suspenso pelo nome", function(){
            cy.get("#product").select("youtube").should("have.value", "youtube")
       })

       it("Selecionando uma opção no menu suspenso pelo indice na lista", function(){
        cy.get("#product").select(1).should("have.value", "blog")
   })

        it("Selecionando a opção de feedback", function(){
            cy.get('input[type= "radio"][value= "feedback"]').check().should("have.value", "feedback")
        })
        

        it("Passando e selecionando cada input radio", function(){
            cy.get('input[type= "radio"]')
                .should('have.length', 3)
                .each(function($radio){
                    cy.wrap($radio).check()
                    cy.wrap($radio).should("be.checked")
                })
        })

        it("Upload de arquivos", function(){
            cy.get("#file-upload").selectFile('cypress/fixtures/carrinho.jpg')
        })

        it("Verificando o link sem a necessidade de abrir nova aba", function(){
            cy.get("#privacy a").should('have.attr', 'target', '_blank')
        })

        it.only("Verificando o direcionamento para a página de politica e privacidade", function(){
            cy.get("#privacy a")
                .invoke("removeAttr", "target")
                .click()
        })

    })

