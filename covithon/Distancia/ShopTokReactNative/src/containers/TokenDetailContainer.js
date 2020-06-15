import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import styles from "../styles/commonStyles";
import SideMenuContainer from "./SideMenuContainer";
import TokenDetailsComponent from "../components/TokenDetails";

const TokenDetailContainer = (props) => {
  const { route: { params }} = props;
  const { selectedTokenId  } = params;

  return (
    <SideMenuContainer {...props}>
      <SafeAreaView style={styles.bgContainer}>
        <TokenDetailsComponent navigate={props.navigation.navigate} selectedTokenId={selectedTokenId} />
      </SafeAreaView>
    </SideMenuContainer>
  );
};

TokenDetailContainer.propTypes = {};

export default TokenDetailContainer;
