import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modal/modalActions";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px",
    maxHeight: "90vh",
    border: "none",
    borderRadius: "10px",
  },
}));

const GenericModal = () => {
  const classes = useStyles();
  const { modal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);

  const closeModalFunc = () => {
    dispatch(closeModal());
  };

  // To use this component you need to call a function that dipatches the openModal redux action
  // ex. <div onClick={() => dispatch(openModal(<h1>Test</h1>))}>open modal</div>
  // openModal takes one parameter which is the content of the modal (your HTML that will be displayed inside the modal)
  // it's better to define the modal's content in a const and then pass it to the function just to make the code cleaner
  // it would be even better to have a modal templates folder for reusable modals

  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={closeModalFunc}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {modal.content}
        </div>
      </Modal>
    </div>
  );
};

export default GenericModal;
