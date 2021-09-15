import { AiFillHeart } from 'react-icons/ai';
import './button.css';

function Button({ id, children, onClick, liked }) {
    if (liked === 'yes') {
        return (
            <button data-testid={id} onClick={onClick} className='like-yes'>
                {children}
                <AiFillHeart />
            </button>
        );
    } else {
        return (
            <button data-testid={id} onClick={onClick} className='like'>
                {children}
                <AiFillHeart />
            </button>
        );
    }
}

export { Button };
