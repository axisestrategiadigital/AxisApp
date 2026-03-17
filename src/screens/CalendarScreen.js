import React, { useState, memo, useMemo } from 'react';
import {
  StyleSheet, View, Text, SafeAreaView, TouchableOpacity,
  ScrollView, Image, LayoutAnimation, Platform, UIManager,
  TextInput, KeyboardAvoidingView, Keyboard, Modal, Alert
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const HORARIOS_DISPONIVEIS = Array.from({ length: 48 }, (_, i) => {
  const horas = Math.floor(i / 2).toString().padStart(2, '0');
  const minutos = (i % 2 === 0 ? '00' : '30');
  return `${horas}:${minutos}`;
});

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
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
const OPCOES_RECORRENCIA = ['Nenhuma', 'Todos os dias', 'Seg a sex', 'Fins de semana', 'Personalizado'];
const DIAS_SEMANA = [
  { id: 0, label: 'D', nome: 'domingo' }, { id: 1, label: 'S', nome: 'segunda' },
  { id: 2, label: 'T', nome: 'terça' }, { id: 3, label: 'Q', nome: 'quarta' },
  { id: 4, label: 'Q', nome: 'quinta' }, { id: 5, label: 'S', nome: 'sexta' },
  { id: 6, label: 'S', nome: 'sábado' }
];

const PostItem = memo(({ post }) => {
  const [estaAberto, setEstaAberto] = useState(false);
  const [textoResposta, setTextoResposta] = useState('');
  const [hasMessage, setHasMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const alternar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEstaAberto(!estaAberto);
  };

  const handleNotification = () => {
    Alert.alert('Notificação Enviada', `O cliente foi notificado sobre a postagem do dia ${post.date}.`);
  };
  
  return (
    <View style={[styles.postCard, { borderLeftColor: post.color }]}>
      <TouchableOpacity onPress={alternar} activeOpacity={0.7} style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <View style={[styles.statusBadge, { backgroundColor: post.color + '20' }]}>
            <Text style={[styles.statusText, { color: post.color }]}>{post.status.toUpperCase()}</Text>
          </View>
          {post.status === 'nao-visualizado' && (
            <View style={styles.badgePurple}>
              <Text style={styles.badgePurpleText}>NÃO VISUALIZADO</Text>
            </View>
          )}
          <Text style={styles.postDate}>{post.date} {post.hora ? `- ${post.hora}` : ''}</Text>
        </View>
        <Ionicons name={estaAberto ? "chevron-up" : "chevron-down"} size={20} color="#666" />
      </TouchableOpacity>

      {estaAberto && (
        <View style={styles.expandedContent}>
          <View style={styles.tagsRow}>
            <View style={styles.tagContainer}><Text style={styles.tagText}>{post.type.toUpperCase()}</Text></View>
            <View style={styles.tagContainer}><Text style={styles.tagText}>{post.redes.join(', ').toUpperCase()}</Text></View>
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

          <Text style={styles.expandedSectionTitle}>Legenda:</Text>
          <Text style={styles.expandedCopy}>{post.copy || "Este formato não utiliza legenda externa."}</Text>

          <View style={styles.actionButtonsContainer}>
            {hasMessage ? (
              <TouchableOpacity style={styles.actionButton} onPress={() => { /* lógica de resposta */ }}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#6a11cb" />
                <Text style={styles.actionButtonText}>Responder</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.actionButton, isHovered && styles.actionButtonHover]} 
                onPress={handleNotification}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Ionicons name="cellular-outline" size={24} color={isHovered ? '#6a11cb' : '#555'} />
                <Text style={[styles.actionButtonText, isHovered && styles.actionButtonTextHover]}>Notificar Cliente</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

export default function CalendarScreen({ navigation }) {
  const [showHoraPicker, setShowHoraPicker] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [novoPost, setNovoPost] = useState({
    copy: '', redes: [], tipo: 'Feed', media: [], hora: '12:00', tipoRecorrencia: 'Nenhuma', diasPersonalizados: []
  });

  const [posts, setPosts] = useState([
    {
      id: '1', date: '18/03/2026', dateString: '2026-03-18', hora: '18:30', status: 'pendente', color: '#FF9500',
      redes: ['instagram', 'facebook', 'tiktok'], type: 'Reels',
      copy: 'Vídeo institucional da nova fachada.',
      media: [{ id: 'm1', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400' }]
    },
    {
      id: '2', date: '20/03/2026', dateString: '2026-03-20', hora: '10:00', status: 'aprovado', color: '#28a745',
      redes: ['instagram', 'linkedin'], type: 'Feed',
      copy: 'Dicas de iluminação natural para arquitetos.',
      media: [{ id: 'm2', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400' }]
    }
  ]);

  const postsFiltrados = useMemo(() => {
    let filtrados = posts;
    if (dataSelecionada) filtrados = filtrados.filter(p => p.dateString === dataSelecionada);
    if (filtroStatus !== 'Todos') {
      if (filtroStatus === 'Pendente') {
        filtrados = filtrados.filter(p => p.status === 'pendente' || p.status === 'nao-visualizado');
      } else {
        filtrados = filtrados.filter(p => p.status === filtroStatus.toLowerCase());
      }
    }
    return filtrados;
  }, [dataSelecionada, filtroStatus, posts]);

  const getFormatosPermitidos = (mediaArray) => {
    if (mediaArray.length === 0) return TIPOS_POST;
    const hasVideo = mediaArray.some(m => m.type === 'video');
    const multiple = mediaArray.length > 1;
    let permitidos = ['Story'];
    if (!hasVideo) permitidos.push('Carrossel');
    if (!multiple) permitidos.push('Feed');
    if (!multiple) permitidos.push('Reels');
    return permitidos;
  };

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
      setNovoPost(prev => {
        const todasMidias = [...prev.media, ...novasMidias];
        const formatosValidos = getFormatosPermitidos(todasMidias);
        let novoTipo = prev.tipo;
        if (!formatosValidos.includes(novoTipo)) novoTipo = formatosValidos[0];
        return { ...prev, media: todasMidias, tipo: novoTipo, redes: [] };
      });
    }
  };

  const removerMidia = (id) => {
    setNovoPost(prev => {
      const novaLista = prev.media.filter(m => m.id !== id);
      const formatosValidos = getFormatosPermitidos(novaLista);
      let novoTipo = prev.tipo;
      if (!formatosValidos.includes(novoTipo)) novoTipo = formatosValidos[0];
      return { ...prev, media: novaLista, tipo: novoTipo, redes: [] };
    });
  };

  const alternarRede = (redeId) => {
    setNovoPost(prev => {
      const selecionadas = prev.redes.includes(redeId) ? prev.redes.filter(r => r !== redeId) : [...prev.redes, redeId];
      return { ...prev, redes: selecionadas };
    });
  };

  const alternarDiaSemana = (diaId) => {
    setNovoPost(prev => {
      const dias = prev.diasPersonalizados.includes(diaId) 
        ? prev.diasPersonalizados.filter(d => d !== diaId) 
        : [...prev.diasPersonalizados, diaId];
      return { ...prev, diasPersonalizados: dias };
    });
  };

  const verificarAvisoTempo = (rede) => {
    const video = novoPost.media.find(m => m.type === 'video');
    if (!video) return null;
    const limite = rede.limitesVideo[novoPost.tipo];
    if (limite && video.duration > limite) return `Max: ${limite}s`;
    return null;
  };

  const adicionarDias = (dataStr, dias) => {
    const [ano, mes, dia] = dataStr.split('-');
    const data = new Date(ano, mes - 1, dia);
    data.setDate(data.getDate() + dias);
    return data.toISOString().split('T')[0];
  };

  const renderResumoRecorrencia = () => {
    if (novoPost.tipo !== 'Story' || novoPost.tipoRecorrencia === 'Nenhuma') return null;
    let texto = '';
    if (novoPost.tipoRecorrencia === 'Todos os dias') texto = 'Todos os dias';
    else if (novoPost.tipoRecorrencia === 'Seg a sex') texto = 'De segunda a sexta';
    else if (novoPost.tipoRecorrencia === 'Fins de semana') texto = 'Aos fins de semana';
    else if (novoPost.tipoRecorrencia === 'Personalizado') {
      if (novoPost.diasPersonalizados.length === 0) return 'Selecione os dias da semana acima';
      const diasOrdenados = [...novoPost.diasPersonalizados].sort();
      const nomes = diasOrdenados.map(id => {
        const dia = DIAS_SEMANA.find(d => d.id === id);
        return dia.nome === 'sábado' || dia.nome === 'domingo' ? `todo ${dia.nome}` : `toda ${dia.nome}`;
      });
      texto = nomes.join(', ').replace(/, ([^,]*)$/, ' e $1');
    }
    return `Agendado para ${texto} às ${novoPost.hora}`;
  };

  const salvarNovoPost = () => {
    if (!dataSelecionada) { Alert.alert("Atenção", "Selecione uma data no calendário."); return; }
    if (novoPost.redes.length === 0) { Alert.alert("Atenção", "Selecione pelo menos uma rede social."); return; }
    
    let datasAgendamento = [dataSelecionada];
    if (novoPost.tipo === 'Story' && novoPost.tipoRecorrencia !== 'Nenhuma') {
      let atual = dataSelecionada;
      let gerados = 1;
      while (gerados < 5) {
        atual = adicionarDias(atual, 1);
        const diaSemana = new Date(atual + 'T00:00:00').getDay();
        let valido = false;
        if (novoPost.tipoRecorrencia === 'Todos os dias') valido = true;
        else if (novoPost.tipoRecorrencia === 'Seg a sex' && diaSemana >= 1 && diaSemana <= 5) valido = true;
        else if (novoPost.tipoRecorrencia === 'Fins de semana' && (diaSemana === 0 || diaSemana === 6)) valido = true;
        else if (novoPost.tipoRecorrencia === 'Personalizado' && novoPost.diasPersonalizados.includes(diaSemana)) valido = true;
        if (valido) { datasAgendamento.push(atual); gerados++; }
      }
    }

    const novosPosts = datasAgendamento.map(dataStr => ({
      ...novoPost,
      id: Math.random().toString(),
      date: dataStr.split('-').reverse().join('/'),
      dateString: dataStr,
      status: 'nao-visualizado',
      type: novoPost.tipo,
      color: '#6a11cb'
    }));

    setPosts([...posts, ...novosPosts]);
    setModalVisible(false);
    setNovoPost({ copy: '', redes: [], tipo: 'Feed', media: [], hora: '12:00', tipoRecorrencia: 'Nenhuma', diasPersonalizados: [] });
    Alert.alert("Sucesso", "Agendamento registrado!");
  };

  const renderMarkedDates = () => {
    let marked = {};
    posts.forEach(p => {
      const eRecorrente = p.tipoRecorrencia && p.tipoRecorrencia !== 'Nenhuma';
      let dotColor = p.status === 'nao-visualizado' ? '#6a11cb' : p.color;
      if (!marked[p.dateString]) {
        marked[p.dateString] = { dots: [], customStyles: eRecorrente ? { container: { borderWidth: 1, borderColor: '#6a11cb50', borderRadius: 5 } } : {} };
      }
      if (!marked[p.dateString].dots.find(d => d.key === p.id)) {
        marked[p.dateString].dots.push({ key: p.id, color: dotColor, selectedDotColor: eRecorrente ? '#6a11cb' : dotColor });
      }
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
              markingType={'multi-dot'}
              markedDates={renderMarkedDates()}
              theme={{ todayTextColor: '#6a11cb', dotColor: '#6a11cb', selectedDayBackgroundColor: '#6a11cb20', selectedDayTextColor: '#6a11cb' }}
            />
          </View>

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
              {dataSelecionada && <TouchableOpacity onPress={() => setDataSelecionada(null)}><Text style={styles.clearDateText}>Ver todos</Text></TouchableOpacity>}
            </View>
            {postsFiltrados.map(post => <PostItem key={post.id} post={post} />)}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Novo Agendamento</Text>
                <Text style={styles.modalSubtitle}>{dataSelecionada || 'Selecione uma data'}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} color="#666" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Horário da Postagem:</Text>
              {/* O BOTÃO QUE VOCÊ QUERIA */}
              <TouchableOpacity style={styles.timeDropdown} onPress={() => setShowHoraPicker(true)}>
                <Text style={styles.timeDropdownText}>{novoPost.hora}</Text>
                <Ionicons name="time-outline" size={20} color="#6a11cb" />
              </TouchableOpacity>

              <Text style={styles.label}>Mídia:</Text>
              <ScrollView horizontal style={styles.mediaPreviewContainer}>
                <TouchableOpacity style={styles.uploadButton} onPress={abrirGaleria}><Ionicons name="cloud-upload-outline" size={28} color="#6a11cb" /></TouchableOpacity>
                {novoPost.media.map(m => (
                  <View key={m.id} style={styles.thumbnailWrapper}>
                    <Image source={{ uri: m.url }} style={styles.thumbnailImage} />
                    <TouchableOpacity style={styles.removeMediaBtn} onPress={() => removerMidia(m.id)}><Ionicons name="close-circle" size={24} color="#FF3B30" /></TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <Text style={styles.label}>Formato do Post:</Text>
              <View style={styles.typeGrid}>
                {TIPOS_POST.map(tipo => (
                  <TouchableOpacity key={tipo} style={[styles.typePill, novoPost.tipo === tipo && styles.typePillSelected]} onPress={() => setNovoPost({ ...novoPost, tipo })}>
                    <Text style={[styles.typePillText, novoPost.tipo === tipo && styles.typePillTextSelected]}>{tipo}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {novoPost.tipo === 'Story' && (
                <View style={styles.recurrenceContainer}>
                  <Text style={styles.label}>Recorrência:</Text>
                  <View style={styles.typeGrid}>
                    {OPCOES_RECORRENCIA.map(op => (
                      <TouchableOpacity key={op} style={[styles.recPill, novoPost.tipoRecorrencia === op && styles.recPillSelected]} onPress={() => setNovoPost({ ...novoPost, tipoRecorrencia: op })}>
                        <Text style={[styles.recPillText, novoPost.tipoRecorrencia === op && styles.recPillTextSelected]}>{op}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  {novoPost.tipoRecorrencia === 'Personalizado' && (
                    <View style={styles.weekDaySelector}>
                      {DIAS_SEMANA.map(dia => (
                        <TouchableOpacity 
                          key={dia.id} 
                          style={[styles.dayPill, novoPost.diasPersonalizados.includes(dia.id) && styles.dayPillSelected]} 
                          onPress={() => alternarDiaSemana(dia.id)}
                        >
                          <Text style={[styles.dayPillText, novoPost.diasPersonalizados.includes(dia.id) && styles.dayPillTextSelected]}>{dia.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}

              <Text style={styles.label}>Publicar em:</Text>
              <View style={styles.socialGrid}>
                {REDES_SOCIAIS.map((rede) => (
                  <TouchableOpacity key={rede.id} style={[styles.socialSquare, novoPost.redes.includes(rede.id) && styles.socialSquareSelected]} onPress={() => alternarRede(rede.id)}>
                    <Ionicons name={rede.icone} size={24} color={novoPost.redes.includes(rede.id) ? "#FFF" : "#555"} />
                    <Text style={[styles.socialSquareText, novoPost.redes.includes(rede.id) && { color: '#FFF' }]}>{rede.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Legenda:</Text>
              <TextInput style={styles.modalInput} placeholder="Digite a legenda..." value={novoPost.copy} onChangeText={(t) => setNovoPost({ ...novoPost, copy: t })} multiline />

              <TouchableOpacity style={styles.saveButton} onPress={salvarNovoPost}><Text style={styles.saveText}>Solicitar Produção</Text></TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showHoraPicker} transparent animationType="fade">
        <TouchableOpacity style={styles.miniModalOverlay} activeOpacity={1} onPress={() => setShowHoraPicker(false)}>
          <View style={styles.miniModalContent}>
            <Text style={styles.miniModalTitle}>Selecione o Horário</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {HORARIOS_DISPONIVEIS.map((h) => (
                <TouchableOpacity key={h} style={[styles.hourOption, novoPost.hora === h && styles.hourOptionSelected]} onPress={() => { setNovoPost({ ...novoPost, hora: h }); setShowHoraPicker(false); }}>
                  <Text style={[styles.hourOptionText, novoPost.hora === h && styles.hourOptionTextSelected]}>{h}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  addButton: { backgroundColor: '#6a11cb', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  calendarWrapper: { backgroundColor: '#FFF' },
  filterBar: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, backgroundColor: '#EEE' },
  filterBtnActive: { backgroundColor: '#6a11cb' },
  filterText: { fontSize: 12, color: '#666', fontWeight: 'bold' },
  filterTextActive: { color: '#FFF' },
  listContainer: { padding: 20 },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  listTitle: { fontSize: 18, fontWeight: 'bold' },
  clearDateText: { fontSize: 12, color: '#6a11cb', fontWeight: 'bold' },
  postCard: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, elevation: 3 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  postHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  badgePurple: { backgroundColor: '#6a11cb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  badgePurpleText: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
  postDate: { fontSize: 14, color: '#6a11cb' },
  expandedContent: { padding: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
  tagsRow: { flexDirection: 'row', marginBottom: 15 },
  tagContainer: { backgroundColor: '#F0F0F0', padding: 6, borderRadius: 6, marginRight: 8 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: '#555' },
  carouselContainer: { marginBottom: 15 },
  mediaWrapper: { width: 280, height: 180, marginRight: 10, borderRadius: 8, overflow: 'hidden' },
  postImage: { width: '100%', height: '100%' },
  videoIndicator: { position: 'absolute', top: '40%', left: '45%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 30 },
  expandedSectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  expandedCopy: { fontSize: 14, color: '#666', marginBottom: 20 },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  actionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'transparent', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  actionButtonText: { marginLeft: 10, color: '#555', fontWeight: 'bold' },
  actionButtonHover: {
    backgroundColor: '#6a11cb10',
    borderColor: '#6a11cb'
  },
  actionButtonTextHover: {
    color: '#6a11cb'
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', padding: 25, borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '90%' },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalSubtitle: { fontSize: 12, color: '#666' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 15, marginBottom: 8 },
  timeDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#6a11cb', borderRadius: 10, padding: 15 },
  timeDropdownText: { fontSize: 16, color: '#6a11cb', fontWeight: 'bold' },
  mediaPreviewContainer: { flexDirection: 'row', marginBottom: 15 },
  uploadButton: { width: 80, height: 80, borderStyle: 'dashed', borderWidth: 1, borderColor: '#6a11cb', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  thumbnailWrapper: { width: 80, height: 80, marginRight: 10, borderRadius: 10, overflow: 'hidden' },
  thumbnailImage: { width: '100%', height: '100%' },
  removeMediaBtn: { position: 'absolute', top: 2, right: 2, backgroundColor: '#FFF', borderRadius: 12 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  typePill: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#EEE', marginRight: 10, marginBottom: 10 },
  typePillSelected: { backgroundColor: '#6a11cb' },
  typePillText: { fontWeight: 'bold', color: '#555' },
  typePillTextSelected: { color: '#FFF' },
  recurrenceContainer: { backgroundColor: '#F8F9FB', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  recPill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 15, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', marginRight: 8, marginBottom: 8 },
  recPillSelected: { backgroundColor: '#6a11cb', borderColor: '#6a11cb' },
  recPillText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  recPillTextSelected: { color: '#FFF' },
  weekDaySelector: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#F0F0F0', paddingVertical: 10, borderRadius: 10, marginTop: 10 },
  dayPill: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD' },
  dayPillSelected: { backgroundColor: '#6a11cb', borderColor: '#6a11cb' },
  dayPillText: { fontWeight: 'bold', color: '#555' },
  dayPillTextSelected: { color: '#FFF' },
  socialGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  socialSquare: { width: '30%', paddingVertical: 12, backgroundColor: '#EEE', borderRadius: 12, alignItems: 'center', marginBottom: 10, marginRight: '3%' },
  socialSquareSelected: { backgroundColor: '#6a11cb' },
  socialSquareText: { fontSize: 11, fontWeight: 'bold', marginTop: 4 },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, minHeight: 100 },
  saveButton: { backgroundColor: '#6a11cb', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveText: { color: '#FFF', fontWeight: 'bold' },
  miniModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  miniModalContent: { backgroundColor: '#FFF', width: '75%', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#6a11cb' },
  miniModalTitle: { fontSize: 18, fontWeight: 'bold', color: '#6a11cb', textAlign: 'center', marginBottom: 15 },
  hourOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  hourOptionSelected: { backgroundColor: '#6a11cb20' },
  hourOptionText: { fontSize: 18, textAlign: 'center', color: '#000' },
  hourOptionTextSelected: { color: '#6a11cb', fontWeight: 'bold' }
});