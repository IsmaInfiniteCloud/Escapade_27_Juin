import React, { useEffect } from "react";
import axios from "axios";

const GeolocationComponent = () => {
  useEffect(() => {
    getGeolocation();
  }, []);

  const sendGeolocationToBackend = (latitude, longitude) => {
    const data = {
      latitude: latitude,
      longitude: longitude,
    };

    axios
      .post("/api/geolocation", data)
      .then((response) => {
        console.log("Coordonnées envoyées avec succès au backend");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'envoi des coordonnées au backend",
          error
        );
      });
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          sendGeolocationToBackend(latitude, longitude);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position géographique",
            error
          );
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur"
      );
    }
  };

  return null;
};

export default GeolocationComponent;
