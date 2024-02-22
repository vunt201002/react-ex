import React, { useState } from "react";
import { AppProvider, Badge, Button, Card, Page, BlockStack, InlineGrid, Text, Box, Checkbox } from "@shopify/polaris"

import TodoList from "./components/todoList/TodoList.js";
import "./index.css";
import Header from "./components/header/Header.jsx";
import TodoForm from "./components/todoForm/TodoForm.js";


function App() {
    const [isShowModal, setIsShowModal] = useState(false);

    return (
        <AppProvider>
            <div className="app">
                <Header />
                <Page
                    narrowWidth
                    title="Todoes"
                    secondaryActions={
                        <Button
                        variant="primary"
                            onClick={() => setIsShowModal(true)}
                            >
                            Create
                        </Button>
                    }
                    >
                    <TodoList isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
                </Page>
            </div>
            <div className={isShowModal ? "overlay show" : 'hide'}>
            </div>
        </AppProvider>
    );
}

export default App;