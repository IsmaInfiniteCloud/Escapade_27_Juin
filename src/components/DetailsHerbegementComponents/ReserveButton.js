function ReserveButton({ onClick }) {
    return (
      <button
        type="button"
        className="btn btn-dark my-3 mx-5 fw-bold"
        onClick={onClick}
      >
        Réserver
      </button>
    );
  }
  
  export default ReserveButton;
  