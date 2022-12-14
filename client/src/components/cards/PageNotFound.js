import NotFoundImg from "../../images/NotFound.jpg"

export default function PageNotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={NotFoundImg} alt="PageNotFound" />
    </div>
  );
};