import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import * as appStyle from './headerPageCss';

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ color: 'white', marginTop: '7px' }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#585858',
		width: '100%',
	},

});

class FullWidthTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
	}


	handleChange(event, value) {
		this.setState({ value });
	}

	handleChangeIndex(index) {
		this.setState({ value: index });
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" color="default" style={appStyle.navigation}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						style={{ color: 'white' }}
						fullWidth
					>
						<Tab label="Home" component={Link} to="/"/>
						<Tab label="All Categories" component={Link} to="/categories"/>
						<Tab label="Recommended Book Lists" component={Link} to="/recommendation"/>
					</Tabs>
				</AppBar>
			</div>
		);
	}
}

FullWidthTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
