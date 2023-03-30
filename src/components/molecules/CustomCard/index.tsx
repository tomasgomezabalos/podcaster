import {Card} from 'antd';

const CustomCard = ({children, props}: any) => {
  return (
    <Card
      style={{
        boxShadow: '2px 2px 2px 1px #ccc'
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
