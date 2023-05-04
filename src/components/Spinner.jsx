export default function Spinner(props) {
  if (props.loading) {
    return (
      <section className="spinner-container">
        <section className="loading-spinner">
          <p>{props.isLoading}</p>
        </section>
      </section>
    );
  }
}
<div className="spinner-container">
  <div className="loading-spinner"></div>
</div>;
