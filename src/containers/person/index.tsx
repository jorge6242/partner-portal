import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import './index.sass';
import { getAll } from "../../actions/personActions";
import { updateModal } from "../../actions/modalActions";
import PersonForm from "../../components/PersonForm";
import DataTable4 from '../../components/DataTable4';
import PersonColumn from '../../interfaces/PersonColumn';

const columns: PersonColumn[] = [
  { id: "id", 
  label: "Id", minWidth: 20,
  component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 170,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 170,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "primary_email",
    label: "Correo Primario",
    minWidth: 170,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "rif_ci",
    label: "RIF/CI",
    minWidth: 170,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "relationship",
    label: "Parentesto",
    minWidth: 170,
    align: "right",
    component: (value: any) => <span>{value.value ? value.value.relation_type.description : 'TITULAR' }</span>,
  },
];

export default function Person() {
  const dispatch = useDispatch();
  const { persons, loading } = useSelector((state: any) => state.personReducer);
  const { user } = useSelector((state: any) => state.loginReducer);

  useEffect(() => {
    async function fetchData() {
      if(!_.isEmpty(user))
      dispatch(getAll(user.username));
    }
    fetchData();
  }, [dispatch, user]);

  const handleEdit = (id: number) => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <PersonForm id={id} />,
          customSize: 'large'
        }
      })
    );
  };
  //replace(/[0-9]/g, "X")
  // var str = "1234123412341234";
  // var res = `${str.substring(0, 12).replace(/[0-9]/g, "x")}${str.substring(12, 16)}`;
  return (
    <div className="person-container">
      <div>
        <DataTable4
          rows={persons}
          columns={columns}
          loading={loading}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
