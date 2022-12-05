import { useState } from "react";
import { Table } from "react-bootstrap";
import UserDetailsModal from "./userDetails";

export default function UserTable(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const getUserDetails = (request) => {
    setModalData(request);
    setModalVisible(true);
  };
  return (
    <div className="recordsTable">
      <UserDetailsModal
        visible={modalVisible}
        toggle={modalToggle}
        data={modalData}
      />
      <Table bordered hover responsive="xl">
        <thead>
          <tr>
            <th>SN#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {props.requests.map((request, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.department}</td>
                <td className="text-center">
                  <button
                    className="tableButton"
                    onClick={() => {
                      getUserDetails(request);
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
