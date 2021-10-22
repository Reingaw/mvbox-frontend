import List from './components/list';
import Sidebar from './components/sidebar';

import { ListProvider } from './context/listContext';

import './styles/global.css';

function App() {
  return (
    <ListProvider>
      <Sidebar  />
      <List />
    </ListProvider>
  );
}

export default App;