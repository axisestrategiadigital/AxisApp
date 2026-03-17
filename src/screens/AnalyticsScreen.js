import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen({ navigation }) {
    const [redeAtiva, setRedeAtiva] = useState('instagram');
    const [periodoAtivo, setPeriodoAtivo] = useState('30d');

    // Definição das Redes e Cores
    const redes = [
        { id: 'instagram', icone: 'logo-instagram', cor: '#E1306C' },
        { id: 'facebook', icone: 'logo-facebook', cor: '#1877F2' },
        { id: 'tiktok', icone: 'logo-tiktok', cor: '#000000' },
        { id: 'youtube', icone: 'logo-youtube', cor: '#FF0000' },
        { id: 'linkedin', icone: 'logo-linkedin', cor: '#0A66C2' },
        { id: 'twitter', icone: 'logo-twitter', cor: '#000000' },
    ];

    const periodos = [
        { id: '7d', label: '7 Dias' },
        { id: '15d', label: '15 Dias' },
        { id: '30d', label: '30 Dias' },
        { id: '90d', label: '3 Meses' },
    ];

    const redeSelecionada = redes.find(r => r.id === redeAtiva) || redes[0];

    // Simulação de dados dinâmicos do banco
    const kpis = [
        { titulo: 'Seguidores', valor: '12.4k', delta: '+5.2%', isPositive: true, icone: 'people' },
        { titulo: 'Alcance Total', valor: '45.2k', delta: '+12%', isPositive: true, icone: 'eye' },
        { titulo: 'Interações', valor: '3.2k', delta: '-1.5%', isPositive: false, icone: 'heart' },
        { titulo: 'Taxa Engaj.', valor: '4.8%', delta: '+2%', isPositive: true, icone: 'flash' },
    ];

    const dadosGrafico = [40, 60, 45, 80, 50, 90, 100]; // Porcentagens de altura para as barras

    return (
        <SafeAreaView style={styles.container}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Análise de Dados</Text>
                <Text style={styles.headerSubtitle}>Performance detalhada do Cliente 01</Text>
            </View>

            {/* FILTROS SUPERIORES */}
            <View style={styles.filtersContainer}>
                {/* Seletor de Redes */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.networksRow}>
                    {redes.map(rede => {
                        const isActive = redeAtiva === rede.id;
                        return (
                            <TouchableOpacity 
                                key={rede.id} 
                                style={[styles.networkBtn, { borderColor: rede.cor }, isActive && { backgroundColor: rede.cor }]}
                                onPress={() => setRedeAtiva(rede.id)}
                            >
                                <Ionicons name={rede.icone} size={18} color={isActive ? '#FFF' : rede.cor} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Seletor de Período */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodRow}>
                    {periodos.map(per => {
                        const isActive = periodoAtivo === per.id;
                        return (
                            <TouchableOpacity 
                                key={per.id} 
                                style={[styles.periodBtn, isActive && styles.periodBtnActive]}
                                onPress={() => setPeriodoAtivo(per.id)}
                            >
                                <Text style={[styles.periodText, isActive && styles.periodTextActive]}>{per.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* CONTEÚDO PRINCIPAL */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* KPIS GERAIS */}
                <Text style={styles.sectionTitle}>Visão Geral</Text>
                <View style={styles.kpiGrid}>
                    {kpis.map((kpi, index) => (
                        <View key={index} style={styles.kpiCard}>
                            <View style={styles.kpiIconRow}>
                                <Ionicons name={kpi.icone} size={20} color={redeSelecionada.cor} />
                                <Text style={kpi.isPositive ? styles.kpiDeltaPositive : styles.kpiDeltaNegative}>
                                    {kpi.delta}
                                </Text>
                            </View>
                            <Text style={styles.kpiValue}>{kpi.valor}</Text>
                            <Text style={styles.kpiLabel}>{kpi.titulo}</Text>
                        </View>
                    ))}
                </View>

                {/* GRÁFICO DE BARRAS NATIVO */}
                <Text style={styles.sectionTitle}>Evolução de Alcance</Text>
                <View style={styles.chartCard}>
                    <View style={styles.chartContainer}>
                        {dadosGrafico.map((altura, index) => (
                            <View key={index} style={styles.chartBarCol}>
                                <View style={[styles.chartBar, { height: `${altura}%`, backgroundColor: redeSelecionada.cor }]} />
                                <Text style={styles.chartDayLabel}>D{index + 1}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* RANKING DE MELHORES POSTS */}
                <Text style={styles.sectionTitle}>Melhores Postagens</Text>
                
                <View style={styles.topPostCard}>
                    <View style={styles.topPostImagePlaceholder}>
                        <Ionicons name="image" size={24} color="#CCC" />
                    </View>
                    <View style={styles.topPostInfo}>
                        <Text style={styles.topPostCopy} numberOfLines={2}>Lançamento da nova campanha institucional...</Text>
                        <View style={styles.topPostMetrics}>
                            <Text style={styles.topPostStat}><Ionicons name="eye" size={12} /> 12k</Text>
                            <Text style={styles.topPostStat}><Ionicons name="heart" size={12} /> 850</Text>
                        </View>
                    </View>
                    <View style={styles.topPostRank}>
                        <Text style={styles.topPostRankText}>#1</Text>
                    </View>
                </View>

                <View style={styles.topPostCard}>
                    <View style={styles.topPostImagePlaceholder}>
                        <Ionicons name="videocam" size={24} color="#CCC" />
                    </View>
                    <View style={styles.topPostInfo}>
                        <Text style={styles.topPostCopy} numberOfLines={2}>Bastidores do evento corporativo de ontem!</Text>
                        <View style={styles.topPostMetrics}>
                            <Text style={styles.topPostStat}><Ionicons name="eye" size={12} /> 9.5k</Text>
                            <Text style={styles.topPostStat}><Ionicons name="heart" size={12} /> 620</Text>
                        </View>
                    </View>
                    <View style={styles.topPostRank2}>
                        <Text style={styles.topPostRankText2}>#2</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* BARRA INFERIOR (Aba 'Dados' ativa) */}
            <View style={styles.bottomTab}>
                {/* Exemplo de navegação - ajuste 'Dashboard' para o nome correto da sua rota */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Dashboard')}>
                    <Ionicons name="home-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Calendar')}>
                    <Ionicons name="calendar-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusButton}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="bar-chart" size={26} color="#6a11cb" />
                    <Text style={[styles.tabText, { color: '#6a11cb' }]}>Dados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="settings-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Ajustes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    
    header: { backgroundColor: '#FFF', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    headerSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },

    filtersContainer: { backgroundColor: '#FFF', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    
    networksRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15 },
    networkBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#FFF' },

    periodRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15 },
    periodBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0', marginRight: 10 },
    periodBtnActive: { backgroundColor: '#333' },
    periodText: { color: '#666', fontWeight: 'bold', fontSize: 12 },
    periodTextActive: { color: '#FFF' },

    content: { flex: 1, padding: 20 },

    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 5 },
    
    /* ESTILOS DOS KPIS */
    kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 },
    kpiCard: { width: '48%', backgroundColor: '#FFF', padding: 15, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
    kpiIconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    kpiValue: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    kpiLabel: { fontSize: 12, color: '#666', marginTop: 2 },
    kpiDeltaPositive: { fontSize: 11, fontWeight: 'bold', color: '#43A047', backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    kpiDeltaNegative: { fontSize: 11, fontWeight: 'bold', color: '#E53935', backgroundColor: '#FFEBEE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },

    /* ESTILOS DO GRÁFICO */
    chartCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EEE', marginBottom: 25 },
    chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, paddingTop: 20 },
    chartBarCol: { alignItems: 'center', width: '10%' },
    chartBar: { width: 12, borderRadius: 6, minHeight: 10 },
    chartDayLabel: { fontSize: 10, color: '#999', marginTop: 8 },

    /* ESTILOS DOS MELHORES POSTS */
    topPostCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', alignItems: 'center', marginBottom: 10 },
    topPostImagePlaceholder: { width: 50, height: 50, backgroundColor: '#F0F0F0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    topPostInfo: { flex: 1, marginLeft: 12 },
    topPostCopy: { fontSize: 13, color: '#333', fontWeight: '500', marginBottom: 6 },
    topPostMetrics: { flexDirection: 'row' },
    topPostStat: { fontSize: 11, color: '#666', marginRight: 12, flexDirection: 'row', alignItems: 'center' },
    
    topPostRank: { backgroundColor: '#FFF3E0', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    topPostRankText: { color: '#FB8C00', fontWeight: 'bold', fontSize: 12 },
    
    topPostRank2: { backgroundColor: '#F3E5F5', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    topPostRankText2: { color: '#8E24AA', fontWeight: 'bold', fontSize: 12 },

    /* BARRA INFERIOR */
    bottomTab: { flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' },
    tabItem: { alignItems: 'center' },
    tabText: { fontSize: 10, marginTop: 4, color: '#999' },
    plusButton: { backgroundColor: '#6a11cb', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: -30, elevation: 5, shadowColor: '#6a11cb', shadowOpacity: 0.3, shadowRadius: 10 }
});