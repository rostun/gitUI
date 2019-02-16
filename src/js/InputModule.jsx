import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/InputModule.scss";

class InputModule extends Component {
   constructor(props) {
      super(props);
   }

   _onChange(e) {
      let _input =
         this.props.inputType === "checkbox"
            ? e.target.checked
            : e.target.value;

      this.props.onChange(_input);
   }

   _processSelectContent() {
      const _content = this.props.inputContent;

      if (_content === undefined || _content.length === 0) {
         return null;
      }

      const _dropdownData = [];

      _content.forEach((val, idx) => {
         _dropdownData.push(
            <option key={`${this.props.idName}-${idx}`} value={val.value}>
               {val.label}
            </option>
         );
      });

      return _dropdownData;
   }

   _renderInput() {
      const CustomTag = this.props.inputType === "select" ? "select" : "input";

      let _inputProps = {};

      if (this.props.inputType !== "select") {
         _inputProps.type = this.props.inputType;
      }
      if (this.props.inputPlaceholder) {
         _inputProps.placeholder = this.props.inputPlaceholder;
      }

      const _content =
         this.props.inputType === "select"
            ? this._processSelectContent()
            : null;

      return (
         <CustomTag
            id={this.props.idName}
            key={`${this.props.idName}-${this.props.name}-input`}
            {..._inputProps}
            onChange={this._onChange.bind(this)}
         >
            {_content}
         </CustomTag>
      );
   }

   _renderLabel() {
      const _labelText = this.props.labelContent || null;
      return (
         <label
            className={this.props.labelPosition || "before"}
            key={`${this.props.idName}-${this.props.name}-label`}
            htmlFor={this.props.idName}
         >
            {_labelText}
         </label>
      );
   }

   render() {
      const _input = this._renderInput();
      const _renderLabel = this._renderLabel();

      const _searchModule = [_input];

      //top position is default
      this.props.labelPosition === "after"
         ? _searchModule.push(_renderLabel)
         : _searchModule.unshift(_renderLabel);

      return (
         <div className={`InputModule ${this.props.name}`}>
            {_searchModule}
         </div>
      );
   }
}

InputModule.propTypes = {
   name: PropTypes.string.isRequired,
   idName: PropTypes.string.isRequired,
   inputType: PropTypes.oneOf(["select", "text", "checkbox"]).isRequired,
   onChange: PropTypes.func.isRequired,

   labelContent: PropTypes.string,
   labelPosition: PropTypes.oneOf(["before", "after"]),
   inputContent: PropTypes.arrayOf(
      PropTypes.shape({
         value: PropTypes.string,
         label: PropTypes.string
      })
   ),
   inputPlaceholder: PropTypes.string
};

export default InputModule;
