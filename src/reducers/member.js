import { handleActions, combineActions } from 'redux-actions';
import { MemberAction } from 'actions';

let { getMember, getMemberFail, getMemberSuccess } = MemberAction;

export default handleActions({
    [getMember]: (state, action) => {
        console.log('查询会员...');
        return Object.assign({
            isFetching: true
        }, {
            data: action.payload
        });
    },
    [combineActions(getMemberFail, getMemberSuccess)]: (state, action) => {
        console.log('会员查询完成...');
        return Object.assign({
            isFetching: false
        }, {
            data: action.payload
        });
    }
}, {
    isFetching: false,
    data: null
});
