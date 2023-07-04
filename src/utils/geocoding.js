// utils/geocoding.js
import axios from "axios";

export const getCoordinates = async (adresse, ville, codepostal, pays) => {
  const query = `${adresse}, ${ville}, ${codepostal}, ${pays}`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    query
  )}&key=da9b2f646e054f7888d74bf7969cef10`;

  try {
    const response = await axios.get(url);

    if (response.data.results && response.data.results.length > 0) {
      console.log(response.data.results[0].geometry);
      return response.data.results[0].geometry;
    }

    throw new Error("No result found");
  } catch (error) {
    console.error(error);
  }
};
