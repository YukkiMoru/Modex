import { useEffect, useState } from 'react';
import './App.css';
import { IgrRadialGauge, IgrRadialGaugeModule } from 'igniteui-react-gauges';
import { LineChart } from '@mui/x-charts/LineChart';
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

function LineChartComponent({ data }: { data: { x: string, y: number }[] }) {
    const xAxisData = data.map(point => new Date(point.x));
    const seriesData = data.map(point => point.y);

    return (
        <LineChart
            xAxis={[{ data: xAxisData, scaleType: 'time' }]}
            series={[{ data: seriesData }]}
            width={600}
            height={300}
        />
    );
}

const App = () => {
    const [data, setData] = useState<{ x: string, y: number }[]>([]);
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
        </div>
    );
}

export default App;