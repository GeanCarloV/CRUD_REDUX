// src > reducer > 

// para comibar todos los reducer, pero siempre solo se tien que tener uno
import { combineReducers } from 'redux'; 
// importamos los  reducers creado 
import productoReducer from './productosReducer'; 
import alertaReducer from './alertaReducer';

// agrgeamos multiples reducer
export default combineReducers({ 
    productos: productoReducer, 
    alerta: alertaReducer
});

