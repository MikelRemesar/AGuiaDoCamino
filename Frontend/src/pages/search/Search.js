import './search.css';
import ListOfResults from '../../components/listofresults/ListOfResults';
import { useState } from 'react';
import Menu from '../../components/menu/menu';

function Search() {
    const [keyword, setKeyword] = useState('');

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    const none = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Menu />
            <div className="searchpage">
                <form onSubmit={none}>
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Busca la imagen que quieras"
                        value={keyword}
                    />
                </form>
                <div className="showsearch-container">
                    <ListOfResults keyword={keyword} />
                </div>
            </div>
        </div>
    );
}
export default Search;
