import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Importing Firestore instance from your custom firebase.ts file

interface Comment {
  id: string;
  user: string;
  text: string;
}

interface EventDetailsProps {
  eventId: string;
}

export default function EventDetails({ eventId }: EventDetailsProps) {
  const [eventData, setEventData] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'John Doe', text: 'This event sounds amazing!' },
    { id: '2', user: 'Jane Smith', text: 'Looking forward to it!' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Fetch event details from Firestore
  useEffect(() => {
    const fetchEventDetails = async () => {
      console.log(eventId,'this is the id ')
      try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
          console.log(eventDoc)
          setEventData(eventDoc.data());
        } else {
          console.error('No event found with this ID');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now().toString(), user: 'You', text: newComment }]);
      setNewComment('');
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.comment}>
      <Text style={styles.commentUser}>{item.user}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {eventData && (
        <>
          <Image source={{ uri: eventData.imageUrl }} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{eventData.title}</Text>
            <Text style={styles.eventSubtitle}>{eventData.location}</Text>
            <Text style={styles.eventPrice}>${eventData.price}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.eventDate}>{eventData.date}</Text>
              <View>
                <Text style={styles.eventDay}>{eventData.day}</Text>
                <Text style={styles.eventTime}>{eventData.time}</Text>
              </View>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.infoTitle}>About this event:</Text>
              <Text style={styles.infoText}>{eventData.description}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{eventData.details}</Text>
            </View>
          </View>

          {/* Map showing event location */}
          {eventData.coordinates && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: eventData.coordinates.latitude,
                longitude: eventData.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: eventData.coordinates.latitude,
                  longitude: eventData.coordinates.longitude,
                }}
                title={eventData.title}
                description={eventData.location}
              />
            </MapView>
          )}

          <TouchableOpacity style={styles.ticketButton}>
            <Text style={styles.ticketButtonText}>Attend</Text>
          </TouchableOpacity>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={renderComment}
              style={styles.commentsList}
            />
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="#888"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity onPress={addComment} style={styles.addCommentButton}>
                <Text style={styles.addCommentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  eventDetails: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  eventPrice: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#633be9',
    padding: 10,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  eventDate: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  eventDay: {
    fontSize: 16,
    color: '#fff',
  },
  eventTime: {
    fontSize: 14,
    color: '#888',
  },
  eventInfo: {
    marginVertical: 10,
  },
  infoTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    color: '#aaa',
    marginTop: 5,
  },
  description: {
    marginVertical: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#aaa',
    marginTop: 5,
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  ticketButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  ticketButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentsSection: {
    padding: 20,
  },
  commentsTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: 200,
  },
  comment: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentUser: {
    fontSize: 14,
    color: '#cade7f',
    fontWeight: 'bold',
  },
  commentText: {
    color: '#fff',
    marginTop: 5,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  addCommentButton: {
    marginLeft: 10,
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
  },
  addCommentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
