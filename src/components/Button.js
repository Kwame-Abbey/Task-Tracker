import PropTypes from 'prop-types'


export default function Button({ color, text, onClick}) {
   function handleClick() {
    console.log("Click")
   }

   return <button 
    onClick={handleClick}
    style={{backgroundColor: color}}
    className='btn'>{text}</button>
}

Button.defaultProps = {
    color: "steelblue"
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}