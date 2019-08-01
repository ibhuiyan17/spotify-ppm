import React, { Component } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, FilledInput,
} from '@material-ui/core';

class TimeRangeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRange: 'short_term',
    };

    this.setTimeRange = this.setTimeRange.bind(this);
  }

  // Update component and app state.
  setTimeRange(e) {
    e.preventDefault();

    this.setState({ timeRange: e.target.value });
    this.props.selectionHandler(e.target.value);
  }

  render() {
    return (
      <FormControl variant="filled" style={{ minWidth: 120 }}>
        <InputLabel>Time Range</InputLabel>
        <Select
          value={this.state.timeRange}
          onChange={this.setTimeRange}
          input={<FilledInput />}
        >
          <MenuItem value={'short_term'}>Short Term</MenuItem>
          <MenuItem value={'medium_term'}>Medium Term</MenuItem>
          <MenuItem value={'long_term'}>Long Term</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default TimeRangeSelector;