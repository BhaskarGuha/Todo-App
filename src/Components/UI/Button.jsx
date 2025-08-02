import React from 'react'
import styles from "./Button.module.css"

const Button = (props) => {
  return (
    <button
        type={props.type ? props.type : 'button'}
        onClick={props.onClick}
        className={`${props.className} ${styles.btn}`}
    >
        {props.children}
    </button>
  )
}

export default Button