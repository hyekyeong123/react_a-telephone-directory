import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';


//----------------------------------------
export default class Contact extends React.Component { 

    constructor(props) {
        // 컴포넌트가 처음 만들어질때 실행, 기본 state를 설정할 수 있음
        super(props);
        // state 기본값 주기
        this.state = {
            selectedKey: -1,
            keyword: '',

            contactData: [
                { name: 'Abet', phone: '010-0000-0001' },
                { name: 'Bbet', phone: '010-0000-0002' },
                { name: 'Cbet', phone: '010-0000-0003' },
                { name: 'Dbet', phone: '010-0000-0004' },
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        // 임의의 함수 메소드를 만들때에는 this와 바인딩하는것 필요함
        // 다만 화살표 함수를 사용하면 바인딩 할 필요 없으나 여기서는 강의를 그냥 따라가는 것으로
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }


    componentWillMount() { // 마운트 되기 전
        const contactData = localStorage.contactData;

        if (contactData) { 
            this.setState({
                contactData: JSON.parse(contactData)
                // string 형태였던것을 다시 객체 형식으로 변환
            })
        }
    }

    componentDidUpdate(prevProps,prevState) { 
        if (JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) { 
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    // ----------------------------------
    handleChange(e) { 
        this.setState({
            keyword: e.target.value
        });
    }
    handleClick(key) { 
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected');
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }
    handleRemove() {
        if (this.state.selectedKey < 0) { 
            alert('객체를 선택해주셔야합니다.');
            return;
        }
        this.setState({
            contactData: update(this.state.contactData, { $splice: [[this.state.selectedKey, 1]] }
            ),
            selectedKey:-1
        })
    }
    handleEdit(name, phone) { 
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey]: {
                    name: { $set : name },
                    phone: { $set : phone }
                }
            })
        })
    }
// ####################################3
    render() {

        const mapToComponents = (data) => {
            data.sort(); // 오름차순으로 정렬하기
            data = data.filter((contact) => { 
                return contact.name.toLowerCase()
                    .indexOf(this.state.keyword) > -1;
                // indexOf는 포함하는 것의 index 위치를 알려줌 -1보다 크다면 포함 -> True
            })

            return data.map((contact, i) => { 
                return (
                    <ContactInfo contact={contact} key={i}
                        onClick={() => this.handleClick(i)}
                    />
                    // onClick은 컴포넌트에서는 적용이 안 됨
                )
            })
        }


        return (
            <div>
                <h1>전화번호부</h1>
                <input
                    type="text"
                    name="keyword"
                    placeholder="검색하기"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                   />
                <div>{mapToComponents(this.state.contactData)}</div>

                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                /> 
                {/* 사람을 클릭했을때 나타나는 상세정보 // 선택된 상태라면 */}
                <ContactCreate
                    onCreate = {this.handleCreate}
                />
            </div>
        )
    }
}