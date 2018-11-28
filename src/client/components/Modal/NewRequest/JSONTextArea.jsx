import React, { Component } from 'react';
import PropTypes from "prop-types";
const classNames = require('classnames');

class JSONTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastParseWasSuccess : true,
    }
  }

  componentDidMount () {
    if (this.props.bodyContent === "") {
      this.props.updateBodyContent({});
    }
  }

  render() {
    let NoneStyleClasses = classNames({
      'modal_protocol_button' : true,
    });

    return(
      <div>
        <div>{this.props.JSONFormatted ? 'JSON correctly formatted.' : 'JSON incorrectly formatted (double quotes only).'}</div>
        <textarea 
          style={{'resize' : 'none'}} 
          type='text' 
          rows={8} 
          value={this.state.lastParseWasSuccess ? JSON.stringify(this.props.bodyContent,undefined,4) : this.props.bodyContent} 
          placeholder='Body' 
          onChange={(e) => {
            let parsedValue;
            try {
              parsedValue = JSON.parse(e.target.value);
              this.setState({
                lastParseWasSuccess : true,
              })
              this.props.updateJSONFormatted(true)
            }
            catch (error) {
              parsedValue = e.target.value;
              this.setState({
                lastParseWasSuccess : false,
              });
              this.props.updateJSONFormatted(false)
            }
            this.props.updateBodyContent(parsedValue);
          }}></textarea>
      </div>
    )
  }
}

JSONTextArea.propTypes = {
  JSONFormatted : PropTypes.bool.isRequired,
  updateJSONFormatted : PropTypes.func.isRequired,
  bodyContent : PropTypes.string.isRequired,
  updateBodyContent : PropTypes.func.isRequired,
};

export default (JSONTextArea);