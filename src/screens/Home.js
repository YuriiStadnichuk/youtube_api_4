import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import "react-native-get-random-values";

const MaxResults = 10;
const API_KEY = "AIzaSyBLnHv9pmV7CwjyjKuw8RjwUj9wzIw6TD0";
ACCESS_TOKEN = "ya29.a0AfH6SMAB4d8pBLSrZI6XYAD8Y_BFuwmYJqpPDNbGEbEltZXO0N3F9QcnmP9DHaT07aPv_JW5Vv1A3J4hmf_VaZsuZkCyDncdxTCuLeL7KPSIc_37NEIbSg5HqGCJ7jnBdpDjpsuXT8DKzOL3yqQOGUvcaGGwXbnAr7c";

export default class Home extends React.Component {
  home() {
    Actions.home();
  }
  watchVideo(video_url) {
    Actions.watchvideo({ video_url: video_url });
  }

  UNSAFE_componentWillMount() {
    this.fetchPlaylistData();
    // this.fetchCommentThreads()
  }
  fetchPlaylistData = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=${API_KEY}&chart=mostPopular&maxResults=${MaxResults}`
    );


    const json = await response.json();
    this.setState({ videos: json["items"] });
    // console.log(this.state.videos);
    // console.log(json)
  };

  // fetchCommentThreads = async () => {
  //   const responsePostComment = await fetch(
  //     `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${API_KEY}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `${ACCESS_TOKEN}` ,
  //         Accept: `application/json`,
  //         "Conten-Type": `application/json`,
  //       },
  //       body: JSON.stringify({
  //         snippet: {
  //           channelId: "UC-E8zfad-ItGoRlKMuCAOxg",
  //           videoId: "oju3TkwGC0Q",
  //           topLevelComment: {
  //             snippet: {
  //               textOriginal: "Hello from API Test55"
  //             }
  //           }
  //         }
  //       })
  //     }
  //   );
  //   const json = await responsePostComment.json();
  //   // this.setState({ videos: json["items"] });
  //   // console.log(this.state.videos);
  //   console.log(json)
  // }

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }
  render() {
    const videos = this.state.videos;

    return (
      <SafeAreaView >
        <FlatList
          data={videos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.demacate}
              onPress={() => this.watchVideo(item.id)}
            >
              <View>
                <Image style={styles.img} source={{
                  uri: item.snippet.thumbnails.default.url
                }} />
                <Text style={styles.item}>{item.snippet.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  demacate: {
    borderBottomColor: "#2A2B37",
    borderBottomWidth: 2,
    // borderRadius: 10,
    flex: 1,
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 50,
  },
  img: {
    width: 120,
    height: 90,
  }
});


 // Ставлю комментарий на мой канал  Ютуба
  //   const responsaPostComment = await fetch(
  //     `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${API_KEY}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         authorization: `Bearer ${ACCESS_TOKEN}`,
  //         accept: `application/json`,
  //         contenType: `application/json`
  //       },
  //       body: {
  //         "snippet": {
  //           "channelId": "UC-E8zfad-ItGoRlKMuCAOxg",
  //           "videoId": "oju3TkwGC0Q",
  //           "topLevelComment": {
  //             "snippet": {
  //               "textOriginal": "Hello from API Test"
  //             }
  //           }
  //         }
  //       }
  //     }
    // );

