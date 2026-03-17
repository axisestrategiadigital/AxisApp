import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, LayoutAnimation, UIManager, Platform, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const metricasPorRede = {
    instagram: [
        { titulo: 'Alcance', valor: '500k', delta: '+8%', isPositive: true, icone: 'eye', explanation: 'Contas únicas impactadas.', chartData: [30, 40, 25, 50, 60, 80, 70] },
        { titulo: 'Impressões', valor: '1.5M', delta: '+12%', isPositive: true, icone: 'analytics', explanation: 'Total de vezes exibido.', chartData: [50, 60, 45, 80, 70, 90, 85] },
        { titulo: 'Engajamento', valor: '80k', delta: '+5%', isPositive: true, icone: 'heart', explanation: 'Interações totais.', chartData: [40, 50, 35, 60, 55, 75, 65] },
        { titulo: 'Taxa de Engajamento', valor: '5.3%', delta: '-0.1%', isPositive: false, icone: 'pulse', explanation: 'Engajamento ÷ alcance.', chartData: [5, 4, 6, 5.5, 5.8, 5.2, 5.4] },
        { titulo: 'Curtidas', valor: '75k', delta: '+6%', isPositive: true, icone: 'thumbs-up', explanation: 'Interações básicas.', chartData: [35, 45, 30, 55, 50, 70, 60] },
        { titulo: 'Comentários', valor: '2k', delta: '+15%', isPositive: true, icone: 'chatbubbles', explanation: 'Interações básicas.', chartData: [1, 2, 1.5, 2.5, 2, 3, 2.8] },
        { titulo: 'Compartilhamentos', valor: '1k', delta: '+10%', isPositive: true, icone: 'share-social', explanation: 'Interações básicas.', chartData: [0.5, 0.8, 0.6, 1, 0.9, 1.2, 1.1] },
        { titulo: 'Salvamentos', valor: '2k', delta: '+20%', isPositive: true, icone: 'bookmark', explanation: 'Conteúdos guardados → alto valor.', chartData: [1, 1.5, 1.2, 2, 1.8, 2.2, 2.1] },
        { titulo: 'Taxa de Salvamento', valor: '1.2%', delta: '+0.5%', isPositive: true, icone: 'trending-up', explanation: 'Salvamentos ÷ alcance.', chartData: [1, 1.1, 1.2, 1.3, 1.2, 1.4, 1.5] },
        { titulo: 'Taxa de Compartilhamento', valor: '0.6%', delta: '+0.2%', isPositive: true, icone: 'trending-up', explanation: 'Compartilhamentos ÷ alcance.', chartData: [0.5, 0.6, 0.55, 0.65, 0.7, 0.68, 0.72] },
        { titulo: 'Reproduções', valor: '2.1M', delta: '+18%', isPositive: true, icone: 'play', explanation: 'Views de vídeos/reels.', chartData: [100, 120, 110, 150, 140, 180, 170] },
        { titulo: 'Tempo Médio de Vídeo', valor: '0:45', delta: '-5s', isPositive: false, icone: 'time', explanation: 'Tempo assistido.', chartData: [40, 42, 45, 43, 48, 47, 50] },
        { titulo: 'Visualizações dos Stories', valor: '150k', delta: '+3%', isPositive: true, icone: 'camera', explanation: 'Views por story.', chartData: [20, 25, 22, 30, 28, 35, 32] },
        { titulo: 'Taxa de Conclusão dos Stories', valor: '85%', delta: '+2%', isPositive: true, icone: 'checkmark-done', explanation: 'Quem viu até o último story.', chartData: [80, 82, 85, 83, 86, 88, 90] },
        { titulo: 'Respostas nos Stories', valor: '500', delta: '+10%', isPositive: true, icone: 'arrow-undo', explanation: 'Interações diretas.', chartData: [50, 60, 55, 70, 65, 80, 75] },
        { titulo: 'Cliques no Link', valor: '1.2k', delta: '-5%', isPositive: false, icone: 'link', explanation: 'Tráfego gerado.', chartData: [100, 120, 110, 130, 125, 140, 135] },
        { titulo: 'Seguidores Ganhos', valor: '3.4k', delta: '+200', isPositive: true, icone: 'person-add', explanation: 'Crescimento bruto.', chartData: [200, 250, 220, 300, 280, 350, 320] },
        { titulo: 'Seguidores Perdidos', valor: '1.2k', delta: '+100', isPositive: false, icone: 'person-remove', explanation: 'Crescimento bruto.', chartData: [80, 90, 85, 100, 95, 110, 105] },
        { titulo: 'Crescimento de Seguidores', valor: '2.2k', delta: '+100', isPositive: true, icone: 'trending-up', explanation: 'Saldo final.', chartData: [120, 160, 135, 200, 185, 240, 215] },
        { titulo: 'Posts Publicados', valor: '30', delta: '+5', isPositive: true, icone: 'create', explanation: 'Volume de conteúdo.', chartData: [3, 4, 2, 5, 4, 6, 5] },
        { titulo: 'Média de Engajamento por Post', valor: '2.6k', delta: '+0.1k', isPositive: true, icone: 'stats-chart', explanation: 'Engajamento ÷ posts.', chartData: [2, 2.5, 2.2, 2.8, 2.6, 3, 2.9] },
    ],
    facebook: [
        { titulo: 'Alcance Total', valor: '1.2M', delta: '+10%', isPositive: true, icone: 'eye', explanation: 'Distribuição do alcance.', chartData: [100, 120, 110, 150, 140, 180, 170] },
        { titulo: 'Alcance Orgânico', valor: '800k', delta: '+5%', isPositive: true, icone: 'leaf', explanation: 'Distribuição do alcance.', chartData: [70, 80, 75, 90, 85, 100, 95] },
        { titulo: 'Alcance Pago', valor: '400k', delta: '+20%', isPositive: true, icone: 'cash', explanation: 'Distribuição do alcance.', chartData: [30, 40, 35, 60, 55, 80, 75] },
        { titulo: 'Impressões', valor: '3.5M', delta: '+15%', isPositive: true, icone: 'analytics', explanation: 'Exibições totais.', chartData: [200, 250, 220, 300, 280, 350, 320] },
        { titulo: 'Engajamento', valor: '120k', delta: '+8%', isPositive: true, icone: 'heart', explanation: 'Interações.', chartData: [10, 12, 11, 15, 14, 18, 17] },
        { titulo: 'Taxa de Engajamento', valor: '3.4%', delta: '+0.2%', isPositive: true, icone: 'pulse', explanation: 'Engajamento ÷ alcance.', chartData: [3, 3.2, 3.1, 3.5, 3.4, 3.6, 3.5] },
        { titulo: 'Reações', valor: '100k', delta: '+7%', isPositive: true, icone: 'happy', explanation: 'Likes e variações.', chartData: [8, 10, 9, 12, 11, 14, 13] },
        { titulo: 'Comentários', valor: '10k', delta: '+12%', isPositive: true, icone: 'chatbubbles', explanation: 'Interação social.', chartData: [1, 1.2, 1.1, 1.5, 1.4, 1.8, 1.7] },
        { titulo: 'Compartilhamentos', valor: '10k', delta: '+15%', isPositive: true, icone: 'share-social', explanation: 'Interação social.', chartData: [1, 1.2, 1.1, 1.5, 1.4, 1.8, 1.7] },
        { titulo: 'Cliques no Link', valor: '5k', delta: '-2%', isPositive: false, icone: 'link', explanation: 'Tráfego.', chartData: [0.5, 0.6, 0.55, 0.7, 0.65, 0.8, 0.75] },
        { titulo: 'Taxa de Cliques (CTR)', valor: '1.2%', delta: '-0.1%', isPositive: false, icone: 'trending-down', explanation: 'Cliques ÷ impressões.', chartData: [1, 1.1, 1.2, 1.3, 1.2, 1.4, 1.3] },
        { titulo: 'Visualizações de Vídeo', valor: '500k', delta: '+20%', isPositive: true, icone: 'play', explanation: 'Views.', chartData: [40, 50, 45, 60, 55, 70, 65] },
        { titulo: 'Tempo Médio de Vídeo', valor: '1:30', delta: '+10s', isPositive: true, icone: 'time', explanation: 'Consumo.', chartData: [80, 85, 82, 90, 88, 95, 92] },
        { titulo: 'Retenção de Vídeo', valor: '40%', delta: '+5%', isPositive: true, icone: 'trending-up', explanation: 'Qualidade do conteúdo.', chartData: [35, 38, 40, 42, 45, 43, 46] },
        { titulo: 'Seguidores Ganhos', valor: '5k', delta: '+500', isPositive: true, icone: 'person-add', explanation: 'Crescimento.', chartData: [400, 450, 420, 500, 480, 550, 520] },
        { titulo: 'Crescimento da Página', valor: '4.5k', delta: '+400', isPositive: true, icone: 'trending-up', explanation: 'Evolução geral.', chartData: [350, 400, 380, 450, 420, 500, 480] },
        { titulo: 'Posts Publicados', valor: '25', delta: '+3', isPositive: true, icone: 'create', explanation: 'Volume.', chartData: [2, 3, 2, 4, 3, 5, 4] },
        { titulo: 'Média de Engajamento', valor: '4.8k', delta: '+0.2k', isPositive: true, icone: 'stats-chart', explanation: 'Eficiência.', chartData: [4, 4.5, 4.2, 4.8, 4.6, 5, 4.9] },
    ],
    tiktok: [
        { titulo: 'Visualizações', valor: '5.2M', delta: '+25%', isPositive: true, icone: 'play', explanation: 'Quantidade total de vezes que o vídeo foi assistido.\n→ Gráfico: evolução diária de views', chartData: [200, 250, 220, 300, 280, 350, 320] },
        { titulo: 'Alcance', valor: '3.1M', delta: '+20%', isPositive: true, icone: 'eye', explanation: 'Número de contas únicas que viram o conteúdo.\n→ Gráfico: crescimento de audiência', chartData: [150, 180, 160, 200, 190, 220, 210] },
        { titulo: 'Engajamento', valor: '500k', delta: '+15%', isPositive: true, icone: 'heart', explanation: 'Soma de curtidas + comentários + compartilhamentos + favoritos.\n→ Gráfico: interação total ao longo do tempo', chartData: [40, 50, 45, 60, 55, 70, 65] },
        { titulo: 'Taxa de Engajamento', valor: '9.6%', delta: '+0.5%', isPositive: true, icone: 'pulse', explanation: 'Engajamento dividido pelo alcance.\n→ Mostra qualidade do conteúdo', chartData: [8, 9, 8.5, 9.5, 9.2, 10, 9.8] },
        { titulo: 'Curtidas', valor: '450k', delta: '+14%', isPositive: true, icone: 'thumbs-up', explanation: 'Total de likes recebidos.\n→ Indica aceitação imediata', chartData: [35, 45, 40, 55, 50, 65, 60] },
        { titulo: 'Comentários', valor: '20k', delta: '+20%', isPositive: true, icone: 'chatbubbles', explanation: 'Total de comentários.\n→ Indica profundidade de interação', chartData: [1.5, 2, 1.8, 2.5, 2.2, 3, 2.8] },
        { titulo: 'Compartilhamentos', valor: '30k', delta: '+25%', isPositive: true, icone: 'share-social', explanation: 'Quantas vezes o conteúdo foi compartilhado.\n→ Principal indicador de viralização', chartData: [2, 2.5, 2.2, 3, 2.8, 3.5, 3.2] },
        { titulo: 'Favoritos', valor: '15k', delta: '+30%', isPositive: true, icone: 'star', explanation: 'Salvamentos do conteúdo.\n→ Indica valor percebido', chartData: [1, 1.5, 1.2, 2, 1.8, 2.2, 2.1] },
        { titulo: 'Taxa de Compartilhamento', valor: '0.5%', delta: '+0.1%', isPositive: true, icone: 'trending-up', explanation: 'Compartilhamentos ÷ visualizações\n→ Mede potencial viral', chartData: [0.4, 0.5, 0.45, 0.55, 0.52, 0.6, 0.58] },
        { titulo: 'Taxa de Favoritos', valor: '0.2%', delta: '+0.05%', isPositive: true, icone: 'trending-up', explanation: 'Favoritos ÷ visualizações\n→ Mede conteúdo útil', chartData: [0.1, 0.15, 0.12, 0.2, 0.18, 0.22, 0.21] },
        { titulo: 'Tempo Médio de Visualização', valor: '0:25', delta: '+3s', isPositive: true, icone: 'time', explanation: 'Tempo médio assistido por usuário\n→ Essencial para algoritmo', chartData: [20, 22, 25, 23, 26, 28, 30] },
        { titulo: 'Taxa de Retenção', valor: '55%', delta: '+4%', isPositive: true, icone: 'trending-up', explanation: '% do vídeo assistido\n→ Mostra se prende atenção', chartData: [50, 52, 55, 53, 56, 58, 60] },
        { titulo: 'Taxa de Conclusão', valor: '70%', delta: '+5%', isPositive: true, icone: 'checkmark-done', explanation: '% que assistiu até o final\n→ Conteúdo forte', chartData: [65, 68, 70, 69, 72, 75, 78] },
        { titulo: 'Seguidores Ganhos', valor: '50k', delta: '+2k', isPositive: true, icone: 'person-add', explanation: 'Novos seguidores vindos dos vídeos\n→ Conversão de audiência', chartData: [1, 1.5, 1.2, 2, 1.8, 2.2, 2.1] },
        { titulo: 'Taxa de Conversão em Seguidores', valor: '1.6%', delta: '+0.1%', isPositive: true, icone: 'trending-up', explanation: 'Seguidores ÷ visualizações\n→ Eficiência do perfil', chartData: [1.4, 1.5, 1.45, 1.6, 1.55, 1.7, 1.65] },
        { titulo: 'Vídeos Publicados', valor: '40', delta: '+8', isPositive: true, icone: 'videocam', explanation: 'Quantidade de posts no período', chartData: [3, 4, 2, 5, 4, 6, 5] },
        { titulo: 'Média de Visualizações por Vídeo', valor: '130k', delta: '+10k', isPositive: true, icone: 'stats-chart', explanation: 'Views ÷ número de vídeos', chartData: [100, 120, 110, 130, 125, 140, 135] },
    ],
    youtube: [
        { titulo: 'Visualizações', valor: '1.2M', delta: '+12%', isPositive: true, icone: 'play-circle', explanation: 'Total de views.', chartData: [100, 120, 110, 150, 140, 180, 170] },
        { titulo: 'Tempo de Exibição', valor: '50k h', delta: '+10%', isPositive: true, icone: 'hourglass', explanation: 'Tempo total assistido.', chartData: [4, 5, 4.5, 6, 5.5, 7, 6.5] },
        { titulo: 'Duração Média de Visualização', valor: '4:30', delta: '+15s', isPositive: true, icone: 'time', explanation: 'Tempo médio por usuário.', chartData: [250, 260, 270, 265, 280, 275, 290] },
        { titulo: 'Taxa de Retenção', valor: '60%', delta: '+3%', isPositive: true, icone: 'trending-up', explanation: '% assistida.', chartData: [55, 58, 60, 62, 65, 63, 66] },
        { titulo: 'Engajamento', valor: '200k', delta: '+8%', isPositive: true, icone: 'heart', explanation: 'Interações.', chartData: [15, 18, 16, 20, 19, 22, 21] },
        { titulo: 'Taxa de Engajamento', valor: '16.7%', delta: '+0.5%', isPositive: true, icone: 'pulse', explanation: 'Qualidade.', chartData: [15, 16, 15.5, 16.5, 17, 16.8, 17.2] },
        { titulo: 'Curtidas', valor: '180k', delta: '+7%', isPositive: true, icone: 'thumbs-up', explanation: 'Interações.', chartData: [12, 15, 13, 18, 16, 20, 19] },
        { titulo: 'Comentários', valor: '15k', delta: '+12%', isPositive: true, icone: 'chatbubbles', explanation: 'Interações.', chartData: [1, 1.2, 1.1, 1.5, 1.4, 1.8, 1.7] },
        { titulo: 'Compartilhamentos', valor: '5k', delta: '+18%', isPositive: true, icone: 'share-social', explanation: 'Interações.', chartData: [0.4, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65] },
        { titulo: 'Taxa de Cliques na Thumbnail (CTR)', valor: '5.5%', delta: '-0.2%', isPositive: false, icone: 'analytics', explanation: 'Cliques ÷ impressões.', chartData: [5, 5.2, 5.5, 5.3, 5.6, 5.8, 6] },
        { titulo: 'Inscritos Ganhos', valor: '10k', delta: '+1k', isPositive: true, icone: 'person-add', explanation: 'Crescimento.', chartData: [800, 900, 850, 1000, 950, 1100, 1050] },
        { titulo: 'Inscritos Perdidos', valor: '1k', delta: '+50', isPositive: false, icone: 'person-remove', explanation: 'Crescimento.', chartData: [80, 90, 85, 100, 95, 110, 105] },
        { titulo: 'Crescimento de Inscritos', valor: '9k', delta: '+950', isPositive: true, icone: 'trending-up', explanation: 'Saldo.', chartData: [720, 810, 765, 900, 855, 990, 945] },
        { titulo: 'Receita Estimada', valor: '$5k', delta: '+$500', isPositive: true, icone: 'cash', explanation: 'Monetização.', chartData: [400, 450, 420, 500, 480, 550, 520] },
        { titulo: 'CPM', valor: '$10.50', delta: '+$0.50', isPositive: true, icone: 'card', explanation: 'Monetização.', chartData: [9, 9.5, 10, 10.5, 11, 11.5, 12] },
        { titulo: 'RPM', valor: '$4.20', delta: '+$0.20', isPositive: true, icone: 'card', explanation: 'Monetização.', chartData: [3.5, 3.8, 4, 4.2, 4.5, 4.3, 4.6] },
        { titulo: 'Vídeos Publicados', valor: '15', delta: '+2', isPositive: true, icone: 'videocam', explanation: 'Produção.', chartData: [1, 2, 1, 3, 2, 4, 3] },
        { titulo: 'Média de Visualizações por Vídeo', valor: '80k', delta: '+5k', isPositive: true, icone: 'stats-chart', explanation: 'Performance média.', chartData: [70, 75, 72, 80, 78, 85, 82] },
    ],
    twitter: [
        { titulo: 'Impressões', valor: '2.5M', delta: '+18%', isPositive: true, icone: 'eye', explanation: 'Visualizações.', chartData: [150, 180, 160, 200, 190, 220, 210] },
        { titulo: 'Alcance', valor: '1.8M', delta: '+15%', isPositive: true, icone: 'analytics', explanation: 'Usuários únicos.', chartData: [120, 150, 130, 180, 160, 200, 190] },
        { titulo: 'Engajamento', valor: '50k', delta: '+10%', isPositive: true, icone: 'heart', explanation: 'Interações.', chartData: [4, 5, 4.5, 6, 5.5, 7, 6.5] },
        { titulo: 'Taxa de Engajamento', valor: '2.0%', delta: '-0.1%', isPositive: false, icone: 'pulse', explanation: 'Eficiência.', chartData: [1.8, 2, 1.9, 2.2, 2.1, 2.3, 2.2] },
        { titulo: 'Curtidas', valor: '40k', delta: '+8%', isPositive: true, icone: 'thumbs-up', explanation: 'Interação.', chartData: [3, 4, 3.5, 5, 4.5, 6, 5.5] },
        { titulo: 'Respostas', valor: '5k', delta: '+15%', isPositive: true, icone: 'chatbubbles', explanation: 'Interação.', chartData: [0.4, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65] },
        { titulo: 'Reposts', valor: '5k', delta: '+20%', isPositive: true, icone: 'repeat', explanation: 'Interação.', chartData: [0.4, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65] },
        { titulo: 'Taxa de Repost', valor: '0.2%', delta: '+0.05%', isPositive: true, icone: 'trending-up', explanation: 'Compartilhamento ÷ impressões.', chartData: [0.1, 0.15, 0.12, 0.2, 0.18, 0.22, 0.21] },
        { titulo: 'Cliques no Link', valor: '10k', delta: '+5%', isPositive: true, icone: 'link', explanation: 'Tráfego.', chartData: [0.8, 1, 0.9, 1.2, 1.1, 1.3, 1.2] },
        { titulo: 'Taxa de Cliques (CTR)', valor: '1.0%', delta: '+0.1%', isPositive: true, icone: 'trending-up', explanation: 'Eficiência de clique.', chartData: [0.8, 0.9, 1, 1.1, 1.2, 1.1, 1.3] },
        { titulo: 'Cliques no Perfil', valor: '20k', delta: '+12%', isPositive: true, icone: 'person', explanation: 'Interesse no perfil.', chartData: [1.5, 1.8, 1.6, 2, 1.9, 2.2, 2.1] },
        { titulo: 'Seguidores Ganhos', valor: '2k', delta: '+200', isPositive: true, icone: 'person-add', explanation: 'Crescimento.', chartData: [150, 180, 160, 200, 190, 220, 210] },
        { titulo: 'Seguidores Perdidos', valor: '500', delta: '+50', isPositive: false, icone: 'person-remove', explanation: 'Crescimento.', chartData: [40, 50, 45, 60, 55, 70, 65] },
        { titulo: 'Crescimento de Seguidores', valor: '1.5k', delta: '+150', isPositive: true, icone: 'trending-up', explanation: 'Saldo.', chartData: [110, 130, 115, 140, 135, 150, 145] },
        { titulo: 'Tweets Publicados', valor: '150', delta: '+20', isPositive: true, icone: 'create', explanation: 'Volume.', chartData: [10, 12, 11, 15, 14, 18, 17] },
        { titulo: 'Média de Engajamento', valor: '333', delta: '+10', isPositive: true, icone: 'stats-chart', explanation: 'Eficiência.', chartData: [300, 320, 310, 340, 330, 350, 345] },
    ],
    linkedin: [
        { titulo: 'Impressões', valor: '300k', delta: '+20%', isPositive: true, icone: 'eye', explanation: 'Distribuição.', chartData: [20, 25, 22, 30, 28, 35, 32] },
        { titulo: 'Alcance', valor: '250k', delta: '+18%', isPositive: true, icone: 'analytics', explanation: 'Distribuição.', chartData: [18, 22, 20, 28, 25, 32, 30] },
        { titulo: 'Engajamento', valor: '15k', delta: '+12%', isPositive: true, icone: 'heart', explanation: 'Interações.', chartData: [1, 1.2, 1.1, 1.5, 1.4, 1.8, 1.7] },
        { titulo: 'Taxa de Engajamento', valor: '5.0%', delta: '+0.3%', isPositive: true, icone: 'pulse', explanation: 'Qualidade.', chartData: [4, 4.5, 4.2, 5, 4.8, 5.2, 5.1] },
        { titulo: 'Curtidas', valor: '12k', delta: '+10%', isPositive: true, icone: 'thumbs-up', explanation: 'Interação.', chartData: [0.8, 1, 0.9, 1.2, 1.1, 1.4, 1.3] },
        { titulo: 'Comentários', valor: '2k', delta: '+15%', isPositive: true, icone: 'chatbubbles', explanation: 'Interação.', chartData: [0.1, 0.15, 0.12, 0.2, 0.18, 0.22, 0.21] },
        { titulo: 'Compartilhamentos', valor: '1k', delta: '+25%', isPositive: true, icone: 'share-social', explanation: 'Interação.', chartData: [0.05, 0.08, 0.06, 0.1, 0.09, 0.12, 0.11] },
        { titulo: 'Cliques', valor: '8k', delta: '+8%', isPositive: true, icone: 'hand-left', explanation: 'Interesse.', chartData: [0.5, 0.6, 0.55, 0.7, 0.65, 0.8, 0.75] },
        { titulo: 'Taxa de Cliques (CTR)', valor: '2.7%', delta: '-0.1%', isPositive: false, icone: 'trending-down', explanation: 'Eficiência.', chartData: [2, 2.2, 2.5, 2.3, 2.6, 2.8, 3] },
        { titulo: 'Cliques no Perfil', valor: '10k', delta: '+10%', isPositive: true, icone: 'person', explanation: 'Intenção comercial.', chartData: [0.8, 1, 0.9, 1.2, 1.1, 1.3, 1.2] },
        { titulo: 'Cliques no Site', valor: '3k', delta: '+5%', isPositive: true, icone: 'globe', explanation: 'Intenção comercial.', chartData: [0.2, 0.25, 0.22, 0.3, 0.28, 0.35, 0.32] },
        { titulo: 'Leads Gerados', valor: '500', delta: '+50', isPositive: true, icone: 'key', explanation: 'Resultado de negócio.', chartData: [30, 40, 35, 50, 45, 60, 55] },
        { titulo: 'Taxa de Conversão de Leads', valor: '16.7%', delta: '+1.0%', isPositive: true, icone: 'trending-up', explanation: 'Leads ÷ cliques.', chartData: [15, 16, 15.5, 17, 16.5, 18, 17.5] },
        { titulo: 'Seguidores Ganhos', valor: '1.5k', delta: '+150', isPositive: true, icone: 'person-add', explanation: 'Crescimento.', chartData: [100, 120, 110, 150, 140, 180, 170] },
        { titulo: 'Crescimento de Seguidores', valor: '1.2k', delta: '+120', isPositive: true, icone: 'trending-up', explanation: 'Evolução.', chartData: [80, 100, 90, 120, 110, 150, 140] },
        { titulo: 'Posts Publicados', valor: '20', delta: '+4', isPositive: true, icone: 'create', explanation: 'Volume.', chartData: [2, 3, 2, 4, 3, 5, 4] },
        { titulo: 'Média de Engajamento', valor: '750', delta: '+25', isPositive: true, icone: 'stats-chart', explanation: 'Eficiência.', chartData: [700, 720, 710, 750, 740, 780, 760] },
    ]
};

export default function AnalyticsScreen({ navigation }) {
    const [redeAtiva, setRedeAtiva] = useState('instagram');
    const [periodoAtivo, setPeriodoAtivo] = useState('30d');
    const [expandedKpi, setExpandedKpi] = useState(null);
    const [modalConectarVisible, setModalConectarVisible] = useState(false);

    const toggleKpi = (kpiTitle) => {
        LayoutAnimation.configureNext({
            duration: 800, // Aumentando a duração para ser bem mais lento e suave
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            delete: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            }
        });
        if (expandedKpi === kpiTitle) {
            setExpandedKpi(null);
        } else {
            setExpandedKpi(kpiTitle);
        }
    };
    
    const redes = [
        { id: 'instagram', nome: 'Instagram', icone: 'logo-instagram', cor: '#E1306C' },
        { id: 'facebook', nome: 'Facebook', icone: 'logo-facebook', cor: '#1877F2' },
        { id: 'tiktok', nome: 'TikTok', icone: 'logo-tiktok', cor: '#000000' },
        { id: 'youtube', nome: 'YouTube', icone: 'logo-youtube', cor: '#FF0000' },
        { id: 'linkedin', nome: 'LinkedIn', icone: 'logo-linkedin', cor: '#0A66C2' },
        { id: 'twitter', nome: 'X', icone: 'logo-twitter', cor: '#000000' },
    ];

    const periodos = [
        { id: '7d', label: '7 Dias' },
        { id: '15d', label: '15 Dias' },
        { id: '30d', label: '30 Dias' },
        { id: '90d', label: '3 Meses' },
    ];

    const redeSelecionada = redes.find(r => r.id === redeAtiva) || redes[0];
    const kpis = metricasPorRede[redeAtiva] || []; // Fallback seguro
    const dadosGrafico = [40, 60, 45, 80, 50, 90, 100];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Análise de Dados</Text>
                <Text style={styles.headerSubtitle}>Performance detalhada do Cliente 01</Text>
            </View>

            <View style={styles.filtersContainer}>
                <View style={styles.networksRow}>
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
                </View>

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

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.sectionTitle}>Visão Geral</Text>
                <View style={styles.kpiGrid}>
                    {kpis.map((kpi, index) => {
                        const isExpanded = expandedKpi === kpi.titulo;
                        
                        // PROTEÇÃO ANTI-CRASH: Garantir que chartMax nunca seja 0, NaN ou Infinity
                        const maxVal = Math.max(...kpi.chartData);
                        const chartMax = isNaN(maxVal) || maxVal <= 0 ? 1 : maxVal;
                        
                        // PROTEÇÃO ANTI-CRASH: Garantir cálculo seguro da média
                        const sumVal = kpi.chartData.reduce((a, b) => a + b, 0);
                        const mediaVal = kpi.chartData.length > 0 ? (sumVal / kpi.chartData.length) : 0;

                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={[styles.kpiCard, isExpanded && { width: '100%' }]}
                                onPress={() => toggleKpi(kpi.titulo)}
                            >
                                <View style={styles.kpiIconRow}>
                                    <Ionicons name={kpi.icone} size={20} color={redeSelecionada.cor} />
                                    <Text style={kpi.isPositive ? styles.kpiDeltaPositive : styles.kpiDeltaNegative}>
                                        {kpi.delta}
                                    </Text>
                                </View>
                                <Text style={styles.kpiValue}>{kpi.valor}</Text>
                                <Text style={styles.kpiLabel}>{kpi.titulo}</Text>

                                {isExpanded && (
                                    <View style={styles.expandedKpiContainer}>
                                        <Text style={styles.kpiExplanation}>{kpi.explanation}</Text>
                                        
                                        <View style={styles.expandedChartContainer}>
                                            <View style={styles.chartContainerMini}>
                                                {kpi.chartData.map((altura, i) => {
                                                    // Cálculo seguro da altura
                                                    const heightPercent = isNaN(altura) ? 0 : (altura / chartMax) * 100;
                                                    return (
                                                        <View key={i} style={styles.chartBarCol}>
                                                            <View style={[styles.chartBarMini, { height: `${heightPercent}%`, backgroundColor: redeSelecionada.cor + '80' }]} />
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                        <View style={styles.kpiHighlights}>
                                            <View style={styles.highlightItem}>
                                                <Ionicons name="trending-up" size={14} color="#43A047" />
                                                <Text style={styles.highlightText}>Máx: {maxVal.toLocaleString()}</Text>
                                            </View>
                                            <View style={styles.highlightItem}>
                                                <Ionicons name="trending-down" size={14} color="#E53935" />
                                                <Text style={styles.highlightText}>Mín: {Math.min(...kpi.chartData).toLocaleString()}</Text>
                                            </View>
                                            <View style={styles.highlightItem}>
                                                <Ionicons name="analytics" size={14} color="#1E88E5" />
                                                <Text style={styles.highlightText}>Méd: {mediaVal.toFixed(1).toLocaleString()}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.comparisonText}>vs. período anterior: {kpi.delta}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        )
                    })}
                </View>

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

            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Dashboard')}>
                    <Ionicons name="home-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => navigation?.navigate('Calendar')}>
                    <Ionicons name="calendar-outline" size={26} color="#999" />
                    <Text style={styles.tabText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.plusButton} onPress={() => setModalConectarVisible(true)}>
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
            <Modal visible={modalConectarVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeaderRow}>
                            <View>
                                <Text style={styles.modalTitle}>Integração de Módulos</Text>
                                <Text style={styles.modalSubtitle}>Conecte novas contas de redes sociais</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModalConectarVisible(false)}>
                                <Ionicons name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {redes.map(rede => (
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
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    headerSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },

    filtersContainer: { backgroundColor: '#FFF', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    
    networksRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center', marginBottom: 15, marginTop: 15 },
    networkBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#FFF' },

    periodRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15 },
    periodBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0', marginRight: 10 },
    periodBtnActive: { backgroundColor: '#333' },
    periodText: { color: '#666', fontWeight: 'bold', fontSize: 12 },
    periodTextActive: { color: '#FFF' },

    content: { flex: 1, padding: 20 },

    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 5 },
    
    kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 },
    kpiCard: { width: '48%', backgroundColor: '#FFF', padding: 15, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
    kpiIconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    kpiValue: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    kpiLabel: { fontSize: 12, color: '#666', marginTop: 2 },
    kpiDeltaPositive: { fontSize: 11, fontWeight: 'bold', color: '#43A047', backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    kpiDeltaNegative: { fontSize: 11, fontWeight: 'bold', color: '#E53935', backgroundColor: '#FFEBEE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },

    expandedKpiContainer: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 15 },
    kpiExplanation: { fontSize: 12, color: '#555', lineHeight: 18, marginBottom: 15, fontStyle: 'italic' },
    
    expandedChartContainer: { height: 80, marginBottom: 15 },
    chartContainerMini: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%', paddingTop: 10 },
    chartBarMini: { width: 8, borderRadius: 4, minHeight: 5 },

    kpiHighlights: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    highlightItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F4', padding: 5, borderRadius: 8 },
    highlightText: { fontSize: 10, marginLeft: 4, fontWeight: '600', color: '#333' },
    comparisonText: { fontSize: 11, fontWeight: 'bold', color: '#43A047', textAlign: 'center', marginTop: 5 },

    chartCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EEE', marginBottom: 25 },
    chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, paddingTop: 20 },
    chartBarCol: { alignItems: 'center', width: '10%' },
    chartBar: { width: 12, borderRadius: 6, minHeight: 10 },
    chartDayLabel: { fontSize: 10, color: '#999', marginTop: 8 },

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