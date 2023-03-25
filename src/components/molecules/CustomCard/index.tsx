import {Card} from "antd";

const CustomCard = ({children, props}: any) => {
  return (
    <Card
      style={{
        border: "1px solid #ccc",
        boxShadow: "2px 2px 2px 1px #cccccc"
      }}
      {...props}
    >
      {children}
    </Card>
  )
}

export default CustomCard;
