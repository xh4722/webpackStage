import Action from 'actions';

import { cloneObject } from 'utils/library';

let initialState = {
    count: 0
};

export default (state = cloneObject(initialState), action) => {
    switch(action.type) {
        // 累加计数器
        case Action.times.ADD_TIME: {
            let newState = cloneObject(state);
            newState.count = newState.count + 1;

            return newState;
        }

        default: {
            return state;
        }
    }
}
