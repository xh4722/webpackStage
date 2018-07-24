import React from 'react';
import { connect } from 'react-redux';

import { MemberAction } from 'actions';

class Member extends React.Component {
    componentWillMount() {
        this.props.dispatch(MemberAction.GET_MEMBER({
            mobile: '1234567890123'
        })).then((data) => {
            console.log(`会员查询成功：${data.mobile}`);
        }).catch(err => {
            console.log('会员查询失败');
        });
    }

    render() {
        let { member } = this.props;

        return (
            <div>memberInfo:{member ? member.name : ''}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    member: state.member
});

export default connect(mapStateToProps)(Member);
