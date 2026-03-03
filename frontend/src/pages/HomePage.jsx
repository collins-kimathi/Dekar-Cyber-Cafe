import ServiceCatalog from "../components/catalog/ServiceCatalog";
import BookCatalog from "../components/catalog/BookCatalog";
import OpenRequestForm from "../components/forms/OpenRequestForm";
import SermonVideos from "../components/media/SermonVideos";

function HomePage() {
  return (
    <>
      <section className="hero card">
        <h2>Digital Services, Book Catalog, and Community Media</h2>
        <p>
          Dekar Cyber Cafe supports individuals, schools, and organizations with e-service applications,
          tender processing, and learning resources in one trusted workflow.
        </p>
      </section>
      <section className="grid">
        <ServiceCatalog />
        <BookCatalog />
        <OpenRequestForm />
      </section>
      <SermonVideos />
    </>
  );
}

export default HomePage;
