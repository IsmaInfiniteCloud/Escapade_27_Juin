Feature: Create Hebergement

    This feature will add a new hebergement to the session user

    Scenario: CreateHebergement
       Given : the user is already logged in
       And user is on the create hebergement page
       When user enters <titre>, <description>,
        and <prix>
       And user clicks on create
       Then A new hebergement will be added to the session user
       And The user will be redirected to Home page

       Examples:
           | titre | description | imageSrc | categorie | nbChambres | nbSalleBains | nbPersonneMax | localisation | prix |
           | appartement de luxe  | merveilleux appartement  | http://photo.png  | Appartement | 4 | 3 | 8 | San Jose | 2100