const prefix = 'MEMBER.';

export const GET_MEMBER_SUCCEEDED = prefix + 'GET_MEMBER_SUCCEEDED';

/* 查询会员数据 */
export const GET_MEMBER = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if(params.mobile) {
                setTimeout(() => {
                    let data = {
                        name: '李雷',
                        mobile: params.mobile
                    };

                    dispatch({
                        type: GET_MEMBER_SUCCEEDED,
                        payload: data
                    });

                    resolve(data);
                }, 2000);
            } else {
                reject();
            }
        });
    }
}
