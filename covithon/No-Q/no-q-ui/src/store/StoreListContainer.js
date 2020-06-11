import React, { useEffect } from "react";
import { connect } from "react-redux";

import StoreListFilter from "./StoreListFilter";
import StoreList from "./StoreList";
import { fetchStores, fetchCategories } from "actions";

const List = ({ stores, submitHandler, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="fluid-container">
      <StoreListFilter submitHandler={submitHandler} categories={categories} />
      {stores && <StoreList stores={stores} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stores: state.stores,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  submitHandler: (filterParams) => {
    dispatch(fetchStores(filterParams));
  },
  getCategories: () => {
    dispatch(fetchCategories());
  },
});

const StoreListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default StoreListContainer;
