import React from 'react';

// 바로 내보내기 가능
export default class ContactInfo extends React.Component { 
    render() {
        return (
            <div onClick={this.props.onClick}> 
                {/* props로 받음 */}
                { this.props.contact.name}
            </div>
        )
    }
}