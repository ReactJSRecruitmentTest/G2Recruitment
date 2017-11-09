import React from 'react';
import PropTypes from 'prop-types';

class Personnel extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <h1>{this.props.record.GivenName} {this.props.record.FamilyName}</h1>
            </div>
        );
    }
};
Personnel.propTypes = {
    record: PropTypes.object.isRequired
};
module.exports = Personnel;
