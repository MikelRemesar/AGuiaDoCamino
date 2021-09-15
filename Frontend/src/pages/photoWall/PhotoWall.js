import './photowall.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineFire } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import {
    IoIosArrowDroprightCircle,
    IoIosArrowDropleftCircle,
} from 'react-icons/io';
import { RiArrowGoBackLine } from 'react-icons/ri';

import imagennoperfil from '../../assets/imagennoperfil.png';

import ListOfComments from '../../components/comments/listofcomments/ListOfComments';
import Image from '../../components/listofimages/Image';

import getComment from '../../services/getComment';
import Like from '../../components/likes/Like';
import getImage from '../../services/getImage';

function PhotoWall({ arrayFotos }) {
    let token = sessionStorage.getItem('token');
    let idUsuario = sessionStorage.getItem('idusuario');
    const { id } = useParams();
    const keyword = id;
    console.log('token: ', token);

    const [search, setSearch] = useState([]);
    const [image, setImage] = useState([]);
    const [user, setUser] = useState([]);
    const [comentario, setComments] = useState('');

    let [addComment, setAddComment] = useState({ comentario });
    let [step, setStep] = useState(1);

    const [previous, setPrevious] = useState({});
    const [next, setNext] = useState({});
    function onSubmitComments(event) {
        event.preventDefault();

        async function performComment() {
            const response = await fetch(
                `http://localhost:4000/usuarios/${idUsuario}/photos/${id}/comment`,
                {
                    method: 'POST',

                    headers: {
                        authorization: token,

                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        comentario,
                    }),
                }
            );
            const data = await response.json();
            addComment = data.data;
            if (response.ok) {
                setStep(step + 1);
            }
        }
        setComments('');
        performComment();
    }
    useEffect(
        function () {
            getComment({ keyword }).then((results) => {
                setSearch(results);
            });
            getImage({ keyword }).then((image) => {
                setImage(image[0]);
                getUser(image[0].idUsuario);
            });
        },
        [keyword, step]
    );
    async function getUser(image) {
        const response = await fetch(
            `http://localhost:4000/usuarios/${image}`,
            {
                method: 'GET',
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        const arrayFotos = data.Fotos;
        setUser(data.informacion);
        if (arrayFotos.length === 1) {
            setPrevious(arrayFotos[0]);
            setNext(arrayFotos[0]);
        } else {
            for (let i = 0; i <= arrayFotos.length - 1; i++) {
                if (Number(arrayFotos[i].id) === Number(keyword)) {
                    if (i !== 0 && i !== arrayFotos.length - 1) {
                        setPrevious(arrayFotos[i - 1]);
                        setNext(arrayFotos[i + 1]);
                    } else if (i === 0) {
                        setPrevious(arrayFotos[i]);
                        setNext(arrayFotos[i + 1]);
                    } else if (i === arrayFotos.length - 1) {
                        setPrevious(arrayFotos[i - 1]);
                        setNext(arrayFotos[i]);
                    }
                }
            }
        }
    }

    return (
        <div className="photowall">
            {token !== null ? (
                <div className="menuhidden menuhidden-logged">
                    <a
                        href={`/perfil/${idUsuario}`}
                        className="menuhidden_button"
                    >
                        <CgProfile className="navbar-buttons" />
                        <p className="navbar-buttons">Perfil</p>
                    </a>

                    <a href={'/search'} className="menuhidden_button">
                        <BsSearch className="navbar-buttons" />
                        <p className="navbar-buttons">Buscar</p>
                    </a>

                    <a href={'/tendencias'} className="menuhidden_button">
                        <AiOutlineFire className="navbar-buttons" />
                        <p className="navbar-buttons">Tendencias</p>
                    </a>
                </div>
            ) : (
                <div className="menuhidden menuhidden-notlogged">
                    <a
                        href="javascript: history.go(-1)"
                        className="menuhidden_button"
                    >
                        <RiArrowGoBackLine className="navbar-buttons-notlo" />
                        <p className="navbar-buttons-notlo">Atrás</p>
                    </a>
                    <a href={'/search'} className="menuhidden_button">
                        <BsSearch className="navbar-buttons-notlo" />
                        <p className="navbar-buttons-notlo">Buscar</p>
                    </a>

                    <a href={'/tendencias'} className="menuhidden_button">
                        <AiOutlineFire className="navbar-buttons-notlo" />
                        <p className="navbar-buttons-notlo">Tendencias</p>
                    </a>
                </div>
            )}
            <div className="grid_photowall">
                <div className="photandbuts">
                    <a
                        href={`/photos/${previous.id}`}
                        className="menuhidden_button"
                    >
                        <IoIosArrowDropleftCircle className="photoleft" />
                    </a>

                    <Image url={image.url} />
                    <a
                        href={`/photos/${next.id}`}
                        className="menuhidden_button"
                    >
                        <IoIosArrowDroprightCircle className="photoright" />
                    </a>
                </div>
                <div className="asidephoto">
                    <div className="photoinfo">
                        <a
                            href={`/perfil/${image.idUsuario}`}
                            className="avatarinfo"
                        >
                            <img
                                src={
                                    user.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${user.fotoperfil}`
                                }
                                alt=""
                                className="miniavatar"
                            ></img>
                            <p>{user.nickname}</p>
                        </a>
                        <p className="avatar-description">
                            {image.descripcion === 'undefined'
                                ? ''
                                : image.descripcion}
                        </p>
                        <Like />
                    </div>
                    {token !== null ? (
                        <ListOfComments search={search} />
                    ) : (
                        <div className="singlecomment">
                            <h1>Regístrate para ver y escribir comentarios</h1>
                        </div>
                    )}
                    {token !== null ? (
                        <form
                            onSubmit={onSubmitComments}
                            className="imagesWall_comments_new"
                        >
                            <textarea
                                className="textarea-comments"
                                type="text"
                                placeholder="Comentarios..."
                                value={comentario}
                                onChange={(event) =>
                                    setComments(event.target.value)
                                }
                            ></textarea>
                            <button
                                className="comment-button"
                                type="submit"
                                onClick={() => setAddComment(!addComment)}
                                disabled={comentario ? '' : 'comments'}
                            >
                                <IoSendSharp />
                            </button>
                        </form>
                    ) : (
                        <form
                            onSubmit={onSubmitComments}
                            className="imagesWall_comments_new"
                        >
                            <textarea
                                disabled
                                className="textarea-comments"
                                type="text"
                                value={comentario}
                                onChange={(event) =>
                                    setComments(event.target.value)
                                }
                            ></textarea>
                            <button
                                disabled
                                className="comment-button"
                                type="submit"
                                onClick={() => setAddComment(!addComment)}
                                disabled={comentario ? '' : 'comments'}
                            >
                                <IoSendSharp />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
export default PhotoWall;

// import './photowall.css';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// import { useEffect } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { CgProfile } from 'react-icons/cg';
// import { AiOutlineFire } from 'react-icons/ai';
// import { BsSearch } from 'react-icons/bs';

// import imagennoperfil from '../../assets/imagennoperfil.png';

// import ListOfComments from '../../components/comments/listofcomments/ListOfComments';
// import Image from '../../components/listofimages/Image';
// import Menu from '../../components/menu/menu';
// import getComment from '../../services/getComment';
// import Like from '../../components/likes/Like';
// import getImage from '../../services/getImage';

// import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
// import { RiArrowGoBackLine } from 'react-icons/ri';

// import { useHistory } from 'react-router-dom';

// function PhotoWall() {
//     let token = sessionStorage.getItem('token');
//     let idUsuario = sessionStorage.getItem('idusuario');
//     const { id } = useParams();
//     const keyword = id;

//     const [search, setSearch] = useState([]);
//     const [image, setImage] = useState([]);
//     const [user, setUser] = useState([]);
//     const [comentario, setComments] = useState('');

//     const [arrayFotos, setArrayFotos] = useState({});

//     let [addComment, setAddComment] = useState({ comentario });
//     let [step, setStep] = useState(1);
//     const [prueba, setPrueba] = useState(0);
//     const [previous, setPrevious] = useState({});
//     const [next, setNext] = useState({});
//     function onSubmitComments(event) {
//         event.preventDefault();

//         async function performComment() {
//             const response = await fetch(
//                 `http://localhost:4000/usuarios/${idUsuario}/photos/${id}/comment`,
//                 {
//                     method: 'POST',

//                     headers: {
//                         authorization: token,

//                         'Content-Type': 'application/json',
//                     },

//                     body: JSON.stringify({
//                         comentario,
//                     }),
//                 }
//             );
//             const data = await response.json();
//             addComment = data.data;
//             if (response.ok) {
//                 setStep(step + 1);
//             }
//         }
//         setComments('');
//         performComment();
//     }
//     useEffect(
//         function () {
//             getComment({ keyword }).then((results) => {
//                 setSearch(results);
//             });
//             getImage({ keyword }).then((image) => {
//                 setImage(image[0]);
//                 getUser(image[0].idUsuario);
//             });
//         },
//         [keyword, step]
//     );
//     async function getUser(image) {
//         const response = await fetch(
//             `http://localhost:4000/usuarios/${image}`,
//             {
//                 method: 'GET',
//                 headers: {
//                     authorization: token,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         const data = await response.json();
//         const arrayFotos = data.Fotos;
//         console.log(arrayFotos);
//         setUser(data.informacion);
//         console.log(arrayFotos.length);
//         if (arrayFotos.length === 1) {
//             setPrevious(arrayFotos[0]);
//             setNext(arrayFotos[0]);
//         } else {
//             for (let i = 0; i <= arrayFotos.length - 1; i++) {
//                 if (Number(arrayFotos[i].id) === Number(keyword)) {
//                     if (i !== 0 && i !== arrayFotos.length - 1) {
//                         setPrevious(arrayFotos[i - 1]);
//                         setNext(arrayFotos[i + 1]);
//                     } else if (i === 0) {
//                         setPrevious(arrayFotos[i]);
//                         setNext(arrayFotos[i + 1]);
//                     } else if (i === arrayFotos.length - 1) {
//                         setPrevious(arrayFotos[i - 1]);
//                         setNext(arrayFotos[i]);
//                     }
//                 }
//             }
//         }
//     }
//     console.log('Next: ', next);
//     console.log('Previous: ', previous);
//     return (
//         <div className='photowall'>
//             <div className='menuhidden'>
//                 <a
//                     href={`/photos/${previous.id}`}
//                     className='menuhidden_button'
//                 >
//                     <FaArrowCircleLeft />
//                 </a>

//                 <a
//                     href='javascript: history.go(-1)'
//                     className='menuhidden_button'
//                 >
//                     <RiArrowGoBackLine />
//                     <p>Atrás</p>
//                 </a>

//                 <a href={`/perfil/${idUsuario}`} className='menuhidden_button'>
//                     <CgProfile />
//                     <p>Perfil</p>
//                 </a>

//                 <a href={'/search'} className='menuhidden_button'>
//                     <BsSearch />
//                     Buscar
//                 </a>

//                 <a href={'/tendencias'} className='menuhidden_button'>
//                     <AiOutlineFire />
//                     Tendencias
//                 </a>

//                 <a href={`/photos/${next.id}`} className='menuhidden_button'>
//                     <FaArrowCircleRight />
//                 </a>
//             </div>
//             <div className='grid_photowall'>
//                 <Image url={image.url} />
//                 <div className='asidephoto'>
//                     <div className='photoinfo'>
//                         <a
//                             href={`/perfil/${image.idUsuario}`}
//                             className='avatarinfo'
//                         >
//                             <img
//                                 src={
//                                     user.fotoperfil === null
//                                         ? imagennoperfil
//                                         : `http://localhost:4000/uploads/${user.fotoperfil}`
//                                 }
//                                 alt=''
//                                 className='miniavatar'
//                             ></img>
//                             <p>{user.nickname}</p>
//                         </a>
//                         <p className='avatar-description'>
//                             {image.descripcion}
//                         </p>
//                         <Like />
//                     </div>
//                     <ListOfComments search={search} />
//                     <form
//                         onSubmit={onSubmitComments}
//                         className='imagesWall_comments_new'
//                     >
//                         <textarea
//                             className='textarea-comments'
//                             type='text'
//                             placeholder='Aquí podrás comentar las fotos que más te gusten'
//                             value={comentario}
//                             onChange={(event) =>
//                                 setComments(event.target.value)
//                             }
//                         ></textarea>
//                         <button
//                             className='comment-button'
//                             type='submit'
//                             onClick={() => setAddComment(!addComment)}
//                             disabled={comentario ? '' : 'comments'}
//                         >
//                             <IoIosSend />
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default PhotoWall;
