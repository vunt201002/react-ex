import React, { useCallback } from 'react';
import "./todoForm.css";
import { TextField, Modal } from '@shopify/polaris';

const TodoForm = ({ addTodo, isShowModal = false, setIsShowModal, refButton }) => {
  const [value, setValue] = React.useState("");

  const handleChangeTextField = newValue => {
    setValue(newValue);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
    setIsShowModal(false);
  };

  const handleOpen = useCallback(() => setIsShowModal(true), []);

  const handleClose = useCallback(() => {
    setIsShowModal(false);
    requestAnimationFrame(() =>
      refButton.current?.querySelector('button')?.focus(),
    );
  }, []);

  

  return (
    <div>
      <Modal
        instant
        open={isShowModal}
        onClose={handleClose}
        title="Create todo"
        primaryAction={{
          content: 'Add',
          onAction: () => {
            addTodo(value);
            handleClose();
          },
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <TextField
            value={value}
            onChange={handleChangeTextField}
            label="Title"
            type="text"
            autoComplete="off"
          />
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default TodoForm;