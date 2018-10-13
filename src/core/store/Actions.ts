import {Action as ReduxAction} from 'redux';
import {State} from './State';
import {Dispatch, Thunk} from './Store';

export interface Action<S, P> extends ReduxAction {
    type: string;
    payload: P;
}

export interface ActionCreator<S, R, P> {
    type: string;
    (payloadOrRawPayload: P | R): Action<S, P>;
}

/**
 * Polymorphic function. With 2 forms:
 *
 * 1. Function which receives action type and
 *      returns function which receives payload and
 *        returns action.
 *
 *    In short, type of the function is:
 *      type -> payload -> action
 *
 * 2. Function which receives action type and payload transformation function and
 *      returns function which receives raw payload and
 *        returns action.
 *
 *    In short, type of the function is:
 *      type -> (raw payload -> payload) -> raw payload -> action
 *
 * Where
 *   type        - action's type
 *   raw payload - data which will be transformed by payload transformation function to payload
 *   payload     - data which can be used in reducer
 */
export function actionCreator<S, P>(type: string): ActionCreator<S, P, P>;
export function actionCreator<S, R, P>(type: string, transform: (rawPayload: R) => P): ActionCreator<S, R, P>;
export function actionCreator<S, R, P>(type: string, transform?: (rawPayload: R) => P): ActionCreator<S, P, P> | ActionCreator<S, R, P> {
    if (transform) {
        return objectAssign(
            /* tslint:disable */
            (rawPayload: R): Action<S, P> => ({
                type,
                payload: transform(rawPayload)
            }),
            {type}
            /* tslint:enabled */
        );
    } else {
        return objectAssign(
            (payload: P): Action<S, P> => ({type, payload}),
            {type}
        );
    }
}

type ThunkFunction<P> = (params: { payload: P, dispatch: Dispatch, getState: () => State }) => Promise<void>;

export function thunkCreator<P>(thunk: ThunkFunction<P>): (payload: P) => Thunk {
    return (payload: P) => (dispatch, getState) => thunk({payload, dispatch, getState});
}

function objectAssign<T, U>(target: T, source: U): T & U {
    const res = Object(target);
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            res[key] = source[key];
        }
    }
    return res;
}
