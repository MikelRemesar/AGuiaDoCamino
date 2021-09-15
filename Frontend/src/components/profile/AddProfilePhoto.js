import React from 'react';

import CustomModal from '../../services/CustomModal';
import { useModalWithData } from '../../services/useModal';
import '../../pages/profile/profile.css';

function AddProfilePhoto() {
    const [setIsModalOpened, isModalOpened, modalData, setModalData] =
        useModalWithData();

    return (
        <div>
            <CustomModal
                isActive={isModalOpened}
                handleClose={() => setIsModalOpened(false)}
            ></CustomModal>
            <button
                className='button-changue-profile-photo'
                onClick={() => {
                    setModalData('subir imagen');
                    setIsModalOpened(true);
                }}
            >
                Subir foto de perfil
            </button>
        </div>
    );
}

export default AddProfilePhoto;
