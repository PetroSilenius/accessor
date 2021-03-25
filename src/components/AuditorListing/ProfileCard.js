import {
	Container,
	Grid,
	makeStyles,
	Paper,
	Typography,
  } from "@material-ui/core";
  import { Rating } from "@material-ui/lab";
  
  const useStyles = makeStyles((theme) => ({
	container: {
	  backgroundColor: theme.palette.secondary.main,
	  backgroundImage: theme.backgroundImage,
	  backgroundAttachment: "fixed",
	  backgroundSize: "cover",
	  minHeight:700
	},
	card: {
	  backgroundColor: theme.palette.secondary.lighter,
	},
	profileImg: {
	  width: 100,
	  margin: "auto",
	},
	submitButton: {
	  margin: 20,
	  "& button": {
		float: "right",
	  },
	},
  }));
  


export default function ProfileCard({ user }) {
	const classes = useStyles();
	return (
	  <Grid item xs={3}>
		<Paper style={{padding:10}} >
			<Grid container direction="column">
			<img className={classes.profileImg} src={user.photoUrl}></img>
			<Grid container justify="center">
			  <div style={{ width: 120 }}>
				<Rating
				  name="disabled"
				  value={user.rating}
				  precision={0.5}
				  disabled
				/>
			  </div>
			</Grid>
			<Typography variant="h6">{user.company}</Typography>
			<Typography>"{user.description}"</Typography>
			<Typography style={{fontWeight:"bold"}}>{user.hourlyRate}€/h</Typography>
			</Grid>
		</Paper>
	  </Grid>
	);
  }
  