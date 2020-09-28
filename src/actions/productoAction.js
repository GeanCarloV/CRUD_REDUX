// src > action > productoAtion.js

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
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO, 
    PRODUCTO_EDITADO_ERROR
} from '../types'; 

import clienteAxios from '../config/axios'; 
// libreria de modlas de notificacon
import Swal from 'sweetalert2'; 



//--- funcioens para crear nuevos producots
export function crearNuevoProductoAction(producto) { 
    
    return async (dispatch) => { 

        dispatch(agregarProducto()); 
        
        try {
        
            await clienteAxios.post('/productos', producto); 
            dispatch( agregarProductoExito(producto) )
            Swal.fire(
                'Correcto',
                'El producto se agrego correctametne', 
                'success'
            )

        } catch (error) {

            dispatch( agregarProductoError(true) )
            Swal.fire({ 
                icon: 'error', 
                title: 'Hubo un error', 
                text: 'Huno un error, itenta de nuevo'
            })

        }
    }
}

const agregarProducto = () => ({ 
    type: AGREGAR_PRODUCTO, 
    payload: true
})

const agregarProductoExito = producto => ({ 
    type: AGREGAR_PRODUCTO_EXITO, 
    payload: producto
})

const agregarProductoError = estado => ({ 
    type: AGREGAR_PRODUCTO_ERROR, 
    payload: estado
})



//---- funciones de descarga de los prodcutos de la base de datos
export function obtenerProductosAction() { 
    // 
    return async (dispatch) => { 
        dispatch( descargarProductos() ); 

        try {
            const respuesta = await clienteAxios.get('/productos'); 
            // si esc orreco hacemos otro dispatch 
            dispatch( descargaProductosExistosa(respuesta.data) )        
        } catch (error) {
            
            dispatch( descargaProductosError())
        }
    }
}

const descargarProductos = () => ({ 
    type: COMENZAR_DESCARGA_PRODUCTOS, 
    payload: true
}); 

const descargaProductosExistosa = productos => ({ 
    type: DESCARGA_PRODUCTOS_EXITO, 
    payload: productos
}); 

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR, 
    payload: true
})


//---- seleciona y elimina el producto 
export function borrarProductoAction(id) { 
    
    return async (dispatch) => { 
        dispatch(obtenerProductoEliminar(id));

        try {
            // mandamos a la api para eliminar conforme al resutaldo
            await clienteAxios.delete(`/productos/${id}`); 
            dispatch( eliminarProductoExito() ); 
            
            // si se elimina mostrar alerta 
            Swal.fire(
                'Elimando!',
                'El producto se elimino correctamente.',
                'success'
            )
        
        } catch (error) {
            console.log(error); 
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = id => ({ 
    type: OBTENER_PRODUCTO_ELIMINAR, 
    payload: id
}); 

const eliminarProductoExito = () => ({ 
    type: PRODUCTO_ELIMINADO_EXITO
}); 

const eliminarProductoError = () => ({ 
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true 

})

// ----Coloar producto en edicion 
export function obtenerProductoEditar(producto) { 
    return (dispatch) => { 
        dispatch( obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = (producto) => ({ 
     type: OBTENER_PRODUCTO_EDITAR, 
     payload: producto
}); 

// Ediat un registo en la api y sate
export function editarProductoAction(producto) { 
    return async (dispatch) => { 
        
        dispatch( editarProducto() )
        
        try {
          await clienteAxios.put(`/productos/${producto.id}`, producto); 
          dispatch( editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError());
        }
    }
}

// esta funcion sirve para loading, solo eso
const editarProducto = () => ({ 
    type: COMENZAR_EDICION_PRODUCTO, 
})

const editarProductoExito = (producto) => ({ 
    type: PRODUCTO_EDITADO_EXITO, 
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR, 
    payload: true
})