Feature: User Authentication

Scenario: Successful User Sign Up
    Given a new user with prenom "Test", nom "John", email "test", motDePasse "!testPassword123", and validation "!testPassword123"
    When the user tries to sign up
    Then the user should receive a status 201 response
    And a message "Vous êtes maintenant inscrit a Escapade"

Scenario: User Sign Up with Existing Email
    Given a new user with prenom "Test", nom "John", email "test", motDePasse "!testPassword123", and validation "!testPassword123"
    When the user tries to sign up
    Then the user should receive a status 400 response
    And a message "Identifiant déjà utilisé"

Scenario: Successful User Sign In
    Given an existing user with email "test@email.com" and motDePasse "!testPassword123"
    When the user tries to sign in
    Then the user should receive a status 200 response
    And a message containing "Bienvenue sur Escapade"


Scenario: User Sign In with Non-Existent Email
    Given an existing user with email "nonexistent" and motDePasse "nonexistentPassword"
    When the user tries to sign in
    Then the user should receive a status 401 response
    And a message "Cet identifiant est inexistant !"

Scenario: Successful Email Update
    Given an existing user with id "64ad67083016b9b085eb769e"
    When the user tries to update their email to "new.email"
    Then the user should receive a status 200 response
    And a message "Email de l'utilisateur mis à jour avec succès"

Scenario: Email Update to an Already Existing Email
    Given an existing user with id "64ad67083016b9b085eb769e"
    When the user tries to update their email to "test"
    Then the user should receive a status 400 response
    And a message "Cet email est déjà utilisé"
