import { NavigationContainer } from '@react-navigation/native'

import Navigation from './src/stacks/Navigation.js'
import UserContextProvider from './src/context/UserContext'

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserContextProvider>
  )
}