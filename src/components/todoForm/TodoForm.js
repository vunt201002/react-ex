import React, { useCallback } from 'react';
import { TextField, Modal, FormLayout, Form } from '@shopify/polaris';

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
        <Modal
          instant
          open={isShowModal}
          onClose={handleClose}
          title="Create todo"
          primaryAction={{
            content: 'Add',
            onAction: handleSubmit,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleClose,
            },
          ]}
        >
          <Modal.Section>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={value}
                  onChange={handleChangeTextField}
                  label="Title"
                  type="text"
                  autoComplete="off"
                />
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
  );
};

export default TodoForm;