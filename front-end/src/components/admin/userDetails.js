import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function UserDetailsModal(props) {
  return (
    <Modal
      show={props.visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">{props.data.name}</h4>
        <div className="rmBody">
          <div className="rmBodySlot">
            <h5>id:</h5>
            <h5>{props.data._id}</h5>
          </div>
          <div className="rmBodySlot">
            <h5>Name:</h5>
            <h5>{props.data.name}</h5>
          </div>
          <div className="rmBodySlot">
            <h5>Email:</h5>
            <h5>{props.data.email}</h5>
          </div>
          <div className="rmBodySlot">
            <h5>Department:</h5>
            <h5>{props.data.department}</h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modalFooter">
          <Button onClick={props.toggle}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
