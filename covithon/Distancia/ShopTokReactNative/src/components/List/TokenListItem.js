import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Row } from "react-native-flexbox-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./style";

const TokenListItem = (props) => {
  const { item, onListItemPress } = props;

  const {
    tokenNumber,
    slotTime,
    mobileNumber,
    isHomeDelivered,
    isCancelled,
  } = item;
  let displayMobileNumber = mobileNumber;
  if ( mobileNumber.indexOf(':') !== -1 ) {
    displayMobileNumber = displayMobileNumber.split(':')[1]
  } 
  return (
    <ListItem
      key={tokenNumber}
      disabled={isCancelled}
      disabledStyle={{
        opacity: 0.8,
      }}
      title={`Token No: ${tokenNumber}`}
      onPress={() => {
        onListItemPress(item);
      }}
      subtitle={
        <>
          {isCancelled && (
            <Text style={{ position: "absolute", right: 0, top: 0, color: 'red' }}>Token Cancelled</Text>
          )}
          <View style={styles.subtitleView}>
            <Icon style={{ color: "grey" }} name="clock-o" size={20} />
            <Text style={styles.ratingText}>{slotTime}</Text>
            <Icon style={styles.ratingIcon} name="mobile-phone" size={20} />
            <Text style={styles.ratingText}>{displayMobileNumber}</Text>
          </View>
          {isHomeDelivered && (
            <Row>
              <Icon style={styles.ratingIcon} name="home" size={20} />
              <Text style={{ ...styles.ratingText, ...styles.green }}>
                Home Delivery
              </Text>
            </Row>
          )}
        </>
      }
      bottomDivider
      chevron={{ size: 40 }}
    />
  );
};

TokenListItem.propTypes = {
  tokenNumber: PropTypes.string,
  slotTime: PropTypes.string,
  mobileNumber: PropTypes.string,
  isHomeDelivered: PropTypes.bool,
};

export default TokenListItem;
