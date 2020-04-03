
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './index.sass';

/**
 * Custom Generic Modal
 *
 * @param {boolean} status Status Loading
 *
 * behavior :
 *
 * import { mainStatusLoading } from 'Actions/mainLoadingActions';
 *
 * this.props.mainStatusLoading(status) Open / Close
 *
 */

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const MainLoading = ({ isLoading }) => (
  <div className={`loading-container ${isLoading ? 'loading-container--enable' : 'loading-container--disable'}`}>
    <div className="container-center login">
      <div className="login__title">
        <p className="login__welcome">Loading data...</p>
        <p className="logo-evangelus">EVANGELUS</p>
      </div>
    </div>
  </div>
);

MainLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mS = ({ mainLoadingReducer: { isLoading } }) => ({ isLoading });

export default withStyles(styles)(connect(mS, null)(MainLoading));
