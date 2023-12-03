import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunitiesStackNavigator from "./CommunitiesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import PlantIdentifierStackNavigator from "./PlantIdentifierStackNavigator";
import MyPlantsStackNavigator from "./MyPlantsStackNavigator";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Importa MaterialIcons

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === t("My Plants")) {
            iconName = "local-florist";
          } else if (route.name === t("Communities")) {
            iconName = "group";
          } else if (route.name === t("Plant Identifier")) {
            iconName = "search";
          } else if (route.name === t("Profile")) {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "limegreen",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { 
          borderTopColor: 'black', 
          borderTopWidth: 1, 
          borderTopStyle: 'solid',
        },
      })}
    >
      <Tab.Screen
        name={t("My Plants")}
        component={MyPlantsStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("Plant Identifier")}
        component={PlantIdentifierStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("Communities")}
        component={CommunitiesStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("Profile")}
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
