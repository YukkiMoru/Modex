import { useEffect, useState } from 'react';
import './App.css';
import { IgrRadialGauge, IgrRadialGaugeModule } from 'igniteui-react-gauges';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

IgrRadialGaugeModule.register();

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    ウェブサイトのタイトル
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

function Footer() {
    return (
        <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <a href="https://github.com/YukkiMoru/Modex" target="_blank" rel="noopener noreferrer">Modex</a> {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

function RadialGaugeComponent() {
    return (
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
    );
}

function LineChartComponent({ data }: { data: { x: number, y: number }[] }) {
    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="y" stroke="#8884d8" isAnimationActive={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="x" />
            <YAxis />
        </LineChart>
    );
}

const App = () => {
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState('');

    useEffect(() => {
        fetch('http://localhost:9091/api/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setRawData(JSON.stringify(data, null, 2));
            });
    }, []);

    return (
        <div>
            <Header />
            <Container>
                <RadialGaugeComponent />
                <LineChartComponent data={data} />
                <Button variant="contained">Hello world</Button>
                <pre>{rawData}</pre>
            </Container>
            <Footer />
        {/*    <LineChart width={500} height={300} data={[*/}
        {/*    { x: 1, y: 2 },*/}
        {/*    { x: 2, y: 5.5 },*/}
        {/*    { x: 3, y: 2 },*/}
        {/*    { x: 5, y: 8.5 },*/}
        {/*    { x: 8, y: 1.5 },*/}
        {/*    { x: 10, y: 5 }*/}
        {/*]}>*/}
        {/*    <Line type="monotone" dataKey="y" stroke="#8884d8" />*/}
        {/*    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />*/}
        {/*    <XAxis dataKey="x" />*/}
        {/*    <YAxis />*/}
        {/*</LineChart>*/}
        </div>
    );
}

export default App;