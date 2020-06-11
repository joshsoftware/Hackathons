import { store } from "react-notifications-component";

export const NqSuccessNotification = (message) => {
  store.addNotification({
    title: "Yipee",
    message: message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 1000,
      onScreen: true,
    },
  });
};

export const NqErrorNotification = (message) => {
  store.addNotification({
    title: "Error",
    message: message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 1000,
      onScreen: true,
    },
  });
};
