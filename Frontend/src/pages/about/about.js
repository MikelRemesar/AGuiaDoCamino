import React from 'react';
import './about.css';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menu from '../../components/menu/menu';
import catedral from '../../assets/Santiago_cathedral_2021.jpg';
import catedralinterior from '../../assets/cantedralinteriror.jpg';
import botafumeiro from '../../assets/botafumeiro.jpg';
import { FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { FaMapSigns } from 'react-icons/fa';
import { FcSportsMode } from 'react-icons/fc';
import { GiSonicShoes } from 'react-icons/gi';
import { GiHospitalCross } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import { GrEmergency, GrBike } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';
import { GiClothes } from 'react-icons/gi';
import { GiArmoredPants } from 'react-icons/gi';
import { GiSteeltoeBoots } from 'react-icons/gi';
import { GiBilledCap } from 'react-icons/gi';
import { GiDuffelBag } from 'react-icons/gi';
import { FaToiletPaper, FaHotel, FaInfoCircle } from 'react-icons/fa';
import { GiFireBottle } from 'react-icons/gi';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { GiTakeMyMoney } from 'react-icons/gi';
import { GoDeviceMobile } from 'react-icons/go';
import { CgWebsite } from 'react-icons/cg';
import { RiGuideFill } from 'react-icons/ri';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f9f9f9',
        color: 'black',
    },
    menu: {
        backgroundColor: '#f9f9f9',
        width: '800px',
        color: 'black',
        display: 'block',
        margin: 'auto',
    },

    list: {
        textAlign: 'left',
        listStyle: 'none',
        fontSize: '18px',
        width: '600px',
    },
    list2: {
        textAlign: 'left',
        listStyle: 'none',
        fontSize: '18px',
        width: '600px',
        marginLeft: '80px',
        position: 'relative',
        left: '250px',
    },
    p: {
        textAlign: 'left',
        marginTop: '35px',
        marginBottom: '15px',
    },
    containerList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
    },
    creators: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        height: '60px',
        backgroundColoe: '#f5f5f5',
        textAlign: 'center',
        paddingBottom: '130px',
        paddingTop: '35px',
        backgroundColor: '#99173b',
        color: 'white',
    },
    icons: {
        width: '20px',
        height: '20px',
        marginLeft: '10px',
        marginRight: '8px',
        color: '#0a66c2',
        backgroundColor: 'white',
        borderRadius: '2px',
    },
    iconsGit: {
        width: '20px',
        height: '20px',
        marginLeft: '10px',
        marginRight: '8px',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '50%',
    },
    footer: {
        paddingBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    iconsGuide: {
        marginLeft: '10px',
        marginRight: '10px',
    },
    columns: {
        display: 'flex',
    },
    iconsdes: {
        width: '30px',
        height: '30px',
        position: 'relative',
        top: '4px',
        marginLeft: '8px',
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Menu />
            <div id="menu">
                <AppBar position="static" className={classes.menu}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab
                            label="Home"
                            className={classes.title}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Peregrinos"
                            className={classes.title}
                            {...a11yProps(1)}
                        />
                        <Tab
                            label="Camino"
                            className={classes.title}
                            {...a11yProps(2)}
                        />
                        <Tab
                            label="Santiago"
                            className={classes.title}
                            {...a11yProps(3)}
                        />
                        <Tab
                            label="Catedral"
                            className={classes.title}
                            {...a11yProps(4)}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={classes.divinfo}>
                    <h3 className="Encabezado">Guia do Camiño</h3>
                    <p className="quote">
                        “...Caminante, son tus huellas el camino y nada más;
                        caminante, no hay camino, se hace camino al andar. Al
                        andar se hace camino y al volver la vista atrás se ve la
                        senda que nunca se ha de volver a pisar.
                    </p>
                    <p className="info">
                        En este apartado podrás encontrar toda la información
                        relacionada con el Camino. Esperamos ayudarte en tu
                        viaje.
                    </p>
                </TabPanel>
                <TabPanel value={value} className={classes.divinfo} index={1}>
                    <div className={classes.containerList}>
                        <h2 className={classes.p1}>
                            Información para peregrinos
                        </h2>
                        <div className={classes.columns}>
                            <ul className={classes.list}>
                                <li>
                                    <h3 className={classes.p}>
                                        Consejos y recomendaciones
                                    </h3>
                                </li>
                                <li>
                                    Planifica las etapas de antemano.
                                    <FaMapSigns className={classes.iconsdes} />
                                </li>

                                <li>
                                    Estira y calienta antes de comenzar.
                                    <FcSportsMode
                                        className={classes.iconsdes}
                                    />
                                </li>

                                <li>
                                    No lleves calzado nuevo. Asegúrate de
                                    haberlo usado antes.
                                    <GiSonicShoes
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Cuidado con las lesiones de rodillas,
                                    tendones o pies.
                                    <GiHospitalCross
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Come ligero.
                                    <IoFastFoodOutline
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    No hagas el camino de noche.
                                    <FaMoon className={classes.iconsdes} />
                                </li>
                                <li>
                                    Puedes llamar al 112 gratuitamente ante
                                    cualquier emergencia.
                                    <GrEmergency className={classes.iconsdes} />
                                </li>
                                <li>
                                    Y por último y no menos importante, recuerda
                                    evitar tirar cualquier deshecho o
                                    desperdicio.
                                    <BsTrash className={classes.iconsdes} />
                                </li>
                            </ul>

                            <ul className={classes.list2}>
                                <li>
                                    <h3 className={classes.p}>
                                        Qué no olvidar
                                    </h3>
                                </li>
                                <li>Zapatillas deportivas de descanso.</li>
                                <li>
                                    Botas.
                                    <GiSteeltoeBoots
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Ropa interior de algodón sin costuras.
                                    <GiArmoredPants
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Un par de pantalones,sudaderas y camisetas.
                                    <GiClothes className={classes.iconsdes} />
                                </li>
                                <li>
                                    Gorra.
                                    <GiBilledCap className={classes.iconsdes} />
                                </li>
                                <li>
                                    Saco de dormir.
                                    <GiDuffelBag className={classes.iconsdes} />
                                </li>
                                <li>
                                    Papel higiénico.
                                    <FaToiletPaper
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Cantimplora y crema solar.
                                    <GiFireBottle
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Pequeño botiquín.
                                    <RiFirstAidKitFill
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Poco dinero en metálico.
                                    <GiTakeMyMoney
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Teléfono móvil.
                                    <GoDeviceMobile
                                        className={classes.iconsdes}
                                    />
                                </li>
                                <li>
                                    Nuestra página web para compartir momentos
                                    únicos.
                                    <CgWebsite className={classes.iconsdes} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} className={classes.divinfo} index={2}>
                    <h2 className="Encabezado">Información del camino</h2>
                    <div className="about-list">
                        <h3 className="titulo-info">
                            Red pública de albergues
                        </h3>
                        <p className="pinfo">
                            Encuentra los mejores sitios donde quedarte a
                            dormir. Recuerda que las camas siguen un orden de
                            prioridad en función de que tipo de camino estés
                            haciendo.Haz click en el siguiente botón para ver
                            los albergues disponibles en este momento
                            <a href="https://www.caminodesantiago.gal/es/durante-el-camino/red-publica-de-albergues">
                                <FaHotel className="icono-albergue" />
                                Información de albergues
                            </a>
                        </p>
                        <h3 className="titulo-info">Planifica tu camino</h3>
                        <p className="pinfo">
                            Con una mejor planificación de tu viaje, no
                            olvidarás visitar nada, en el enlace que le dejamos
                            a continuacion, podrás encontrar información más
                            detallada sobre los distintos caminos que hay para
                            llegar a santiago.
                            <a href="https://www.caminodesantiago.gal/es/planifica/planifica-tu-camino">
                                <FaInfoCircle className="icono-info" />
                                Información del Camino
                            </a>
                        </p>
                        <h3 className="titulo-info">Ofertas y propuestas</h3>
                        <p className="pinfo">
                            Encuentra actividades, museos, lugares increibles,
                            deportes relacionados con el Camino de Santiago etc.
                            En el siguinete enlace podrás encontrar información
                            sobre lugares de interés por los que irás pasando a
                            lo largo del camino
                            <a href="https://www.caminodesantiago.gal/es/durante-el-camino/ofertas">
                                <GrBike className="icono-bike" />
                                Información de lugares de interés
                            </a>
                        </p>
                    </div>
                </TabPanel>
                <TabPanel value={value} className={classes.divinfo} index={3}>
                    <h2 className="Encabezado">Información de Santiago</h2>
                    <p className="pinfo-santiago">
                        Te dejamos un enlance con el mapa de santiago, para que
                        una vez llegues disfrute de nuestra maravillosa ciudad
                    </p>
                    <div className="aboutpage-map">
                        <iframe
                            className="mapa-compostela"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1461.8253860339726!2d-8.545247001984231!3d42.88021471473059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2efe4326414707%3A0xa18e63b9d0a316c5!2sCatedral%20de%20Santiago%20de%20Compostela!5e0!3m2!1ses!2ses!4v1630948002587!5m2!1ses!2ses"
                            width="400"
                            title="Catedral"
                            height="300"
                            allowfullscreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </TabPanel>

                <TabPanel value={value} className={classes.divinfo} index={4}>
                    <h2 className="Encabezado">Visita la catedral</h2>
                    <p>
                        Aquí te dejamos una visita guiada por la catedral con
                        imágene,para que te vayas haciendo una idea de lo que
                        vas as poder disfrutar en tú ansiada llegada,haz click
                        en las imágenes para hacer una ruta virtual.
                    </p>
                    <a href="https://www.turismo.gal/librodepedra/libro.html">
                        <img
                            className="catedral-img"
                            alt="imagenes de la catdral"
                            src={catedral}
                        ></img>
                    </a>
                    <a href="https://www.turismo.gal/librodepedra/libro.html">
                        <img
                            className="catedral-img"
                            alt="imagenes de la catdral"
                            src={catedralinterior}
                        ></img>
                    </a>
                    <a href="https://www.turismo.gal/librodepedra/libro.html">
                        <img
                            className="catedral-img"
                            alt="imagenes de la catdral"
                            src={botafumeiro}
                        ></img>
                    </a>
                </TabPanel>
            </div>
            <footer className={classes.creators}>
                <h2 className={classes.footer}>
                    <RiGuideFill className={classes.iconsGuide} /> A Guía do
                    Camiño <RiGuideFill className={classes.iconsGuide} />
                </h2>
                <span>Cándido Pazos Sotelo </span>
                <a href="https://www.linkedin.com/in/c%C3%A1ndidopazos-developer/">
                    <FaLinkedin className={classes.icons} />
                </a>
                <a href="https://github.com/Candi87">
                    <AiFillGithub className={classes.iconsGit} />
                </a>
                <span>Mikel Remesar Ruíz de Arcaute</span>
                <a href="https://www.linkedin.com/search/results/all/?keywords=mikel%20remesar&origin=RICH_QUERY_SUGGESTION&position=0&searchId=5507f808-23f9-4104-ac71-91224ee6079d&sid=B6k">
                    <FaLinkedin className={classes.icons} />
                </a>
                <a href="https://github.com/MikelRemesar">
                    <AiFillGithub className={classes.iconsGit} />
                </a>
            </footer>
        </div>
    );
}
