import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../session.css';
import { useParams } from 'react-router';

function ValidateUser() {
    let history = useHistory();

    let { registrationCode } = useParams();

    useEffect(() => {
        async function performRegistrationCode() {
            const response = await fetch(
                `http://localhost:4000/usuarios/validate/${registrationCode}`,
                {
                    method: 'GET',
                }
            );
            await response.json();
            history.push('/login');
        }
        performRegistrationCode();
    }, [registrationCode, history]);

    return (
        <div>
            Estamos procedediendo a activar su cuenta, no tardaremos nada y si
            tarda cambie de compañía de internet. Atentamente el servicio
            técnico de A Ruta do Camiño
        </div>
    );
}
export default ValidateUser;
