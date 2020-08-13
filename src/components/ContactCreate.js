import React from 'react';
import PropTypes from 'prop-types';
// -----------------------------------------
export default class ContactCreate extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }

    handleChange(e) { 
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        // 여러개의 정보 입력 받을 수 있음
        this.setState(nextState)
    }

    handleClick() { 
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };
        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus(); // 포커스 주기
    }
    handleKeyPress(e) { 
        if (e.charCode === 13) { // 엔터키를 클릭한다면
            this.handleClick();
        }
    }
    // ------------------------------------------------------------------------
    render() { 
        return (
            <div>
                <h2>전화번호부 새로 만들기</h2>
                <p>
                    <input
                        type="text"
                        name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        ref={(ref) => { this.nameInput = ref }}
                    />
                    <input
                        type="text"
                        name='phone'
                        placeholder='phone'
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <button onClick={this.handleClick}>입력</button>
            </div>
        )
    }
}
ContactCreate.propTypes = {
    onCreate: PropTypes.func
};
ContactCreate.defaultProps = {
    onCreate: () => {
        console.log(console.error('onCreate는 정의되지 않았습니다.'));
    }
};