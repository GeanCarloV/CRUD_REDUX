// src > components > Producto.js 

import React from 'react';
import { useHistory } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux'; 
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoAction';
// swwter aler
import Swal from 'sweetalert2'; 

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto; 

    const dispatch = useDispatch(); 
    // llamamos la funcion del hooks 
    const history = useHistory(); 

    //  Confirmar si desea eliminarlo, para los acttion
    const confirmarEliminarProducto = id => { 
        
        //  preguntar al usario 
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
           
        }).then((result) => {
            if (result.value) {
               // pasarlo al action
                dispatch(borrarProductoAction(id));
                
            }
          })
             
    }

    // funcion que redirije de forma programada 
    const redireccionarEdicion = producto => { 
        // psamos al acttion 
        dispatch(obtenerProductoEditar(producto));
        // mandamos a redireccion al compontene 
        history.push(`/productos/editar/${producto.id}`); 

    }

    return (  
        <tr>
            
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio}</span> </td>
            <td className="acciones"> 
                {/* mandamos el boton */}
                <button 
                    type="button"
                    // mandamos la funcion para el rediccionamiento
                    onClick={ () => redireccionarEdicion(producto) }
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Producto;