import '../carrousel/carrousel.css';
import { useState, useEffect } from 'react';
import { Button } from './botonLike';
import { useParams } from 'react-router-dom';
import getLikes from '../../services/getLikes';

function Like() {
    let token = sessionStorage.getItem('token');
    let idUsuario = sessionStorage.getItem('idusuario');

    const [totalLikes, setTotalLikes] = useState(0);
    const [step, setStep] = useState(0);
    const [prueba, setPrueba] = useState({});
    const [liked, setLiked] = useState('');

    let { id } = useParams();

    async function darLike() {
        const response = await fetch(
            `http://localhost:4000/usuarios/${idUsuario}/photos/${id}/like`,
            {
                method: 'PUT',

                headers: {
                    authorization: token,
                },
            }
        );
        const data = await response.json();
        setStep(step + 1);
    }
    useEffect(
        function () {
            getLikes({ id }).then((results) => {
                setTotalLikes(results.length);
                setPrueba(results);
                if (results.length === 0) {
                    setLiked('no');
                } else {
                    setLiked('no');
                    for (let i = 0; i <= results.length - 1; i++) {
                        if (
                            Number(results[i].idUsuario) === Number(idUsuario)
                        ) {
                            setLiked('yes');
                        }
                    }
                }
            });
        },
        [, step]
    );
    return (
        <div className='like-container'>
            <Button onClick={darLike} liked={liked}></Button>
            <p className='likes-number'> {totalLikes}</p>
        </div>
    );
}
export default Like;

//Modificado Like, botonlike, button del like
//empezamos a modificar resultados del search
