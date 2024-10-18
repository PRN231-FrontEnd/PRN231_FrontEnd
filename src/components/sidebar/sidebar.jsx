import React from "react";
import "./sidebar.css";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import {FilterAlt} from '@mui/icons-material';

function valuetext(value) {
  return `${value}°C`;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Sidebar() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="sidebar">
        <div className="card border-0 shadow">
          <h3>Category</h3>
          <div className="cateList">
            <div className="cateItem d-flex align-items-center">
              <span className="img">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  width={30}
                ></img>
              </span>
              <h4 className="mb-0 ml-3 mr-3">Milks & Dairies</h4>
              <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                30
              </span>
            </div>
            <div className="cateItem d-flex align-items-center">
              <span className="img">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  width={30}
                ></img>
              </span>
              <h4 className="mb-0 ml-3 mr-3">Milks & Dairies</h4>
              <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                30
              </span>
            </div>
            <div className="cateItem d-flex align-items-center">
              <span className="img">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  width={30}
                ></img>
              </span>
              <h4 className="mb-0 ml-3 mr-3">Milks & Dairies</h4>
              <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                30
              </span>
            </div>
            <div className="cateItem d-flex align-items-center">
              <span className="img">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  width={30}
                ></img>
              </span>
              <h4 className="mb-0 ml-3 mr-3">Milks & Dairies</h4>
              <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                30
              </span>
            </div>
            <div className="cateItem d-flex align-items-center">
              <span className="img">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg"
                  width={30}
                ></img>
              </span>
              <h4 className="mb-0 ml-3 mr-3">Milks & Dairies</h4>
              <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                30
              </span>
            </div>
          </div>
        </div>
        <div className="card border-0 shadow">
          <h3>Filter by price</h3>
          <Slider
            min={0}
            step={1}
            max={1000}
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
           style={{color: "#279a65"}}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-success">${value[0]} </strong>
            </span>

            <span className="ml-auto" style={{ marginLeft: 100 }}>
              From: <strong className="text-success">${value[1]}</strong>
            </span>
          </div>
          <div className="filters">
            <h5>Color</h5>
            <ul className="mb-0">
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
              <li>
                <Checkbox {...label} />
                Red (56)
              </li>
            </ul>
          </div>
          <div className="filters">
            <h5>Item Condition</h5>
            <ul className="mb-0">
              <li>
                <Checkbox {...label} />
                New (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Refurbished (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Used (1505)
              </li>
              <li>
                <Checkbox {...label} />
                New (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Refurbished (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Used (1505)
              </li>
              <li>
                <Checkbox {...label} />
                New (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Refurbished (1505)
              </li>
              <li>
                <Checkbox {...label} />
                Used (1505)
              </li>

            </ul>
          </div>
          <Button startIcon={<FilterAlt/>} className="btn-g text-white" >Filter</Button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
