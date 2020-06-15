import config from "./config";

const styles = {
  bg_transparent: {
    backgroundColor: "transparent",
  },

  container: {
    flex: 1,
  },

  bgContainer: {
    flex: 1,
    backgroundColor: config.backgroundColor
  },
  
  top: {
    marginTop: 80,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },

  textAlignCenter: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }
};

export const scrollViewStyle = {
  flexGrow: 1,
}

export const marginBotton = (percentage) => ({
  marginBottom: `$(percentage)%`
})

export const marginTop = (percentage) => ({
  marginTop: `$(percentage)%`
})

export const marginLeftRight = (marginLeft, marginRight) => {
  return {
    marginLeft: `${marginLeft}%`,
    marginRight: `${marginRight}%`,
  };
};

export const margin = (value) => {
  return {
    marginLeft: `${value}%`,
    marginRight: `${value}%`,
    marginTop: `${value}%`,
    marginBottom: `${value}%`,

  };
};


export default styles;