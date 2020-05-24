import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import Widgtet from "../../components/Widget";
import { Paper } from "@material-ui/core";
import Helper from '../../helpers/utilities';
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
    loginReducer: { userRoles },
    parameterReducer: { listData: parameterList }
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const validateWidget = (value: string) => {
    const isValid = widgetList.find((e: any) => e.slug === value);
    if (isValid) {
      return true
    }
    return false;
  }

  useEffect(() => {
    if (validateWidget('PARTNERPORTAL_saldo')) {
      dispatch(getBalance());
    }
  }, [dispatch, widgetList]);
  let reservacionesLink = null;
  if (validateWidget('PARTNERPORTAL_reservaciones')) {
    const parameterReservaciones = Helper.getParameter(parameterList, 'LINK_RESERVACIONES');
    reservacionesLink = parameterReservaciones.value
  }

  let torneosLink = null;
  if (validateWidget('PARTNERPORTAL_torneos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_TORNEOS');
    torneosLink = parameter.value
  }

  let reportePagosLink = null;
  if (validateWidget('PARTNERPORTAL_reporte-pagos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_REPORTE_PAGOS');
    reportePagosLink = parameter.value;
  }

  let estadoCuentaLink = null;
  if (validateWidget('PARTNERPORTAL_estado-cuenta')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_ESTADO_CUENTA');
    estadoCuentaLink = parameter.value;
  }

  let actualizacionDatosLink = null;
  if (validateWidget('PARTNERPORTAL_actualizacion-datos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_ACTUALIZACION_DATOS');
    actualizacionDatosLink = parameter.value;
  }


  return (
    <div className="home-container">
      <Grid container spacing={3} className={classes.widgetContainer}>
        {validateWidget('PARTNERPORTAL_saldo') &&
          <Grid item sm={12} xs={12} md={3}>
            {setBalanceLoading ? (
              <Loader />
            ) : (
                <Paper>
                  <Widgtet
                    Icon={AccountBalanceIcon}
                    title={clientBalance.saldo > 0 ? 'Saldo Deudor' : 'Saldo a Favor'}
                    amount={clientBalance.saldo}
                    type="Saldo"
                  />
                </Paper>
              )}
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_reservaciones') &&
          <Grid item sm={12} xs={12} md={3}>
            {setBalanceLoading ? (
              <Loader />
            ) : (
                <Paper>
                  <Widgtet
                    Icon={EventAvailableIcon}
                    title="Reservaciones"
                    type="Saldo"
                    amount={clientBalance.saldo}
                    link={reservacionesLink}
                  />
                </Paper>
              )}
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_torneos') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
                  <Widgtet
                    Icon={ScheduleIcon}
                    title="Torneos"
                    link={torneosLink}
                  />
                </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_reporte-pagos') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
                  <Widgtet
                    Icon={PaymentIcon}
                    title="Reporte de Pagos"
                    link={reportePagosLink}
                    internal
                  />
                </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_estado-cuenta') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
                  <Widgtet
                    Icon={AccountBalanceIcon}
                    title="Estado de Cuenta"
                    link={estadoCuentaLink}
                    internal
                  />
                </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_actualizacion-datos') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
                  <Widgtet
                    Icon={AccountBoxIcon}
                    title="Actualizacion de Datos"
                    link={actualizacionDatosLink}
                    internal
                  />
                </Paper>
          </Grid>
        }

      </Grid>
    </div>
  );
}
