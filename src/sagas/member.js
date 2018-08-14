import { takeEvery, put, call, select } from 'redux-saga/effects';

import { MemberAction } from 'actions';

/**
 * 查询会员信息
 * @method getMember
 * @param { Object } action
 */
function* getMember(action) {
    let data = yield call(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = {
                    name: '李雷',
                    mobile: action.payload.mobile
                };

                resolve(data);
            }, 2000);
        });
    });

    yield put(MemberAction.getMemberSuccess(data));
}

export default [
    takeEvery(MemberAction.getMember, getMember),
];
