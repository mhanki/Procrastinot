import React from "react";
import { Card, CardHeader, Row, CardBody } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({title, data}) => {
  return(
    <Card className="shadow">
      <CardHeader className="">
        <h3>{title}</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Pie data={data}/>
        </Row>
      </CardBody>
    </Card>
  )
}

export default PieChart;