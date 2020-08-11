import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./App.css";
import Form1 from "./Form1";
import Form2 from "./Form2";
import "react-tabs/style/react-tabs.css";

export default class App extends Component {
  validateTab = () => {
    return false;
  };

  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab> Details </Tab>
            <Tab disabled={this.validateTab()}> Contacts </Tab>
          </TabList>

          <TabPanel>
            <Form1 />
          </TabPanel>
          <TabPanel>
            <Form2 />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
