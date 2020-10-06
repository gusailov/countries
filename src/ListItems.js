import React, { Component } from "react";
import Filter from "./Filter";

class ListItems extends Component {
  state = {
    searchTerm: ""
  };

  updateFilter = ({ target }) => {
    this.setState({ searchTerm: target.value });
  };

  get getBody() {
    const { searchTerm } = this.state;
    const { title, items } = this.props;
    let out = [...items];
    if (searchTerm) {
      out = out.filter(item =>
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return (
      <div>
          {out.map(item => (
            <p key={item.name}>
              {item.name}
            </p>
          ))}
       
              </div>
    );
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <section>
        <h3 className="mb-3">Title</h3>
        <Filter filter={searchTerm} onChange={this.updateFilter} />
        <ul className="mb-3 p-0">{this.getBody}</ul>
      </section>
    );
  }
}

export default ListItems;
