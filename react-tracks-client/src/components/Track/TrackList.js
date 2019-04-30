import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioPlayer from "../Shared/AudioPlayer";
import LikeTrack from "../Track/LikeTrack";
import DeleteTrack from "./DeleteTrack";
import UpdateTrack from "./UpdateTrack";


const TrackList = ({ classes, tracks }) => (
  <List>
    {
      tracks.map(track => (
        <ExpansionPanel key={track.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <List>
              <ListItem className={classes.root}>
                <LikeTrack />
                <ListItemText primaryTypographyProps={{ variant: "subheading", color: "primary" }} className={classes.link} primary={track.title} secondary={<Link to={`/profile/${track.postedBy.id}`}>
                  {track.postedBy.username}
                </Link>
                } />
                <AudioPlayer />
              </ListItem>
            </List>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography variant="body1" />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <UpdateTrack />
            <DeleteTrack />
          </ExpansionPanelActions>
        </ExpansionPanel>
      ))
    }
  </List>
);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(TrackList);
