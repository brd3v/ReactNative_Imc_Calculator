import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';

export default function App() {
  const [altura, setAltura] = useState();
  const [peso, setPeso] = useState();
  const [imc, setImc] = useState();

  const calculaImc = () => {
    const alturaNumero = parseFloat(altura.replace(',', '.'))
    const pesoNumero = parseFloat(peso.replace(',', '.'))
    let oImc = pesoNumero / (alturaNumero * alturaNumero)
    setImc(oImc.toFixed(1))
  };

  const tabelaIMC = [
    { faixa: { de: 0, ate: 16 }, mensagem: 'Você está muito abaixo do peso' },
    { faixa: { de: 16, ate: 16.9 }, mensagem: 'Você está abaixo do peso' },
    { faixa: { de: 17, ate: 18.4 }, mensagem: 'Você está abaixo do peso' },
    { faixa: { de: 18.5, ate: 24.9 }, mensagem: 'Seu peso está saudável' },
    { faixa: { de: 25, ate: 29.9 }, mensagem: 'Você está acima do peso' },
    { faixa: { de: 30, ate: 34.9 }, mensagem: 'Obesidade Grau I' },
    { faixa: { de: 35, ate: 39.9 }, mensagem: 'Obesidade Grau II' },
    { faixa: { de: 40, ate: 1000 }, mensagem: 'Obesidade Grau III (Mórbida)' }
  ];

  let mensagemIMC = 'Mensagem padrão';

  // Verifica o IMC nas faixas da tabela e atribui a mensagem apropriada
  for (const item of tabelaIMC) {
    if (imc >= item.faixa.de && imc <= item.faixa.ate) {
      mensagemIMC = item.mensagem;
      break; // Uma vez encontrada a faixa correta, podemos sair do loop
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2015/07/02/10/23/training-828741_1280.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Calculadora IMC</Text>
        <Text style={styles.result}>Sua Altura</Text>
        <TextInput onChangeText={(e) => setAltura(e)} keyboardType="numeric" style={styles.input}></TextInput>
        <Text style={styles.result}>Seu peso</Text>
        <TextInput onChangeText={(e) => setPeso(e)} keyboardType="numeric" style={styles.input}></TextInput>
        <Button onPress={calculaImc} title="Calcular" />
        <Text style={styles.result}>{mensagemIMC}</Text>
        <Text style={styles.result}>Seu IMC é de: {imc}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo com transparência
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#fff', // Cor de fundo do input com transparência
    minWidth: '50%',
    borderRadius: 4,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#fff', // Cor do título
  },
  result: {
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',

    color: '#fff', // Cor do resultado
  }
});
