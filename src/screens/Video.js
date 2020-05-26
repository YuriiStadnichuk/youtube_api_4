import React from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity, Button, View } from "react-native";
import { WebView } from "react-native-webview";

import "react-native-get-random-values";
const MaxResults = 5;
const API_KEY = "AIzaSyBLnHv9pmV7CwjyjKuw8RjwUj9wzIw6TD0";
const ACCESS_TOKEN = "ya29.a0AfH6SMCvIsb_DQ2fUFfjkgYM_z28C43VhOYN93XjBWxuI0GMxAYslYWR_mKtxs1UeElxXFicBeFb6qq5dJLiqJnYbVA4-iCY1VM7AyG5lDLg8z9mbk82Smj_j4sFEV-6th5MFThdhojxR-rVZ9hx6aYrFwuDva_Dc-c"


export default class WatchVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      viewCount: 0,
      likeCount: 0,
      dislikeCount: 0,
      commentCount: 0
    };
    console.log(this.props.video_url);
  }

  UNSAFE_componentWillMount() {
    this.fetchListComments();

  }

  fetchListComments = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet&videoId=${this.props.video_url}&maxResults=${MaxResults}`
    );
    const json = await response.json();
    this.setState({ comments: json.items });
    const responseCount = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=statistics&id=${this.props.video_url}`
    );
    const jsonCount = await responseCount.json();
    console.log(jsonCount.items[0].statistics)
    this.setState({ viewCount: jsonCount.items[0].statistics.viewCount });
    this.setState({ likeCount: jsonCount.items[0].statistics.likeCount });
    this.setState({ dislikeCount: jsonCount.items[0].statistics.dislikeCount });
    this.setState({ commentCount: jsonCount.items[0].statistics.commentCount });
  };


  render() {
    const comments = this.state.comments
    return (

      <SafeAreaView style={styles.safeArea}>
        {
          <WebView style={styles.videoContainer}
            source={{
              uri: "https://www.youtube.com/embed/" + this.props.video_url,
            }}
            startInLoadingState={true}
          />
        }
        <FlatList
          data={comments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.demacate}
            >
              <Text style={styles.item}>
                {item.snippet.topLevelComment.snippet.textDisplay}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <Text style={styles.item}>
            Всего просмотров: {this.state.viewCount}
          </Text>
          <Text style={styles.item}>
            Понравилось: {this.state.likeCount}
          </Text>
          <Text style={styles.item}>
            Не понравилось: {this.state.dislikeCount}
          </Text>
          <Text style={styles.item}>
            Всего комментарий: {this.state.commentCount}
          </Text>
        </View>
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

  },
  demacate: {
    borderBottomColor: "#2A2B37",
    borderRadius: 1,
    flex: 1,

  },
  item: {
    fontSize: 18,
  }
});
