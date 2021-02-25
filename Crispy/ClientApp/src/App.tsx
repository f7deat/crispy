import * as React from 'react';
import './custom.css'
import Login from './components/Login';
import Home from './components/Home';
import axios from 'axios';

const App = () => {

    const [authenticated, setAuthenticated] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        axios.get('/Home/IsAuthenticated').then(response => {
            setAuthenticated(response.data);
            setLoading(true)
        })
    }, [])

    return (
        <div className="h-full">
            {
                loading && (authenticated ? (<Home setAuthenticated={setAuthenticated}/>) : (<Login setAuthenticated={setAuthenticated} />))
            }
        </div>

    );
}
export default App
