import img404 from "../images/error-404.svg";

export default function ErrorNotFoundPage() {
    return (
        <div className="container">
            <img className="img404" src={img404} alt="page not found" />
        </div>
    );
}
