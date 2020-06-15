import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, View, FlatList, Text } from "react-native";

import styles from "./style";
import commonStyles from "../../styles/commonStyles";
import DatePickerFilter from "../Filter/DatePickerFilter";
import TokenListItem from "./TokenListItem";

const TokenList = (props) => {
  const {
    listData,
    onListItemPress,
    isFilterCalendarVisible,
    onDatePickerFilterSubmit,
    setFilterCalendarVisiblity,
    showDatePicker,
    hideDatePicker,
    refreshValue,
    selectedDate,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <DatePickerFilter
        isDatePickerVisible={isFilterCalendarVisible}
        onDateSubmit={onDatePickerFilterSubmit}
        onDateCancel={hideDatePicker}
        onDatePickerPress={showDatePicker}
        selectedDate={selectedDate}
      />
      <View style={styles.flatList}>
        {listData.length === 0 && (
          <Text style={commonStyles.textAlignCenter}>No Tokens Available</Text>
        )}
        <FlatList
          data={listData}
          key={refreshValue}
          renderItem={({ item }) => (
            <TokenListItem
              key={item.tokenNumber}
              onListItemPress={onListItemPress}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

TokenList.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      tokenNumber: PropTypes.string,
      slotTime: PropTypes.string,
      mobileNumber: PropTypes.string,
      isHomeDelivered: PropTypes.bool,
    })
  ),
};

export { TokenList };
