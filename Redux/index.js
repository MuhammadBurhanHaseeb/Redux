// to import 
import { applyMiddleware, combineReducers, createStore  } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import {thunk} from 'redux-thunk';



// array of history for immutable concept 
let history = [];

// const actions name for action creator and ressolve the bug of miss match names of actions 
// const init = 'init';
const inc = 'account/increment';
const dec = 'account/decrement';
const incByAmount = 'account/incrementByAmount';
const decByAmount = 'account/decrementByAmount';
const incBonus = 'bonus/increment';

// actions 
const getAccUserPending  = 'account/getUser/pendind';
const getAccUserFullfiled  = 'account/getUser/fullfilled';
const getAccUserRejected  = 'account/getUser/rejected';

// store 
// const store = createStore(Reducer , applyMiddleware(logger.default , thunk));
//combine reducers 
const store = createStore(
    combineReducers({account:accountReducer ,
                         bonus : bonusReducer}) ,
                          applyMiddleware(logger.default , thunk));

// reducer 
function accountReducer (state={amount:1} , action)
{
/// switch way 
switch(action.type)
{
    case inc:
        return {amount : state.amount + 1} ;
    case dec:
        return {amount : state.amount - 1 };
    case incByAmount:
        return {amount : state.amount + action.payload};
    case decByAmount:
        return {amount : state.amount - action.payload};
    case getAccUserFullfiled:
        return {amount : action.payload , pending : false , fulfilled : true }  ; 
    case getAccUserRejected:
        return {...state , error : action.error , pending : false } ; 
    case getAccUserPending:
        return {...state , pending:true } ;           
    default:
        return state;     

}


// if (action.type === inc)
// {
//      // state.amount = state.amount + 1 chsnge the previous states too 
//     return {amount : state.amount + 1}
// }
// if (action.type === dec)
//     {
//          // state.amount = state.amount + 1 chsnge the previous states too 
//         return {amount : state.amount - 1}
//     }
//     if (action.type === incByAmount)
//         {
//              // state.amount = state.amount + 1 chsnge the previous states too 
//             return {amount : state.amount + action.payload}
//         }
//         if (action.type === decByAmount)
//             {
//                  // state.amount = state.amount + 1 chsnge the previous states too 
//                 return {amount : state.amount - action.payload}
//             }
//     return state; 
}
function bonusReducer (state={points:1} , action)
{
/// switch way 
    switch(action.type)
    {
        case incBonus:
            return {points : state.points + 1} ;
        case incByAmount:
            if(action.payload >=100)
              return {points : state.points + 1} ;
        default:
            return state;     

    }
}

// api calling from axios 

// async function getUser()
// {
//     const {data} =  await axios.get('http://localhost:3000/account/1');
//     console.log(data);
// }

// getUser();

// global state 
// store.getState()
//console.log(store.getState());


// action
// {type:'increment'}

//console.log(store.dispatch({type:'increment'}));  // dispatch bhej deta hai store mai 

//console.log(store.getState());


// already runs when reducer changes 
// see changes continue
// store.subscribe(()=>{
//    // console.log(store.getState());
//     history.push(store.getState());
//     // console.log(history);
// });

// action creator 
function increment()
{
    return {type:inc}

}
function decrement()
{
    return {type:dec}

}
function incrementByAmount(value)
{
    return {type:incByAmount, payload : value}

}
function decrementByAmount(value)
{
    return {type:decByAmount, payload : value}

}
function incrementBonus()
{
    return {type:incBonus}

}


// async action cretor  generic id function 
function getUserAccount(id)
{
    return async (dispatch , getState) =>{
        try{
            dispatch(getAccountUserPending());
            const {data} =  await axios.get(`http://localhost:3000/account/${id}`);
            dispatch(getAccountUserFullfiled(data.amount));
        }
        catch(error)
        {
        dispatch(getAccountUserRejected(error.message));
        }
        
    };
    
}

// action creator // fullfilled / Rejected / Pending 
function getAccountUserFullfiled(value)
{
    return {type : getAccUserFullfiled , payload : value }
}
function getAccountUserPending(value)
{
    return {type : getAccUserPending , payload : value }
}
function getAccountUserRejected(value)
{
    return {type : getAccUserRejected , payload : value }
}





setTimeout(()=>{
    // store.dispatch(increment()); 
   // store.dispatch(incrementByAmount(200));
    // store.dispatch(decrementByAmount(4));
    // store.dispatch(decrement()); 
    // store.dispatch(initUser); 
    store.dispatch(getUserAccount(2)); 
    // store.dispatch(increment())

   // store.dispatch(incrementBonus())
}, 2000)

// console.log(store.getState());





// // set time 2 sec to change state 
// setInterval(()=>{
//     // store.dispatch({type : 'increment'});    
//     // store.dispatch({type : 'decrement'}); 
//     store.dispatch({type : 'incrementByAmount', payload : 4    }); 
//     // store.dispatch({type : 'decrementByAmount'}); 
// }, 2000)

