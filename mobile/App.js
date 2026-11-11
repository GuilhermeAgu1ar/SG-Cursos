// App.js
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import CursoCard from './src/components/CursoCard';
import { categorias, cursos } from './src/data/dados';
import { cores } from './src/styles/theme';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [filtro, setFiltro] = useState(null); // id da categoria escolhida (null = todas)

  const lista = filtro ? cursos.filter((c) => c.idCategoria === filtro) : cursos;

  return (
    // ScrollView vertical: a tela inteira rola (Etapa 2.3)
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>SG Cursos</Text>
        <Text style={styles.subtitulo}>
          {lista.length} curso(s) {filtro ? 'nesta categoria' : 'disponíveis'}
        </Text>
      </View>

      {/* Chips de categoria: ScrollView horizontal dentro da vertical */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsArea}
        contentContainerStyle={styles.chips}
      >
        {[{ id: null, nome: 'Todos', cor: cores.primaria }, ...categorias].map((cat) => (
          // Text com onPress (Etapa 2.2) funciona como botão simples
          <Text
            key={String(cat.id)}
            onPress={() => setFiltro(cat.id)}
            style={[styles.chip, filtro === cat.id && { backgroundColor: cat.cor, color: '#fff' }]}
          >
            {cat.nome}
          </Text>
        ))}
      </ScrollView>

      {/* Lista de cards */}
      {lista.map((curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          categoria={categorias.find((c) => c.id === curso.idCategoria)}
        />
      ))}

      {/* Rodapé mostrando o tamanho da tela (useWindowDimensions) */}
      <Text style={styles.rodape}>
        Tela: {Math.round(width)} x {Math.round(height)} dp
      </Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: {
    padding: 16,
    paddingTop: 60,       // espaço da barra de status
    gap: 16,              // espaço entre os blocos
    alignItems: 'center', // centraliza os cards quando há maxWidth (tablet)
  },
  cabecalho: { width: '100%', maxWidth: 500 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: cores.texto },
  subtitulo: { color: cores.cinza, marginTop: 4 },
  chipsArea: { width: '100%', maxWidth: 500 },
  chips: { gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#dfe6e9',
    color: cores.texto,
    overflow: 'hidden',
  },
  rodape: { color: cores.cinza, fontSize: 12, marginTop: 8 },
});