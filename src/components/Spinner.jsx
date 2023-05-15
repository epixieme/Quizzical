export default function Spinner({loading, isLoading}) {
  if (loading) {
    return (
      <section className="spinner-container">
        <section className="loading-spinner">
          <p>{isLoading}</p>
        </section>
      </section>
    );
  }
}
<div className="spinner-container">
  <div className="loading-spinner"></div>
</div>;
