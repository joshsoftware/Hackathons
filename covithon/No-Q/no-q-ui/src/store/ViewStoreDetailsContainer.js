import React, { useEffect } from "react";
import { ViewStoreDetails } from "./ViewStoreDetails";
import { getStoreDetails } from "actions";
import { connect } from "react-redux";
import HomePage from "./HomePage";

const ViewStore = ({ getMyStoreDetails, store }) => {
  useEffect(() => {
    getMyStoreDetails();
  }, []);

  if (store) {
    return <ViewStoreDetails store={store} />;
  } else {
    return <div>Loading...</div>;
  }
};

const mapStateToProps = (state) => ({
  error: state.error && state.error.StoreError,
  store: state.store,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMyStoreDetails: () => {
      dispatch(getStoreDetails());
    },
  };
};

const ViewStoreDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStore);

export default ViewStoreDetailsContainer;
