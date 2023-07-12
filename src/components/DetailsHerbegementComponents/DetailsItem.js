function DetailsItem({ label, value }) {
    return (
      <p className="py-0">
        <span className="fw-bold">{label}:</span> {value}
      </p>
    );
  }
  
  export default DetailsItem;
  