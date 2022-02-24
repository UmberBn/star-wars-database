import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

// import { Container } from './styles';

function LinkButton({ icon, label, onClick, disabled }) {
  return (
    <Button type="link" icon={icon} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}

LinkButton.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default LinkButton;
