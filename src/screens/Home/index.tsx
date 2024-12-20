import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'

import { Participant } from "../../components/Participant"

import { styles } from './style'

export default function Home() {
    const [participants, setParticipants] = useState<string[]>([]);

    const [participantName, setParticipantName] = useState<string>('');
    
    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert(
                "Participante existe",
                "já existe um participante na lista com esse mesmo nome!"
            );
        }
        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        let _participants = participants.filter(participant => participant !== name);

        Alert.alert(
            "Remover", 
            `Remover o participante ${name}`,
            [
                {
                    text: "Sim",
                    onPress: () => {
                        setParticipants([..._participants]);
                    }
                },
                {
                    text: "Não",
                    style: "cancel"
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor={"#6B6B6B"}
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <ScrollView showsVerticalScrollIndicator={false}>
                {participants.map((participantName, index) => (
                    <Participant
                        key={index}
                        name={participantName}
                        onRemove={() => handleParticipantRemove(participantName)}
                    />
                ))}
            </ScrollView> */}

            <FlatList
                data={participants}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

        </View>
    )
}