Feature: User Authentication

Scenario: Successful new user registration
Given a user with firstName "Jean", lastName "Tremblay", email "jean.tremblay@gmail.com", password "Password123!" and confirmPassword "Password123!"
When the user registers on the website
Then the user receives a 201 response
And a confirmation email is sent to the user's email address

Scenario: Registration with existing email
Given a user with firstName "Jane", lastName "Doe", email "jean.tremblay@gmail.com", password "Password123!" and confirmPassword "Password123!"
When the user tries to register on the website
Then the user receives a 400 response
And an error message "Email already exists" is displayed

Scenario: Successful user login
Given a registered user with email "jean.tremblay@gmail.com" and password "Password123!"
When the user logs in
Then the user receives a 200 response
And the user is redirected to the home page

Scenario: Failed login with wrong password
Given a registered user with email "jean.tremblay@gmail.com" and password "wrongpassword"
When the user tries to log in
Then the user receives a 401 response
And an error message "Invalid email or password" is displayed

Scenario: Successful email update
Given a registered user with id "1234" and new email "new.email@gmail.com"
When the user updates their email
Then the user receives a 200 response
And a confirmation email is sent to the new email address

Scenario: Email update to existing email
Given a registered user with id "1234" and new email "jean.tremblay@gmail.com"
When the user tries to update their email
Then the user receives a 400 response
And an error message "Email already exists" is displayed
