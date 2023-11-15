// CommunitiesStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunitiesScreen from "../screens/Communities/list";
import CommunityScreen from "../screens/Communities/show";
import CreateCommunityScreen from "../screens/Communities/create";
import CommunitySettingsScreen from "../screens/Communities/settings";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import { Dimensions } from "react-native";

const CommunitiesStack = createStackNavigator();

function CommunitiesStackNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CommunitiesStack.Navigator initialRouteName={t("communities_list")}>
      <CommunitiesStack.Screen
        name={t("communities_list")}
        component={CommunitiesScreen}
        options={{
          title: t("communities"),
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <IconButton
                icon="plus"
                size={Dimensions.get("window").scale * 11}
                iconColor={theme.colors.primary}
                onPress={() => navigation.navigate(t("create_community"))}
                style={{ marginRight: Dimensions.get("window").scale * 5 }}
              />
            );
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("community")}
        component={CommunityScreen}
      />
      <CommunitiesStack.Screen
        name={t("create_community")}
        component={CreateCommunityScreen}
      />
      <CommunitiesStack.Screen
        name={t("community_settings")}
        component={CommunitySettingsScreen}
      />
    </CommunitiesStack.Navigator>
  );
}

export default CommunitiesStackNavigator;
