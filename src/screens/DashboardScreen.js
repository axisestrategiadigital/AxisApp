import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
    const [clienteAtivo, setClienteAtivo] = useState('Cliente 01');
    const [modalConectarVisible, setModalConectarVisible] = useState(false);
    const [redeAnalyticsAtiva, setRedeAnalyticsAtiva] = useState('instagram'); // Estado para a linha de redes

    const clientes = ['Cliente 01', 'Cliente 02', 'Cliente 03'];

    const proximosPosts = [
        { 
            id: '1', 
            data: 'Amanhã, às 10:00', 
            copy: 'Descubra como a estratégia digital pode transformar seu engajamento em 2026...', 
            redes: ['logo-instagram', 'logo-facebook'] 
        },
        { 
            id: '2', 
            data: 'Qui, 19/03 às 15:00', 
            copy: '3 segredos para aumentar a conversão das suas campanhas de tráfego pago...', 
            redes: ['logo-tiktok'] 
        },
        { 
            id: '3', 
            data: 'Sex, 20/03 às 18:00', 
            copy: 'Bastidores da nossa última captação com drone para lançamento imobiliário...', 
            redes: ['logo-instagram', 'logo-linkedin'] 
        }
    ];

    // Métricas base para o gráfico
    const metricas = [
        { id: '1', titulo: 'Alcance', valor: '12.4k', percentual: 75, cor: '#1E88E5', icone: 'eye' },
        { id: '2', titulo: 'Engajamento', valor: '8.2%', percentual: 45, cor: '#FB8C00', icone: 'heart' },
        { id: '3', titulo: 'Visitas', valor: '1.2k', percentual: 60, cor: '#43A047', icone: 'person' },
        { id: '4', titulo: 'Mensagens', valor: '145', percentual: 30, cor: '#E53935', icone: 'chatbubble-ellipses' },
    ];

    const redesParaConectar = [
        { id: 'instagram', nome: 'Instagram', icone: 'logo-instagram', cor: '#E1306C' },
        { id: 'tiktok', nome: 'TikTok', icone: 'logo-tiktok', cor: '#000000' },
        { id: 'facebook', nome: 'Facebook', icone: 'logo-facebook', cor: '#1877F2' },
        { id: 'linkedin', nome: 'LinkedIn', icone: 'logo-linkedin', cor: '#0A66C2' },
        { id: 'twitter', nome: 'X', icone: 'logo-twitter', cor: '#000000' },
        { id: 'youtube', nome: 'YouTube', icone: 'logo-youtube', cor: '#FF0000' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Olá, Luiz!</Text>
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

                {/* MINI GRÁFICOS: DESEMPENHO RÁPIDO */}
                <View style={styles.analyticsContainer}>
                    <View style={styles.analyticsHeaderRow}>
                        <Text style={styles.analyticsTitle}>Desempenho Rápido</Text>
                        <TouchableOpacity>
                            <Text style={styles.analyticsLink}>Análise Completa</Text>
                        </TouchableOpacity>
                    </View>

                    {/* NOVA LINHA RETA COM AS REDES SOCIAIS */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.analyticsNetworksRow}>
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
                                    <Ionicons name={rede.icone} size={20} color={isActive ? '#FFF' : rede.cor} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.analyticsCard}>
                        {metricas.map(metrica => (
                            <View key={metrica.id} style={styles.analyticsRow}>
                                <View style={[styles.analyticsIconWrap, { backgroundColor: metrica.cor + '15' }]}>
                                    <Ionicons name={metrica.icone} size={16} color={metrica.cor} />
                                </View>
                                <Text style={styles.analyticsMetricName}>{metrica.titulo}</Text>
                                
                                <View style={styles.analyticsBarBg}>
                                    <View style={[styles.analyticsBarFill, { width: `${metrica.percentual}%`, backgroundColor: metrica.cor }]} />
                                </View>
                                
                                <Text style={[styles.analyticsMetricValue, { color: metrica.cor }]}>{metrica.valor}</Text>
                            </View>
                        ))}
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

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="chatbubbles-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Aprovação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="settings-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Ajustes</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE CONECTAR REDES SOCIAIS */}
            <Modal visible={modalConectarVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeaderRow}>
                            <View>
                                <Text style={styles.modalTitle}>Conectar Contas</Text>
                                <Text style={styles.modalSubtitle}>Vincule redes para o {clienteAtivo}</Text>
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
                                        Alert.alert('Autenticação', `Abrindo login do ${rede.nome}...`);
                                    }}
                                >
                                    <View style={[styles.networkIconBg, { backgroundColor: rede.cor + '15' }]}>
                                        <Ionicons name={rede.icone} size={22} color={rede.cor} />
                                    </View>
                                    <Text style={styles.networkName}>{rede.nome}</Text>
                                    <Ionicons name="link-outline" size={20} color="#6a11cb" />
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
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
    clientSelector: { flexDirection: 'row' },
    clientBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0', marginRight: 10, borderWidth: 1, borderColor: '#DDD' },
    clientBadgeActive: { backgroundColor: '#6a11cb', borderColor: '#6a11cb' },
    clientText: { color: '#666', fontWeight: '600' },
    clientTextActive: { color: '#FFF' },

    content: { flex: 1, padding: 20 },
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
    
    // ESTILOS DA NOVA LINHA DE REDES
    analyticsNetworksRow: { flexDirection: 'row', marginBottom: 15 },
    analyticsNetworkBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#FFF' },

    analyticsCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, borderWidth: 1, borderColor: '#EEE' },
    analyticsRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    analyticsIconWrap: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    analyticsMetricName: { width: 85, fontSize: 12, color: '#555', fontWeight: '600' },
    analyticsBarBg: { flex: 1, height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, marginHorizontal: 10, overflow: 'hidden' },
    analyticsBarFill: { height: '100%', borderRadius: 3 },
    analyticsMetricValue: { width: 45, fontSize: 12, fontWeight: 'bold', textAlign: 'right' },

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