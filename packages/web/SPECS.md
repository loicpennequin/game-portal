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
- [x] Sign-off  
       **AS** an user  
       **GIVEN** I am authenticated  
       **WHEN** I click the sign off button  
       **THEN** I should not be signed in anymore  
       **THEN** The UI should reflect the fact that I am not signed in

### User Contacts

- [ ] Making a friend request
- [ ] Cancelling a friend request
- [ ] Accepting a friend request
- [ ] Refusing a friend request
- [ ] Removing a friend
- [ ] Sending a message to a friend
- [ ] Inviting a friend to play a game
- [ ] Cancelling a game invite

### User Management

- [ ] Getting all users (admin)
- [ ] Update a user information
- [ ] Deleting a user

### Game Discovery

- [ ] Getting the latest games
- [ ] Getting the most popular games
- [ ] Getting the favorite games
- [ ] Searching game with filter
- [ ] Adding a game to favorites
- [ ] Removing a game to favorites

### Game Submission

- [ ] Submitting a new game
- [ ] Cancelling a game submission
- [ ] Getting game submission status
- [ ] Accept a game submission (admin)
- [ ] Denying a game submission (admin)
- [ ] Updating an existing game
- [ ] Removing an existing game

### Game Session

- [ ] Start a game session
- [ ] Join a game session as spectator
- [ ] Chatroom for all participant of the game session (players + spectators)
- [ ] Send game session updates to players (sdk stuff)

### Game Reviews

- [ ] Add a review to a game
- [ ] Modifying a review
- [ ] Deleting a review
