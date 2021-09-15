import '../../pages/profile/profile.css';

function GetAvatarPhoto({ avatar, name }) {
    return (
        <div>
            <img
                src={avatar}
                className="photo-profile"
                alt={`Avatar del usuario ${name}`}
            ></img>
        </div>
    );
}
export default GetAvatarPhoto;
