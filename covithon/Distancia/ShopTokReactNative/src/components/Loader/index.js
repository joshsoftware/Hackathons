import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';

const Loader = props => {
  const { isLoading } = props;
  return (
    <Spinner visible={isLoading}  color ="black"/>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: 'black'
  }
});

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;