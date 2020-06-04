import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Parse from 'react-html-parser';

import CustomTextField from "../FormElements/CustomTextField";
import { create } from "../../actions/reportePagosActions";
import { getList as getBancoEmisorList } from "../../actions/bancoEmisorActions";
import { getList as getBancoReceptorList } from "../../actions/bancoReceptorActions";
import CustomSelect from "../FormElements/CustomSelect";
import Upload from "../FormElements/Upload";
import { getReportedPayments } from "../../actions/webServiceActions";
import { Grid } from "@material-ui/core";

// const __html = require('./DatosPago.html');

// const template = { __html: __html };

// function Template () {
//     return ( <div dangerouslySetInnerHTML={template} /> );
// }

declare global {
    interface Window {
        TEMPLATE_INFO: any;
    }
}

const templateInfo = window.TEMPLATE_INFO;

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
        textAlign: 'center',
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -9,
        marginLeft: -9
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '30%',
    },
    select: {
        padding: '10px 0px 10px 0px',
        width: ' 100%',
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: '1px solid grey',
        fontSize: '16px'
    }
}));

type FormData = {
    nMonto: string,
    NroReferencia: string,
    NroReferencia2: string,
    sDescripcion: string,
    EstadoCuenta: string,
    status: string,
    dFechaProceso: string,
    Login: string,
    Archivos: string,
    codBancoOrigen: string,
    codCuentaDestino: string,
    dFechaRegistro: string,
    dFechaPago: string;
    file1: string;
};

type FormComponentProps = {
    id?: number;
};

const ReportePagosForm: FunctionComponent<FormComponentProps> = ({ id }) => {
    const classes = useStyles();
    const {
        handleSubmit,
        register,
        errors,
        reset,
        setValue,
        getValues
    } = useForm<FormData>();
    const loading = useSelector((state: any) => state.genderReducer.loading);

    const { user } = useSelector((state: any) => state.loginReducer);
    const dispatch = useDispatch();

    const { listData: bancoEmisorList } = useSelector(
        (state: any) => state.bancoEmisorReducer
    );

    const { listData: bancoReceptorList } = useSelector(
        (state: any) => state.bancoReceptorReducer
    );
    useEffect(() => {
        dispatch(getBancoEmisorList());
        dispatch(getBancoReceptorList());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    //     Status lo colocas en 0
    // dFechaProceso NULL
    // DFechaRegistro es la fecha actual
    // EstadoCuenta no recuerdo que era lo que se guardaba aqui

    const handleForm = async (form: any) => {
        const { NroReferencia } = getValues();
        const monto = form.nMonto.replace(',', '');
        const body = {
            ...form,
            dFechaProceso: null,
            dFechaRegistro: moment().format('YYYY-MM-DD'),
            EstadoCuenta: '',
            status: 0,
            Login: user.username,
            NroReferencia2: NroReferencia,
            nMonto: monto,
            Moneda: 'USD',
        }
        await dispatch(create(body));
        reset();
        dispatch(getReportedPayments());
    };
    //substring(12, 16)
    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reporte de Pagos
        </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <Grid container spacing={1} >
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomSelect
                                label="Banco Origen"
                                selectionMessage="Seleccione"
                                field="codBancoOrigen"
                                required
                                register={register}
                                errorsMessageField={
                                    errors.codBancoOrigen &&
                                    errors.codBancoOrigen.message
                                }
                            >
                                {bancoEmisorList.map((item: any) => (
                                    <option key={item.cCodBanco} value={item.cCodBanco}>
                                        {item.cNombreBanco}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomTextField
                                placeholder="Referencia"
                                field="NroReferencia"
                                required
                                register={register}
                                errorsField={errors.NroReferencia}
                                errorsMessageField={
                                    errors.NroReferencia && errors.NroReferencia.message
                                }
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomTextField
                                placeholder="Fecha"
                                field="dFechaPago"
                                required
                                register={register}
                                errorsField={errors.dFechaPago}
                                errorsMessageField={
                                    errors.dFechaPago && errors.dFechaPago.message
                                }
                                type="date"
                                maxDate={moment().format("YYYY-MM-DD")}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomSelect
                                label="Banco Destino"
                                selectionMessage="Seleccione"
                                field="codCuentaDestino"
                                required
                                register={register}
                                errorsMessageField={
                                    errors.codCuentaDestino &&
                                    errors.codCuentaDestino.message
                                }
                            >
                                {bancoReceptorList.map((item: any) => (
                                    <option key={item.cCodCuenta} value={item.cCodCuenta}>
                                        {`${item.cNombreBanco} - ${item.cNumCuenta.substring(12, 16)}`}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomTextField
                                placeholder="Monto"
                                field="nMonto"
                                required
                                register={register}
                                errorsField={errors.nMonto}
                                errorsMessageField={
                                    errors.nMonto && errors.nMonto.message
                                }
                                formatNumber
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <CustomTextField
                                placeholder="Descripcion"
                                field="sDescripcion"
                                required
                                register={register}
                                errorsField={errors.sDescripcion}
                                errorsMessageField={
                                    errors.sDescripcion && errors.sDescripcion.message
                                }
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={12} style={{ paddingTop: 15 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>Comprobante de Pago</Grid>
                                <Grid item xs={12}><Upload
                                    field="file1"
                                    label="Archivo"
                                    register={register}
                                    setValue={setValue}
                                /></Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <div className={classes.wrapper}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    className={classes.submit}
                                >
                                    Registrar
                        </Button>
                                {loading && (
                                    <CircularProgress size={24} className={classes.buttonProgress} />
                                )}
                            </div>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <div style={{ marginTop: 30 }} >
                                {Parse(templateInfo)}
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default ReportePagosForm;
