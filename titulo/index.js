import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App)
// e também garante que o componente seja carregado corretamente no Expo
registerRootComponent(App);