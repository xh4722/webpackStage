import { MemberAction } from 'actions';

const initialState = null;

export default (state = initialState, action) => {
    switch(action.type) {
        case MemberAction.GET_MEMBER_SUCCEEDED: {
            let newState = Object.assign({}, action.payload);
            return newState;
        }

        default: {
            return state;
        }
    }
}
