import { AsyncStorage } from 'react-native';
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    AsyncStorage.removeItem()
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving data async storage ');
    return null;
  }
};

export const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log('Error removeItemValue data async storage ');
    return null;
  }
};
