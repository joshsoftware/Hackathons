import { StyleSheet } from 'react-native';
import config from '../../styles/config';

const styles = StyleSheet.create({
  calendar: {
    position: "absolute",
    top: 20,
    padding: 10,
    right: 0,
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 5,
    color: "grey",
  },
  ratingIcon: {
    paddingLeft: 10,
    color: "grey",
  },
  container: {
    flex: 1,
    // flex: 1,
    // justifyCont/ent: "center",
    // alignItems: "center",
    backgroundColor: config.backgroundColor,
  },
  flatList: {
    marginTop: 80,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  green: {
    color: "green",
  },
});

export default styles;