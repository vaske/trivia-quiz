import {
    ActionCreator as ReduxActionCreator,
    Dispatch as ReduxDispatch,
    Store as ReduxStore
} from 'redux';
import {Action} from './Actions';
import {State} from './State';


export type Thunk = (dispatch: Dispatch, getState: () => State) => Promise<void>;

export type Dispatch = NormalDispatch & ThunkDispatch & ReduxDispatch<Action<any, any>>;
export type NormalDispatch = <A extends Action<any, any>>(action: A) => A;
export type ThunkDispatch = (thunk: Thunk) => Promise<void>;

export type DispatchToProps<P> = P & { [K in keyof P]: ReduxActionCreator<any> };

export interface Store extends ReduxStore<State> {
    dispatch<A extends Action<any, any>>(action: A): A;
    dispatch<R>(thunk: (dispatch: Dispatch, getState: () => State) => R): R;
}
