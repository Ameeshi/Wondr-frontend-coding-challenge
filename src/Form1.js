import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import Joi from "joi-browser";
import Input from "./input";

export default class Form1 extends Component {
  render() {
    return <Details />;
  }
}

class Details extends Component {
  state = {
    details: {
      firstName: "",
      lastName: "",
      country: "",
      phoneNumber: "",
      email: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      phoneNumber: "",
    },
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    country: Joi.string().required().valid("India", "US").label("Country"),
    email: Joi.string()
      .required()
      .label("Email")
      .email({ tlds: { allow: false } }),
    phoneNumber: Joi.string()
      .required()
      .label("Phone Number")
      .regex(/\d{10}/),
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
    setTimeout(function () {
      alert("Success");
    }, 5000);
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
        <div className="form-wrapper">
          <h2>Details</h2>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="firstName"
              value={details.firstName}
              label="First Name"
              onChange={this.handleChange}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              value={details.lastName}
              label="Last Name"
              onChange={this.handleChange}
              error={errors.lastName}
            />
            <Input
              name="country"
              value={details.country}
              label="Country"
              onChange={this.handleChange}
              error={errors.country}
            />
            <Input
              name="email"
              value={details.email}
              label="Email"
              onChange={this.handleChange}
              error={errors.email}
            />
            <Input
              name="phoneNumber"
              value={details.phoneNumber}
              label="Phone Number"
              onChange={this.handleChange}
              error={errors.phoneNumber}
            />
            <div className="submit">
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

render(<Form1 />, document.getElementById("root"));
