import { Formik, Form, Field } from 'formik'
import { useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Error from './Error';
import Spinner from './Spinner';
/*json-server --watch db.json --port 4000*/

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto' ).max(20, 'El nombre es muy largo').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().email('Email no valido').required('El email del cliente es obligatorio'),
        telefono: Yup.number().positive('Número no valido').integer('Número no valido').typeError('Número no valido')
    })
    const handleSubmit = async (valores) => {
        //console.log(valores);
        try {
            let respuesta;

            if(cliente.id){
                //console.log('editando');
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                //console.log('agregando...');
                const url = "http://localhost:4000/clientes";
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });  
               
            }
             //console.log(respuesta);
             await respuesta.json();
             //console.log(resultado);
             navigate('/clientes');
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        cargando ? <Spinner/> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => (
                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="nombre">Nombre:</label>
                                <Field
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    id='nombre'
                                    placeholder= 'Nombre del Cliente'
                                    name='nombre'
                                />
                                {errors.nombre && touched.nombre ? (
                                        <Error>{errors.nombre}</Error>
                                    ) : null
                                }
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="empresa">Empresa:</label>
                                <Field
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    id='empresa'
                                    placeholder= 'Empresa del Cliente'
                                    name='empresa'
                                />
                                {errors.empresa && touched.empresa ? (
                                        <Error>{errors.empresa}</Error>
                                    ) : null
                                }
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="email">Email:</label>
                                <Field
                                    type='email'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    id='email'
                                    placeholder= 'Email del Cliente'
                                    name='email'
                                />
                                {errors.email && touched.email ? (
                                        <Error>{errors.email}</Error>
                                    ) : null
                                }
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="telefono">Teléfono:</label>
                                <Field
                                    type='tel'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    id='telefono'
                                    placeholder= 'Teléfono del Cliente'
                                    name='telefono'
                                />
                                {errors.telefono && touched.telefono ? (
                                        <Error>{errors.telefono}</Error>
                                    ) : null
                                }
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="notas">Notas:</label>
                                <Field
                                    as='textarea'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                    id='notas'
                                    placeholder= 'Notas del Cliente'
                                    name='notas'
                                />
                            </div>
                            <input type='submit' value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'/>
                        </Form>
                    )}
                
                </Formik>
            </div>
        )
        
    );
};

Formulario.defaultProps = {
    cliente:{},
    cargando: false
}

export default Formulario;
