import React, { useState } from 'react'
import { TextInput, StyleSheet, Platform, ActivityIndicator, Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Container, Title } from './styles'

import themes from '../../themes'
import Api from '../../resources/api/Api'

export default ({ route }) => {
    const navigation = useNavigation()
    //Veio algum dado através da rota de navegação?
    const registroInicial = route.params ? route.params.profissinal :
        {
            nome: '', autor: '', celular: '', servico: ''
        }

    const [Livro, setLivro] = useState(registroInicial)

    const salvarLivro = async (dadosLivro) => {
        let salvar = dadosLivro.hasOwnProperty('_id') ? await Api.alteraLivro(dadosLivro) : await Api.incluiLivro(dadosLivro)
        if (salvar.hasOwnProperty('errors')) {
            Platform.OS === 'web' ? alert(`‼️Erro: ${salvar.errors[0].msg}`) : Alert.alert("‼️Erro", salvar.errors[0].msg)
        } else if (salvar.hasOwnProperty('acknowledged')) {
            Platform.OS === 'web' ? alert(`✅Tudo OK: Registro salvo com sucesso `) : Alert.alert("✅Tudo OK", 'Registro salvo com sucesso')
            navigation.navigate('Livros')
        }
    }

    return (
        <Container>
            <View>
                <Title>Cadastro de Livros</Title>
                <Title style={styles.label}>Nome:</Title>
                <TextInput
                    name='nome'
                    style={styles.input}
                    onChangeText={(text) => setLivro({ ...Livro, nome: text })}
                    value={Livro.nome}
                    keyboardType='default'
                    placeholder='nome'
                    maxLength={100}
                />

                <Title style={styles.label}>Autor:</Title>
                <TextInput
                    name='nome do autor'
                    style={styles.input}
                    onChangeText={(text) => setLivro({ ...Livro, autor: text })}
                    value={Livro.autor}
                    keyboardType='default'
                    placeholder='autor'
                    maxLength={50}
                />

                <Title style={styles.label}>lançamento:</Title>
                <TextInput
                    name="data de lançamento"
                    style={styles.input}
                    onChangeText={(text) => setLivro({ ...Livro, lançamento: text })}
                    value={Livro.lançamento}
                    keyboardType="default"
                    placeholder='Ex: 1895'
                    maxLength={30}
                />

                <Title style={styles.label}>Gênero:</Title>
                <TextInput
                    name="gênero"
                    style={styles.input}
                    onChangeText={(text) => setLivro({ ...Livro, Gênero: text })}
                    value={Livro.Gênero}
                    keyboardType="default"
                    placeholder='Gênero'
                    maxLength={20}
                />

                <Button
                    onPress={() => salvarLivro(Livro)}
                    title='Salvar o Registro'
                    color={themes.padrao.colors.neutral.neutral_60}
                    accessibilityLabel='Salvar os dados'
                />
                <Button
                    onPress={() => navigation.navigate('Livros')}
                    title='Cancelar'
                    color={themes.padrao.colors.brand.laranja}
                    accessibilityLabel='Cancelar'

                />

            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40, margin: 8, borderWidth: 1,
        borderColor: themes.padrao.colors.brand.laranja, padding: 8,
        backgroundColor: themes.padrao.colors.brand.branca,
    },
    label: { marginLeft: 8, marginTop: 8, marginBottom: 4, fontSize: 14 }
})