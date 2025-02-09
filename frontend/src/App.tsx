import './App.css';
import { IgrRadialGauge, IgrRadialGaugeModule } from 'igniteui-react-gauges';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Button from '@mui/material/Button';

IgrRadialGaugeModule.register();

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 100, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 300, pv: 2400, amt: 2400 },
];

const renderLineChart = (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

function App() {
  return (
    <div>
      <h1>こんにちは</h1>
      <IgrRadialGauge
          height="300px"
          width="300px"
          minimumValue={0}
          maximumValue={100}
          value={50}
          interval={10}
          needleBrush="DodgerBlue"
          scaleBrush="LightGray"
          backingBrush="White"
          backingOutline="LightGray"
      />
      {renderLineChart}
      <ButtonUsage />
    </div>
  );
}

export default App;