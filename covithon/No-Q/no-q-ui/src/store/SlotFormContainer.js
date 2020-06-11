import React, { useState } from "react";
import { connect } from "react-redux";

import SlotForm from "store/SlotForm";
import { setInactiveSlots } from "actions";

const Form = ({ slots, confirmHandler, code }) => {
  let [inActiveSlots, setInactiveState] = useState([]);

  const handleSubmit = (body) => {
    confirmHandler({ ids: inActiveSlots, active: false });
  };

  const handleChange = (event) => {
    let id = event.target.name.split("-")[1];
    slots = [...inActiveSlots];

    if (event.target.checked) {
      slots.splice(slots.indexOf(id), 1);
    } else {
      slots = [...slots, id];
    }
    setInactiveState(slots);
  };

  return (
    <SlotForm
      slots={slots}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      code={code}
    />
  );
};

const mapStateToProps = (state) => ({
  slots: state.store.slots,
  code: state.store.code,
});

const mapDispatchToProps = (dispatch) => ({
  confirmHandler: (slots) => {
    dispatch(setInactiveSlots(slots));
  },
});
const SlotFormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);

export default SlotFormContainer;
