import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Adicionamos o { navigation } aqui dentro dos parênteses
export default function DashboardScreen({ navigation }) {
    const [clienteAtivo, setClienteAtivo] = useState('Cliente 01');
    const clientes = ['Cliente 01', 'Cliente 02', 'Cliente 03', 'Adicionar +'];

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER: Seletor de Clientes */}
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Olá, Luiz!</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.clientSelector}>
                    {clientes.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.clientBadge, clienteAtivo === item && styles.clientBadgeActive]}
                            onPress={() => item !== 'Adicionar +' && setClienteAtivo(item)}
                        >
                            <Text style={[styles.clientText, clienteAtivo === item && styles.clientTextActive]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Panorama Geral: {clienteAtivo}</Text>

                {/* CARDS DE STATUS */}
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

                    <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
                        <Ionicons name="checkmark-circle" size={24} color="#43A047" />
                        <Text style={styles.cardValue}>08</Text>
                        <Text style={styles.cardLabel}>Aprovados</Text>
                    </View>
                </View>

                {/* ÁREA DE PRÓXIMO POST */}
                <View style={styles.nextPostContainer}>
                    <Text style={styles.nextPostTitle}>Próxima Postagem</Text>
                    <View style={styles.nextPostCard}>
                        <View style={styles.postPreviewPlaceholder}>
                            <Ionicons name="image-outline" size={40} color="#CCC" />
                        </View>
                        <View style={styles.postInfo}>
                            <Text style={styles.postDate}>Amanhã, às 10:00</Text>
                            <Text style={styles.postCopy} numberOfLines={2}>
                                "Descubra como a Praxis pode transformar seu engajamento..."
                            </Text>
                            <View style={styles.socialIconsRow}>
                                <Ionicons name="logo-instagram" size={16} color="#666" style={{ marginRight: 8 }} />
                                <Ionicons name="logo-facebook" size={16} color="#666" />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* MENU INFERIOR (TAB BAR) - CORRIGIDO */}
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="home" size={26} color="#6a11cb" />
                    <Text style={[styles.tabText, { color: '#6a11cb' }]}>Início</Text>
                </TouchableOpacity>

                {/* Botão de Agenda agora dentro da barra e funcional */}
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('Calendar')}
                >
                    <Ionicons name="calendar-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusButton}>
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

    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    card: { width: '30%', padding: 15, borderRadius: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    cardValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
    cardLabel: { fontSize: 12, color: '#666' },

    nextPostContainer: { marginBottom: 20 },
    nextPostTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    nextPostCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    postPreviewPlaceholder: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    postInfo: { flex: 1, marginLeft: 15 },
    postDate: { fontSize: 12, color: '#6a11cb', fontWeight: 'bold' },
    postCopy: { fontSize: 14, color: '#444', marginVertical: 4 },
    socialIconsRow: { flexDirection: 'row' },

    bottomTab: {
        flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 10,
        borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center'
    },
    tabItem: { alignItems: 'center' },
    tabText: { fontSize: 10, marginTop: 4, color: '#999' },
    plusButton: {
        backgroundColor: '#6a11cb', width: 56, height: 56, borderRadius: 28,
        justifyContent: 'center', alignItems: 'center', marginTop: -30,
        elevation: 5, shadowColor: '#6a11cb', shadowOpacity: 0.3, shadowRadius: 10
    }
});