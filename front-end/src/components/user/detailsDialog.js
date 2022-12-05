import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DetailsModal(props) {
  const [approvalChecked, setApprovalChecked] = useState(false);
  const [merchCheck, setMerchCheck] = useState(false);
  const [bids, setBids] = useState([]);
  const [bidPrice, setBidPrice] = useState(0);
  const [acceptedBid, setAcceptedBid] = useState({});

  const editRequest = async (status, accepted) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const id = await props.data._id;
    axios
      .put("/admin/editRequest", { id, status, accepted }, config)
      .then(() => {
        props.toggle();
        window.location.reload();
      });
  };

  const createBid = async () => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    const name = JSON.parse(localStorage.getItem("user")).name;
    const amount = bidPrice;
    const requestId = props.data._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(
      "/merch/createBid",
      { email, name, amount, requestId },
      config
    );
    if (data) {
      props.toggle();
      alert("Bid created successfully");
    }
  };

  const getBidDetails = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setBids([]);
    if (props.data.bids) {
      props.data.bids.forEach(async (id) => {
        const data = await axios.get(
          "/merch/getBidDetails",
          { params: { id } },
          { config }
        );
        if (data) {
          setBids((bids) => [...bids, data.data]);
          if (data.data._id === props.data.acceptedBid) {
            setAcceptedBid(data.data);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (
      props.data.status === "Pending" &&
      JSON.parse(localStorage.getItem("user")).isAdmin === true
    ) {
      setApprovalChecked(true);
    } else if (
      props.data.status === "Pending" &&
      JSON.parse(localStorage.getItem("user")).department.toLowerCase() ===
        "merchant"
    ) {
      setMerchCheck(true);
    }
    getBidDetails();
  }, [props.data, setApprovalChecked]);

  return (
    <Modal
      show={props.visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Request Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">{props.data.name}</h4>
        <div className="rmBody">
          <div className="rmBodyHeader">
            <div className="rmBodySlot">
              <h5>Requester Email:</h5>
              <h5>{props.data.userEmail}</h5>
            </div>
            <div className="rmDate">
              <h5>Date:</h5>
              <h5>
                {new Date(props.data.date).getDate() +
                  " / " +
                  new Date(props.data.date).getMonth() +
                  " / " +
                  new Date(props.data.date).getFullYear()}
              </h5>
            </div>
          </div>
          <div className="rmBodySlot">
            <h5>Status:</h5>
            <h5>{props.data.status}</h5>
          </div>
          <div className="rmBodySlot">
            <h5>Amount:</h5>
            <h5>{props.data.amount}</h5>
          </div>
          {!merchCheck && (
            <div className="rmBodySlot rmBodyDesc">
              <h5>Request Details:</h5>
              <p className="remDesc">{props.data.desc}</p>
            </div>
          )}
          <div className="rmBodySlot rmBodyDesc">
            <h5>Accepted Bid:</h5>
            <p className="remDesc">
              {acceptedBid.bidderAmount
                ? `${acceptedBid.bidderEmail} - Amount $${acceptedBid.bidderAmount}`
                : "Your Bid Was Not accepted"}
            </p>
          </div>
          <div className="rmBodySlot rmBodyDesc">
            <h5>Bids:</h5>
            <div className="bidsContainer">
              {props.data.bids &&
                bids.map((bid, index) => {
                  return (
                    <div className="bidSlot" key={index}>
                      <p className="remDesc">
                        {bid.bidderEmail} - Amount ${bid.bidderAmount}
                      </p>

                      {approvalChecked && props.data.bids.length > 1 && (
                        <div className="mfActions">
                          <Button
                            variant="success"
                            onClick={() => editRequest("Completed", bid._id)}
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modalFooter">
          {merchCheck && (
            <div className="mfActions">
              <input
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setBidPrice(e.target.value)}
              />
              <Button variant="success" onClick={() => createBid()}>
                Bid
              </Button>
            </div>
          )}
          <Button onClick={props.toggle}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
