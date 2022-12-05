import { useState } from "react";
import { Table } from "react-bootstrap";
import DetailsModal from "./user/detailsDialog";

export default function RecordsTable(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const getRequestDetails = (request) => {
    setModalData(request);
    setModalVisible(true);
  };
  return (
    <div className="recordsTable">
      <DetailsModal
        visible={modalVisible}
        toggle={modalToggle}
        data={modalData}
      />
      <Table bordered hover responsive="xl">
        <thead>
          <tr>
            <th>SN#</th>
            <th>Request-Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.requests.map((request, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{request.name}</td>
                <td>{request.status}</td>
                <td className="text-center">
                  <button
                    className="tableButton"
                    onClick={() => {
                      getRequestDetails(request);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
