import "./styles.scss";
import {Typography} from "antd";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface IErrorProps {
  message: string;
  error: FetchBaseQueryError | SerializedError;
}

const Error = ({message, error}: IErrorProps) => {
  console.log("Error getting episodes: ", error);

  return (
    <div className="error">
      <Typography.Title level={1} type="danger">{message}</Typography.Title>
    </div>
  )
}

export default Error;
