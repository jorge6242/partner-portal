import React, { FunctionComponent, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOrder, getUnpaidInvoices, getReportedPayments } from '../../actions/webServiceActions';
import { updateModal } from '../../actions/modalActions';

interface ComponentProps {
    invoiceId: any;
    description: any;
    customId: any;
    amount: any;
    amountDetail: any;
}

const Paypal: FunctionComponent<ComponentProps> = ({ invoiceId, description, customId, amount, amountDetail }) => {
    const dispatch = useDispatch();
    const client = "Ab8frqGsF4rlmjIH9mS9kTdaGo2-vLh-v0PK5G1ZxeKBSTbAkygWF3eRCPYydHRtQBGlRJyLPDY4v5Aw";
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}><strong>Descripcion:</strong> {description}</Grid>
                    <Grid item xs={12}><strong>Nro Nota:</strong> {invoiceId}</Grid>
                    <Grid item xs={12}><strong>Monto:</strong> {amountDetail} USD</Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {
                    client && (
                        <PayPalButton
                            createOrder={(data: any, actions: any) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        description,
                                        custom_id: customId,
                                        invoice_id: `F-${invoiceId}`,
                                        amount: {
                                            currency_code: "USD",
                                            value: amount
                                        }
                                    }],
                                });
                            }}
                            onApprove={(data: any, actions: any) => {
                                // Capture the funds from the transaction
                                dispatch(updateModal({
                                    payload: {
                                        isLoader: true,
                                    }
                                }));
                                return actions.order.capture().then(async (details: any) => {
                                    // Show a success message to your buyer
                                    // alert("Transaction completed by " + details.payer.name.given_name);
                                    // OPTIONAL: Call your server to save the transaction
                                    const body = {
                                        order: data.orderID,
                                        invoice: `F-${invoiceId}`,
                                        amount
                                    };
                                    await dispatch(setOrder(body));
                                    dispatch(getUnpaidInvoices());
                                    dispatch(getReportedPayments());
                                    dispatch(updateModal({
                                        payload: {
                                            isLoader: false,
                                        }
                                    }));
                                });
                            }}
                            options={{
                                clientId: client
                            }}
                        />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default Paypal;