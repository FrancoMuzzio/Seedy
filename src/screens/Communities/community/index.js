import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, FlatList, RefreshControl, Image, Text } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useTranslation } from "react-i18next";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../../utils/device";
import * as Sentry from '@sentry/react-native';


function CommunitiesScreen() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const [communitiesData, setCommunitiesData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.error(t("not_logged_in_error"));
      }
      const response = await fetch(Config.API_URL + "/communities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setCommunitiesData(data);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching communities:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const CommunityCard = ({ community }) => (
    <Card
      onPress={() => navigation.navigate(t("community"), { community })}
      style={styles.listCard}
    >
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: Config.API_URL + community.picture }}
            style={styles.midProfilePic}
          />
          <View style={{ maxWidth: "80%" }}>
            <Text style={{ ...styles.communityCardTitle }}>
              {capitalizeFirstLetter(community.name)}
            </Text>
            <Text>{`${community.userCount} ${capitalizeFirstLetter(
              t("members")
            )}`}</Text>
            <Paragraph numberOfLines={1} ellipsizeMode="tail">
              {capitalizeFirstLetter(community.description)}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.communitiesContainer}>
      <FlatList
        data={communitiesData}
        renderItem={({ item }) => <CommunityCard community={item} />}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export default CommunitiesScreen;
