import { Backdrop, Fade, Modal, Box, Typography, Button } from "@material-ui/core"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalApprove({ open, handleClose, handleApprove, handleCancel }) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2" color='error'>
                        Danger zone!
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this/these item(s)?
                    </Typography>
                    <Button onClick={handleCancel}>No</Button>
                    <Button onClick={handleApprove} color='error'>Yes</Button>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ModalApprove
