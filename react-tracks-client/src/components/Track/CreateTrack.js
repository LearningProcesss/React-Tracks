import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

const CreateTrack = ({ classes }) => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const handleAudioChange = event => {
    console.log(event);
    
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  return (
    <>

      <Button onClick={() => setOpen(true)} variant="fab" color="secondary" className={classes.fab}>
        {open ? <ClearIcon /> : <AddIcon />}
      </Button>
      <Dialog open={open} className={classes.dialog}>
        <form>
          <DialogTitle>Create Track</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a title,description and audio file
              </DialogContentText>
            <FormControl fullWidth>
              <TextField onChange={event => setTitle(event.target.value)} label="Title" placeholder="Add a Title" className={classes.textField}></TextField>
            </FormControl>
            <FormControl fullWidth>
              <TextField onChange={event => setDescription(event.target.value)} multiline rows="2" label="Description" placeholder="Add a Description" className={classes.textField}></TextField>
            </FormControl>
            <FormControl>
              <input onChange={handleAudioChange} accept="audio/mp3,audio/wave,audio/*" id="audio" required type="file" className={classes.input}></input>
              <label htmlFor="audio">
                <Button variant="outlined" color={file ? "secondary" : "inherit"} component="span" className={classes.button}>
                  Audio file
                    <LibraryMusicIcon className={classes.icon} />
                </Button>
                {file && file.name}
              </label>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} className={classes.cancel}>
              Cancel
              </Button>
            <Button disabled={!title.trim() || !description.trim() || !file} className={classes.save} type="submit">
              Add Track
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  )
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing.unit
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: "200"
  }
});

export default withStyles(styles)(CreateTrack);
