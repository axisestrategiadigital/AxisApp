import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
    const [clienteAtivo, setClienteAtivo] = useState('Cliente 01');
    const [modalConectarVisible, setModalConectarVisible] = useState(false);
    
    // Agora começa direto no Instagram, sem a visão "macro"
    const [redeAnalyticsAtiva, setRedeAnalyticsAtiva] = useState('instagram'); 

    const statusSync = { sucesso: true, ultimaSync: 'Hoje, 14:30', plano: 'PRO' };
    const clientes = ['Cliente 01', 'Cliente 02', 'Cliente 03'];

    const proximosPosts = [
        { id: '1', data: 'Amanhã, às 10:00', copy: 'Descubra como a estratégia digital pode transformar seu engajamento em 2026...', redes: ['logo-instagram', 'logo-facebook'] },
        { id: '2', data: 'Qui, 19/03 às 15:00', copy: '3 segredos para aumentar a conversão das suas campanhas de tráfego pago...', redes: ['logo-tiktok'] },
        { id: '3', data: 'Sex, 20/03 às 18:00', copy: 'Bastidores da nossa última captação com drone para lançamento imobiliário...', redes: ['logo-instagram', 'logo-linkedin'] }
    ];

    const redesParaConectar = [
        { id: 'instagram', nome: 'Instagram', icone: 'logo-instagram', cor: '#E1306C' },
        { id: 'facebook', nome: 'Facebook', icone: 'logo-facebook', cor: '#1877F2' },
        { id: 'tiktok', nome: 'TikTok', icone: 'logo-tiktok', cor: '#000000' },
        { id: 'youtube', nome: 'YouTube', icone: 'logo-youtube', cor: '#FF0000' },
        { id: 'linkedin', nome: 'LinkedIn', icone: 'logo-linkedin', cor: '#0A66C2' },
        { id: 'twitter', nome: 'X', icone: 'logo-twitter', cor: '#000000' },
    ];

    // BANCO DE DADOS DINÂMICO DE MÉTRICAS E INSIGHTS POR REDE
    const dadosAnalytics = {
        instagram: {
            insight: "Foco na taxa de engajamento (curtidas + comentários / seguidores) e crescimento de audiência.",
            metricas: [
                { id: '1', titulo: 'Seguidores', valor: '12.4k', delta: '+5%', percentual: 85, icone: 'people' },
                { id: '2', titulo: 'Alcance', valor: '45k', delta: '+12%', percentual: 70, icone: 'eye' },
                { id: '3', titulo: 'Curtidas', valor: '3.2k', delta: '+8%', percentual: 60, icone: 'heart' },
                { id: '4', titulo: 'Comentários', valor: '342', delta: '-2%', percentual: 40, icone: 'chatbubbles' },
            ]
        },
        facebook: {
            insight: "Análise de conteúdo viral (compartilhamentos) e proporção de alcance orgânico vs base.",
            metricas: [
                { id: '1', titulo: 'Seguidores', valor: '25.1k', delta: '+2%', percentual: 90, icone: 'people' },
                { id: '2', titulo: 'Alcance', valor: '18k', delta: '-5%', percentual: 50, icone: 'eye' },
                { id: '3', titulo: 'Reações', valor: '1.5k', delta: '+3%', percentual: 45, icone: 'thumbs-up' },
                { id: '4', titulo: 'Compartilh.', valor: '120', delta: '+15%', percentual: 65, icone: 'share-social' },
            ]
        },
        tiktok: {
            insight: "Potencial de viralização (views vs seguidores) e conteúdos que 'explodem'.",
            metricas: [
                { id: '1', titulo: 'Visualizações', valor: '150k', delta: '+45%', percentual: 95, icone: 'play' },
                { id: '2', titulo: 'Curtidas', valor: '15k', delta: '+30%', percentual: 80, icone: 'heart' },
                { id: '3', titulo: 'Compartilh.', valor: '2.1k', delta: '+50%', percentual: 85, icone: 'arrow-redo' },
                { id: '4', titulo: 'Seguidores', valor: '8.2k', delta: '+12%', percentual: 60, icone: 'people' },
            ]
        },
        youtube: {
            insight: "Foco na retenção (watch time alto = conteúdo bom) e crescimento contínuo do canal.",
            metricas: [
                { id: '1', titulo: 'Visualizações', valor: '42k', delta: '+8%', percentual: 75, icone: 'play-circle' },
                { id: '2', titulo: 'Watch Time', valor: '1.2k h', delta: '+15%', percentual: 85, icone: 'time' },
                { id: '3', titulo: 'Inscritos', valor: '3.4k', delta: '+5%', percentual: 50, icone: 'person-add' },
                { id: '4', titulo: 'Likes', valor: '2.8k', delta: '+10%', percentual: 60, icone: 'thumbs-up' },
            ]
        },
        linkedin: {
            insight: "Construção de autoridade profissional e atração de engajamento qualificado (B2B).",
            metricas: [
                { id: '1', titulo: 'Seguidores', valor: '4.5k', delta: '+10%', percentual: 65, icone: 'people' },
                { id: '2', titulo: 'Impressões', valor: '12k', delta: '+25%', percentual: 80, icone: 'eye' },
                { id: '3', titulo: 'Reações', valor: '850', delta: '+15%', percentual: 55, icone: 'thumbs-up' },
                { id: '4', titulo: 'Comentários', valor: '120', delta: '+5%', percentual: 40, icone: 'chatbubble-ellipses' },
            ]
        },
        twitter: {
            insight: "Relação de alcance vs engajamento e alta frequência de conteúdo compartilhável.",
            metricas: [
                { id: '1', titulo: 'Impressões', valor: '85k', delta: '+20%', percentual: 85, icone: 'eye' },
                { id: '2', titulo: 'Likes', valor: '4.2k', delta: '+10%', percentual: 60, icone: 'heart' },
                { id: '3', titulo: 'Retweets', valor: '890', delta: '+35%', percentual: 75, icone: 'repeat' },
                { id: '4', titulo: 'Seguidores', valor: '1.1k', delta: '+2%', percentual: 40, icone: 'people' },
            ]
        }
    };

    const redeAtivaObj = redesParaConectar.find(r => r.id === redeAnalyticsAtiva);
    const dadosAtuais = dadosAnalytics[redeAnalyticsAtiva];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.welcomeText}>Olá, Luiz!</Text>
                    <View style={styles.planBadge}>
                        <Ionicons name="star" size={10} color="#FFF" style={{marginRight: 4}} />
                        <Text style={styles.planBadgeText}>PLANO {statusSync.plano}</Text>
                    </View>
                </View>

                <View style={styles.syncRow}>
                    <Ionicons name={statusSync.sucesso ? "checkmark-done-circle" : "warning"} size={14} color={statusSync.sucesso ? "#43A047" : "#FB8C00"} />
                    <Text style={styles.syncText}>
                        Sincronizado: {statusSync.ultimaSync} {statusSync.sucesso ? '' : '(Usando cache)'}
                    </Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.clientSelector}>
                    {clientes.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.clientBadge, clienteAtivo === item && styles.clientBadgeActive]}
                            onPress={() => setClienteAtivo(item)}
                        >
                            <Text style={[styles.clientText, clienteAtivo === item && styles.clientTextActive]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.anomalyAlert}>
                    <View style={styles.anomalyIconWrap}>
                        <Ionicons name="trending-up" size={20} color="#FFF" />
                    </View>
                    <View style={styles.anomalyTextWrap}>
                        <Text style={styles.anomalyTitle}>Pico Detectado!</Text>
                        <Text style={styles.anomalyDesc}>Crescimento anormal de +210% no alcance do Instagram nas últimas 24h.</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Panorama Geral: {clienteAtivo}</Text>

                <View style={styles.statsContainer}>
                    <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
                        <Ionicons name="calendar" size={24} color="#1E88E5" />
                        <Text style={styles.cardValue}>12</Text>
                        <Text style={styles.cardLabel}>Agendados</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
                        <Ionicons name="time" size={24} color="#FB8C00" />
                        <Text style={styles.cardValue}>05</Text>
                        <Text style={styles.cardLabel}>Pendentes</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
                        <Ionicons name="build" size={24} color="#E53935" />
                        <Text style={styles.cardValue}>03</Text>
                        <Text style={styles.cardLabel}>Ajustar</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
                        <Ionicons name="checkmark-circle" size={24} color="#43A047" />
                        <Text style={styles.cardValue}>08</Text>
                        <Text style={styles.cardLabel}>Aprovados</Text>
                    </View>
                </View>

                <View style={styles.nextPostContainer}>
                    <Text style={styles.nextPostTitle}>Próximas Postagens</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
                        {proximosPosts.map(post => (
                            <View key={post.id} style={styles.nextPostCardCarousel}>
                                <View style={styles.postPreviewPlaceholder}>
                                    <Ionicons name="image-outline" size={32} color="#CCC" />
                                </View>
                                <View style={styles.postInfo}>
                                    <Text style={styles.postDate}>{post.data}</Text>
                                    <Text style={styles.postCopy} numberOfLines={2}>
                                        "{post.copy}"
                                    </Text>
                                    <View style={styles.socialIconsRow}>
                                        {post.redes.map((rede, idx) => (
                                            <Ionicons key={idx} name={rede} size={16} color="#666" style={{ marginRight: 8 }} />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.analyticsContainer}>
                    <View style={styles.analyticsHeaderRow}>
                        <Text style={styles.analyticsTitle}>Desempenho de Redes</Text>
                        
                    </View>

                    <View style={styles.analyticsNetworksRow}>
                        {redesParaConectar.map(rede => {
                            const isActive = redeAnalyticsAtiva === rede.id;
                            return (
                                <TouchableOpacity 
                                    key={rede.id} 
                                    style={[
                                        styles.analyticsNetworkBtn, 
                                        { borderColor: rede.cor },
                                        isActive && { backgroundColor: rede.cor }
                                    ]}
                                    onPress={() => setRedeAnalyticsAtiva(rede.id)}
                                >
                                    <Ionicons name={rede.icone} size={18} color={isActive ? '#FFF' : rede.cor} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.analyticsCard}>
                        <View style={[styles.insightBox, { backgroundColor: redeAtivaObj.cor + '10', borderColor: redeAtivaObj.cor + '30' }]}>
                            <Ionicons name="bulb" size={16} color={redeAtivaObj.cor} style={{marginRight: 6, marginTop: 2}} />
                            <Text style={[styles.insightText, { color: '#444' }]}>
                                <Text style={{fontWeight: 'bold', color: redeAtivaObj.cor}}>Insight: </Text>
                                {dadosAtuais.insight}
                            </Text>
                        </View>

                        {dadosAtuais.metricas.map(metrica => {
                            const isPositive = metrica.delta.includes('+');
                            return (
                                <View key={metrica.id} style={styles.analyticsRow}>
                                    <View style={[styles.analyticsIconWrap, { backgroundColor: redeAtivaObj.cor + '15' }]}>
                                        <Ionicons name={metrica.icone} size={16} color={redeAtivaObj.cor} />
                                    </View>
                                    <Text style={styles.analyticsMetricName}>{metrica.titulo}</Text>
                                    
                                    <View style={styles.analyticsBarBg}>
                                        <View style={[styles.analyticsBarFill, { width: `${metrica.percentual}%`, backgroundColor: redeAtivaObj.cor }]} />
                                    </View>
                                    
                                    <View style={styles.analyticsValuesCol}>
                                        <Text style={[styles.analyticsMetricValue, { color: redeAtivaObj.cor }]}>{metrica.valor}</Text>
                                        <Text style={[styles.analyticsDelta, { color: isPositive ? '#43A047' : '#E53935' }]}>
                                            {metrica.delta}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="home" size={26} color="#6a11cb" />
                    <Text style={[styles.tabText, { color: '#6a11cb' }]}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Calendar')}>
                    <Ionicons name="calendar-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusButton} onPress={() => setModalConectarVisible(true)}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>

                {/* ATUALIZADO: Aba de Aprovação mudou para Dados */}
                <TouchableOpacity 
                    style={styles.tabItem} 
                    onPress={() => navigation.navigate('Analytics')}
                >
                    <Ionicons name="bar-chart-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Dados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Ajustes</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalConectarVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeaderRow}>
                            <View>
                                <Text style={styles.modalTitle}>Integração de Módulos</Text>
                                <Text style={styles.modalSubtitle}>Autorize conexões para o workspace: {clienteAtivo}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModalConectarVisible(false)}>
                                <Ionicons name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {redesParaConectar.map(rede => (
                                <TouchableOpacity 
                                    key={rede.id} 
                                    style={styles.connectNetworkBtn} 
                                    onPress={() => {
                                        Alert.alert('OAuth 2.0', `Redirecionando de forma segura para a API do ${rede.nome}...`);
                                    }}
                                >
                                    <View style={[styles.networkIconBg, { backgroundColor: rede.cor + '15' }]}>
                                        <Ionicons name={rede.icone} size={22} color={rede.cor} />
                                    </View>
                                    <Text style={styles.networkName}>{rede.nome}</Text>
                                    <Ionicons name="shield-checkmark" size={16} color="#43A047" style={{marginRight: 8}} />
                                    <Ionicons name="chevron-forward" size={20} color="#CCC" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    
    header: { backgroundColor: '#FFF', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
    planBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6a11cb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    planBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    syncRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    syncText: { fontSize: 12, color: '#666', marginLeft: 6 },
    
    clientSelector: { flexDirection: 'row' },
    clientBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0', marginRight: 10, borderWidth: 1, borderColor: '#DDD' },
    clientBadgeActive: { backgroundColor: '#6a11cb', borderColor: '#6a11cb' },
    clientText: { color: '#666', fontWeight: '600' },
    clientTextActive: { color: '#FFF' },

    content: { flex: 1, padding: 20 },
    
    anomalyAlert: { flexDirection: 'row', backgroundColor: '#FFF4E5', borderColor: '#FFB74D', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 20, alignItems: 'center' },
    anomalyIconWrap: { backgroundColor: '#FB8C00', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    anomalyTextWrap: { flex: 1 },
    anomalyTitle: { fontSize: 14, fontWeight: 'bold', color: '#E65100' },
    anomalyDesc: { fontSize: 12, color: '#F57C00', marginTop: 2 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },

    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 25 },
    card: { width: '48%', padding: 15, borderRadius: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, marginBottom: 10 },
    cardValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
    cardLabel: { fontSize: 12, color: '#666' },

    nextPostContainer: { marginBottom: 25 },
    nextPostTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    carouselContainer: { overflow: 'visible' },
    nextPostCardCarousel: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', width: 300, marginRight: 15 },
    postPreviewPlaceholder: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    postInfo: { flex: 1, marginLeft: 15 },
    postDate: { fontSize: 12, color: '#6a11cb', fontWeight: 'bold' },
    postCopy: { fontSize: 13, color: '#444', marginVertical: 4, fontStyle: 'italic' },
    socialIconsRow: { flexDirection: 'row', marginTop: 4 },

    analyticsContainer: { marginBottom: 10 },
    analyticsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
    analyticsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    analyticsLink: { fontSize: 12, color: '#6a11cb', fontWeight: '600' },
    
    analyticsNetworksRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center', marginBottom: 15 },
    analyticsNetworkBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#FFF' },

    analyticsCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, borderWidth: 1, borderColor: '#EEE' },
    
    insightBox: { flexDirection: 'row', padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 15 },
    insightText: { flex: 1, fontSize: 12, lineHeight: 18 },

    analyticsRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    analyticsIconWrap: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    analyticsMetricName: { width: 85, fontSize: 12, color: '#555', fontWeight: '600' },
    analyticsBarBg: { flex: 1, height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, marginHorizontal: 10, overflow: 'hidden' },
    analyticsBarFill: { height: '100%', borderRadius: 3 },
    
    analyticsValuesCol: { width: 45, alignItems: 'flex-end' },
    analyticsMetricValue: { fontSize: 12, fontWeight: 'bold' },
    analyticsDelta: { fontSize: 9, fontWeight: 'bold', marginTop: 2 },

    bottomTab: { flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' },
    tabItem: { alignItems: 'center' },
    tabText: { fontSize: 10, marginTop: 4, color: '#999' },
    plusButton: { backgroundColor: '#6a11cb', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: -30, elevation: 5, shadowColor: '#6a11cb', shadowOpacity: 0.3, shadowRadius: 10 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', padding: 25, borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '90%' },
    modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
    modalSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
    connectNetworkBtn: { flexDirection: 'row', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#EEE', borderRadius: 12, marginBottom: 10, backgroundColor: '#FAFAFA' },
    networkIconBg: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    networkName: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#333' }
});