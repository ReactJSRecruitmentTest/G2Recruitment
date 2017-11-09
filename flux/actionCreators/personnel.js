import Dispatcher from './../dispatcher';
import FluxActions from './../fluxActions';

import { request } from './../../lib';

const personnelActionCreator = {
    loadPersonnel(limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        request('GET', `http://localhost:3080/api/personnel?limit=${limit}&offset=${offset}`)
            .then(res => Dispatcher.dispatch({ type: FluxActions.LOAD_PERSONNEL, payload: JSON.parse(res).data }))
            .catch(err => console.error(err))
    }
};
module.exports = personnelActionCreator;
