const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const axios = require('axios');

let response;
let emailIndex = 0;

Given('a new user with prenom {string}, nom {string}, email {string}, motDePasse {string}, and validation {string}', function (prenom, nom, email, motDePasse, validation) {
    this.userData = { prenom, nom, email: `${email}${emailIndex++}@test.com`, motDePasse, validation };
});

Given('an existing user with email {string} and motDePasse {string}', function (email, motDePasse) {
    this.userData = { email, motDePasse };
});

Given('an existing user with id {string}', function (id) {
    this.userId = id;
});

When('the user tries to sign up', async function () {
    response = await axios.post('http://localhost:5000/api/users/signup', this.userData).catch(err => response = err.response);
});

When('the user tries to sign in', async function () {
    response = await axios.post('http://localhost:5000/api/users/signin', this.userData).catch(err => response = err.response);
});

When('the user tries to update their email to {string}', async function (newEmail) {
    response = await axios.patch(`http://localhost:5000/api/users/${this.userId}`, { email: `${newEmail}@test.com` }).catch(err => response = err.response);
});

Then('the user should receive a status {int} response', function (expectedStatus) {
    assert.equal(response.status, expectedStatus);
});

Then('a message {string}', function (expectedMessage) {
    assert(response.data.message.includes(expectedMessage));
});
