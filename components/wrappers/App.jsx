import React from 'react';

// Flux
import { personnelActionCreator } from './../../flux/actionCreators';
import { personnelStore } from './../../flux/stores';

// Components
import { Personnel } from './../content';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personnel: []
        };

        this.onPersonnelStoreEvent = this.onPersonnelStoreEvent.bind(this);
    };

    componentWillMount() {
        personnelStore.addChangeListener(this.onPersonnelStoreEvent);
        personnelStore.init();
    };

    componentDidMount() {
        personnelActionCreator.loadPersonnel();
    }

    componentWillUnmount() {
        personnelStore.removeChangeListener(this.onPersonnelStoreEvent);
    };

    onPersonnelStoreEvent() {
        this.setState({
            personnel: personnelStore.getState().personnel
        });
    };

    render() {
        return (
            <div className="content">
                <div className="col-md-4">
                    {this.state.personnel.map((record, index) => {
                        return <Personnel record={record} key={'personnel_' + index} />
                    })}
                </div>
            </div>
        );
    }
};
module.exports = App;
