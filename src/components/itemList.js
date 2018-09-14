import { connect } from 'react-redux';
// We only need to import this one action creator, as it handles dispatching the other actions.
import { itemsFetchData, itemsRemoveItem } from '../actions/items';
import React, { Component } from 'react';
import 'whatwg-fetch';

class ItemList extends Component {

    componentDidMount() {
        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (!this.props.items.length) {
            return <p>No items to display</p>;
        }

        return (
            <ul>
                {this.props.items.map((item, index) => (
                    <li key={item.id}>
                        {item.label}
                        <button onClick={() => this.props.removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        );
    }
}

// map Redux's state and the dispatching of our action creator to props.
const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

// A  function to be able to dispatch our itemsFetchData() action creator with a prop.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        removeItem: (index) => dispatch(itemsRemoveItem(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);