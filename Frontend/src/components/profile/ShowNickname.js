import '../../pages/profile/profile.css';

function ShowNickname({ name, nickname, className }) {
    return (
        <div>
            <p className={className}>{name}</p>
            <p className={className}>{nickname}</p>
        </div>
    );
}

export default ShowNickname;
