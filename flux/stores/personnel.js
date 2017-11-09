import { EventEmitter } from 'events';
import Dispatcher from './../dispatcher';
import FluxActions from './../fluxActions';

const CHANGE_EVENT = 'change';

const initialState = () => {
    return {
        personnel: []
    }
};

class PersonnelStore extends EventEmitter {
    constructor() {
        super();
        this.state = null;
    };

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };

    emitChange() {
        this.emit(CHANGE_EVENT);
    };

    init() {
        if (this.state == null) {
            this.state = initialState();
            this.emitChange();
        }
    };

    getState() {
        if (this.state == null) {
            throw 'Store has not been initialised. Call init() before using getState.';
        }
        return this.state;
    };

    loadPersonnel(personnel) {
        this.state.personnel = personnel;
        this.emitChange();
    };
}

const personnelStore = new PersonnelStore();
personnelStore.dispatcherIndex = Dispatcher.register(action => {
    switch (action.type) {
        case FluxActions.LOAD_PERSONNEL:
            personnelStore.loadPersonnel(action.payload);
            break;
    };
});
module.exports = personnelStore;
