import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const TextInput = ({ label, value, handleChange, type = "text" }) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  </FormGroup>
)

export default TextInput;