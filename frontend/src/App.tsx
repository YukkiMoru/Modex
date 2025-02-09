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

    const renderLineChart = (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            <Line type="monotone" dataKey="amt" stroke="#ffc658" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );

    return (
        <div>
            <Header />
            <Container>
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
                <Button variant="contained">Hello world</Button>
                <pre>{rawData}</pre>
            </Container>
            <Footer />
        </div>
    );
}

export default App;