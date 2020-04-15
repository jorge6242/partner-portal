import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getList } from '../../actions/parameterActions'
import Helper from '../../helpers/utilities';

export default function About(){
    const dispatch = useDispatch();
    const { 
        parameterReducer: { listData: parameterList } 
    } = useSelector((state: any) => state);

    useEffect(() => {
        dispatch(getList());
    },[dispatch])

    return (
        <Grid container style={{ marginTop: 20 }}>
            <Grid item xs={12} style={{ marginBottom: 10 }}><strong>Portal Socios</strong></Grid>
            {
                Helper.checkParameter(parameterList, "DB_VERSION") && (
                <Grid item xs={12}>Version Modelo Bade de datos: {Helper.getParameter(parameterList, 'DB_VERSION')}</Grid>
                )
            }
                        {
                Helper.checkParameter(parameterList, "FRONTEND_VERSION") && (
                    <Grid item xs={12}>Version Interfaz: {Helper.getParameter(parameterList, 'FRONTEND_VERSION')}</Grid>
                )
            }
                        {
                Helper.checkParameter(parameterList, "BACKEND_VERSION") && (
                    <Grid item xs={12}>Version Backend : {Helper.getParameter(parameterList, 'BACKEND_VERSION')}</Grid>
                )
            }
        </Grid>
    )
}