import React, { useEffect } from "react";
import { Grid, Chip, makeStyles, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from '@material-ui/icons/Message';

import { getAll, update, filter } from "../../actions/reportePagosActions";
import DataTable4 from "../../components/DataTable4";
import CustomSearch from "../../components/FormElements/CustomSearch";
import moment from "moment";
import { updateModal } from "../../actions/modalActions";
import ReportePagoNotaForm from "../../components/ReportePagoNotaForm";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect";
import CustomTextField from "../../components/FormElements/CustomTextField";
import { getList as getBancoReceptorList } from "../../actions/bancoReceptorActions";

interface Columns {
    id:
    | "idPago"
    | "nMonto"
    | "NroReferencia"
    | "sDescripcion"
    | "EstadoCuenta"
    | "status"
    | "dFechaProceso"
    | "Login"
    | "Archivos"
    | "codBancoOrigen"
    | "codCuentaDestino"
    | "NroReferencia2"
    | "dFechaRegistro"
    | "dFechaPago"
    | "Moneda"
    | "Nota"
    | "banco_origen"
    | "cuenta"
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
}


const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    printButtonContainer: {
        textAlign: "right",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    rangleTitle: {
        lineHeight: 3,
        fontWeight: 'bold'
    },
    filtersContainer: {
        marginBottom: 10
    },
    subtitleRow: {
        textAlign: 'center',
    },
    personSearchTitle: {
        lineHeight: 4
    }
}));

type FormData = {
    status: string;
    banco: string;
    bancoDestino: string;
    referencia: string;
    accion: string;
};


export default function PaymentsManagement() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { list, loading, pagination } = useSelector(
        (state: any) => state.reportePagosReducer
    );

    const {
        handleSubmit,
        register,
        errors,
        reset,
        getValues
    } = useForm<FormData>();

    const {
        bancoReceptorReducer: { listData: bancoReceptorList }
    } = useSelector((state: any) => state)

    useEffect(() => {
        dispatch(getBancoReceptorList());
    }, [dispatch]);

    const getStatusNote = (row: any) => {
        const value = list.find((e: any) => e.idPago == row);
        return value.Nota;
    }

    const handleNote = (row: any) => {
        dispatch(
            updateModal({
                payload: {
                    status: true,
                    element: <ReportePagoNotaForm id={row} />
                }
            })
        );
    }

    const columns: Columns[] = [
        {
            id: "dFechaRegistro",
            label: "Registrado",
            minWidth: 20,
            component: (value: any) => <span>{value.value && moment(value.value).format('YYYY-MM-DD')} <br /> {moment(value.value).format('hh:mm:ss A')}</span>,
        },
        {
            id: "Login",
            label: "Accion",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "dFechaProceso",
            label: "Fecha",
            minWidth: 20,
            align: "left",
            component: (value: any) => <span>{value.value && moment(value.value).format('YYYY-MM-DD')} <br /> {moment(value.value).format('hh:mm:ss A')}</span>,
        },
        {
            id: "NroReferencia",
            label: "Referencia",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "sDescripcion",
            label: "Descripcion",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "banco_origen",
            label: "Banco Origen",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value && value.value.cNombreBanco}</span>,
        },
        {
            id: "cuenta",
            label: "Cuenta",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value && value.value.cNumCuenta}</span>,
        },
        {
            id: "Moneda",
            label: "Moneda",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "nMonto",
            label: "Monto",
            minWidth: 10,
            align: "left",
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "idPago",
            label: "Nota",
            minWidth: 10,
            align: "left",
            component: (value: any) => {
                const note = getStatusNote(value.value);
                return (
                    <IconButton
                        aria-label="file"
                        size="small"
                        color="primary"
                        onClick={() => handleNote(value.value)}
                    >
                        <MessageIcon style={{ color: note ? '#2980b9' : '#2c3e50' }} fontSize="inherit" />
                    </IconButton>
                )
            }
        },
        {
            id: "Archivos",
            label: "Comprobante",
            minWidth: 10,
            align: "left",
            component: (value: any) => {
                return (
                    <a target="_blank" href={value.value} title="comprobante" >
                        <IconButton
                            aria-label="file"
                            size="small"
                            color="primary"
                        >
                            <SearchIcon fontSize="inherit" />
                        </IconButton>
                    </a>
                )
            }
        },
        {
            id: "status",
            label: "",
            minWidth: 20,
            align: "right",
            component: (value: any) => {
                let status = '';
                let backgroundColor = '';
                if (value.value == "0") {
                    status = "En proceso";
                    backgroundColor = '#2980b9';
                }
                if (value.value == "1") {
                    status = "Procesado";
                    backgroundColor = '#2ecc71';
                }
                if (value.value == "-1") {
                    status = "Rechazado";
                    backgroundColor = '#e74c3c';
                }
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "10px"
                        }}
                        size="small"
                    />
                )
            }
        }
    ];

    useEffect(() => {
        async function fetchData() {
            dispatch(getAll());
        }
        fetchData();
    }, [dispatch]);

    const handleSearch = (event: any) => {
        if (event.value.trim() === "") {
            dispatch(getAll());
        } else {
            //dispatch(search(event.value))
        }
    };

    const handleSwitchStatus = async (row: any) => {
        let status = '';
        if (row.status == '0') {
            status = '1';
        } else {
            status = row.status == "1" ? '-1' : '1';
        }
        const data = {
            status
        };
        dispatch(update(row.idPago, data));
    }

    const handleForm = async (form: FormData) => {
        dispatch(filter(form));
    };

    const handleChangePage = (newPage: number) => {
        const form = getValues();
        const page = pagination.currentPage === 1 ? 2 : newPage;
        dispatch(filter(form, page, pagination.perPage))
    };

    const handlePerPage = (page: number, perPage: number) => {
        const form = getValues();
        dispatch(filter(form, page, perPage))
    }

    return (
        <Grid container spacing={3}>
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid item xs={12} style={{ fontSize: 18 }}>Gestion de Cobranza</Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        placeholder="Accion"
                                        field="accion"
                                        register={register}
                                        errorsField={errors.accion}
                                        errorsMessageField={
                                            errors.accion && errors.accion.message
                                        }
                                        Icon={SearchIcon}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomSelect
                                        label="Status"
                                        selectionMessage="Seleccione"
                                        field="status"
                                        register={register}
                                        errorsMessageField={
                                            errors.status && errors.status.message
                                        }
                                    >
                                        <option value={0}> En Proceso </option>
                                        <option value={1}> Procesado </option>
                                        <option value={-1}> Rechazado </option>
                                    </CustomSelect>
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        placeholder="Referencia"
                                        field="referencia"
                                        register={register}
                                        errorsField={errors.referencia}
                                        errorsMessageField={
                                            errors.referencia && errors.referencia.message
                                        }
                                        Icon={SearchIcon}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" type="submit" style={{ marginTop: 15 }}>
                                        Buscar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomTextField
                                placeholder="Banco"
                                field="banco"
                                register={register}
                                errorsField={errors.banco}
                                errorsMessageField={
                                    errors.banco && errors.banco.message
                                }
                                Icon={SearchIcon}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <CustomSelect
                                label="Cuenta"
                                selectionMessage="Seleccione"
                                field="bancoDestino"
                                register={register}
                                errorsMessageField={
                                    errors.bancoDestino &&
                                    errors.bancoDestino.message
                                }
                            >
                                {bancoReceptorList.map((item: any) => (
                                    <option key={item.cCodCuenta} value={item.cCodCuenta}>
                                        {`${item.cNombreBanco} - ${item.cNumCuenta.substring(12, 16)}`}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <DataTable4
                        rows={list}
                        pagination={pagination}
                        columns={columns}
                        loading={loading}
                        onChangePage={handleChangePage}
                        onChangePerPage={handlePerPage}
                        handleSwitch={handleSwitchStatus}
                    />
                </Grid>
            </form>
        </Grid>
    );
}
