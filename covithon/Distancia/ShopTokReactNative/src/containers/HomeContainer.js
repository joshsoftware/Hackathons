import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BackHandler } from "react-native";
import { TokenList } from "../components/List/TokenList";
import SideMenuContainer from "./SideMenuContainer";
import DatePickerFilter from "../components/Filter/DatePickerFilter";
import { retrieveData } from "../services/storageService";
import { fetchTokens } from "../actions/tokenActions";

const HomeContainer = (props) => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.tokenReducer);
  const [isFilterCalendarVisible, setFilterCalendarVisiblity] = useState(false);
  const [value, setValue] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date());


  const hardwareBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", hardwareBackPress);
    const intervalId = setInterval(() => {
      if(selectedDate !== null) {
        const dateObj = new Date(selectedDate),
        day = dateObj.getDate(),
        month = dateObj.getMonth() + 1,
        year = dateObj.getFullYear(),
        dateParams = `${day}-${month}-${year}`;
        setValue(value => value + 1);
        dispatch(fetchTokens(dateParams));
      }
    }, 5000)
  
    return () => {
      clearInterval(intervalId);
      BackHandler.removeEventListener("hardwareBackPress", hardwareBackPress);
    };
  }, [selectedDate]);

  useEffect(() => {
    dispatch(fetchTokens());
  }, []);

  const tokenLists = () => {
    const { data } = reducer;
    if (!data) {
      return [];
    }
    return data.map((token) => ({
      tokenNumber: token["attributes"]["token_number"],
      mobileNumber: token["attributes"]["customer_mobile"],
      slotTime: token["attributes"]["slot_time"],
      isHomeDelivered: token["attributes"]["home_delivery"],
      id: token["id"],
      isCancelled: token["attributes"]["is_cancelled"]
    }));
  };

  const onListItemPress = (item) => {
    props.navigation.navigate("TokenDetailScreen", { selectedTokenId: item.id });
  };

  const onDatePickerFilterSubmit = (selectedDate) => {
    hideDatePicker();
    setSelectedDate(selectedDate);
    const dateObj = new Date(selectedDate),
      day = dateObj.getDate(),
      month = dateObj.getMonth() + 1,
      year = dateObj.getFullYear(),
      dateParams = `${day}-${month}-${year}`;
    dispatch(fetchTokens(dateParams));
  };

  const showDatePicker = () => {
    setFilterCalendarVisiblity(true);
  }

  const hideDatePicker = () => {
    setFilterCalendarVisiblity(false);
  }

  return (
    <>
      <SideMenuContainer {...props}>
        <TokenList
          key={value}
          refreshValue={value}
          listData={tokenLists()}
          onListItemPress={onListItemPress}
          isFilterCalendarVisible={isFilterCalendarVisible}
          onDatePickerFilterSubmit={onDatePickerFilterSubmit}
          setFilterCalendarVisiblity={setFilterCalendarVisiblity}
          showDatePicker={showDatePicker}
          hideDatePicker={hideDatePicker}
          selectedDate={selectedDate}
        />
      </SideMenuContainer>
    </>
  );
};

export default HomeContainer;
