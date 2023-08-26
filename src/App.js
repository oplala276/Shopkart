import Header from './components/header/Header';
import Home from './components/home/Home';
import ContextProvider from './context/ContextProvider';
import { Box } from '@mui/material';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Box style={{ marginTop: 54 }}>
        <Home />
      </Box>
    </ContextProvider>
  );
}

export default App;
