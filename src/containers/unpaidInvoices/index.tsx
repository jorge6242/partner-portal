import React, { useEffect } from "react";
import _ from 'lodash';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { getUnpaidInvoices } from "../../actions/webServiceActions";
import { updateModal } from "../../actions/modalActions";
import LockerForm from "../../components/LockerForm";
import DataTable4 from '../../components/DataTable4'
import UnpaidInvoicesColumns from '../../interfaces/UnpaidInvoicesColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';
import moment from "moment";
import Paypal from "../../components/Paypal";
import Helper from '../../helpers/utilities';

function formatNumber(num: any) {
  num = "" + Math.floor(num * 100.0 + 0.5) / 100.0;

  var i = num.indexOf(".");

  if (i < 0) num += ",00";
  else {
    num = num.substring(0, i) + "," + num.substring(i + 1);
    var nDec = (num.length - i) - 1;
    if (nDec == 0) num += "00";
    else if (nDec == 1) num += "0";
    else if (nDec > 2) num = num.substring(0, i + 3);
  }

  return num;
}

const columns: UnpaidInvoicesColumns[] = [
  {
    id: "fact_num",
    label: "Nro",
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "fec_emis",
    label: "Emision",
    minWidth: 10,
    component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
  },
  {
    id: "fec_venc",
    label: "Vencimiento",
    minWidth: 10,
    component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
  },
  {
    id: "descrip",
    label: "Descripcion",
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "saldo",
    label: "Saldo",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
];

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '18px',
  },
  searchContainer: {
    paddingBottom: '2%'
  },
  tableContainer: {
    marginTop: 20,
  }
}));

export default function UnpaidInvoices() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    unpaidInvoices, setUnpaidInvoicestLoading,
  } = useSelector((state: any) => state.webServiceReducer);

  const { 
    parameterReducer: { listData: parameterList },
    loginReducer: { user },
   } = useSelector((state: any) => state);

  const paypalParameter = Helper.getParameter(parameterList, 'PAYPAL_CLIENT_ID');
  const habilitarPagoParameter = Helper.getParameter(parameterList, 'HABILITAR_PAGO');
  const paypalClientId =  !_.isEmpty(paypalParameter) && habilitarPagoParameter.value == 1 && !_.isEmpty(paypalParameter) && paypalParameter.value !== '' ? paypalParameter.value : null;

  useEffect(() => {
    async function fetchData() {
      dispatch(getUnpaidInvoices());
    }
    fetchData();
  }, [dispatch]);

  const handlePayment = (row: any) => {
    // console.log('row', row);
    const monto = Number(row.saldo);
    dispatch(
        updateModal({
            payload: {
                status: true,
                element: <Paypal 
                    description={row.descrip} 
                    invoiceId={row.fact_num} 
                    customId={user.username} 
                    amountDetail={monto.toFixed(2)}
                    amount={monto.toFixed(2)}
                    client={paypalClientId}
                    />,
            }
        })
    );
}
  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.headerTitle}>Facturas</div>
      </div>
      <div className={classes.tableContainer}>
        <DataTable4
          rows={unpaidInvoices.data}
          columns={columns}
          loading={setUnpaidInvoicestLoading}
          aditionalColumn={unpaidInvoices.total && unpaidInvoices.total > 0 ? formatNumber(unpaidInvoices.total) : null}
          aditionalColumnLabel={unpaidInvoices.total && unpaidInvoices.total > 0 ? "Total" : null}
          handlePayment={ paypalClientId ? handlePayment : null}
        />
      </div>
    </div>
  );
}
