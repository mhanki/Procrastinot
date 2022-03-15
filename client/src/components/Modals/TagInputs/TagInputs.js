import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import DropdownInput from './DropdownInput';

const TagInput = ({tag, values, selectedValue}) => {
  return(
    <FormGroup>
      <Label>{tag}</Label>
      <DropdownInput values={values.map(value => value.name)} selected={selectedValue} />
    </FormGroup>
  )
}

const TagInputs = ({tags, ticketInfo, size}) => {
  return (
    <div className={`tag-inputs ${size}`}>
      {tags.map((tag) => (
        <TagInput key={tag._id} tag={tag.name} values={tag.values} selectedValue={ticketInfo.tags[tag.name].value}/>
      ))}
    </div>
  )
}

export default TagInputs;