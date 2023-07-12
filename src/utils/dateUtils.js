export function convertToDateObjects(dateStrings) {
    return dateStrings ? dateStrings.map((dateString) => new Date(dateString)) : [];
  }
  