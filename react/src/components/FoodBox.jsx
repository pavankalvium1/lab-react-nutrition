import React, { Component } from "react";
import FoodData from "./resources/FoodData";
import Search from "./Search";
import "./FoodBox.css";

class FoodBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemValues: {},
      filteredData: FoodData,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  updateItemValue(itemId, newValue) {
    this.setState((prevState) => ({
      itemValues: {
        ...prevState.itemValues,
        [itemId]: newValue,
      },
    }));
    console.log(this.state.itemValues);
  }

  handleControl(itemId) {
    const input = document.getElementById(`input-${itemId}`);
    const newValue = parseInt(input.value);
    this.updateItemValue(itemId, newValue);
  }

  handleReset(itemId) {
    this.updateItemValue(itemId, 0);
  }

  handleSearch(e) {
    const keyword = e.target.value.toLowerCase();
    const filteredData = FoodData.filter((data) =>
      data.name.toLowerCase().includes(keyword)
    );
    this.setState({ filteredData });
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        {this.state.filteredData.map((data) => (
          <div className="food-box" key={data.id}>
            <div className="media-container">
              <img src={data.img} alt="" width="60px" />
              <div>
                <h3>{data.name}</h3>
                <h6>{data.cal}</h6>
              </div>
              <div>
                <input type="number" min="0" id={`input-${data.id}`} />
                <button
                  className="control-button"
                  onClick={() => this.handleControl(data.id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="content-container">
              <h5>
                {this.state.itemValues[data.id] || 0} {data.name}=
                {this.state.itemValues[data.id] * data.cal || 0} Cal
              </h5>
              <button
                className="reset-button"
                onClick={() => this.handleReset(data.id)}
              >
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FoodBox;