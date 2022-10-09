# Game Portal Specs

## Features

### Authentication

- [x] Sign-in via email
  - [x] Sending sign-in email  
         **AS** a user  
         **GIVEN** that I am not authenticated  
         **WHEN** I sign in with email  
         **THEN** I recieve an email containing a link to login the application
  - [x] Authenticating from email
        **AS** a user  
         **WHEN** that I clicked on the link from the sign-in email  
         **THEN** I should land on the home page, signed in
  - [x] Authenticating from email for the first time  
         **AS** a user  
         **WHEN** that I clicked on the link from the sign-in email  
         **GIVEN** this is the first time I sign in  
         **THEN** I should be prompted to fill out an onboarding form with a username field
- [x] Sign-in via Discord  
       **AS** a user  
       **WHEN** that click the Discord sign in button  
       **THEN** I should be redirected back to the home page, signed in  
       **THEN** My username should already be filled out and an onboarding form should **NOT** be displayed
- [ ] Sign-off  
       **AS** an user  
       **GIVEN** I am authenticated  
       **WHEN** I click the sign off button  
       **THEN** I should not be signed in anymore  
       **THEN** The UI should reflect the fact that I am not signed in
