import {memo, useCallback, useEffect, useState} from 'react';
import './App.css';
import {IgrRadialGauge, IgrRadialGaugeModule} from 'igniteui-react-gauges';
import {LineChart} from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

IgrRadialGaugeModule.register();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Header = memo(({darkMode, onToggleSettings, settings}: { darkMode: boolean, onToggleSettings: () => void, settings : boolean}) => (
    <AppBar position="static" sx={{backgroundColor: darkMode ? '#3f51b5' : '#650707'}}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                ウェブサイトのタイトル
            </Typography>
            <Switch checked={settings} onChange={onToggleSettings} />
        </Toolbar>
    </AppBar>
));

const Footer = memo(() => (
    <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a href="https://github.com/YukkiMoru/Modex" target="_blank" rel="noopener noreferrer">Modex</a> 2025
            {'.'}
        </Typography>
    </Box>
));

const RadialGaugeComponent = memo(({darkMode}: { darkMode: boolean }) => (
    <IgrRadialGauge
        height="300px"
        width="300px"
        minimumValue={0}
        maximumValue={100}
        value={50}
        interval={10}
        needleBrush={darkMode ? "Red" : "DodgerBlue"}
        needleOutline={darkMode ? "Red" : "DodgerBlue"}
        scaleBrush={darkMode ? "LightGray" : "LightGray"}
        backingBrush={darkMode ? "#3c3f41" : "White"}
        backingOutline={darkMode ? "LightGray" : "LightGray"}
        fontBrush={darkMode ? "White" : "Black"}
    />
));

const LineChartComponent = memo(({data}: { data: { x: string, y: number }[] }) => {
    const xAxisData = data.map(point => new Date(point.x));
    const seriesData = data.map(point => point.y);

    return (
        <LineChart
            xAxis={[{data: xAxisData, scaleType: 'time'}]}
            series={[{data: seriesData}]}
            width={600}
            height={300}
        />
    );
});

const App = () => {
    const [data, setData] = useState<{ x: string, y: number }[]>([]);
    const [rawData, setRawData] = useState('');
    const [showData, setShowData] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [settings, setSettings] = useState(false);
    const label = {inputProps: {'aria-label': 'Switch demo'}};

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:9091/api/data');
            const data = await response.json();
            setData(data);
            setRawData(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('データのフェッチに失敗しました:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const elements = document.querySelectorAll('.RadialGaugeComponent, .LineChartComponent, .Switch, pre');
        if (darkMode) {
            document.body.classList.add('dark-mode');
            elements.forEach(element => element.classList.add('dark-mode'));
        } else {
            document.body.classList.remove('dark-mode');
            elements.forEach(element => element.classList.remove('dark-mode'));
        }
    }, [darkMode]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : createTheme()}>
            <CssBaseline/>
            <div>
                <Header darkMode={darkMode} onToggleSettings={() => setSettings(!settings)} settings={settings}/>
                <Container sx={{ position: 'absolute', top: '64px', right: 'auto', zIndex: 1 }}>
                    {settings && (
                        <div>
                            <Switch {...label} defaultChecked onChange={() => setShowData(!showData)}/>
                            <Button variant="contained" onClick={fetchData}>リロード</Button>
                            <Switch {...label} defaultChecked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                        </div>
                    )}
                </Container>
                <Container>
                    <RadialGaugeComponent darkMode={darkMode}/>
                    <LineChartComponent data={data}/>
                    {showData && <pre>{rawData}</pre>}
                </Container>
                <Footer/>
            </div>
        </ThemeProvider>
    );
};

export default App;