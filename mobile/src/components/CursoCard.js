import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { cores } from '../styles/theme';

export default function CursoCard({ curso, categoria }) {
  // Etapa 3.2: largura da tela, usada para calcular a altura da "capa"
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.card, { borderColor: categoria.cor }]}>
      <View style={[styles.capa, { height: width * 0.4, backgroundColor: categoria.cor }]}>
        <Text style={styles.capaTexto}>{categoria.nome}</Text>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.titulo}>{curso.titulo}</Text>

        {/* Text aninhado (Etapa 2.2): só o nível fica colorido */}
        <Text style={styles.info}>
          Nível: <Text style={{ color: categoria.cor, fontWeight: 'bold' }}>{curso.nivel}</Text>
        </Text>

        {/* numberOfLines corta a descrição com "..." */}
        <Text numberOfLines={2} style={styles.descricao}>{curso.descricao}</Text>

        <Text style={styles.info}>
          {curso.totalAulas} aulas • {curso.totalHoras}h
        </Text>

        {/* Barra de progresso: largura em % do pai (Etapa 3.2) */}
        <View style={styles.barraFundo}>
          <View style={[styles.barra, { width: `${curso.progresso}%` }]} />
        </View>
        <Text style={styles.progresso}>
          {curso.progresso === 100 ? 'Concluído ✓' : `${curso.progresso}% concluído`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: cores.branco,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  capa: { alignItems: 'center', justifyContent: 'center' },
  capaTexto: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  corpo: { padding: 16, gap: 6 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: cores.texto },
  descricao: { color: '#636e72' },
  info: { color: cores.cinza, fontSize: 13 },
  barraFundo: {
    height: 8,
    marginTop: 6,
    borderRadius: 4,
    backgroundColor: '#dfe6e9',
    overflow: 'hidden',
  },
  barra: { height: '100%', backgroundColor: cores.sucesso },
  progresso: { fontSize: 12, color: cores.texto },
});