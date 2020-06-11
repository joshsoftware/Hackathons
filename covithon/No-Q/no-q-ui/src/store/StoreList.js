import React from "react";

import { Table } from "reactstrap";
import "./table-responsive.css";
import NqButton from "core-components/NqButton";

const Store = (store, index, isAdmin, handleClick) => {
  return (
    <tr key={index} className="store">
      <td>{store.name}</td>
      <td>{store.address}</td>
      <td>{store.category_names}</td>
      <td>{store.pincode}</td>
      <td>{store.code}</td>
      {isAdmin && <td>{store.duration}</td>}
      {isAdmin && !store.deleted_at && (
        <td>
          <NqButton
            handleClick={handleClick}
            color="danger"
            data-StoreId={store.id}
            label="Disable"
          />
        </td>
      )}
    </tr>
  );
};

const StoreList = ({ stores, isAdmin, handleClick }) => {
  let list = stores.map((store, index) =>
    Store(store, index, isAdmin, handleClick)
  );
  return (
    <div className="container-fluid">
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Categories</th>
            <th>Pincode</th>
            <th>Code</th>
            {isAdmin && <th>Duration</th>}
            {isAdmin && <th> Disable </th>}
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </div>
  );
};

export default StoreList;
