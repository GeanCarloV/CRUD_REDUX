// src > reducer > 

import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_EXITO, 
    AGREGAR_PRODUCTO_ERROR, 
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR, 
    PRODUCTO_ELIMINADO_EXITO, 
    PRODUCTO_ELIMINADO_ERROR, 
    OBTENER_PRODUCTO_EDITAR, 
    PRODUCTO_EDITADO_EXITO
 } from '../types'; 

const initialState = { 
    productos: [], 
    error: null, 
    loading: false, 
    productoeliminar: null, 
    productoeditar: null
}

export default function(state=initialState, action) { 
    switch(action.type) { 
        
        // vamo cambiando la base datso
        case COMENZAR_DESCARGA_PRODUCTOS: 
        case AGREGAR_PRODUCTO: 
            return { 
                ...state, 
                loading: action.payload
            }
        
        // vamos agregando a la base da datos
        // cacherado con la funcion
        // esto sefun el type q se va modificando
        case AGREGAR_PRODUCTO_EXITO: 
            return { 
                ...state, 
                loading: false, 
                productos: [...state.productos, action.payload]
            }
        
        case AGREGAR_PRODUCTO_ERROR: 
        case DESCARGA_PRODUCTOS_ERROR: 
        case PRODUCTO_ELIMINADO_ERROR: 
            return { 
                ...state, 
                loading: false, 
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO: 
            return { 
                ...state, 
                loadind: false, 
                error: null, 
                productos: action.payload 
            }

        case OBTENER_PRODUCTO_ELIMINAR: 
            return { 
                ...state, 
                productoeliminar: action.payload
            }
        // elimandos el producto por el id, y limpiamos el state
        case PRODUCTO_ELIMINADO_EXITO: 
            return { 
                ...state, 
                productos: state.productos.filter( producto => producto.id !== state.productoeliminar ),
                productoeliminar: null
            }
        case OBTENER_PRODUCTO_EDITAR: 
            return { 
                ...state, 
                productoeditar: action.payload
            }
        case PRODUCTO_EDITADO_EXITO: 
            return { 
                ...state, 
                productoeditar: null,      
                // itereamos se busca el ida y se intercambia
                productos: state.productos.map( producto => 
                    producto.id === action.payload.if ? producto = action.payload : 
                    producto    
                )

            }
        default: 
            return state; 
    }
}