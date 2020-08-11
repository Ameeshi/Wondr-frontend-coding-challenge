import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import Joi from "joi-browser";
import Input from "./input";

export default class Form2 extends Component {
  render() {
    return <Contacts />;
  }
}

class Contacts extends Component {
  state = {
    details: {
      name2: "",
      country2: "",
      name3: "",
      country3: "",
    },
    errors: {
      name2: "",
      country2: "",
      name3: "",
      country3: "",
    },
  };

  schema = {
    name2: Joi.string().required().label("Name"),
    country2: Joi.string().required().valid("India", "US").label("Country"),
    name3: Joi.string().required().label("Name"),
    country3: Joi.string().required().valid("India", "US").label("Country"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.details, this.schema, options);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    alert("Success");
  };

  validatePropery = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validatePropery(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const details = { ...this.state.details };
    details[input.name] = input.value;

    this.setState({ details, errors });
  };

  render() {
    const { details, errors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper2">
          <h2>Contacts</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <Input
                name="name2"
                value={details.name2}
                label="Name"
                onChange={this.handleChange}
                error={errors.name2}
              />
              <Input
                name="country2"
                value={details.country2}
                label="Country"
                onChange={this.handleChange}
                error={errors.country2}
              />
            </div>
            <div className="row">
              <Input
                name="name3"
                value={details.name3}
                label="Name"
                onChange={this.handleChange}
                error={errors.name3}
              />
              <Input
                name="country3"
                value={details.country3}
                label="Country"
                onChange={this.handleChange}
                error={errors.country3}
              />
            </div>
            <div className="submit2">
              <button disabled={this.validate()} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<Form2 />, document.getElementById("root"));
