import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import CustomInput from "../CustomInput";
import styles from "./AuthStyles";
import Config from "../../config/Config";

export default function ForgotPasswordScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Error, setError] = useState("");
  const { t } = useTranslation();

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t("unmatched_passwords_error"));
      return;
    }

    if (!Config.PASSWORD_REGEX.test(newPassword)) {
      setPasswordError(t("weak_password_error"));
      return;
    }
    try {
      const response = await fetch(Config.API_URL + "/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(t("password_reset_successful"));
        navigation.navigate(t("login"));
      } else {
        setError(data.message || t("password_reset_error"));
      }
    } catch (error) {
      setError(t("network_error"));
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <CustomInput label={t("token")} value={token} onChangeText={setToken} />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <CustomInput
        label={t("new_password")}
        isPassword
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <CustomInput
        label={t("confirm_new_password")}
        value={confirmNewPassword}
        isConfirmPassword
        onChangeText={setConfirmNewPassword}
        secureTextEntry={true}
      />
      {Error && <Text style={styles.error}>{Error}</Text>}
      <Button mode="contained" onPress={handleResetPassword}>
        <Text style={styles.buttonText}>{t("reset_password")}</Text>
      </Button>
    </View>
  );
}
