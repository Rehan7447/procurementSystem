export default function Card(props) {
  return (
    <div className="adminCard col-12 col-lg-3">
      <div className="adminCardHeader">
        <h3>{props.title}</h3>
      </div>
      <div className="adminCardBody">
        <h1 className="adminCardValue">{props.value}</h1>
      </div>
    </div>
  );
}
