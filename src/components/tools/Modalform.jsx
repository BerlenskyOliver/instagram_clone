import React, {useState} from 'react'
import {Modal, Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Modalform({open, onClose, action, name, children}) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
        open={open}
        onClose={onClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img
              className="app_headerImage"
              src="https:/www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              />
          </center>

            {children}       
              <Button type="submit" onClick={action}>{name}</Button>
          </form>
          
        </div>
      </Modal>
    )
}

export default Modalform
