require('cypress-xpath')

describe ('Create user account', function () {
    it('Visits Airtable and click sign up', function () {
        cy.visit('https://airtable.com/')
        cy.contains('Sign up for free').click()
        cy.url().should('include','/signup')   

        cy.get('[name=email]').type('tester.airtable@gmail.com')
        cy.contains('Continue').click()
  
        cy.get('[name=fullName]').type('John Smith')
        cy.get('[name=password]').type('Test@123')
        cy.contains('Continue').click()

        cy.contains('Skip').then(async ele => {
            if(ele.is(':visible')){
                await cy.contains('Skip').click()
            }
        })

        cy.contains('Skip').then(async ele => {
            if(ele.is(':visible')){
                await cy.contains('Skip').click()
            }
        })

        cy.contains('Skip').then(async ele => {
            if(ele.is(':visible')){
                await cy.contains('Skip').click()
            }
        })

        // Verify that you have created a new base
        cy.xpath('//*[@id="workspaceSetupDialogContainer"]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div/div[1]').click()
        cy.get('.edit').type('Base1')


        cy.contains('No thanks').click()
        cy.xpath('//*[@id="paneControlsContainer"]/div/div/div[2]/div[2]').click()
        cy.contains('Close').click()
        cy.get('.parentColoredText').click()
        cy.xpath('//*[@id="hyperbaseContainer"]/div[27]/div/div/div[1]/div[2]/div[3]/div[2]').click()

        // Enter the email of the collaborator
        cy.get('[placeholder="Invite more base collaborators via email"]').type('airtable.collaborator@gmail.com')

        // Set the permissions as 'Editor'
        cy.xpath('//*[@id="hyperbaseContainer"]/div[27]/div/div/div[1]/div[2]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div').click().get('.hdropdown').contains('li > div','Editor').click()
        //cy.get('.selectMenu').click().get('.hdropdown').contains('li > div','Editor').click()
        //cy.xpath('//*[@id="hyperbaseContainer"]/div[27]/div/div/div[1]/div[2]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div/span/div').click().get('.hdropdown').contains('li > div','Editor').click()

        cy.xpath('//*[@id="hyperbaseContainer"]/div[27]/div/div/div[1]/div[2]/div/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/div').click()

        cy.wait(3000)

        //Verify that the newly collaborated user email is displayed under “Base Collaborators”
        cy.xpath('/html/body/div[1]/div[27]/div/div/div[1]/div[2]/div/div/div[2]/div[2]/section[1]/div/div[1]/div[2]/div[2]').invoke('text').should('eq', 'airtable.collaborator@gmail.com')

        //Verify that the collaborator has “Editor” role displayed under “Base Collaborators”
        cy.xpath('/html/body/div[1]/div[27]/div/div/div[1]/div[2]/div/div/div[2]/div[2]/section[1]/div/div[3]/div[1]/div/span/div/div').invoke('text').should('eq', 'Editor')
    })
});