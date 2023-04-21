import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

export default function Header({ title, onAdd, showAdd }) {

    // const headingStyle = {
    //     color: "red",
    //     backgroundColor: "black"
    // }

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
            color={showAdd? 'red' : 'green'} 
            text={showAdd ? 'Close' : 'Add'} 
            onClick={onAdd} 
            />}
            

        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

