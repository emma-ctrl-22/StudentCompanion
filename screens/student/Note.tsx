import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Note {
    id: string;
    title: string;
    date: string;
    color: string;
}
interface NoteDetail { title: string, date: string, color: string }

const sampleNotes: Note[] = [
    { id: '1', title: 'Design System Components', date: 'May 21', color: '#8e8efa' },
    { id: '2', title: 'Interaction Design Principles', date: 'May 21', color: '#b0e57c' },
    { id: '3', title: 'Onboarding Experience Enhancements', date: 'May 21', color: '#f9d26a' },
    { id: '4', title: 'Responsive Design Strategies', date: 'May 21', color: '#f89c8d' },
    { id: '5', title: 'Information Architecture', date: 'May 21', color: '#b0e57c' },
    { id: '6', title: 'Usability Testing Feedback', date: 'May 21', color: '#8e8efa' },
    { id: '7', title: 'Typography and Readability', date: 'May 21', color: '#91d7ff' },
];

const NotesScreen = () => {
    const navigation = useNavigation();

    const navigateToDetail = (note: Note) => {
        navigation.navigate('NoteDetail', { title: note.title, date: note.date, color: note.color });
    };

    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[styles.noteContainer, { backgroundColor: item.color }]}
            onPress={() => navigateToDetail(item)}
        >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={28} color="white" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Notes</Text>
                <View style={styles.headerIcons}>
                    <MaterialIcons name="add" size={28} color="white" style={styles.icon} />
                    
                </View>
            </View>
            <FlatList
                data={sampleNotes}
                keyExtractor={(item) => item.id}
                renderItem={renderNote}
                contentContainerStyle={styles.notesList}
                numColumns={2}
            />
        </View>
    );
};

export default NotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 16,
    },
    notesList: {
        paddingHorizontal: 2,
    },
    noteContainer: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        minHeight: 100,
        justifyContent: 'space-between',
    },
    noteTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    noteDate: {
        color: '#dcdcdc',
        fontSize: 12,
        textAlign: 'right',
    },
});
