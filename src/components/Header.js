import PropTypes from 'prop-types'
import Button from './Button'

export default function Header({ title}) {

    // const headingStyle = {
    //     color: "red",
    //     backgroundColor: "black"
    // }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color="green" text="Add" onClcik={onclick} />
            

        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

