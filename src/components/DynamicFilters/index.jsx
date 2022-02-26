import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Input, Select, Form } from "antd";

import { Container, RemoveFieldButton } from "./styles";
import PlanetsContext from "../../context/PlanetsContext";

function DynamicFilters({ value, index, column, comparison }) {
  const COMPARATOR_OPTIONS = ["maior que", "menor que", "igual a"];
  const { avaiableFilterOptions, filters, setFilters } =
    useContext(PlanetsContext);

  const handleAttributeOptions = (selectedValue) => {
    let stateFilterCopy = filters;
    const value = {
      ...stateFilterCopy.filterByNumericValues[index],
      column: selectedValue,
    };
    stateFilterCopy.filterByNumericValues[index] = {
      ...value,
    };
    setFilters({ ...stateFilterCopy });
  };

  const handleComparator = (selectedValue) => {
    let stateFilterCopy = filters;
    const value = {
      ...stateFilterCopy.filterByNumericValues[index],
      comparison: selectedValue,
    };

    stateFilterCopy.filterByNumericValues[index] = {
      ...value,
    };
    setFilters({ ...stateFilterCopy });
  };

  const handleValue = (selectedValue) => {
    let stateFilterCopy = filters;
    const value = {
      ...stateFilterCopy.filterByNumericValues[index],
      value: selectedValue,
    };
    stateFilterCopy.filterByNumericValues[index] = {
      ...value,
    };
    setFilters({ ...stateFilterCopy });
  };

  const handleRemove = () => {
    let stateFilterCopy = filters;
    const stateWithRemovedFilter = stateFilterCopy.filterByNumericValues.filter(
      (_filter, indexFilter) => indexFilter !== index
    );
    setFilters({
      ...stateFilterCopy,
      filterByNumericValues: [...stateWithRemovedFilter],
    });
  };

  const currenOptions = () => {
    const selectedOptions = filters.filterByNumericValues.map(
      (filter) => filter.column
    );
    const removedSelectedOptions = avaiableFilterOptions.filter(
      (x) => !selectedOptions.includes(x)
    );

    return removedSelectedOptions;
  };

  return (
    <Container>
      <Input.Group compact>
        <Form.Item noStyle>
          <Select
            placeholder="Atributo"
            onChange={(value) => {
              handleAttributeOptions(value);
            }}
            style={{ width: "30%" }}
            value={column}
          >
            {currenOptions().map((option) => (
              <Select.Option value={option} key={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Select
            placeholder="Operação"
            onChange={(value) => {
              handleComparator(value);
            }}
            style={{ width: "30%" }}
            value={comparison}
          >
            {COMPARATOR_OPTIONS.map((option) => (
              <Select.Option value={option} key={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: "30%" }}>
          <Input
            type="number"
            min={0}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        </Form.Item>
        {index < filters.filterByNumericValues.length - 1 && (
          <Form.Item>
            <RemoveFieldButton onClick={handleRemove} />
          </Form.Item>
        )}
      </Input.Group>
    </Container>
  );
}

DynamicFilters.propTypes = {
  comparison: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
  column: PropTypes.string.isRequired,
};

export default DynamicFilters;
