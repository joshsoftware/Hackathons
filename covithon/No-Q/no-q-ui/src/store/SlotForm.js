import React from "react";
import NqCheckbox from "core-components/NqCheckbox";
import NqButton from "core-components/NqButton";

const slotList = (slots, handleChange) => {
  return slots.map((slot, index) => (
    <div className="p-2" key={index}>
      <NqCheckbox
        id={slot.name}
        key={index}
        text={slot.from_time + "-" + slot.to_time}
        sequence={slot.sequence}
        name={"slot-" + slot.id}
        handleChange={handleChange}
        checked={slot.is_active}
      />
    </div>
  ));
};

const SlotForm = (props) => {
  return (
    <div className="container-fluid">
      <h1>
        Your store Code is <b>{props.code}</b>
      </h1>
      <p>
        Select your store's slots and click confirm:-
        <NqButton
          className="float-right"
          label="Confirm"
          color="primary"
          handleClick={props.handleSubmit}
        />
      </p>
      <div className="d-flex flex-row flex-wrap">
        {slotList(props.slots, props.handleChange)}
      </div>
    </div>
  );
};

export default SlotForm;
