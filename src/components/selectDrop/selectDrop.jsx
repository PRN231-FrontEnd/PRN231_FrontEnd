import React, { useEffect, useState } from "react";
import { Select, ConfigProvider } from "antd";
import { Margin } from "@mui/icons-material";
const handleOnChange = (value) => {
  console.log(`SELECTED ${value}`);
};

function SelectOption(props) {
  const { data } = props;

  // Initialize state for items and default value
  const [items, setItems] = useState([]);
  const [defaultValue, setDefaultValue] = useState("0"); // Default to index 0

  // Update items state when 'data' changes
  useEffect(() => {
    if (data && data.length > 0) {
      const options = data.map((item, index) => ({
        value: index.toString(), // Use index as a string for the value
        label: item, // Use the item from data as the label
      }));
      setItems(options);
      setDefaultValue("0"); // Ensure default value is index 0
    }
  }, [data]); // Run when 'data' changes

  return (
    <div className="selectDropWrapper cursor position-relative">
    <div className="selectDrop">
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
           
          },
          components: {
            Select: {
              optionSelectedBg: "#bce3c9",
              optionHeight: 40,
              optionFontSize: 16,
              
               
            },
          },
        }}
      >
        <Select
          className="selectField"
          showSearch
          style={{ width: 200, fontWeight: "bold", fontSize: 16}}
          variant="borderless"
          defaultValue={defaultValue} // Set default value to index 0
          optionLabelProp="label"
          filterOption={(input, option) => {
            return option.label.toLowerCase().includes(input.toLowerCase());
          }}
          size="large"
          filterSort={(optionA, optionB) => {
            return (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase());
          }}
          onChange={handleOnChange}
          options={items} // Set options to dynamically generated items
        
        />
      </ConfigProvider>
    </div>
    </div>
  );
}

export default SelectOption;
