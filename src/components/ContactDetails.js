import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // true면 false로 false면 true로 바꿔주는 함수
    handleToggle() {
        if (!this.state.isEdit) {
            // 현재 false일때(해당 내용이 입력되어 있는 상태라면)
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else { 
            this.handleEdit();
        }

        this.setState({ 
            isEdit:!this.state.isEdit
        })
        console.log(this.state.isEdit); // 비동기이기 때문에 바뀌기 전의 값을 보여줌
    }
    handleChange(e) { 
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        // 여러개의 정보 입력 받을 수 있음
        this.setState(nextState)
    }
    handleEdit() { 
        this.props.onEdit(this.state.name, this.state.phone);
    }
    handleKeyPress(e) { 
        if (e.charCode === 13) { // 엔터키를 클릭한다면
            this.handleToggle();
        }
    }
    // ----------------------------------------------------
    render() {

        const details = (<div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.phone}</p>
        </div>);

        
        
        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.handleChange} />
                </p>
                <p>
                    <input
                        type="text"
                        name='phone'
                        placeholder='phone'
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        )
        const view = this.state.isEdit ? edit : details;
        const blank = (<div>
            선택 안됨
        </div>);
        // ####################3
        return (
            <div>
                <h2>상세 정보</h2>
                {this.props.isSelected ? view : blank}
                {/* 선택된 상태라면 details를 불러오고  */}
                <p>
                    <button
                        onClick={this.handleToggle}
                    >
                        {this.state.isEdit ? '입력하기' : '편집하기'}
                    </button>
                    <button
                        onClick={this.props.onRemove}
                    >삭제하기
                    </button>
                </p>
            </div>
        )
    }
} 
// 선택이 안되었을때 오류 나오는것을 막기 위해
ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone:''
    },
    onRemove: () => {
        console.error('onRemove가 정의되지 않았습니다.');
    },
    onEdit: () => {
        console.error('onEdit이 정의되지 않았습니다.');
    }
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit:PropTypes.func
}