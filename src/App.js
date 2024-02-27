import React, { useRef, useState } from "react";
import { AppProvider, Page } from "@shopify/polaris"

import TodoList from "./components/todoList/TodoList.js";
import "./index.css";
import Header from "./components/header/Header.jsx";
import CreateButton from "./components/createButton/CreateButton.js";

function App() {
  const button = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <AppProvider>
      <div className="app">
        <Header />
        <Page
          narrowWidth
          title="Todoes"
          secondaryActions={
            <CreateButton setIsShowModal={setIsShowModal} refs={button}/>
          }
        >
          <TodoList refButton={button} isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
        </Page>
      </div>
    </AppProvider>
  );
}

export default App;