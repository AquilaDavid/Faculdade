import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const NewsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=60',
        }}
        style={styles.headerImage}
      />

       <View style={styles.content}>
        {/* Título principal */}
        <Text style={[styles.title, { color: theme.text }]}>
          Mudanças recentes nas políticas de trabalho internacional
        </Text>

        {/* Data e autor */}
        <Text style={[styles.date, { color: theme.tint }]}>
          Publicado em 4 de outubro de 2025 — Redação Digital TSI News
        </Text>

        {/* Subtítulo */}
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Impactos para profissionais que buscam oportunidades no exterior
        </Text>

        {/* Parágrafos */}
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Recentemente, foram anunciadas mudanças importantes nas políticas relacionadas à emissão de documentos de trabalho internacional. A medida tem como objetivo atualizar os processos administrativos e tornar os sistemas mais seguros e eficientes.
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          Para profissionais que planejam atuar fora do país, essas mudanças representam ajustes nos custos e prazos para obtenção de permissões de trabalho. Especialistas em mobilidade profissional apontam que tais alterações podem impactar tanto empresas quanto trabalhadores que buscam oportunidades globais.
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          Além disso, organizações do setor tecnológico destacam que a modernização dos processos pode facilitar o intercâmbio de talentos, apesar de haver preocupações sobre o aumento de burocracia. Analistas recomendam atenção aos detalhes de cada regulamentação, uma vez que pequenas alterações podem gerar grandes efeitos no planejamento profissional.
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          Do ponto de vista econômico, as mudanças podem influenciar decisões de investimento e contratação por parte de empresas multinacionais. Trabalhadores devem se informar sobre os novos requisitos e verificar a documentação necessária antes de qualquer viagem ou contrato internacional.
        </Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          Em resumo, a atualização das políticas de trabalho internacional busca equilibrar segurança, eficiência e acessibilidade. É essencial que profissionais e empresas acompanhem de perto as alterações para evitar imprevistos e garantir que todas as normas sejam cumpridas corretamente.
        </Text>

        {/* Conclusão / Créditos */}
        <Text style={[styles.footer, { color: theme.tint }]}>
          Por Redação Digital — Jornal TSI News
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerImage: { width: '100%', height: 220 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  date: { fontSize: 13, marginBottom: 16 },
  paragraph: { fontSize: 16, lineHeight: 24, marginBottom: 14, textAlign: 'justify' },
  footer: { fontSize: 13, marginTop: 16, fontStyle: 'italic', textAlign: 'right' },
});