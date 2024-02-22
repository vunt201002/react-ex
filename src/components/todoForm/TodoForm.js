import React, { useContext } from 'react';

import "./todoForm.css";
import { Button, Card, FormLayout, Page, TextField, Badge, Divider, PageActions } from '@shopify/polaris';

const TodoForm = ({ addTodo, isShowModal = false, setIsShowModal }) => {
    const [value, setValue] = React.useState("");

    const handleChange = newValue => {
        setValue(newValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form className={isShowModal ? "show modal" : "hide"}>

        <div style={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            backgroundColor: "#e3e3e3",
            padding: '12px 24px',
            paddingTop: '12px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px'
        }}>
            <p style={{
                fontSize: '20px',
                fontWeight: 'bold'
            }}>Create todo</p>
            <Button onClick={() => setIsShowModal(false)} variant='tertiary'>X</Button>
        </div>
        <Divider />
        <div
            style={{
                padding: '16px 24px',
                paddingTop: '12px'
            }}
        >
            <TextField
                value={value}
                onChange={handleChange}
                label="Title"
                type="text"
                autoComplete="off"
            />
        </div>
        <Divider borderColor="border" />
        <div style={{
            padding: '0 24px'
        }}>
            <PageActions
                primaryAction={{
                    content: 'Add',
                    onAction: handleSubmit
                }}
                secondaryActions={<Button onClick={() => setIsShowModal(false)}>Cancel</Button>}
            />
        </div>
        </form>
    );
};

export default TodoForm;