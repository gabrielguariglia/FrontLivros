import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import { Container, LoadingIcon, PreloadText } from './styles'
import AlexandriaLogo from '../../assets/Alexandria'

export default () => {

    const navigation = useNavigation()

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')

            if(token) {
                //Validção do token
                alert("Teste")
            } else {
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    }, [])

    return(
        <Container>
            <AlexandriaLogo/>
            <PreloadText>Beuty Spot</PreloadText>
            <LoadingIcon size="large" color="#FFF" />
        </Container>
    )
} 