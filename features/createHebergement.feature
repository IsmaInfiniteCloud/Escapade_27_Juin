Feature: Create Hebergement

As a logged-in user
I want to create a new hebergement listing
So that others can book and stay there

Scenario: Successfully create a new hebergement listing

Given I am logged in
And I am on the hebergement creation page

When I enter hebergement details:
  | Field        | Value                                   |
  | title        | Charming Quebec Chalet                  |
  | description  | A cozy chalet in the heart of Quebec    |
  | imageUrl     | https://example.com/quebec-chalet       |
  | category     | Chalet                                  |
  | bedrooms     | 2                                       |
  | bathrooms    | 1                                       |
  | maxGuests    | 4                                       |
  | location     | Mont-Tremblant, Quebec                  |
  | price        | $200 per night                         |

And I click the "Create" button

Then the new hebergement listing is created
And I am redirected to the home page
And I see a confirmation message "Hebergement created successfully!"

Scenario: Missing required fields when creating a hebergement

Given I am logged in
And I am on the hebergement creation page

When I click the "Create" button

Then I see error messages for missing required fields
And I am kept on the creation page

Scenario: Invalid data when creating a hebergement

Given I am logged in
And I am on the hebergement creation page

When I enter invalid hebergement details:
  | Field        | Value                                    |
  | title        | Invalid#$Title                           |
  | description  | A cozy chalet in the heart of Quebec     |
  | imageUrl     | invalid-url                              |
  | category     | Chalet                                   |
  | bedrooms     | Not a number                             |
  | bathrooms    | 1                                        |
  | maxGuests    | -2                                       |
  | location     | Mont-Tremblant, Quebec                   |
  | price        | $200 per night                           |

And I click the "Create" button

Then I see error messages for the invalid data
And I am kept on the creation page
