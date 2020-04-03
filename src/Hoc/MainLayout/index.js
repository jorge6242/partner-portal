import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import SecureStorage from "../../config/SecureStorage";
import { checkLogin, setupInterceptors } from "../../actions/loginActions";
import { setForcedLogin } from "../../actions/loginActions";
import { getAll as getStatusPersonAll } from "../../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../../actions/maritalStatusActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getAll as getCountries } from "../../actions/countryActions";
import { getAll as getRelationTypes } from "../../actions/relationTypeActions";
import { getAll as getPaymentMethods } from "../../actions/paymentMethodActions";
import { getList as getTransactionTypes } from "../../actions/transactionTypeActions";
import { getList as getCurrencies } from "../../actions/currencyActions";
import { getAll as getSports } from "../../actions/sportActions";
import { getList as getLockerLocationList } from "../../actions/lockerLocationsActions";
import { getList as getMenuList } from "../../actions/menuActions";
import { getClient } from "../../actions/personActions";

export default function MainLayout(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = SecureStorage.getItem("token");
  const { user } = useSelector(state => state.loginReducer);
  console.log("location.pathname ", location.pathname);
  useEffect(() => {
    async function run() {
      const values = queryString.parse(location.search);
      if (!_.isEmpty(values) && values.socio && values.token) {
        if (
          location.pathname === "/dashboard/status-account" ||
          location.pathname === "/dashboard/actualizacion-datos"
        )
          await dispatch(setForcedLogin(values.socio, values.token));
      }
      await dispatch(checkLogin());
      console.log("user", user);
      dispatch(getClient(user.username));
      setupInterceptors();
      if (location.pathname !== "/") {
        dispatch(getMenuList());
        dispatch(getStatusPersonAll());
        dispatch(getMaritalStatusAll());
        dispatch(getGenderAll());
        dispatch(getCountries());
        dispatch(getRelationTypes());
        dispatch(getPaymentMethods());
        dispatch(getTransactionTypes());
        dispatch(getCurrencies());
        dispatch(getSports());
        dispatch(getLockerLocationList());
      }
    }
    run();
  }, [dispatch]);

  return <div> {props.children} </div>;
}
