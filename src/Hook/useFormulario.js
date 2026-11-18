import {useState} from "react"
import{useNavigate} from "react-router-dom"

const inicial={nombre: '', imagen: '', descripcion: '', color: ''}
export default function FormularioOrquestador({ id = 'formulario' }) {
    return (
        <form className='formulario' onSubmit={(evento) => evento.preventDefault()}>
            {preguntas.inputs.map((campo) => {
                const campoId = `${id}-${campo.infolabel}`;

                return (
                    <div key={campoId}>
                        <Label Titulolabel={campo.Titulolabel} infolabel={campoId} />
                        <Inputt Type={campo.Type} Nombre={campo.Titulo} infolabel={campoId} />
                    </div>
                );
            })}
            {preguntas.boton.map((boton) => (
                <Boton
                    key={boton.Textoboton}
                    Textoboton={boton.Textoboton}
                    type={boton.Textoboton.toLowerCase() === 'limpiar' ? 'reset' : 'submit'}
                />
            ))}
        </form>
    );
}
return{
    datos, 
    onCambio: cambiar,
    onEnviar:enviar,
    onReset: ()=>setDatos(inicial)
    onVolver:()=>navigate('/tarjeta')

}