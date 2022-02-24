import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Formulario from '../components/Formulario';
import Spinner from "../components/Spinner";

const EditarCliente = () => {
    
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const obtnerClientesAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(!cargando);
            
            
        }        
        obtnerClientesAPI();
    }, []);

    return (
        cargando ? <Spinner/> : (
            <>
                <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
                <p className='mt-3'>Utiliza este formulario para editar la información del cliente</p>
                {cliente?.nombre ? (
                    <Formulario
                        cliente = {cliente}
                        cargando = {cargando}
                    />
                ) : <p>Cliente ID no válido</p>}            
            </>
        )
        
    );
};

export default EditarCliente;