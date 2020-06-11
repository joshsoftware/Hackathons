import React, { useEffect } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import StoreList from "./StoreList";
import { fetchStores, fetchAdminStores, disableStore } from "actions";
import { Redirect } from "react-router-dom";

const List = ({
  authenticated,
  stores,
  submitHandler,
  getAdminStores,
  deleteStore,
}) => {
  useEffect(() => {
    getAdminStores();
  }, []);

  let disable = (event) => {
    let storeid = event.target.dataset.storeid;
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteAndRefresh(storeid),
        },
        {
          label: "No",
          onClick: () => console.log("clickedno"),
        },
      ],
    });
  };

  const deleteAndRefresh = (id) => {
    deleteStore(id);
    getAdminStores();
  };

  if (!authenticated) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div className="fluid-container p-4">
      <h1> Store Listing </h1>
      {stores && (
        <StoreList stores={stores} isAdmin={true} handleClick={disable} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stores: state.stores,
  authenticated: state.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  submitHandler: (filterParams) => {
    dispatch(fetchStores(filterParams));
  },
  getAdminStores: () => {
    dispatch(fetchAdminStores());
  },
  deleteStore: (id) => {
    dispatch(disableStore(id));
  },
});

const AdminStoresContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default AdminStoresContainer;
