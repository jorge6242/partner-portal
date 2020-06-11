import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import queryString from 'query-string'
import _ from 'lodash';

import Dashboard from "../containers/dashboard";
import Product from "../containers/product";
import Modal from "../components/Modal";
import SecondModal from "../components/SecondModal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import SecureStorage from "./SecureStorage";
// import Category from "../containers/category";
import { checkLogin, setupInterceptors } from "../actions/loginActions";
// import Bank from "../containers/bank";
// import Country from "../containers/Country";
// import Sport from "../containers/Sport";
// import Profession from "../containers/Profession";
import Person from "../containers/person";
// import MaritalStatus from "../containers/maritalStatus";
// import StatusPerson from "../containers/statusPerson";
// import Gender from "../containers/gender";
// import Role from "../containers/role";
// import Permission from "../containers/permission";
import User from "../containers/user";
import Home from "../containers/home";
import Reports from "../containers/reports";
import ExpirationCard from "../containers/Templates/ExpirationCard";
// import RelationType from "../containers/relationType";
// import PaymentMethod from "../containers/paymentMethod";
// import CardType from "../containers/cardType";
import { getAll as getStatusPersonAll } from "../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../actions/maritalStatusActions";
import { getAll as getGenderAll } from "../actions/genderActions";
import { getAll as getCountries } from "../actions/countryActions";
import { getAll as getRelationTypes } from "../actions/relationTypeActions";
import { getAll as getPaymentMethods } from "../actions/paymentMethodActions";
import { getList as getTransactionTypes } from "../actions/transactionTypeActions";
import { getList as getCurrencies } from "../actions/currencyActions";
import { getAll as getSports } from "../actions/sportActions";
import { getList as getLockerLocationList } from "../actions/lockerLocationsActions";
// import TransactionType from "../containers/transactionType";
// import ShareMovement from "../containers/shareMovement";
// import ShareType from "../containers/shareType";
// import Share from "../containers/share";
// import Location from "../containers/location";
// import GeneralReport from "../containers/reports/GeneralReport";
// import SharesReport from "../containers/reports/SharesReport";
// import AccessControlReport from "../containers/reports/AccessControlReport";
import Parameter from "../containers/parameter";
// import Locker from "../containers/locker";
import Partners from "../containers/partner";
import ReportePagos from "../containers/reportePagos";
import StatusAccount from "../containers/StatusAccount";
import Widget from "../containers/widget";
import Menu from "../containers/menu";
import Permission from "../containers/permission";
import Role from "../containers/role";
import MainLoader from "../components/MainLoading";
import MenuItem from "../containers/MenuItem";
import CustomModal from "../components/CustomModal";
import NotFound from "../containers/notFound";
import About from "../containers/about";
import Help from "../containers/help";
import MyAccess from "../containers/MyAccess";
import PaymentsManagement from "../containers/paymentsManagement";
import UnpaidInvoices from "../containers/unpaidInvoices";
import ReportedPayments from "../containers/reportedPayments";
import Contact from "../containers/contact";

export default function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  },[dispatch])
  return (
    <HashRouter>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/template/expiration-cards" component={ExpirationCard} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
                return (
                  <Switch>
                    <Dashboard>
                      <Route path="/dashboard/main" component={Home} />
                      <Route path="/dashboard/role" component={Role} />
                      <Route
                        path="/dashboard/permission"
                        component={Permission}
                      />
                      <Route path="/dashboard/reports" component={Reports} />
                      <Route path="/dashboard/user" component={User} />
                      <Route path="/dashboard/actualizacion-datos" component={Person} />
                      <Route path="/dashboard/partner" component={Partners} />
                      <Route path="/dashboard/reporte-pagos" component={ReportePagos} />
                      <Route path="/dashboard/status-account" component={StatusAccount} />
                      <Route path="/dashboard/widget" exact component={Widget} />
                      <Route path="/dashboard/menu" exact component={Menu} />
                      <Route path="/dashboard/menu-item" exact component={MenuItem} />
                      <Route path="/dashboard/parameter" exact component={Parameter} />
                      <Route path="/dashboard/not-found" exact component={NotFound} />
                      <Route path="/dashboard/about" exact component={About} />
                      <Route path="/dashboard/help" exact component={Help} />
                      <Route path="/dashboard/my-access" exact component={MyAccess} />
                      <Route path="/dashboard/payments-management" exact component={PaymentsManagement} />
                      <Route path="/dashboard/unpaid-invoices" exact component={UnpaidInvoices} />
                      <Route path="/dashboard/reported-payments" exact component={ReportedPayments} />
                      <Route path="/dashboard/contact" exact component={Contact} />
                    </Dashboard>
                  </Switch>
                );
            }}
          />
        </Switch>
        <Modal />
        <SecondModal />
        <CustomModal />
        <SnackBar />
        <MainLoader />
      </MainLayout>
    </HashRouter>
  );
}
