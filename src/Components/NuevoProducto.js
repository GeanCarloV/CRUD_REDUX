// src > components > NuevoProducto.js 

import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProductoAction } from '../actions/productoAction';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/AlertaAction';


const NuevosProductos = ({history}) => {

    // stae del componente 
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // accedermos al state del store
    // se pone un call bac, que te pude traer todo el state
    // si no se selcciona cada uno
    const cargando = useSelector( state => state.productos.loading); 
    const error = useSelector( state => state.productos.error); 
    // del otro state
    const alerta = useSelector(state => state.alerta.alerta);

    const dispatch = useDispatch(); 
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) ); 

    const submitNuevoProducto = e => { 
        
        e.preventDefault()
        
        // validar formulario 
        if(nombre.trim() === '' || precio <= 0 ){ 
             
            // pasamos el obejto para la fucnion del action
            const alerta = { 
                msg: 'Ambos campos son obligatorios', 
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            
            dispatch(mostrarAlerta(alerta));

            return; 
        }
        
        // no hay errores
        // ocualtamos la alerta 
        dispatch( ocultarAlertaAction());

        
        agregarProducto({ 
            nombre, 
            precio
        });

        history.push('/');
    }
    


    return ( 
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">

                    <h2 className="text-center mb-4 font-weight-bold">
                        Agregar Nuevo Producto
                    </h2>
                    
                    {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                    <form
                        onSubmit={submitNuevoProducto}
                    >
                        <div className="form-group">
                            <label>Nombre Producto </label>
                            <input type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"  
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}       
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Precio Producto</label>
                            <input type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"  
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}      
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        > Agregar </button>

                    </form>
                    {/* mostramos cuando carga, lo preferible poner un sniper */}
                    { cargando ? <p>cargando...</p> : null }

                    {/* se va mostrando el error */}
                    { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
                </div>
            </div>
        </div>
       
    </div> 
    );
}
 
export default NuevosProductos;