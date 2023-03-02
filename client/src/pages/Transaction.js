import React from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Moment from "react-moment";

function Pay() {
  const { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  return (
    <div style={{ backgroundColor: "#161616" }} className="py-5 min-vh-100">
      <Container className="pt-5">
        <h2 className="text-white mb-4">Incoming Transaction</h2>
        <Table striped hover className="mb-5">
          <thead>
            <tr className="text-white">
              <th>No</th>
              <th>Users</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((value, index) => {
              let statuspayment;

              if (value.statuspayment === "Success") {
                statuspayment = (
                  <td className="text-success">{value.statuspayment}</td>
                );
              } else if (value.statuspayment === "Pending") {
                statuspayment = (
                  <td className="text-warning">{value.statuspayment}</td>
                );
              } else {
                statuspayment = (
                  <td className="text-danger">{value.statuspayment}</td>
                );
              }

              const duedate = new Date(value.duedate);
              const datenow = new Date();
              var differenceTime = duedate - datenow;
              var differenceDate = Math.floor(differenceTime / 86400000);

              return (
                <tr key={index}>
                  <td className="text-white">{value.id}</td>
                  <td className="text-white">{value.user.fullname}</td>
                  <td className="text-white">
                    <Moment format="D MMMM YYYY">{value.startdate}</Moment>
                  </td>
                  <td className="text-white">
                    <Moment format="D MMMM YYYY">{value.duedate}</Moment>
                  </td>

                  <td className="text-white">
                    {differenceDate <= 0 ? 0 : differenceDate} / Hari
                  </td>
                  {differenceDate <= 0 ? (
                    <td className="text-danger">Not Active</td>
                  ) : (
                    <td className="text-success">Active</td>
                  )}
                  {/* {statususer} */}
                  {statuspayment}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Pay;
