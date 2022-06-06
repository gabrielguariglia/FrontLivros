import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {Container, Title, Scroller, HeaderArea, LoadingIcon, ListArea} from './styles'
import LivroItem from '../../components/styled/LivroItem'
import Api from '../../resources/api/Api'
import Fab from '../../components/styled/Fab'

export default () => {

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    const getLivros = async () => {
        setLoading(true)
        setList([])

        let res = await Api.getLivros()

        console.log(res)

        res.ok === 0 
        ? alert(`Não foi possível obter a lista de livros ${res.codeName}`)
        : setList(res)

        setLoading(false)
    }

    useEffect(() => {
        getLivros()
    }, [])

    return (
        <Container>
            <Scroller>

                <HeaderArea>
                    <Title>Leia um novo livro</Title>
                </HeaderArea>

                {loading &&
                    <LoadingIcon size="large" color="#fff" />
                }
             
                <ListArea>
                    {list.map((item, k) => (
                        <LivroItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>

            <Fab title="Novo"
                 onPress={()=> navigation.navigate('Livro')}
            />
        </Container>
    )
}