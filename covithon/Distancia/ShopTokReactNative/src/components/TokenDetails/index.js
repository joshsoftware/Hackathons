import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { fetchDetails, createComment, rejectTokenAction } from "../../actions/tokenDetails";

import commonStyles from "../../styles/commonStyles";
import styles from "./style";
import Button from "../shared/Button";
import { fetchTokens } from "../../actions/tokenActions";

const TokenDetailsComponent = (props) => {
  const { selectedTokenId, navigate } = props;
  const [messages, setMessages] = useState([]);

  const reducer = useSelector((state) => state.tokenDetailsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessages(reducer["included"] || []);
  }, [JSON.stringify(reducer["included"])]);

  useEffect(() => {
      dispatch(fetchDetails(selectedTokenId));
  }, [selectedTokenId, reducer.addedComment]);

  const makeCall = (customer_mobile) => {
    const phoneNumber = `tel:${customer_mobile}`;
    Linking.openURL(phoneNumber);
  };

  if (!reducer.data) {
    return null;
  }

  if(reducer.tokenRejected === true) {
    // dispatch(fetchDetails(selectedTokenId))
    // dispatch(fetchTokens());
    navigate('HomeScreen');
  }

  const {
    data: {
      attributes: { customer_mobile, slot_time, token_number },
    },
  } = reducer;

  const renderMessages = () => {
    return messages.map((message) => ({
      _id: message.id,
      text: message["attributes"]["body"],
      createdAt: new Date(message["attributes"]["created_at"]),
      user: {
        _id: message.id,
        name: message["attributes"]["sender"],
      },
    }));
  };

  const onSend = (message) => {
    dispatch(createComment(selectedTokenId, message[0].text));
  };

  const rejectToken = () => {
    dispatch(
      rejectTokenAction(selectedTokenId)
    )
  };

  return (
    <View style={{ ...commonStyles.top, alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          makeCall(customer_mobile);
        }}
        activeOpacity={0.7}
        style={phonePad.touchableButton}
      >
        <Text style={phonePad.TextStyle}>{`Mob : ${customer_mobile}`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled
        activeOpacity={0.7}
        style={phonePad.touchableButton}
      >
        <Text
          style={phonePad.TextStyle}
        >{`Token Number : ${token_number}`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled
        activeOpacity={0.7}
        style={phonePad.touchableButton}
      >
        <Text style={phonePad.TextStyle}>{slot_time}</Text>
      </TouchableOpacity>

      <View style={styles.TokenBox}>
        <GiftedChat
          onSend={(message) => onSend(message)}
          messages={renderMessages()}
          inverted={false}
        />
      </View>
      <Button
          label="Reject Token"
          onPressHandler={rejectToken}
          touchableOpacityStyle={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 0,
            backgroundColor: "#bb0a21",
          }}
          textStyle={{
            color: "white",
            fontSize: 16,
          }}
        />
    </View>
  );
};

const phonePad = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  touchableButton: {
    width: "85%",
    padding: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    marginBottom: 10,
  },
  TextStyle: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});

TokenDetailsComponent.propTypes = {};

export default TokenDetailsComponent;
