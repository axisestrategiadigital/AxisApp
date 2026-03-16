import React, { useState, memo, useMemo } from 'react';
import { 
  StyleSheet, View, Text, SafeAreaView, TouchableOpacity, 
  ScrollView, Image, LayoutAnimation, Platform, UIManager, 
  TextInput, KeyboardAvoidingView, Keyboard, Modal, Alert 
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

const REDES_SOCIAIS = [
  { 
    id: 'instagram', nome: 'Insta', icone: 'logo-instagram', 
    formatosPermitidos: ['Feed', 'Reels', 'Carrossel', 'Story'],
    limitesVideo: { Reels: 900, Story: 60, Feed: 3600 } 
  },
  { 
    id: 'tiktok', nome: 'TikTok', icone: 'logo-tiktok', 
    formatosPermitidos: ['Reels', 'Story'], 
    limitesVideo: { Reels: 600, Story: 60 } 
  },
  { 
    id: 'facebook', nome: 'Face', icone: 'logo-facebook', 
    formatosPermitidos: ['Feed', 'Reels', 'Carrossel', 'Story'],
    limitesVideo: { Feed: 14400, Reels: 90, Story: 60 } 
  },
  { 
    id: 'linkedin', nome: 'LinkedIn', icone: 'logo-linkedin', 
    formatosPermitidos: ['Feed', 'Carrossel'], 
    limitesVideo: { Feed: 600 } 
  },
  { 
    id: 'twitter', nome: 'X', icone: 'logo-twitter', 
    formatosPermitidos: ['Feed', 'Carrossel'],
    limitesVideo: { Feed: 140 } 
  }
];

const TIPOS_POST = ['Feed', 'Reels', 'Carrossel', 'Story'];
const NIVEIS_PRIORIDADE = ['Baixa', 'Média', 'Alta'];

// --- COMPONENTE DO CARD DE POST ---
const PostItem = memo(({ post }) => {
  const [estaAberto, setEstaAberto] = useState(false);
  const [exibirAnalytics, setExibirAnalytics] = useState(false);
  const [textoResposta, setTextoResposta] = useState('');
  const [aprovacoes, setAprovacoes] = useState(
    post.redes.reduce((acc, rede) => ({ ...acc, [rede]: false }), {})
  );

  const totalRedes = post.redes.length;
  const aprovadosCount = Object.values(aprovacoes).filter(v => v).length;

  const alternarAprovacao = (redeId) => {
    setAprovacoes(prev => ({ ...prev, [redeId]: !prev[redeId] }));
  };

  const alternar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEstaAberto(!estaAberto);
  };

  return (
    <View style={[styles.postCard, { borderLeftColor: post.color }]}>
      <TouchableOpacity onPress={alternar} activeOpacity={0.7} style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <View style={[styles.statusBadge, { backgroundColor: post.color + '20' }]}>
            <Text style={[styles.statusText, { color: post.color }]}>{post.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.postDate}>{post.date}</Text>
          <View style={styles.approvalMiniBadge}>
             <Text style={styles.approvalMiniText}>{aprovadosCount}/{totalRedes} OK</Text>
          </View>
        </View>
        <Ionicons name={estaAberto ? "chevron-up" : "chevron-down"} size={20} color="#666" />
      </TouchableOpacity>

      {estaAberto && (
        <View style={styles.expandedContent}>
          <View style={styles.tagsRow}>
            <View style={styles.tagContainer}><Text style={styles.tagText}>{post.type.toUpperCase()}</Text></View>
            {post.priority && (
              <View style={[styles.priorityTag, {borderColor: post.priority === 'Alta' ? '#FF3B30' : '#FF9500'}]}>
                <Text style={styles.priorityTagText}>{post.priority}</Text>
              </View>
            )}
          </View>

          {post.media && post.media.length > 0 && (
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
              {post.media.map((m) => (
                <View key={m.id} style={styles.mediaWrapper}>
                  <Image source={{ uri: m.url }} style={styles.postImage} />
                  {(post.type === 'Reels' || post.type === 'Story') && (
                    <View style={styles.videoIndicator}><Ionicons name="play" size={24} color="#FFF" /></View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          {/* BOTÃO DE ANALYTICS (NOVO) */}
          <TouchableOpacity 
            style={styles.analyticsToggle} 
            onPress={() => setExibirAnalytics(!exibirAnalytics)}
          >
            <Ionicons name="bar-chart-outline" size={18} color="#6a11cb" />
            <Text style={styles.analyticsToggleText}>
              {exibirAnalytics ? "Ocultar Performance" : "Ver Performance Estimada"}
            </Text>
          </TouchableOpacity>

          {exibirAnalytics && (
            <View style={styles.analyticsPanel}>
              <View style={styles.analyticsStat}>
                <Text style={styles.statLabel}>Alcance</Text>
                <Text style={styles.statValue}>1.2k</Text>
              </View>
              <View style={styles.analyticsStat}>
                <Text style={styles.statLabel}>Engaj.</Text>
                <Text style={styles.statValue}>8.4%</Text>
              </View>
              <View style={styles.analyticsStat}>
                <Text style={styles.statLabel}>Cliques</Text>
                <Text style={styles.statValue}>42</Text>
              </View>
            </View>
          )}

          <Text style={styles.expandedSectionTitle}>Legenda:</Text>
          <Text style={styles.expandedCopy}>{post.copy || "Este formato (Story/Arte) não utiliza legenda externa."}</Text>

          <View style={styles.checklistSection}>
            <Text style={styles.expandedSectionTitle}>Aprovação Individual:</Text>
            {post.redes.map((redeId) => {
              const redeInfo = REDES_SOCIAIS.find(r => r.id === redeId);
              const aprovado = aprovacoes[redeId];
              return (
                <TouchableOpacity 
                  key={redeId} 
                  style={[styles.checkItem, aprovado && styles.checkItemApproved]} 
                  onPress={() => alternarAprovacao(redeId)}
                >
                  <View style={styles.checkItemLeft}>
                    <Ionicons name={redeInfo.icone} size={18} color={aprovado ? "#FFF" : "#555"} style={{marginRight: 10}} />
                    <Text style={[styles.checkItemText, aprovado && {color: '#FFF'}]}>{redeInfo.nome}</Text>
                  </View>
                  <Ionicons name={aprovado ? "checkmark-circle" : "ellipse-outline"} size={22} color={aprovado ? "#FFF" : "#CCC"} />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Solicitar ajuste..."
              value={textoResposta}
              onChangeText={setTextoResposta}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => { Alert.alert('Enviado', 'Feedback enviado para a agência.'); setTextoResposta(''); Keyboard.dismiss(); }}>
              <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});

export default function CalendarScreen({ navigation }) {
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [novoPost, setNovoPost] = useState({ 
    copy: '', redes: [], tipo: 'Feed', media: [], prioridade: 'Média' 
  });

  const postsLista = [
    { 
      id: '1', date: '18/03/2026', dateString: '2026-03-18', status: 'pendente', color: '#FF9500',
      redes: ['instagram', 'facebook', 'tiktok'], type: 'Reels', priority: 'Alta',
      copy: 'Vídeo institucional da nova fachada.', 
      media: [{ id: 'm1', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400' }]
    },
    { 
      id: '2', date: '20/03/2026', dateString: '2026-03-20', status: 'aprovado', color: '#28a745',
      redes: ['instagram', 'linkedin'], type: 'Feed', priority: 'Média',
      copy: 'Dicas de iluminação natural para arquitetos.', 
      media: [{ id: 'm2', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400' }]
    }
  ];

  const postsFiltrados = useMemo(() => {
    let filtrados = postsLista;
    if (dataSelecionada) filtrados = filtrados.filter(p => p.dateString === dataSelecionada);
    if (filtroStatus !== 'Todos') filtrados = filtrados.filter(p => p.status === filtroStatus.toLowerCase());
    return filtrados;
  }, [dataSelecionada, filtroStatus]);

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const novasMidias = result.assets.map(asset => ({
        id: asset.assetId || Math.random().toString(),
        url: asset.uri,
        type: asset.type,
        duration: asset.duration ? asset.duration / 1000 : 0 
      }));

      let tipoAuto = novoPost.tipo;
      if (novasMidias.length > 1) tipoAuto = 'Carrossel';
      else if (novasMidias[0].type === 'video') tipoAuto = 'Reels';

      setNovoPost(prev => ({ ...prev, media: [...prev.media, ...novasMidias], tipo: tipoAuto, redes: [] }));
    }
  };

  const alternarRede = (redeId) => {
    setNovoPost(prev => {
      const selecionadas = prev.redes.includes(redeId) ? prev.redes.filter(r => r !== redeId) : [...prev.redes, redeId];
      return { ...prev, redes: selecionadas };
    });
  };

  const verificarAvisoTempo = (rede) => {
    const video = novoPost.media.find(m => m.type === 'video');
    if (!video) return null;
    const limite = rede.limitesVideo[novoPost.tipo];
    if (limite && video.duration > limite) return `Max: ${limite}s`;
    return null;
  };

  const renderMarkedDates = () => {
    let marked = {};
    postsLista.forEach(p => {
      marked[p.dateString] = { dots: [{ color: p.color }] };
    });
    if (dataSelecionada) {
      marked[dataSelecionada] = { ...marked[dataSelecionada], selected: true, selectedColor: '#6a11cb20', selectedTextColor: '#6a11cb' };
    }
    return marked;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}><Ionicons name="arrow-back" size={28} color="#333" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Estratégia Digital</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}><Ionicons name="add" size={24} color="#FFF" /></TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.calendarWrapper}>
            <Calendar 
              onDayPress={(day) => setDataSelecionada(day.dateString)} 
              markedDates={renderMarkedDates()}
              theme={{ todayTextColor: '#6a11cb', dotColor: '#6a11cb' }}
            />
          </View>

          {/* BARRA DE FILTRO (NOVO) */}
          <View style={styles.filterBar}>
            {['Todos', 'Pendente', 'Aprovado'].map(f => (
              <TouchableOpacity key={f} onPress={() => setFiltroStatus(f)} style={[styles.filterBtn, filtroStatus === f && styles.filterBtnActive]}>
                <Text style={[styles.filterText, filtroStatus === f && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.listContainer}>
             <View style={styles.listHeaderRow}>
                <Text style={styles.listTitle}>{dataSelecionada ? `Posts para ${dataSelecionada}` : 'Próximos Posts'}</Text>
                {dataSelecionada && (
                  <TouchableOpacity onPress={() => setDataSelecionada(null)}><Text style={styles.clearDateText}>Ver todos</Text></TouchableOpacity>
                )}
             </View>
             {postsFiltrados.map(post => <PostItem key={post.id} post={post} />)}
             {postsFiltrados.length === 0 && <Text style={styles.emptyText}>Nenhum post encontrado para este filtro.</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Novo Agendamento</Text>
                <Text style={styles.modalSubtitle}>{dataSelecionada || 'Selecione uma data no calendário'}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} color="#666" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Prioridade do Post:</Text>
              <View style={styles.socialGrid}>
                {NIVEIS_PRIORIDADE.map(p => (
                  <TouchableOpacity key={p} style={[styles.pill, novoPost.prioridade === p && {backgroundColor: '#6a11cb'}]} onPress={() => setNovoPost({...novoPost, prioridade: p})}>
                    <Text style={[styles.pillText, novoPost.prioridade === p && {color: '#FFF'}]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Mídia:</Text>
              <ScrollView horizontal style={styles.mediaPreviewContainer}>
                <TouchableOpacity style={styles.uploadButton} onPress={abrirGaleria}><Ionicons name="cloud-upload-outline" size={28} color="#6a11cb" /></TouchableOpacity>
                {novoPost.media.map(m => (
                  <View key={m.id} style={styles.thumbnailWrapper}>
                    <Image source={{ uri: m.url }} style={styles.thumbnailImage} />
                    {m.duration > 0 && <Text style={styles.durationTag}>{Math.round(m.duration)}s</Text>}
                  </View>
                ))}
              </ScrollView>

              <Text style={styles.label}>Formato Sugerido:</Text>
              <View style={styles.socialGrid}>
                {TIPOS_POST.map(t => (
                  <TouchableOpacity key={t} style={[styles.pill, novoPost.tipo === t && styles.pillSelected]} onPress={() => setNovoPost({...novoPost, tipo: t, redes: []})}>
                    <Text style={[styles.pillText, novoPost.tipo === t && styles.pillTextSelected]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Publicar em:</Text>
              <View style={styles.socialGrid}>
                {REDES_SOCIAIS.map((rede) => {
                  const compativel = rede.formatosPermitidos.includes(novoPost.tipo);
                  const avisoTempo = verificarAvisoTempo(rede);
                  const isSelected = novoPost.redes.includes(rede.id);

                  return (
                    <TouchableOpacity 
                      key={rede.id} 
                      disabled={!compativel || !!avisoTempo}
                      style={[styles.socialSquare, isSelected && styles.socialSquareSelected, (!compativel || avisoTempo) && { opacity: 0.2, backgroundColor: '#f0f0f0' }]} 
                      onPress={() => alternarRede(rede.id)}
                    >
                      <Ionicons name={!compativel ? "lock-closed" : rede.icone} size={24} color={isSelected ? "#FFF" : "#555"} />
                      <Text style={[styles.socialSquareText, isSelected && {color: '#FFF'}]}>{rede.nome}</Text>
                      {avisoTempo && <Text style={styles.warningText}>{avisoTempo}</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.label}>Legenda:</Text>
              <TextInput 
                style={[styles.modalInput, novoPost.tipo === 'Story' && { backgroundColor: '#F0F0F0', color: '#999' }]} 
                placeholder={novoPost.tipo === 'Story' ? "Stories não permitem copy externa" : "Digite a legenda..."}
                editable={novoPost.tipo !== 'Story'}
                value={novoPost.tipo === 'Story' ? "" : novoPost.copy}
                onChangeText={(t) => setNovoPost({...novoPost, copy: t})}
                multiline
              />

              <TouchableOpacity style={styles.saveButton} onPress={() => {Alert.alert("Sucesso", "Post enviado para análise."); setModalVisible(false);}}>
                <Text style={styles.saveText}>Solicitar Produção</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#6a11cb', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  calendarWrapper: { backgroundColor: '#FFF', paddingBottom: 10 },
  filterBar: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, backgroundColor: '#EEE' },
  filterBtnActive: { backgroundColor: '#6a11cb' },
  filterText: { fontSize: 12, color: '#666', fontWeight: 'bold' },
  filterTextActive: { color: '#FFF' },
  listContainer: { padding: 20 },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  listTitle: { fontSize: 18, fontWeight: 'bold' },
  clearDateText: { fontSize: 12, color: '#6a11cb', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
  postCard: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, elevation: 3 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  postHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  postDate: { fontSize: 14, color: '#666' },
  approvalMiniBadge: { backgroundColor: '#E8E8E8', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 10 },
  approvalMiniText: { fontSize: 10, fontWeight: 'bold', color: '#666' },
  expandedContent: { padding: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
  tagsRow: { flexDirection: 'row', marginBottom: 15 },
  tagContainer: { backgroundColor: '#F0F0F0', padding: 6, borderRadius: 6, marginRight: 8 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: '#555' },
  priorityTag: { borderWidth: 1, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 },
  priorityTagText: { fontSize: 10, fontWeight: 'bold', color: '#555' },
  carouselContainer: { marginBottom: 15 },
  mediaWrapper: { width: 280, height: 180, marginRight: 10, borderRadius: 8, overflow: 'hidden' },
  postImage: { width: '100%', height: '100%' },
  videoIndicator: { position: 'absolute', top: '40%', left: '45%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 30 },
  analyticsToggle: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  analyticsToggleText: { marginLeft: 8, fontSize: 12, color: '#6a11cb', fontWeight: 'bold' },
  analyticsPanel: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#F0ECFF', padding: 12, borderRadius: 10, marginBottom: 20 },
  analyticsStat: { alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#666' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#6a11cb' },
  expandedSectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  expandedCopy: { fontSize: 14, color: '#666', marginBottom: 20 },
  checklistSection: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  checkItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#EEE' },
  checkItemApproved: { backgroundColor: '#28a745', borderColor: '#28a745' },
  checkItemLeft: { flexDirection: 'row', alignItems: 'center' },
  checkItemText: { fontSize: 14, fontWeight: '600', color: '#555' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginRight: 10 },
  sendButton: { backgroundColor: '#6a11cb', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', padding: 25, borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '90%' },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalSubtitle: { fontSize: 12, color: '#666' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 15, marginBottom: 8 },
  mediaPreviewContainer: { flexDirection: 'row', marginBottom: 10 },
  uploadButton: { width: 80, height: 80, borderStyle: 'dashed', borderWidth: 1, borderColor: '#6a11cb', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  thumbnailWrapper: { width: 80, height: 80, marginRight: 10, borderRadius: 10, overflow: 'hidden' },
  thumbnailImage: { width: '100%', height: '100%' },
  durationTag: { position: 'absolute', bottom: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: 10, padding: 2, borderRadius: 4 },
  socialGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  pill: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#EEE', borderRadius: 20, marginRight: 10, marginBottom: 10 },
  pillSelected: { backgroundColor: '#6a11cb' },
  pillText: { fontWeight: 'bold', color: '#555' },
  pillTextSelected: { color: '#FFF' },
  socialSquare: { width: '30%', paddingVertical: 12, backgroundColor: '#EEE', borderRadius: 12, alignItems: 'center', marginBottom: 10, marginRight: '3%' },
  socialSquareSelected: { backgroundColor: '#6a11cb' },
  socialSquareText: { fontSize: 11, fontWeight: 'bold', color: '#555', marginTop: 4 },
  warningText: { fontSize: 9, color: '#FF3B30', fontWeight: 'bold' },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, minHeight: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#6a11cb', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveText: { color: '#FFF', fontWeight: 'bold' }
});