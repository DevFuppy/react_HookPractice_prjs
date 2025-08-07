import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default Control;

function Control() {
  return (
    <div className="unit-control">
      <div className="unit">Mbps</div>
      <span className="exchange-icon fa-fw fa-stack">
        <FontAwesomeIcon icon={["far", "circle"]} className="fa-stack-2x" />
        <FontAwesomeIcon icon={"arrow-right-arrow-left"} className="fa-stack-1x" />
      </span>
      <div className="unit">MB/s</div>
    </div>
  );
}
