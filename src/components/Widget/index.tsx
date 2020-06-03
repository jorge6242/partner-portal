import React, { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import "./index.sass";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    avatarContainer: {
      backgroundColor: "#fff",
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: "0px"
    },
    blue: {
      color: "#2980b9",
    },
    red: {
      color: '#c0392b',
    },
    icon: {
      fontSize: "50px"
    }
  })
);

type FormComponentProps = {
  title?: string;
  subTitle?: string;
  amount?: any;
  Icon: any;
  type?: string;
  link?: any;
  internal?: boolean;
};

const Widgtet: FunctionComponent<FormComponentProps> = ({
  title,
  subTitle,
  amount,
  Icon,
  type = "",
  link,
  internal
}) => {
  const classes = useStyles();
  const history = useHistory();
  let statusAmount = false;
  if (type === 'Saldo' && amount > 0) statusAmount = true;
  if (type === 'Saldo' && amount <= 0) statusAmount = false;

  const renderTitle = () => {
    if(title === "Reservaciones") {
      return !statusAmount ? true : false;
    }
    return true;
  }

  const handleLink = () => {
    if (internal) {
      history.push(link)
    } else {
      if(renderTitle()) {
        window.open(link, '_blank');
      }
    }
  }

  return (
    <Card className="widget-container__card" onClick={() => handleLink()} style={{ cursor: link ? 'pointer' : '' }} >
      <div className={`widget-container__widget ${statusAmount ? 'widget-container__widget--red' : ''}`}>
        <div className="widget-container__avatar">
          <Avatar className={`${classes.avatarContainer} ${statusAmount ? classes.red : classes.blue}`}>
            <Icon className={classes.icon} />
          </Avatar>
        </div>
        <div className="widget-container__detail">
          <div className="widget-container__detail-title">{title}</div>
          {subTitle && (
            <div className="widget-container__detail-title">{subTitle}</div>
          )}
          {!link && (<div className="widget-container__detail-amount">{amount}</div>)}
        </div>
      </div>
    </Card>
  );
};

export default Widgtet;
