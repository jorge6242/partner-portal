import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import Widgtet from "../../components/Widget";
import { Paper } from "@material-ui/core";
import Loader from "../../components/common/Loader";
import { getBalance } from "../../actions/webServiceActions";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  widgetContainer: {
    marginBottom: "100px"
  }
});

export default function Home() {
  const classes = useStyles();
  const {
    webServiceReducer: {
      clientBalance,
      setBalanceLoading,
    },
    menuReducer: {
      widgetList,
    },
    loginReducer: { userRoles }
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const isRolePartner = userRoles.find((e:any) => e.slug === "socio");
  
  const validateWidget = (value: string) => {
    const isValid = widgetList.find((e: any) => e.slug === value);
    if(isValid) {
      return true
    }
    return false;
  }

  useEffect(() => {
    if(validateWidget('PARTNERPORTAL_saldo') && !_.isEmpty(isRolePartner)) {
        dispatch(getBalance());
      }
  }, [dispatch, isRolePartner, userRoles, widgetList]);

  return (
    <div className="home-container">
      <Grid container spacing={3} className={classes.widgetContainer}>
        { validateWidget('PARTNERPORTAL_saldo') && isRolePartner &&
          <Grid item xs={3}>
          {setBalanceLoading ? (
            <Loader />
          ) : (
            <Paper>
              <Widgtet
                Icon={AccountBalanceIcon}
                title="Saldo"
                amount={clientBalance.saldo}
              />
            </Paper>
          )}
        </Grid>
        }
     
      </Grid>
    </div>
  );
}
