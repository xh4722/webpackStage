import Action from 'actions';

import { cloneObject } from 'utils/library';

let initialState = {
    list: [
        { id: 1, name: '条目1' },
        { id: 2, name: '条目2' },
        { id: 3, name: '条目3' },
        { id: 4, name: '条目4' },
        { id: 5, name: '条目5' }
    ]
};

export default (state = cloneObject(initialState), action) => {
    switch(action.type) {
        /* 添加条目 */
        case Action.items.ADD_ITEM: {
            let newState = cloneObject(state);
            newState.list.push({
                id: state.list.length + 1,
                name: `条目${state.list.length + 1}`
            });

            return newState;
        }

        default: {
            return state;
        }
    }
}
