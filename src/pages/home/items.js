import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import Action from 'actions';

const itemsSelector = createSelector(
    (state) => state.items,
    (items) => {
        console.log('itemList change');
        return items.list;
    }
);

class Items extends Component {
    componentWillMount() {
        setInterval(() => {
            this.props.dispatch({
                type: Action.times.ADD_TIME
            });
        }, 500);
    }

    /**
    * 添加条目函数
    * @method addItem
    **/
    addItem() {
        this.props.dispatch({
            type: Action.items.ADD_ITEM
        });
    }

    render() {
        let { itemList, times } = this.props;

        console.log(`change times: ${times.count}`);

        return (
            <div>
                <button onClick={
                    () => this.addItem()
                }>新增条目</button>

                <div>条目列表</div>
                <ul>
                    {
                        itemList.map((item, index) => {
                            return (
                                <li key={index}>{ item.name }</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    times: state.times,
    itemList: itemsSelector(state)
});

export default connect(mapStateToProps)(Items);
