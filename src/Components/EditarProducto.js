// src > components > EditarProducto.js 

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { editarProductoAction } from '../actions/productoAction';
import { useHistory } from 'react-router-dom';

const EditarProducto = () => {
    
    const history = useHistory(); 

    const dispatch = useDispatch(); 


    // nuevo de state de producto
    const [ producto, guardarProducto] = useState({ 
        nombre: '',
        precio: '' 
    })


    // producto editar, de sote de redux
    const productoeditar = useSelector( state => state.productos.productoeditar); 
    
    //!!!! llenar el state automaticanmente, del stote de la base de datos
    useEffect(() => {
        guardarProducto(productoeditar); 
    }, [productoeditar])
    
    // leer los datos del formulario 
    const onChnageFormulario = e => { 
        guardarProducto({ 
            ...producto, 
            [e.target.name] : e.target.value 
        })
    }


    // lo realizamos para que los valores tomen 
    const {nombre, precio} = producto;
    
    const onSubmitEditarProducto = (e) => { 
        e.preventDefault(); 

        // le pasamos el producto del estate
        dispatch(editarProductoAction(producto));

        // lo redireccionamos al componente principal
        history.push('/');
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">

                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        
                        <form
                            onSubmit={onSubmitEditarProducto}
                        >
                            
                            <div className="form-group">
                                <label>Nombre Producto </label>
                                <input type="text" 
                                        className="form-control"
                                        placeholder="Nombre Producto"  
                                        name="nombre"
                                        value={nombre}
                                        onChange={onChnageFormulario}     
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input type="number" 
                                        className="form-control"
                                        placeholder="Precio Producto"  
                                        name="precio"
                                        value={precio}
                                        onChange={onChnageFormulario}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            > Guardar Cambios </button>

                        </form>

                    </div>
                </div>
            </div>
       
        </div> 
     );
}
 
export default EditarProducto;