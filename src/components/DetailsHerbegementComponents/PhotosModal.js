// PhotosComponent.js

function PhotosModal({ photos }) {
  if (!photos || photos.length === 0) {
    return <div>No photos available</div>
}
    return (
      <div className="container px-0 py-3">
        <div className="row">
          {photos.map((photo, index) => {
            const imgClass =
              index === 0
                ? "first-photo col-md-6 rounded"
                : "subsequent-photo col-md-6 rounded";
            return (
              <div key={index} className={imgClass}>
                <img
                  src={photo}
                  alt={`Number ${index + 1}`}
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default PhotosModal;
  