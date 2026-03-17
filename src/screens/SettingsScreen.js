import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
    // It's good practice to have a consistent header style
    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Ajustes e Configurações</Text>
            <Text style={styles.headerSubtitle}>Gerencie suas preferências e conexões</Text>
        </View>
    );

    // Placeholder for settings options
    const settingsOptions = [
        { id: 'profile', title: 'Perfil', icon: 'person-circle-outline', color: '#3498db' },
        { id: 'notifications', title: 'Notificações', icon: 'notifications-outline', color: '#f39c12' },
        { id: 'integrations', title: 'Integrações', icon: 'git-network-outline', color: '#2ecc71' },
        { id: 'subscription', title: 'Assinatura', icon: 'card-outline', color: '#9b59b6' },
        { id: 'logout', title: 'Sair', icon: 'log-out-outline', color: '#e74c3c' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={styles.content}>
                {settingsOptions.map(option => (
                    <TouchableOpacity key={option.id} style={styles.optionButton}>
                        <View style={[styles.iconContainer, { backgroundColor: option.color + '20' }]}>
                            <Ionicons name={option.icon} size={24} color={option.color} />
                        </View>
                        <Text style={styles.optionText}>{option.title}</Text>
                        <Ionicons name="chevron-forward-outline" size={22} color="#ccc" />
                    </TouchableOpacity>
                ))}
            </View>
            
            {/* Re-using the bottom tab structure for consistency */}
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Dashboard')}>
                    <Ionicons name="home-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Calendar')}>
                    <Ionicons name="calendar-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusButton} onPress={() => { /* Functionality to be defined */ }}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Analytics')}>
                    <Ionicons name="bar-chart-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Dados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="settings" size={26} color="#6a11cb" />
                    <Text style={[styles.tabText, { color: '#6a11cb' }]}>Ajustes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#FFF',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '500'
    },
    // Styles for the bottom tab (re-used from other screens)
    bottomTab: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 10,
        marginTop: 4,
        color: '#999',
    },
    plusButton: {
        backgroundColor: '#6a11cb',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        elevation: 5,
        shadowColor: '#6a11cb',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    }
});
